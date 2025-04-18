
import React from 'react';

interface HomeSectionProps {
  id: string;
  isActive: boolean;
}

const HomeSection: React.FC<HomeSectionProps> = ({ id }) => (
  <section 
    id={id} 
    className="min-h-[50vh] py-20 md:py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center"
  />
);

export default HomeSection;
