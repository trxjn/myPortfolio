import { useEffect, useRef } from 'react';

// NOTE: We changed the class from 'visible' to 'is-visible' to match the CSS: .fade-in-scroll.is-visible
const VISIBLE_CLASS = 'is-visible'; 

/**
 * Custom hook to observe an element and apply the 'is-visible' class
 * when it enters the viewport, triggering the CSS fade-in animation.
 * * @param threshold The percentage of visibility needed to trigger the animation (default: 0.1 or 10%).
 * @returns A ref object to be attached to the element to be observed.
 */
export function useScrollAnimation(threshold: number = 0.1) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // ADDED: The correct class name 'is-visible'
          entry.target.classList.add(VISIBLE_CLASS);
          
          // Stop observing after the element has become visible
          observer.unobserve(entry.target); 
        }
      },
      // Using the threshold passed to the hook (defaults to 0.1)
      { threshold: threshold } 
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup function runs when the component unmounts
    return () => {
      // Ensure the observer is disconnected
      observer.disconnect();
    };
  }, [threshold]); // Re-run effect if threshold changes

  return elementRef;
}