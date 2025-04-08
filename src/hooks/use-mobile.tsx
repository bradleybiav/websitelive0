
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [initialized, setInitialized] = React.useState<boolean>(false)

  React.useEffect(() => {
    // More reliable check using matchMedia
    const checkMobile = () => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      setIsMobile(mql.matches)
      if (!initialized) {
        setInitialized(true)
      }
    }
    
    // Initialize immediately on mount
    checkMobile()
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile)
    
    // Ensure we check after device orientation changes on mobile
    window.addEventListener('orientationchange', checkMobile)
    
    // Force a second check after a short delay to catch any edge cases
    const timeout = setTimeout(checkMobile, 100)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
      clearTimeout(timeout)
    }
  }, [initialized])

  // Return both the mobile status and whether initialization is complete
  return { isMobile, initialized }
}
