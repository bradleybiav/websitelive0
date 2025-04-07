
"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

// Client data for the carousel
const clients = [
  { 
    name: "Ethereal Echo", 
    type: "Electronic Producer", 
    image: "https://placehold.co/400x300/f5f5f5/333333?text=Ethereal+Echo" 
  },
  { 
    name: "Neuronal Synapse", 
    type: "Experimental Band", 
    image: "https://placehold.co/400x300/f5f5f5/333333?text=Neuronal+Synapse" 
  },
  { 
    name: "Conscious Waves", 
    type: "Ambient Collective", 
    image: "https://placehold.co/400x300/f5f5f5/333333?text=Conscious+Waves" 
  },
  { 
    name: "Quantum Harmony", 
    type: "Jazz Fusion Group", 
    image: "https://placehold.co/400x300/f5f5f5/333333?text=Quantum+Harmony" 
  },
  { 
    name: "Cerebral Soundscapes", 
    type: "Neo-Classical Composer", 
    image: "https://placehold.co/400x300/f5f5f5/333333?text=Cerebral+Soundscapes" 
  },
  { 
    name: "Synaptic Pulse", 
    type: "Electronic Duo", 
    image: "https://placehold.co/400x300/f5f5f5/333333?text=Synaptic+Pulse" 
  },
]

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, clientInfo: {name: string, type: string}, index: number) => void
    controls: any
    cards: typeof clients
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((client, i) => (
            <motion.div
              key={`key-${client.name}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(client.image, {name: client.name, type: client.type}, i)}
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
          ))}
        </motion.div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel() {
  const [activeClient, setActiveClient] = useState<{
    image: string;
    name: string;
    type: string;
  } | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  useEffect(() => {
    console.log("Clients loaded:", clients)
  }, [])

  const handleClick = (imgUrl: string, clientInfo: {name: string, type: string}) => {
    setActiveClient({
      image: imgUrl,
      name: clientInfo.name,
      type: clientInfo.type
    })
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveClient(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeClient && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeClient.image}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 m-5 md:m-36 lg:mx-[19rem] rounded-3xl"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <div className="bg-black p-8 rounded-xl max-w-2xl text-center">
              <motion.img
                layoutId={`img-${activeClient.image}`}
                src={activeClient.image}
                className="max-w-full max-h-[50vh] rounded-lg shadow-lg mx-auto"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                  willChange: "transform",
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="mt-6 text-white"
              >
                <h3 className="text-2xl font-display font-semibold">{activeClient.name}</h3>
                <p className="text-gray-300 mt-2">{activeClient.type}</p>
                <p className="mt-4 text-gray-200">
                  We collaborated with {activeClient.name} to redefine their sonic identity and create immersive listening experiences.
                </p>
                <button className="mt-6 px-6 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition-colors">
                  View Full Case Study
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={clients}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel };
