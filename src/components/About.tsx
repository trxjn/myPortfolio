import { Code, Palette, Zap } from 'lucide-react';
// 1. IMPORT THE HOOK
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const dispatchHoverStart = () => window.dispatchEvent(new CustomEvent('cursor-hover-start'));
const dispatchHoverEnd = () => window.dispatchEvent(new CustomEvent('cursor-hover-end'));

export default function About() {
  // 2. CALL THE HOOK TO GET THE REF
  const ref = useScrollAnimation();

  return (
    <section id="about" className="py-20 px-6 bg-[#1a1a1a]">
      <div
        ref={ref}
        className="fade-in-scroll max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-normal text-white mb-4
          text-center">
          About Me
        </h2>

        {/* Accent line Orange) */}
        <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-16"></div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1: Development - ORANGE PRIMARY ACCENT */}
          <div 
            className="scroll-stagger-1 p-6 bg-[#2a2a2a] relative overflow-hidden group border border-transparent hover:border-orange-500 transition-all duration-300"
            onMouseEnter={dispatchHoverStart}
            onMouseLeave={dispatchHoverEnd}
          >
            {/* Left-side accent bar (Orange) */}
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex items-center space-x-4 mb-4">
              {/* Icon (Orange, Hover Lime -> Red) */}
              <Code className="text-orange-500 group-hover:text-red-400 transition-colors" size={32} />
              <h3 className="text-xl font-bold text-white transition-colors">Development</h3>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-sm">
              I specialize in robust frontend development using modern frameworks
              like React, ensuring maintainable and scalable codebases.
            </p>
          </div>

          {/* Feature 2: UI/UX Design - RED SECONDARY ACCENT */}
          <div
            className="scroll-stagger-2 p-6 bg-[#2a2a2a] relative overflow-hidden group border border-transparent hover:border-red-400 transition-all duration-300"
            onMouseEnter={dispatchHoverStart}
            onMouseLeave={dispatchHoverEnd}
          >
            {/* Left-side accent bar (Lime -> Red) */}
            <div className="absolute top-0 left-0 w-1 h-full bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex items-center space-x-4 mb-4">
              {/* Icon (Lime -> Red, Hover Cyan -> Orange) */}
              <Palette className="text-red-400 group-hover:text-orange-500 transition-colors" size={32} />
              <h3 className="text-xl font-bold text-white transition-colors">UI/UX Design</h3>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-sm">
              My focus is on creating intuitive, user-friendly interfaces that are
              visually appealing and accessible to everyone.
            </p>
          </div>

          {/* Feature 3: Performance - ORANGE PRIMARY ACCENT */}
          <div
            className="scroll-stagger-3 p-6 bg-[#2a2a2a] relative overflow-hidden group border border-transparent hover:border-orange-500 transition-all duration-300"
            onMouseEnter={dispatchHoverStart}
            onMouseLeave={dispatchHoverEnd}
          >
            {/* Left-side accent bar (Cyan -> Orange) */}
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex items-center space-x-4 mb-4">
              {/* Icon (Cyan -> Orange, Hover Lime -> Red) */}
              <Zap className="text-orange-500 group-hover:text-red-400 transition-colors" size={32} />
              <h3 className="text-xl font-bold text-white transition-colors">Performance</h3>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-sm">
              Speed and efficiency are crucial. I optimize every aspect to ensure
              fast, responsive applications that scale beautifully.
            </p>
          </div>
        </div>

        {/* Bottom Text Area */}
        <div className="mt-16 max-w-3xl mx-auto border-t border-gray-700 pt-12">
          <p className="text-base text-gray-300 leading-loose text-justify">
           As a 3rd-year BS Information Technology student, I'm currently focused on building a strong foundation in core development principles.
           I have hands-on experience experimenting with modern web technologies, including React, TypeScript, and foundational concepts of server-side development with Node.js. 
           My goal is to explore various domains within IT, constantly seek new knowledge, and develop the skills needed to solve real-world problems. 
           I am eager to learn and ready to contribute to any challenge.
          </p>
        </div>
      </div>
    </section>
  );
}