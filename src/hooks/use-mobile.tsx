
import * as React from "react"

const MOBILE_BREAKPOINT = 640

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value
    onChange();
    
    // Add event listener for changes
    window.addEventListener("resize", onChange);
    mql.addEventListener("change", onChange);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", onChange);
      mql.removeEventListener("change", onChange);
    }
  }, [])

  return isMobile ?? false;
}
