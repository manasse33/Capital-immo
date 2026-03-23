import { useState, useEffect } from 'react';
import { Menu, X, Phone, Home, Building, Users, Briefcase, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Accueil', icon: Home },
  { path: '/biens', label: 'Nos biens', icon: Building },
  { path: '/a-propos', label: 'À propos', icon: Users },
  { path: '/services', label: 'Services', icon: Briefcase },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0D354E]/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#7A9E9F] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-script text-xl text-white leading-none">Capital</span>
              <span className="text-xs text-[#7A9E9F] font-semibold tracking-wider">IMMO GROUP</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  location.pathname === link.path
                    ? 'text-[#7A9E9F]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#7A9E9F] transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+242044113436"
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+242 04 411 3436</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-[#7A9E9F] text-white text-sm font-semibold rounded-lg hover:bg-[#7A9E9F]/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Nous contacter
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0D354E]/98 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
                location.pathname === link.path
                  ? 'bg-[#7A9E9F]/20 text-[#7A9E9F]'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            <a
              href="tel:+242044113436"
              className="flex items-center gap-3 py-3 px-4 text-white/80"
            >
              <Phone className="w-5 h-5" />
              <span>+242 04 411 3436</span>
            </a>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 mt-4 py-3 px-4 bg-[#7A9E9F] text-white font-semibold rounded-lg"
            >
              <Mail className="w-5 h-5" />
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
