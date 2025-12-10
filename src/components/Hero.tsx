// src/components/Hero.tsx
import React from 'react';

// NOTE: The path for the image is relative to the 'public' directory when running in a browser.
const PROFILE_IMAGE_PATH = '/assets/profile_picture.jpg';

// Functions to dispatch custom cursor events
const dispatchHoverStart = () => window.dispatchEvent(new CustomEvent('cursor-hover-start'));
const dispatchHoverEnd = () => window.dispatchEvent(new CustomEvent('cursor-hover-end'));

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#2a2a2a] text-white"
    >
      
      {/* --- Background Skewed Vibrant Shape (Orange/Red) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[65%] h-full bg-gradient-to-br from-red-500 to-orange-500 origin-top-right opacity-80"
          style={{
            clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0% 100%)',
            transform: 'skewX(-10deg) translateX(10%)',
          }}
        />
        {/* Distressed lines (Orange/Red accents) */}
        <div className="absolute top-[10%] right-[30%] w-16 h-1 bg-orange-400 transform rotate-45 opacity-70" />
        <div className="absolute bottom-[20%] right-[25%] w-20 h-1 bg-red-400 transform -rotate-12 opacity-70" />
      </div>

      {/*  Main Content Container  */}
      <div className="relative z-10 w-full px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Headline Text (Left Side) */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight">
            <span className="block">Hi there,</span>
            <span className="block text-red-400">
              I am
            </span>
            {/* GLITCH EFFECT APPLIED to Trixia Cañete */}
            <span 
              className="block relative glitch" 
              data-text="Trixia Cañete"
            >
              Trixia Cañete
            </span>
          </h1>
        </div>

        {/* --- Profile Picture (Right Side) --- */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div 
            className="group relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] overflow-hidden rounded-md shadow-2xl transition-transform duration-300 hover:scale-[1.05]"
            onMouseEnter={dispatchHoverStart}
            onMouseLeave={dispatchHoverEnd}
          >
            <img 
              src={PROFILE_IMAGE_PATH} 
              alt="Profile Picture" 
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-110 contrast-100 group-hover:grayscale-0 transition-all duration-500" 
            />
            <div className="absolute inset-0 bg-black opacity-10 mix-blend-overlay"></div>
          </div>
        </div>
      </div>


      {/* Bottom Left: Social Links */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 flex flex-col gap-2">
        <a
          href="https://www.instagram.com/trxa.j/"
          target="_blank"
          className="text-white text-xs md:text-sm font-light tracking-widest hover:text-orange-400 transition-colors"
          onMouseEnter={dispatchHoverStart}
          onMouseLeave={dispatchHoverEnd}
        >
          INSTAGRAM
        </a>
        <a
          href="https://www.linkedin.com/in/trixia-ca%C3%B1ete-8a7337292/"
          target="_blank"
          className="text-white text-xs md:text-sm font-light tracking-widest hover:text-orange-400 transition-colors"
          onMouseEnter={dispatchHoverStart}
          onMouseLeave={dispatchHoverEnd}
        >
          LINKEDIN
        </a>
        <a
          href="https://github.com/trxjn"
          target="_blank"
          className="text-white text-xs md:text-sm font-light tracking-widest hover:text-orange-400 transition-colors"
          onMouseEnter={dispatchHoverStart}
          onMouseLeave={dispatchHoverEnd}
        >
          GITHUB
        </a>
      </div>

      {/* Bottom Right: Availability Tag*/}
      <div className="absolute bottom-8 right-6 md:right-12 z-20">
        <div 
          className="bg-black bg-opacity-70 px-4 py-2 rounded-full backdrop-blur-sm border border-orange-400"
          onMouseEnter={dispatchHoverStart}
          onMouseLeave={dispatchHoverEnd}
        >
          <p 
            className="text-orange-400 text-xs md:text-sm font-medium tracking-wider"
          >
            AVAILABLE FOR WORK
          </p>
        </div>
      </div>
    </section>
  );
}