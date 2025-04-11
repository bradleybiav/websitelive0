import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
  visible: boolean;
  isTitleVisible?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSectionClick,
  visible,
  isTitleVisible = true,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [logoAnimationClass, setLogoAnimationClass] = useState("translate-y-16 opacity-0");
  const lastScrollY = useRef(0);
  const prevDirection = useRef<"up" | "down">("down");

  // Handle logo click to scroll to top and set active section to home
  const handleLogoClick = () => {
    // Use the onSectionClick from props to ensure consistent handling
    onSectionClick("home");
  };

  // Add scroll event listener to detect when navbar should change appearance
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Determine scroll direction with more stable detection
      if (currentScrollY > lastScrollY.current + 5) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current - 5) {
        setScrollDirection("up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update logo visibility and animation state
  useEffect(() => {
    // Determine if logo should be visible
    const shouldShowLogo =
      !isTitleVisible || (activeSection !== "home" && activeSection !== "hero");

    // When logo should appear
    if (shouldShowLogo && !logoVisible) {
      // Set initial position before animating in
      if (scrollDirection === "down") {
        setLogoAnimationClass("translate-y-16 opacity-0"); // Start from below
      } else {
        setLogoAnimationClass("-translate-y-16 opacity-0"); // Start from above
      }

      // Then trigger the animation after a brief delay (allows the initial class to apply)
      setTimeout(() => {
        setLogoVisible(true);
        setLogoAnimationClass("translate-y-0 opacity-100");
      }, 10);
    }
    // When logo should disappear
    else if (!shouldShowLogo && logoVisible) {
      // Animate out based on scroll direction
      if (scrollDirection === "down") {
        setLogoAnimationClass("-translate-y-16 opacity-0"); // Exit upward
      } else {
        setLogoAnimationClass("translate-y-16 opacity-0"); // Exit downward
      }

      // Remove logo after animation completes
      setTimeout(() => {
        setLogoVisible(false);
      }, 700); // Match the animation duration
    }

    // Save the direction for next animation
    prevDirection.current = scrollDirection;
  }, [isTitleVisible, activeSection, scrollDirection]);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Philosophy", id: "philosophy" },
    { name: "Services", id: "services" },
    { name: "Clients", id: "clients" },
    { name: "Contact", id: "contact" },
  ];

  const handleNavClick = (id: string) => {
    onSectionClick(id);
    setMenuOpen(false);
  };

  // Always prepare the logo element, but only show when needed
  const shouldShowLogo = !isTitleVisible || (activeSection !== "home" && activeSection !== "hero");

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4",
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex-1 relative h-10 md:h-12 overflow-hidden">
          <img
            src="/lovable-uploads/ae35b706-929b-4ead-b6f1-1ef0e3dbd7c5.png"
            alt="Brain in a Vat"
            className={cn(
              "h-10 md:h-12 cursor-pointer absolute transition-all duration-700 ease-in-out",
              logoAnimationClass,
              !shouldShowLogo && "pointer-events-none"
            )}
            onClick={handleLogoClick}
            style={{ visibility: logoVisible || shouldShowLogo ? "visible" : "hidden" }}
          />
        </div>

        <DesktopMenu
          navItems={navItems}
          activeSection={activeSection}
          onNavClick={handleNavClick}
        />

        <MobileMenu
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          navItems={navItems}
          activeSection={activeSection}
          onNavClick={handleNavClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;
