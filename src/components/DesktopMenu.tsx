
import React from 'react';
import { cn } from '@/lib/utils';

interface DesktopMenuProps {
  navItems: Array<{ name: string; id: string }>;
  activeSection: string;
  onNavClick: (id: string) => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ 
  navItems, 
  activeSection, 
  onNavClick 
}) => {
  return (
    <div className="flex-1 flex justify-end">
      <div className="hidden md:flex space-x-10">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id)}
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
    </div>
  );
};

export default DesktopMenu;
