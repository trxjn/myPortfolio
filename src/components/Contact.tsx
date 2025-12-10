import { Mail, MapPin, Phone } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const dispatchHoverStart = () => window.dispatchEvent(new CustomEvent('cursor-hover-start'));
const dispatchHoverEnd = () => window.dispatchEvent(new CustomEvent('cursor-hover-end'));

const PRIMARY_EMAIL = "trixiajan.canete@gmail.com";
const PHONE_NUMBER_DISPLAY = "(+63) 912-345-6789";
const PHONE_NUMBER_RAW = "(+63) 912-345-6789";


export default function Contact() {
  const ref = useScrollAnimation();

  return (
    <section id="contact" className="py-20 px-6 bg-[#1a1a1a]">
      <div
        ref={ref}
        className="fade-in-scroll max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-normal text-white mb-4">
          Let's Work Together
        </h2>

        {/* Accent line color to orange-500 */}
        <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-8"></div>

        <p className="text-base text-gray-300 mb-12 max-w-2xl mx-auto leading-loose">
          Have a project in mind or just want to chat? Feel free to reach out.
          I'm always open to new opportunities.
        </p>
        
        {/* --- Contact Info (Horizontal Layout) --- */}
        <div 
          className="flex flex-wrap justify-center gap-x-12 md:gap-x-20 gap-y-8 text-white"
        >
          
          {/* Location */}
          <div className="flex flex-col items-center text-center">
            <MapPin size={28} className="text-orange-500 mb-2" />
            <h4 className="text-lg font-medium">Location</h4>
            <p className="text-gray-400 font-medium">Davao City, Philippines</p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center text-center">
            <Mail size={28} className="text-orange-500 mb-2" />
            <h4 className="text-lg font-medium">Email</h4>
            <a
              href={`mailto:${PRIMARY_EMAIL}`}
              className="text-gray-400 font-medium hover:text-orange-500 transition-colors duration-300"
              onMouseEnter={dispatchHoverStart}
              onMouseLeave={dispatchHoverEnd}
            >
              {PRIMARY_EMAIL}
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center text-center">
            <Phone size={28} className="text-orange-500 mb-2" />
            <h4 className="text-lg font-medium">Phone</h4>
            <a
              href={`tel:${PHONE_NUMBER_RAW}`}
              className="text-gray-400 font-medium hover:text-orange-500 transition-colors duration-300"
              onMouseEnter={dispatchHoverStart}
              onMouseLeave={dispatchHoverEnd}
            >
              {PHONE_NUMBER_DISPLAY}
            </a>
          </div>
        </div>
        {/*Credit Section */}
        <div className="mt-20 text-xs text-gray-500">
            <p>
                &copy; 2025 Trixia Jan Cañete | All rights reserved. | Icons by Icons8
            </p>
        </div>
      </div>
    </section>
  );
}