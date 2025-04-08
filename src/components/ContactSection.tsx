
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
        
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">Email</h3>
              <a 
                href="mailto:bradley@braininavat.dance" 
                className="text-xl md:text-2xl font-sans hover:text-gray-600 transition-colors"
              >
                bradley@braininavat.dance
              </a>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">Social</h3>
              <a 
                href="https://www.instagram.com/braininavat.dance/" 
                className="text-xl md:text-2xl font-sans hover:text-gray-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                @braininavat.dance
              </a>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">LinkedIn</h3>
              <a 
                href="https://www.linkedin.com/company/braininavat/" 
                className="text-xl md:text-2xl font-sans hover:text-gray-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                brain in a vat
              </a>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-7">
            <div className="border-l-2 border-black pl-6 md:pl-8">
              <p className="text-xl md:text-2xl font-sans">
                We'd love to hear about your project. Get in touch and let's create something extraordinary together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
