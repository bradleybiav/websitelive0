
import React from 'react';

interface HomeSectionProps {
  id: string;
  isActive: boolean;
}

const HomeSection: React.FC<HomeSectionProps> = ({ id }) => {
  return (
    <section 
      id={id} 
      className="min-h-[10vh] py-4 md:py-6 px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center"
    >
      {/* Intentionally left empty as per user request */}
    </section>
  );
};

export default HomeSection;
