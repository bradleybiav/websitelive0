
import React from 'react';

interface HomeSectionProps {
  id: string;
  isActive: boolean;
}

const HomeSection: React.FC<HomeSectionProps> = ({ id }) => {
  return (
    <section 
      id={id} 
      className="py-8 md:py-12 px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center"
    >
      {/* Intentionally left empty as per previous request */}
    </section>
  );
};

export default HomeSection;
