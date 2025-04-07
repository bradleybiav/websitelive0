
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
  visible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionClick, visible }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle logo click to scroll to top and set active section to home
  const handleLogoClick = () => {
    // Use the onSectionClick from props to ensure consistent handling
    onSectionClick('home');
  };

  // Add scroll event listener to detect when navbar should change appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Philosophy', id: 'philosophy' },
    { name: 'Services', id: 'services' },
    { name: 'Clients', id: 'clients' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    onSectionClick(id);
    setMenuOpen(false);
  };

  // Determine if the logo should be shown (only when not on the home or hero section)
  const shouldShowLogo = activeSection !== 'home' && activeSection !== 'hero';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {shouldShowLogo && (
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/ae35b706-929b-4ead-b6f1-1ef0e3dbd7c5.png" 
              alt="Brain in a Vat" 
              className="h-10 md:h-12 cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>
        )}

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
