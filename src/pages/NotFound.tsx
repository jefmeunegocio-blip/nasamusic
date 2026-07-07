import React from 'react';
import { Link } from 'react-router-dom';
import { Music, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-36 pb-24 px-4 flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
      <div className="h-16 w-16 bg-purple-950/40 border border-purple-500/20 text-brand-light rounded-full flex items-center justify-center animate-bounce">
        <Music className="h-8 w-8" />
      </div>
      
      <div className="space-y-2">
        <h1 className="font-poppins font-black text-4xl sm:text-5xl text-white">404 - Fora de Tom!</h1>
        <p className="text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
          O link ou a página musical que você tentou acessar está temporariamente fora do ar ou não existe mais.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white px-6 py-3.5 rounded-full font-poppins font-black text-xs hover:scale-102 transition-transform duration-300 shadow-md shadow-brand-accent/25"
      >
        <span>Voltar à Página Principal</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
