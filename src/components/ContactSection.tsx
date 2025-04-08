
import React from 'react';
import { Mail, Instagram, Linkedin } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-8">Our Clients</h1>
        
        <div className="flex justify-center space-x-8 mt-8">
          <a 
            href="mailto:hello@braininavat.dance" 
            className="hover:opacity-70 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={32} />
          </a>
          
          <a 
            href="https://www.instagram.com/braininavat.dance/" 
            className="hover:opacity-70 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={32} />
          </a>
          
          <a 
            href="https://www.linkedin.com/company/braininavat/" 
            className="hover:opacity-70 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
