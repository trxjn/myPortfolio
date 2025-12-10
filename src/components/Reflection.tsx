import { BookOpen, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const dispatchHoverStart = () => window.dispatchEvent(new CustomEvent('cursor-hover-start'));
const dispatchHoverEnd = () => window.dispatchEvent(new CustomEvent('cursor-hover-end'));

// Slideshow duration in milliseconds (6 seconds)
const SLIDE_DURATION = 6000;

// Static array for the photo gallery
const galleryImages = [
    { src: '/assets/reflection/ref.jpg', alt: 'Journal Front Page' },
    { src: '/assets/reflection/ref_1.jpg', alt: 'Journal Educational Tour Schedule' },
    { src: '/assets/reflection/ref_2.jpg', alt: 'Worldtech Information Solutions Inc. Visit' },
    { src: '/assets/reflection/ref_3.jpg', alt: 'RIVAN IT Cebu Visit' },
    { src: '/assets/reflection/ref_4.jpg', alt: 'CODECHUM Visit' },
    { src: '/assets/reflection/ref_5.jpg', alt: 'MATA TECHNOLOGIES, INC. Visit' },
    { src: '/assets/reflection/ref_6.jpg', alt: 'TARSIER 117 Visit' },
    { src: '/assets/reflection/ref_7.jpg', alt: 'Journal Educational Overall Experience' },
];

// --- FadingImage Component (NEW: Handles the smooth transition) ---
const FadingImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [isVisible, setIsVisible] = useState(false);

    // This effect runs whenever the component mounts (due to key change) or src changes
    useEffect(() => {
        // 1. Start with opacity-0
        setIsVisible(false); 
        
        // 2. Use a small timeout (e.g., 50ms) to allow the browser to register the opacity-0 state
        // before transitioning to opacity-100. This is the key to triggering the fade.
        const timer = setTimeout(() => {
            setIsVisible(true); // Triggers transition to opacity-100
        }, 200);

        // Clean up timeout
        return () => clearTimeout(timer);
    }, [src]);

    return (
        <img
            src={src}
            alt={alt}
            // Transition class is the important part here
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        />
    );
};
// -----------------------------------------------------------------

// --- ImageModal Component (Unchanged) ---
const ImageModal: React.FC<{ image: typeof galleryImages[0]; onClose: () => void }> = ({ image, onClose }) => {
    
    // Lock scroll on mount, unlock on unmount
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    
    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        // Backdrop with fade animation
        <div className="fixed inset-0 bg-black bg-opacity-90 z-[100] transition-opacity duration-300 ease-in-out">
            {/* Backdrop click area to close modal */}
            <div 
                className="absolute inset-0" 
                onClick={onClose} 
            />

            {/* Image Container with scale and fade animation */}
            <div className="absolute inset-0 flex items-center justify-center p-4 lg:p-12">
                <div 
                    // Animation classes: Starts small and opaque, transitions to full size and visible
                    className="relative max-w-full max-h-full flex flex-col items-center justify-center
                                transition-all duration-500 transform scale-90 opacity-0 data-[open=true]:scale-100 data-[open=true]:opacity-100"
                    data-open={true}
                >
                    <img
                        src={image.src}
                        alt={image.alt}
                        // max-h is set to 85vh to prevent caption cutoff
                        className="max-w-full max-h-[85vh] object-contain shadow-2xl border-4 border-white"
                        // Stop propagation prevents clicking the image itself from closing the modal
                        onClick={(e) => e.stopPropagation()} 
                    />
                    {/* Caption: Uses re-added alt text */}
                    <div className="text-white text-center mt-4 text-lg font-light text-shadow-md max-w-full px-2">
                        {image.alt}
                    </div> 
                </div>
            </div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white p-2 border border-white hover:bg-orange-500 hover:text-black transition-colors z-[110]"
                aria-label="Close modal"
                onMouseEnter={dispatchHoverStart}
                onMouseLeave={dispatchHoverEnd}
            >
                <X size={28} />
            </button>
        </div>
    );
};

// --- Reflection Component ---
export default function Reflection() {
    const ref = useScrollAnimation();
    const [currentIndex, setCurrentIndex] = useState(0); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const imageCount = galleryImages.length;
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Navigation Functions
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === imageCount - 1 ? 0 : prevIndex + 1));
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageCount - 1 : prevIndex - 1));
    };

    // --- EFFECT: Auto-play functionality ---
    useEffect(() => {
        const interval = setInterval(() => {
            // Automatically advance to the next image
            setCurrentIndex((prevIndex) => (prevIndex === imageCount - 1 ? 0 : prevIndex + 1));
        }, SLIDE_DURATION);

        return () => clearInterval(interval);
    }, [imageCount]); 
    
    const currentImage = useMemo(() => galleryImages[currentIndex], [currentIndex]);

    return (
        <section id="reflections" className="py-20 px-6 bg-[#2a2a2a]">
            <div
                ref={ref}
                className="fade-in-scroll max-w-6xl mx-auto"
            >
                {/* --- Title Block (Centered) --- */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-16 h-16 border-2 border-orange-500 flex items-center justify-center">
                            <BookOpen className="text-orange-500" size={32} />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-normal text-white mb-4">
                        Reflections & Learnings
                    </h2>
                    <div className="w-24 h-0.5 bg-orange-500 mx-auto"></div>
                </div>
                
                {/* --- Main Content: Grid Layout (Text + Gallery) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* 1. REFLECTION TEXT */}
                    <div className="lg:col-span-2">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <p className="text-gray-300 leading-loose text-base text-justify scroll-stagger-1">
                                    My recent educational tour to Cebu and Bohol was an invaluable bridge between classroom theory and real-world IT practice.
                                    Visiting companies like Worldtech Information Solutions Inc. and RIVAN IT Cebu provided firsthand exposure to software development lifecycles, enterprise solutions,
                                    and the high standards of professionalism required in the tech industry.
                                </p>
                                <p className="text-gray-300 leading-loose text-base text-justify scroll-stagger-2">
                                    The experience underscored the industry's diversity. At CODECHUM, I observed the innovative use of gamification in educational technology,
                                    while MATA TECHNOLOGIES, INC. showcased the complexity of developing robust, large-scale systems for enterprise clients. 
                                    This reinforced my interest in developing versatile, user-centric solutions.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <p className="text-gray-300 leading-loose text-base text-justify scroll-stagger-3">
                                    A key insight gained was the pervasive role of technology, even in non-traditional IT settings. 
                                    The visit to TARSIER 117 demonstrated how modern systems and data analytics are crucial for public safety and disaster response.
                                    It highlighted the responsibility developers have in building reliable, life-saving applications.
                                </p>
                                <p className="text-gray-300 leading-loose text-base text-justify scroll-stagger-4">
                                    This immersion trip solidified my commitment to discovering different opportunities in the IT industry.
                                    Seeing how these tools are applied in production environments motivates me to focus on what I truly want and experience in this field.
                                    The journey was a powerful reminder that continuous learning is essential in this rapidly evolving field.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 2. RIGHT GALLERY */}
                    <div className="lg:col-span-1 mt-8 lg:mt-0">
                        <h3 className="text-2xl font-medium text-white mb-6 border-b border-gray-700 pb-2">
                            Visual Insights
                        </h3>
                        
                        <div 
                            className="relative overflow-hidden aspect-[3/4] cursor-pointer 
                                        bg-[#333333] shadow-xl rounded-lg
                                        transition-all duration-300 
                                        hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-1"
                            onMouseEnter={dispatchHoverStart}
                            onMouseLeave={dispatchHoverEnd}
                            onClick={openModal} 
                        >
                            <FadingImage 
                                key={currentImage.src}
                                src={currentImage.src}
                                alt={currentImage.alt}
                            />

                            {/* Left Navigation Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-70 text-white hover:bg-orange-500 transition-colors z-10 rounded"
                                aria-label="Previous image"
                                onMouseEnter={dispatchHoverStart}
                                onMouseLeave={dispatchHoverEnd}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {/* Right Navigation Button  */}
                            <button
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-70 text-white hover:bg-orange-500 transition-colors z-10 rounded"
                                aria-label="Next image"
                                onMouseEnter={dispatchHoverStart}
                                onMouseLeave={dispatchHoverEnd}
                            >
                                <ChevronRight size={24} />
                            </button>
                            
                            {/* Image Counter */}
                            <div className="absolute bottom-2 right-2 px-3 py-1 bg-black bg-opacity-70 text-xs text-white z-10 rounded">
                                {currentIndex + 1} / {imageCount}
                            </div>
                        </div>
                        {/* ---------------------------------------------------- */}
                    </div>
                </div>
            </div>
            
            {/* --- Render Modal --- */}
            {isModalOpen && <ImageModal image={currentImage} onClose={closeModal} />}
        </section>
    );
}