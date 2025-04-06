
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  activeSection: string;
  onSectionClick: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/c1499d03-d412-485f-b24e-3b96975d1fdd.png" 
            alt="Brain in a Vat" 
            className="h-10 md:h-12"
          />
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-10">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'nav-link relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 after:ease-in-out',
                activeSection === item.id 
                  ? 'after:w-full' 
                  : 'after:w-0 hover:after:w-full'
              )}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden flex flex-col space-y-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span 
            className={cn(
              "block h-0.5 w-6 bg-black transition-transform duration-300", 
              menuOpen && "rotate-45 translate-y-2"
            )} 
          />
          <span 
            className={cn(
              "block h-0.5 w-6 bg-black transition-opacity duration-300", 
              menuOpen && "opacity-0"
            )} 
          />
          <span 
            className={cn(
              "block h-0.5 w-6 bg-black transition-transform duration-300", 
              menuOpen && "-rotate-45 -translate-y-2"
            )} 
          />
        </button>
      </div>

      {/* Mobile navigation */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden",
          menuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col space-y-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'nav-link text-left py-2',
                activeSection === item.id && 'font-bold'
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
