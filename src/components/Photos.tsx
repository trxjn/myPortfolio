import { useState, useMemo, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react'; 
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const dispatchHoverStart = () => window.dispatchEvent(new CustomEvent('cursor-hover-start'));
const dispatchHoverEnd = () => window.dispatchEvent(new CustomEvent('cursor-hover-end'));

// The image data array remains the same
const galleryImages = [
    { src: '/assets/tour/img_1.jpg'},
    { src: '/assets/tour/img_2.jpg'},
    { src: '/assets/tour/img_3.jpg'},
    { src: '/assets/tour/img_4.jpg'},
    { src: '/assets/tour/img_5.jpg'},
    { src: '/assets/tour/img_6.jpg'},
    { src: '/assets/tour/img_7.jpg'},
    { src: '/assets/tour/img_8.jpg'},
    { src: '/assets/tour/img_13.jpg'},
    { src: '/assets/tour/img_14.jpg'},
    { src: '/assets/tour/img_11.jpg'},
    { src: '/assets/tour/img_12.jpg'},
    { src: '/assets/tour/img_15.jpg'},
    { src: '/assets/tour/img_16.jpg'},
    { src: '/assets/tour/img_9.jpg'},
    { src: '/assets/tour/img_10.jpg'},
    { src: '/assets/tour/img_17.jpg'},
    { src: '/assets/tour/img_18.jpg'},
    { src: '/assets/tour/img_19.jpg'},
];


export default function Photos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const ref = useScrollAnimation();

  // Unified navigation functions (used by carousel and modal)
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  }, []);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const currentPhoto = useMemo(() => galleryImages[currentIndex], [currentIndex]);

  // FIX: Explicitly typed 'event' as KeyboardEvent
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, goToPrevious, goToNext]);


  return (
    <>
      <section id="photos" className="py-20 px-6 bg-[#0a0a0a]">
        <div
          ref={ref}
          className="fade-in-scroll max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-normal text-white mb-4 text-center">
            Visual Diary
          </h2>

          <div className="w-16 h-1 bg-orange-500 mx-auto mb-16 rounded-full"></div>

          <div className="relative">
            {/* Photo Slider */}
            <div className="relative h-[400px] md:h-[600px] w-full mx-auto">
              
              {/* Image Container */}
              <div 
                onClick={openModal} 
                onMouseEnter={dispatchHoverStart}
                onMouseLeave={dispatchHoverEnd}
                className="group overflow-hidden relative h-full w-full rounded-xl transition-all duration-500 transform border border-gray-800 hover:border-orange-500 shadow-3xl hover:shadow-orange-500/50 cursor-pointer" 
              >
                <img
                  key={currentIndex}
                  src={currentPhoto.src}
                  alt={`Photo Entry ${currentIndex + 1}`}
                  className="w-full h-full object-cover block animate-fade-in group-hover:scale-[1.02] transition-transform duration-500" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply transition-opacity duration-300 group-hover:opacity-70"></div>
              </div>

              {/* Photo Caption */}
              <div className="absolute -bottom-10 left-0 right-0 p-4 text-white text-center">
                <p className="text-sm text-gray-400 font-mono tracking-wider">PHOTO {currentIndex + 1} / {galleryImages.length}</p>
              </div>
            </div>

            {/* Navigation Buttons*/}
            <button
              onClick={goToPrevious}
              onMouseEnter={dispatchHoverStart}
              onMouseLeave={dispatchHoverEnd}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white hover:bg-orange-500 hover:text-black flex items-center justify-center transition-all duration-300 rounded-r-full focus:outline-none focus:ring-2 focus:ring-orange-500 z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={goToNext}
              onMouseEnter={dispatchHoverStart}
              onMouseLeave={dispatchHoverEnd}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white hover:bg-orange-500 hover:text-black flex items-center justify-center transition-all duration-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-orange-500 z-20"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-16">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  onMouseEnter={dispatchHoverStart}
                  onMouseLeave={dispatchHoverEnd}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-6 h-2 bg-orange-500'
                      : 'w-2 h-2 bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`View photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Photo Modal / Lightbox Component */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-opacity duration-300" 
          onClick={closeModal} 
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen photo viewer"
        >
          {/* Image Container */}
          <div 
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={currentPhoto.src} 
              alt={`Zoomed Photo Entry ${currentIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg transition-transform duration-300 animate-zoom-in" 
            />
            <p className="text-center text-gray-300 mt-4 text-sm font-mono tracking-wider">
                PHOTO {currentIndex + 1} / {galleryImages.length}
            </p>

            <button
              onClick={goToPrevious}
              onMouseEnter={dispatchHoverStart}
              onMouseLeave={dispatchHoverEnd}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white hover:bg-orange-500 flex items-center justify-center transition-all duration-300 rounded-full z-30"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={goToNext}
              onMouseEnter={dispatchHoverStart}
              onMouseLeave={dispatchHoverEnd}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 text-white hover:bg-orange-500 flex items-center justify-center transition-all duration-300 rounded-full z-30"
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}