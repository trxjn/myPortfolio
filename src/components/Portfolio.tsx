import React, { useState, useEffect, useRef } from 'react';
import Hero from './Hero';
import About from './About';
import Photos from './Photos';
import Certificates from './Certificates';
import Reflection from './Reflection';
import Contact from './Contact';
import Navbar from './Navbar'; // NEW IMPORT

// CustomCursor Component to handle mouse movement and state
const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false); 
  const moveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // 1. Update position
      setPosition({ x: e.clientX, y: e.clientY }); 
      
      // 2. Set moving state and reset timeout
      if (!isMoving) {
        setIsMoving(true);
      }

      if (moveTimeoutRef.current) {
        window.clearTimeout(moveTimeoutRef.current);
      }
      
      // If mouse stops for 50ms, set isMoving to false (causes the circles to merge)
      moveTimeoutRef.current = window.setTimeout(() => { // Reduced delay to 50ms
        setIsMoving(false);
      }, 50); 
    };

    // Event listener for hover state dispatched from components
    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    // Event listeners for mouse down/up (click/hold effect)
    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    // Attach listeners
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('cursor-hover-start', handleHoverStart);
    window.addEventListener('cursor-hover-end', handleHoverEnd);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('cursor-hover-start', handleHoverStart);
      window.removeEventListener('cursor-hover-end', handleHoverEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      if (moveTimeoutRef.current) {
        window.clearTimeout(moveTimeoutRef.current);
      }
    };
  }, [isMoving]);

  // Define cursor properties for the three circles
  const cursors = [
    { key: 1, className: 'custom-cursor-main', offset: 20, baseDuration: 0.12 },
    { key: 2, className: 'custom-cursor-trail-1', offset: 15, baseDuration: 0.25 },
    { key: 3, className: 'custom-cursor-trail-2', offset: 10, baseDuration: 0.4 },
  ];

  return (
    <>
      {cursors.map((cursor) => {
        const offset = cursor.offset; // Half width/height for centering
        
        // Scale down on mousedown, scale up on hover
        const scale = isHovering ? 1.5 : isMouseDown ? 0.7 : 1; 
        
        // Determine the transition duration for trail merge
        let duration = cursor.baseDuration;
        
        // If the mouse is stationary AND not hovering, the trail circles (key 2 and 3) 
        // snap to the main cursor's speed (0.1s), then merged.
        if (!isMoving && !isHovering && cursor.key !== 1) {
            duration = 0.1;
        }

        return (
          <div 
            key={cursor.key}
            // Add is-clicking class if mouse is down
            className={`custom-cursor-base ${cursor.className} ${isHovering ? 'is-hovering' : ''} ${isMouseDown ? 'is-clicking' : ''}`}
            style={{
              // Combine position and scale
              transform: `translate3d(${position.x - offset}px, ${position.y - offset}px, 0) scale(${scale})`,
              // Apply dynamic transition duration here, overriding the static CSS
              transition: `transform ${duration}s ease-out, background-color 0.1s ease-out`,
            }}
          />
        );
      })}
    </>
  );
};


export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <CustomCursor /> {/* The custom cursor that follows the mouse */}
      <Navbar /> {/* New Navbar component */}
      <main>
        <Hero />
        <About />
        <Photos />
        <Certificates />
        <Reflection />
        <Contact />
      </main>
    </div>
  );
}