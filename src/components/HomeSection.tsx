
import React from 'react';

interface HomeSectionProps {
  id: string;
  isActive: boolean;
}

const HomeSection: React.FC<HomeSectionProps> = ({ id }) => {
  return (
    <section 
      id={id} 
      className="py-4 md:py-6 px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center"
    >
      <div className="max-w-[700px] text-center mx-auto">
        <p className="text-xl md:text-2xl font-normal leading-relaxed">
          brain in a vat is a boutique music promotions agency that shapes perception and shifts reality.
        </p>
      </div>
    </section>
  );
};

export default HomeSection;
