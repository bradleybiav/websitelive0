
import React from 'react';

interface HomeSectionProps {
  id: string;
  isActive: boolean;
}

const HomeSection: React.FC<HomeSectionProps> = ({ id }) => {
  return (
    <section 
      id={id} 
      className="py-6 md:py-10 px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center"
    >
      <div className="max-w-[700px] text-center mx-auto">
        <p className="text-xl md:text-2xl font-normal leading-relaxed">
          Brain in a Vat is a boutique music promotion agency that challenges perception and crafts immersive narratives for artists who defy conventional boundaries in sound and expression.
        </p>
      </div>
    </section>
  );
};

export default HomeSection;
