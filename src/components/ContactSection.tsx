
import React from 'react';

interface ContactSectionProps {
  id: string;
  isActive: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ id }) => {
  const contactPoints = [
    {
      title: "Email",
      link: "mailto:bradley@braininavat.dance",
      text: "bradley@braininavat.dance"
    },
    {
      title: "Social",
      link: "https://www.instagram.com/braininavat.dance/",
      text: "@braininavat.dance"
    }
  ];

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
        
        <div className="space-y-8">
          {contactPoints.map((point, index) => (
            <div key={index}>
              <a 
                href={point.link}
                className="text-2xl md:text-3xl font-display font-semibold transition-colors duration-300 hover:text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {point.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

