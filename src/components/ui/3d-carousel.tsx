
"use client"

import { useEffect, useState } from "react"
import { useAnimation } from "framer-motion"
import Carousel from "./carousel/Carousel"
import ClientModal from "./carousel/ClientModal"

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
