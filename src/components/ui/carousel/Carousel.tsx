
import { memo, useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const transition = { duration: 0.15, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, clientInfo: {name: string, type: string}, index: number) => void
    controls: any
    cards: { 
      name: string
      type: string
      image: string 
    }[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    // Cylinder width configurations
    const cylinderWidth = isScreenSizeSm ? 2000 : 3200
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )
    const containerRef = useRef<HTMLDivElement>(null)
    const [autoRotate, setAutoRotate] = useState(false)
    const [mousePosition, setMousePosition] = useState(0)
    
    // Calculate visibility based on rotation angle
    const isCardVisible = (index: number) => {
      const currentRotation = rotation.get() % 360
      const cardAngle = (index * (360 / faceCount)) % 360
      
      // Calculate angle difference, considering the circular nature
      let angleDiff = Math.abs(currentRotation - cardAngle)
      if (angleDiff > 180) angleDiff = 360 - angleDiff
      
      // Cards are visible when they're within 90 degrees of facing forward
      // This creates a wider visible range than before
      return angleDiff < 90
    }

    // Handle mouse movement within the carousel container
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isCarouselActive || !containerRef.current) return
      
      const container = containerRef.current
      const { left, width } = container.getBoundingClientRect()
      const mouseX = e.clientX - left
      
      // Calculate mouse position relative to center (-1 to 1)
      const relativePosition = (mouseX / width) * 2 - 1
      setMousePosition(relativePosition)
      
      // Enable auto-rotation when mouse is not in the center
      setAutoRotate(true)
    }
    
    // Handle mouse leaving the container
    const handleMouseLeave = () => {
      setAutoRotate(false)
    }

    // Auto-rotate based on mouse position
    useEffect(() => {
      if (!isCarouselActive) return
      
      let animationId: number
      
      const updateRotation = () => {
        if (autoRotate) {
          // Speed depends on how far from center the mouse is
          const rotationSpeed = mousePosition * 2
          
          // Simple continuous rotation - no normalization needed
          rotation.set(rotation.get() + rotationSpeed)
        }
        animationId = requestAnimationFrame(updateRotation)
      }
      
      animationId = requestAnimationFrame(updateRotation)
      
      return () => {
        cancelAnimationFrame(animationId)
      }
    }, [autoRotate, mousePosition, rotation, isCarouselActive])

    return (
      <div
        ref={containerRef}
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="relative flex h-full origin-center justify-center"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          animate={controls}
        >
          {cards.map((client, i) => {
            const cardRotation = i * (360 / faceCount)
            
            return (
              <motion.div
                key={`key-${client.name}-${i}`}
                className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${cardRotation}deg) translateZ(${radius}px)`,
                  opacity: isCardVisible(i) ? 1 : 0.2,
                  pointerEvents: isCardVisible(i) ? "auto" : "none",
                  backfaceVisibility: "hidden",
                }}
                onClick={() => isCardVisible(i) && handleClick(client.image, {name: client.name, type: client.type}, i)}
              >
                <motion.img
                  src={client.image}
                  alt={`${client.name} - ${client.type}`}
                  layoutId={`img-${client.image}`}
                  className="pointer-events-none w-full rounded-xl object-cover aspect-square"
                  initial={{ filter: "blur(4px)" }}
                  layout="position"
                  animate={{ filter: "blur(0px)" }}
                  transition={transition}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    )
  }
)

export default Carousel
