
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
  navItems: Array<{ name: string; id: string }>;
  activeSection: string;
  onNavClick: (id: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  menuOpen, 
  setMenuOpen, 
  navItems, 
  activeSection, 
  onNavClick 
}) => {
  return (
    <>
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
              onClick={() => onNavClick(item.id)}
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
    </>
  );
};

export default MobileMenu;
