
import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ContactSectionProps {
  id: string;
  isActive: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ id, isActive }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isActive && sectionRef.current) {
      elementsRef.current.forEach((element, index) => {
        if (element) {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    } else {
      elementsRef.current.forEach(element => {
        if (element) {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
        }
      });
    }
  }, [isActive]);

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="scroll-section section-padding"
    >
      <div 
        className={cn(
          "max-w-7xl mx-auto",
          isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div 
            ref={el => elementsRef.current[0] = el}
            className="transition-all duration-500 ease-out opacity-0 transform translate-y-4"
          >
            <h2 className="header-text mb-6">Get In Touch</h2>
            <div className="w-20 h-1 bg-black mb-12"></div>
            
            <p className="body-text mb-10">
              Ready to elevate your music promotion strategy? Contact us to discuss how we can create a surreal, impactful campaign for your next release.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Email</h3>
                <p className="text-muted-foreground">contact@brainavat.com</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Location</h3>
                <p className="text-muted-foreground">Los Angeles • New York • Berlin</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-black hover:opacity-70 transition-opacity duration-300">Instagram</a>
                  <a href="#" className="text-black hover:opacity-70 transition-opacity duration-300">Twitter</a>
                  <a href="#" className="text-black hover:opacity-70 transition-opacity duration-300">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={el => elementsRef.current[1] = el}
            className="transition-all duration-500 ease-out opacity-0 transform translate-y-4"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm font-medium mb-2">
                  Project Type
                </label>
                <select
                  id="project"
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
                >
                  <option value="" disabled selected>Select project type</option>
                  <option value="single">Single Release</option>
                  <option value="album">Album Campaign</option>
                  <option value="tour">Tour Promotion</option>
                  <option value="brand">Artist Branding</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full p-3 border border-gray-300 focus:border-black focus:outline-none transition-colors duration-300"
                  placeholder="Tell us about your project"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-medium transition-all duration-300 hover:bg-opacity-80"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
        
        <div 
          ref={el => elementsRef.current[2] = el}
          className="mt-20 pt-10 border-t border-gray-200 text-center transition-all duration-500 ease-out opacity-0 transform translate-y-4"
        >
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Brain in a Vat. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
