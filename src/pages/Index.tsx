import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import HomeSection from "@/components/HomeSection";
import Navbar from "@/components/Navbar";
import PhilosophySection from "@/components/PhilosophySection";
import ServicesSection from "@/components/ServicesSection";
import { useEffect, useRef, useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const isScrollingRef = useRef(false);
  const lastScrollTime = useRef(Date.now());

  const handleSectionClick = (section: string) => {
    isScrollingRef.current = true;
    setActiveSection(section);

    // Smooth scroll to the section with offset to account for navbar height
    const element = document.getElementById(section);
    if (element) {
      // Calculate the navbar height to use as offset
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;

      // Get the element's position relative to the viewport
      const rect = element.getBoundingClientRect();

      // Calculate the scroll target positions
      // We subtract the navbar height to ensure the section appears below the navbar
      const scrollTarget = window.pageYOffset + rect.top - navbarHeight;

      // Perform the scroll
      window.scrollTo({
        top: scrollTarget,
        behavior: "smooth",
      });

      // Reset the scroll lock after animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600); // Shorter duration for more responsive controls
    }
  };

  // Special handling for the "home" section to scroll to top
  const handleHomeClick = () => {
    isScrollingRef.current = true;
    setActiveSection("home");

    // Scroll to the very top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  useEffect(() => {
    // Track which sections are visible and by how much
    const visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        if (!isScrollingRef.current || now - lastScrollTime.current > 100) {
          lastScrollTime.current = now;

          // Update visibility data for each section
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(entry.target.id, entry.intersectionRatio);
            } else {
              visibleSections.delete(entry.target.id);
            }
          });

          // Find the section with the highest visibility
          let maxRatio = 0;
          let maxSection = activeSection;

          visibleSections.forEach((ratio, section) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxSection = section;
            }
          });

          // Only update if we have a section with meaningful visibility
          if (maxRatio > 0.15) {
            setActiveSection(maxSection);
          }
        }
      },
      {
        threshold: [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5],
        rootMargin: "-10% 0px",
      }
    );

    // Set up scroll event to track scroll status
    const handleScroll = () => {
      lastScrollTime.current = Date.now();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Observe all sections with shorter delay
    setTimeout(() => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        observer.observe(section);
      });
    }, 200); // Slightly reduced delay for faster initialization

    return () => {
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add a separate observer to track the hero title visibility
  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update title visibility based on intersection
          setIsTitleVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        // Use negative top margin to trigger earlier when scrolling
        rootMargin: "-250px 0px 0px 0px",
      }
    );

    // Wait for DOM to load before observing
    setTimeout(() => {
      const titleElement = document.getElementById("hero-title");
      if (titleElement) {
        titleObserver.observe(titleElement);
      }
    }, 1000);

    return () => {
      const titleElement = document.getElementById("hero-title");
      if (titleElement) {
        titleObserver.unobserve(titleElement);
      }
    };
  }, []);

  return (
    <>
      <div className="relative min-h-screen">
        <Navbar
          activeSection={activeSection}
          isTitleVisible={isTitleVisible}
          onSectionClick={(section) => {
            if (section === "home") {
              handleHomeClick();
            } else {
              handleSectionClick(section);
            }
          }}
          visible={true}
        />

        <main>
          <HeroSection id="hero" isActive={activeSection === "hero"} onInteraction={() => {}} />

          <div className="space-y-0 md:space-y-6">
            {" "}
            {/* Removed vertical spacing completely */}
            <HomeSection id="home" isActive={activeSection === "home"} />
            <PhilosophySection id="philosophy" isActive={activeSection === "philosophy"} />
            <ServicesSection id="services" isActive={activeSection === "services"} />
            <ClientsSection id="clients" isActive={activeSection === "clients"} />
            <ContactSection id="contact" isActive={activeSection === "contact"} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Index;
