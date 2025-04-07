
"use client"

import { useEffect, useState } from "react"
import { useAnimation } from "framer-motion"
import Carousel from "./carousel/Carousel"
import ClientModal from "./carousel/ClientModal"
import { clients } from "@/data/clients"

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

  const handleClick = (imgUrl: string, clientInfo: {name: string, type: string}, index: number) => {
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
    <div className="relative">
      <ClientModal 
        activeClient={activeClient}
        handleClose={handleClose}
      />
      
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={clients}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </div>
  )
}

export { ThreeDPhotoCarousel };
