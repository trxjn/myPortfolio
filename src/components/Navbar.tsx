import { useState } from 'react';
import { Menu, X } from 'lucide-react';

// Functions to dispatch custom cursor events
const dispatchHoverStart = () => window.dispatchEvent(new CustomEvent('cursor-hover-start'));
const dispatchHoverEnd = () => window.dispatchEvent(new CustomEvent('cursor-hover-end'));

const links = [
  { name: 'About', href: '#about' },
  { name: 'Photos', href: '#photos' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Reflections', href: '#reflections' },
  { name: 'Contact', href: '#contact' },
];

// Helper component for desktop navigation links
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    className="text-white hover:text-orange-500 transition-colors transform transition-transform duration-200 px-3 py-2 text-sm font-normal border-b-2 border-transparent hover:border-orange-500 hover:scale-[1.05]"
    onMouseEnter={dispatchHoverStart}
    onMouseLeave={dispatchHoverEnd}
  >
    {children}
  </a>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-40 bg-black/30 backdrop-blur-md border-b border-orange-500/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <a 
              href="#hero" 
              className="text-2xl font-bold tracking-wider text-orange-500"
              onMouseEnter={dispatchHoverStart}
              onMouseLeave={dispatchHoverEnd}
            >
              my.PORTFOLIO
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:space-x-4">
            {links.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition-colors"
              onMouseEnter={dispatchHoverStart}
              onMouseLeave={dispatchHoverEnd}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Kept dark for better readability) */}
      {isOpen && (
        <div className="md:hidden bg-[#2a2a2a] border-t border-gray-700 pb-2 shadow-xl">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              // Close menu on click
              onClick={() => setIsOpen(false)} 
              className="block px-4 py-2 text-base text-white hover:bg-[#3b3b3b] hover:text-orange-500 transition-colors transform transition-transform duration-200 hover:scale-[1.02]"
              onMouseEnter={dispatchHoverStart}
              onMouseLeave={dispatchHoverEnd}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}