
import React from 'react';

interface ContactSectionProps {
  id: string;
  isActive: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  return (
    <section 
      id={id} 
      className="py-10 md:py-12 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="header-text mb-6">Get In Touch</h2>
          <div className="w-20 h-1 bg-black mb-12"></div>
        </div>
        
        <div className="space-y-6 md:space-y-8">
          <a 
            href="mailto:bradley@braininavat.dance" 
            className="block text-xl md:text-2xl font-sans hover:text-gray-600 transition-colors"
          >
            bradley@braininavat.dance
          </a>
          
          <a 
            href="https://www.instagram.com/braininavat.dance/" 
            className="block text-xl md:text-2xl font-sans hover:text-gray-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            @braininavat.dance
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
