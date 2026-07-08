import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Music, User, Settings, LogOut, MessageSquare } from 'lucide-react';
import { SchoolConfig } from '../types';

interface NavbarProps {
  config: SchoolConfig;
}

export default function Navbar({ config }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isStudentLogged = localStorage.getItem('nasa_student_logged') === 'true';
  const isAdminLogged = localStorage.getItem('nasa_admin_logged') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Cursos', path: '/cursos' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Metodologia', path: '/metodologia' },
    { name: 'Professores', path: '/professores' },
    { name: 'Galeria', path: '/galeria' },
    { name: 'Planos', path: '/planos' },
    { name: 'Contato', path: '/contato' },
  ];

  const handleLogout = (type: 'student' | 'admin') => {
    if (type === 'student') {
      localStorage.removeItem('nasa_student_logged');
    } else {
      localStorage.removeItem('nasa_admin_logged');
    }
    navigate('/');
    window.dispatchEvent(new Event('storage')); // trigger updates in other files
  };

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${config.whatsapp}&text=Olá! Gostaria de agendar uma aula experimental de música.`;

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 border-b border-purple-900/30 backdrop-blur-md py-3 shadow-lg shadow-black/40' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 sm:space-x-2 shrink-0 group">
            <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-primary to-brand-accent p-1 text-white shadow-md shadow-brand-accent/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Music className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <span className="block font-montserrat font-black text-xs min-[360px]:text-sm sm:text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-brand-light truncate max-w-[95px] min-[360px]:max-w-[140px] sm:max-w-none">
                {config.logoName}
              </span>
              <p className="text-[7.5px] sm:text-[9px] text-neutral-400 tracking-widest uppercase font-mono leading-none mt-0.5">
                Nucleo de Artes
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-xs font-medium font-poppins transition-all duration-200 ${
                    isActive
                      ? 'text-brand-light bg-brand-primary/10 border-b-2 border-brand-accent'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTAs / User Panel */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Admin Panel Link */}
            {isAdminLogged ? (
              <div className="flex items-center space-x-1">
                <Link
                  to="/admin"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/40 text-xs font-semibold text-neutral-200 hover:bg-purple-900/40 transition-colors shadow-md shadow-purple-950/50"
                >
                  <Settings className="h-3.5 w-3.5 text-brand-primary animate-spin-slow" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => handleLogout('admin')}
                  title="Sair do Admin"
                  className="p-1.5 rounded-md hover:bg-red-950/20 text-neutral-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-purple-900/40 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-purple-950/20 hover:border-purple-500/50 transition-all duration-300 shadow-md"
                title="Acesso ao Painel Admin"
              >
                <Settings className="h-3.5 w-3.5 text-brand-primary" />
                <span>Dashboard</span>
              </Link>
            )}

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white px-4 py-2 rounded-full text-xs font-bold font-poppins shadow-md hover:shadow-brand-accent/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquare className="h-3.5 w-3.5 fill-current" />
              <span>Agendar Aula</span>
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center space-x-4 sm:space-x-5 shrink-0">
            <Link
              to="/admin"
              className="flex items-center space-x-1 bg-zinc-900 border border-purple-900/40 text-neutral-300 p-2 sm:px-2.5 sm:py-1.5 rounded-full hover:text-white shrink-0"
              title="Painel Admin"
            >
              <Settings className="h-3.5 w-3.5 text-brand-primary animate-spin-slow" />
              <span className="hidden sm:inline text-xs font-semibold">Dashboard</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors shrink-0"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-purple-950/40 py-4 px-4 space-y-3 shadow-2xl animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-semibold font-poppins ${
                    isActive
                      ? 'text-brand-light bg-brand-primary/15'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <hr className="border-neutral-800" />

          <div className="space-y-2 pt-2 px-3">
            {/* Admin Login */}
            {isAdminLogged ? (
              <div className="flex items-center justify-between">
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 text-neutral-200 text-sm font-semibold"
                >
                  <Settings className="h-4 w-4 text-brand-accent" />
                  <span>Painel Administrativo</span>
                </Link>
                <button
                  onClick={() => handleLogout('admin')}
                  className="text-xs text-red-400 font-semibold"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="flex items-center space-x-2 text-neutral-400 hover:text-neutral-200 text-sm font-medium"
              >
                <Settings className="h-4 w-4" />
                <span>Acesso do Administrador</span>
              </Link>
            )}

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white py-3 rounded-full text-sm font-bold font-poppins"
              >
                <MessageSquare className="h-4 w-4 fill-current" />
                <span>Agendar Aula Experimental</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
