
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // More reliable check using matchMedia
    const checkMobile = () => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
      setIsMobile(mql.matches)
    }
    
    // Initialize on mount
    checkMobile()
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile)
    
    // Ensure we check after device orientation changes on mobile
    window.addEventListener('orientationchange', checkMobile)
    
    // Force a second check after a short delay to catch any edge cases
    const timeout = setTimeout(checkMobile, 200)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('orientationchange', checkMobile)
      clearTimeout(timeout)
    }
  }, [])

  return isMobile
}
