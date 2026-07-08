import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageSquare } from 'lucide-react';
import { SchoolConfig } from '../types';

interface FooterProps {
  config: SchoolConfig;
}

export default function Footer({ config }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-brand-dark border-t border-purple-950/40 pt-16 pb-8 text-neutral-300 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-40 w-[600px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Section 1: Logo & Slogan */}
          <div className="flex flex-col space-y-4">
            <Link to="/" onClick={handleScrollToTop} className="flex items-center space-x-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-primary to-brand-accent p-1 text-white shadow-md shadow-brand-accent/20 group-hover:scale-105 transition-transform duration-300">
                <Music className="h-5 w-5" />
              </div>
              <div>
                <span className="font-montserrat font-black text-xl tracking-wider text-white">
                  {config.logoName}
                </span>
                <p className="text-[9px] text-neutral-400 tracking-widest uppercase font-mono leading-none mt-0.5">
                  Nucleo de Artes
                </p>
              </div>
            </Link>
            <p className="text-sm text-neutral-400 font-sans leading-relaxed">
              {config.slogan}. Oferecendo um ambiente de excelência e acompanhamento individualizado para acelerar sua evolução.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={`https://api.whatsapp.com/send?phone=${config.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-green-400 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                title="Falar no WhatsApp"
              >
                <MessageSquare className="h-4.5 w-4.5 fill-current" />
              </a>
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-pink-400 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300"
                title="Seguir no Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
              <a
                href={config.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-blue-400 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                title="Curtir no Facebook"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href={config.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-500 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
                title="Inscrever-se no YouTube"
              >
                <Youtube className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-poppins">
              Navegação
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex flex-col space-y-2">
                <Link to="/" onClick={handleScrollToTop} className="hover:text-brand-light transition-colors">Home</Link>
                <Link to="/sobre" onClick={handleScrollToTop} className="hover:text-brand-light transition-colors">Sobre Nós</Link>
                <Link to="/cursos" onClick={handleScrollToTop} className="hover:text-brand-light transition-colors">Cursos</Link>
                <Link to="/metodologia" onClick={handleScrollToTop} className="hover:text-brand-light transition-colors">Metodologia</Link>
                <Link to="/professores" onClick={handleScrollToTop} className="hover:text-brand-light transition-colors">Professores</Link>
              </div>
              <div className="flex flex-col space-y-2">
                <Link to="/galeria" onClick={handleScrollToTop} className="hover:text-brand-light transition-colors">Galeria</Link>
                <Link to="/planos" onClick={handleScrollToTop} className="hover:text-brand-light transition-colors">Planos</Link>
                <Link to="/contato" onClick={handleScrollToTop} className="hover:text-brand-light transition-colors">Contato</Link>
              </div>
            </div>
          </div>

          {/* Section 3: Contact Details */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-poppins">
              Contato & Localização
            </h4>
            <div className="flex flex-col space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-5 w-5 text-brand-light shrink-0 mt-0.5" />
                <span className="text-neutral-400">{config.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-brand-light shrink-0" />
                <span className="text-neutral-400">{config.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-brand-light shrink-0" />
                <span className="text-neutral-400 truncate">{config.email}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Live Map Frame */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase font-poppins">
              Nosso Endereço
            </h4>
            <div className="h-32 w-full rounded-lg overflow-hidden border border-neutral-800 shadow-md relative group">
              <iframe
                title="NASA Localização"
                src={config.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              />
            </div>
            <p className="text-[11px] text-neutral-500 leading-normal">
              Localizados no bairro Serraria em Diadema, com fácil acesso para você estudar música.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <hr className="border-neutral-900 my-10" />
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 font-mono">
            <span>© {currentYear} {config.schoolName}. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/admin" onClick={handleScrollToTop} className="hover:text-white transition-colors">Gerenciamento</Link>
            <span>•</span>
            <span>Estúdio de Design Premium</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
