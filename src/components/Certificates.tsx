import { Award, ExternalLink, X } from 'lucide-react'; 
import { useState } from 'react'; 
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const dispatchHoverStart = () => window.dispatchEvent(new CustomEvent('cursor-hover-start'));
const dispatchHoverEnd = () => window.dispatchEvent(new CustomEvent('cursor-hover-end'));

const certificates = [
  // certificate array
  {
    title: 'Microsoft Office Specialist: Excel 2019 Associate',
    issuer: 'Certiport / Microsoft',
    date: 'September 2023',
    link: 'https://www.credly.com/badges/d1486533-c4eb-431e-9c69-faba864fb192',
    image: '/assets/MOS_Excel.png', 
  },
  {
    title: 'Educational Tour (Certificate of Completion)', 
    issuer: 'World of Adventures Travel and Tours',
    date: 'November 2025',
    image: '/assets/WA_cert.jpg', 
  },
  {
    title: 'Introduction to Data Science in Python',
    issuer: 'Coursera / University of Michigan',
    date: 'November 2023',
    image: '/assets/UM_cert.jpeg', 
    link: 'https://coursera.org/share/1a159826c17cdf18e1196f1057cdbead', 
  },
  {
    title: 'Python for AI Projects: From Data Exploration to Impact',
    issuer: 'Linkedin Learning',
    date: 'December 2025',
    image:'/assets/PY_cert.jpeg',
    link: 'https://www.linkedin.com/learning/certificates/d2869731da8f19787bde31f7c0645a7d30ac4d6b7947a88c4df623783e820256?trk=share_certificate',
  },
  {
    title: 'Google Analytics Certification',
    issuer: 'Google',
    image: '/assets/G_cert.jpeg',
    link: 'https://skillshop.credential.net/d354207c-53de-4828-9ac6-d6a53a52f44f#acc.rL5QDMU3',
    date: 'December 2025',
  },
  {
    title: 'Fundamentals of Java Programming',
    issuer: 'Coursera / Board Infinity',
    image: '/assets/J_cert.jpeg',
    link: 'https://coursera.org/share/e39890c556040d99905c4cd8078e2ea5',
    date: 'March 2024',
  },
];

// modal component for image zoom
const ImageModal: React.FC<{ image: string; onClose: () => void }> = ({ image, onClose }) => {
    return (
        // modal overlay
        <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 transition-opacity duration-300" 
            onClick={onClose}
        >
            {/* Modal Content Container */}
            <div 
                className="relative max-w-5xl max-h-[90vh] w-full" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* close button */}
                <button 
                    onClick={onClose} 
                    className="absolute -top-10 right-0 text-white hover:text-orange-500 transition-colors z-50 p-2"
                    aria-label="Close image viewer"
                >
                    <X size={32} />
                </button>
                
                {/* zoom */}
                <img 
                    src={image} 
                    alt="Certificate Zoom View" 
                    className="w-full h-full object-contain shadow-2xl animate-fade-in" 
                    style={{ maxHeight: '90vh' }}
                />
            </div>
        </div>
    );
};


// determine the link text
const getLinkText = (cert: typeof certificates[0]) => {
    if (cert.issuer.includes('Certiport') || cert.link?.includes('credly')) {
        return 'View Credly Badge';
    }
    return 'View Certificate Online';
};


export default function Certificates() {
  const ref = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imagePath: string | undefined) => {
    if (imagePath) {
      setSelectedImage(imagePath);
    }
  };

  return (
    <section id="certificates" className="py-20 px-6 bg-[#1a1a1a]">
      <div
        ref={ref}
        className="fade-in-scroll max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-normal text-white mb-4 text-center">
          Certificates & Achievements
        </h2>

        {/* Accent line (Orange) */}
        <div className="w-24 h-0.5 bg-orange-500 mx-auto mb-16"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => {
            // determine which certificates can be viewed via the internal ImageModal button
            // Note: 'Educational Tour' is the only one without a link, so its button should open the modal.
            const isModalViewableCert = cert.title === 'Educational Tour (Certificate of Completion)';
            const hasImage = !!cert.image;
            const hasLink = !!cert.link;
            
            // Get the appropriate link text
            const linkText = getLinkText(cert);

            return (
              <div
                key={index}
                className={`scroll-stagger-${(index % 3) + 1}`}
              >
                <div
                  className="p-6 bg-[#2a2a2a] group border-l-4 border-red-400 border-t border-r border-b border-gray-700 hover:bg-[#303030] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                  onMouseEnter={dispatchHoverStart}
                  onMouseLeave={dispatchHoverEnd}
                >
                  
                  {/* --- Image/Icon Container (Top) --- */}
                  <div className="h-16 flex items-center justify-start mb-4">
                    {hasImage ? (
                      <img
                        // image is static and not clickable
                        src={cert.image}
                        alt={cert.title}
                        className={`max-h-full max-w-full object-contain transition-transform duration-300`} 
                      />
                    ) : (
                      // placeholder icon (Orange accent)
                      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#1a1a1a] border border-orange-500">
                        <Award className="text-orange-500" size={24} />
                      </div>
                    )}
                  </div>

                  {/* content details */}
                  <div className="flex-grow text-left">
                    <div className="space-y-1 text-xs text-gray-500 mb-2">
                      <p>{cert.date}</p>
                      <p className='font-light italic'>{cert.issuer}</p>
                    </div>

                    <h3 className="text-xl font-medium text-white mb-4">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Link/View Image Button Section */}
                  
                  {/* 1. external link (certiport, coursera, google etc.) */}
                  {hasLink && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-red-400 transition-colors mt-auto"
                      onMouseEnter={dispatchHoverStart}
                      onMouseLeave={dispatchHoverEnd}
                    >
                      {linkText}
                      <ExternalLink size={16} />
                    </a>
                  )}

                  {/* 2. View Image Button (for 'Educational Tour' only, which don't have external link) */}
                  {isModalViewableCert && hasImage && !hasLink && (
                    <a
                      onClick={(e) => {
                        e.preventDefault(); 
                        handleImageClick(cert.image);
                      }}
                      className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-red-400 transition-colors mt-auto cursor-pointer"
                      onMouseEnter={dispatchHoverStart}
                      onMouseLeave={dispatchHoverEnd}
                    >
                      View Image
                      <ExternalLink size={16} />
                    </a>
                  )}
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* RENDER MODAL: Only show if an image has been selected */}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </section>
  );
}