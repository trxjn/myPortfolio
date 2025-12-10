import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Certificates from './components/Certificates';
import Photos from './components/Photos';
import Reflection from './components/Reflection';
import Contact from './components/Contact';

// --- LoadingScreen Component ---
const LoadingScreen: React.FC = () => (
  // Uses the full screen and dark background
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a2a2a]">
    <div className="relative flex items-center justify-center">
      {/* Outer Ring - Uses Orange/Red color from index.css keyframes */}
      <div className="absolute w-20 h-20 border-4 border-transparent rounded-full animate-ring-grow" />
      
      {/* Inner Dot - Uses White color for contrast */}
      <div className="w-4 h-4 bg-white rounded-full animate-dot-pulse" />
    </div>
  </div>
);

// --- CustomCursor Component (Remains unchanged for logic) ---
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const moveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      if (!isMoving) {
        setIsMoving(true);
      }

      if (moveTimeoutRef.current) {
        window.clearTimeout(moveTimeoutRef.current);
      }

      moveTimeoutRef.current = window.setTimeout(() => {
        setIsMoving(false);
      }, 50);
    };

    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);
    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('cursor-hover-start', onHoverStart);
    window.addEventListener('cursor-hover-end', onHoverEnd);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('cursor-hover-start', onHoverStart);
      window.removeEventListener('cursor-hover-end', onHoverEnd);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (moveTimeoutRef.current) {
        window.clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [isMoving]);

  const cursors = [
    { className: 'custom-cursor-main', size: 40, key: 1, baseDuration: 0.1 },
    { className: 'custom-cursor-trail-1', size: 30, key: 2, baseDuration: 0.2 },
    { className: 'custom-cursor-trail-2', size: 20, key: 3, baseDuration: 0.3 },
  ];

  return (
    <>
      {cursors.map((cursor) => {
        const offset = cursor.size / 2;
        const scale = isHovering ? 1.5 : isMouseDown ? 0.7 : 1;
        let duration = cursor.baseDuration;

        if (!isMoving && !isHovering && cursor.key !== 1) {
          duration = 0.1;
        }

        return (
          <div
            key={cursor.key}
            className={`custom-cursor-base ${cursor.className} ${isHovering ? 'is-hovering' : ''} ${isMouseDown ? 'is-clicking' : ''}`}
            style={{
              transform: `translate3d(${position.x - offset}px, ${position.y - offset}px, 0) scale(${scale})`,
              transition: `transform ${duration}s ease-out, background-color 0.1s ease-out`,
            }}
          />
        );
      })}
    </>
  );
};


// --- Main App Component ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); 

    // CLEANUP FUNCTION: This runs when the component unmounts or before the effect runs again.
    return () => clearTimeout(timer);
  }, []);

  // NEW: Effect to manage the body's overflow property
  useEffect(() => {
    if (isLoading) {
      // Add 'overflow-hidden' class to body element when loading
      document.body.classList.add('overflow-hidden');
    } else {
      // Remove 'overflow-hidden' class when loading is complete
      document.body.classList.remove('overflow-hidden');
    }
  }, [isLoading]);


  return (
    <>
      {/* 1. Show the LoadingScreen if loading */}
      {isLoading && <LoadingScreen />}

      {/* 2. Render the main content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Photos />
          <Certificates />
          <Reflection />
          <Contact />
        </main>
      </div>
    </>
  );
}