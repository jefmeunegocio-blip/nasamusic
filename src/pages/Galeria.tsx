import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';

interface GalleryProps {
  gallery: GalleryItem[];
}

export default function Gallery({ gallery }: GalleryProps) {
  const [filter, setFilter] = useState<'all' | 'Aulas' | 'Apresentações' | 'Estúdio' | 'Alunos'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);

  const filteredItems = filter === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === filter);

  const handleOpenLightbox = (item: GalleryItem) => {
    // Find index in current filtered list for carousel
    const idx = filteredItems.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      setLightboxIndex(idx);
      setZoom(false);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    setZoom(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! === 0 ? filteredItems.length - 1 : prev! - 1));
      setZoom(false);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! === filteredItems.length - 1 ? 0 : prev! + 1));
      setZoom(false);
    }
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="relative pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
            Nossos Espaços & Momentos
          </span>
          <h1 className="font-poppins font-black text-4xl sm:text-5xl text-white tracking-tight mt-2">
            Galeria de Fotos
          </h1>
          <p className="text-neutral-400 mt-4 text-sm font-sans">
            Explore as dependências da nossa escola em Diadema, nossos recitais com alunos de todos os níveis e ensaios gerais com bandas profissionais de apoio.
          </p>
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'Aulas', label: 'Aulas Práticas' },
            { id: 'Apresentações', label: 'Recitais e Shows' },
            { id: 'Estúdio', label: 'Estúdio de Gravação' },
            { id: 'Alunos', label: 'Comunidade Alunos' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4.5 py-2 rounded-full text-xs font-bold font-poppins transition-all duration-300 ${
                (cat.id === 'all' && filter === 'all') || filter === cat.id
                  ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-md'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/10 rounded-2xl border border-neutral-900">
            <ImageIcon className="h-10 w-10 text-neutral-600 mx-auto mb-3" />
            <p className="text-sm text-neutral-500">Nenhum item adicionado nesta categoria ainda.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className="break-inside-avoid glass-panel border border-neutral-900 rounded-2xl overflow-hidden cursor-zoom-in relative group transition-all duration-300 hover:border-purple-500/25 shadow-lg"
              >
                <div className="relative overflow-hidden aspect-video sm:aspect-auto">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover max-h-[450px] transition-transform duration-700 group-hover:scale-103"
                  />
                  {/* Hover dark layer */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6" />
                  
                  {/* Hover elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-white shadow-md">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-left">
                    <span className="bg-brand-accent/90 text-white font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-full font-black">
                      {item.category}
                    </span>
                    <h3 className="font-poppins font-bold text-base text-white mt-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-neutral-300 font-sans mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIGHTBOX COMPONENT */}
        {currentItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 cursor-default animate-fade-in"
            onClick={handleCloseLightbox}
          >
            {/* Lightbox header controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
              <span className="font-mono text-xs text-neutral-400">
                Item {lightboxIndex! + 1} de {filteredItems.length}
              </span>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); setZoom(!zoom); }} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-300 hover:text-white"
                  title="Ampliar Imagem"
                >
                  {zoom ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                </button>
                <button 
                  onClick={handleCloseLightbox} 
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-300 hover:text-white"
                  title="Fechar"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Navigation Chevron Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 bg-neutral-900/50 hover:bg-neutral-800 rounded-full text-white z-10 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 p-3 bg-neutral-900/50 hover:bg-neutral-800 rounded-full text-white z-10 transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Main Interactive Image Frame */}
            <div 
              className="max-w-4xl max-h-[80vh] flex flex-col items-center justify-center relative select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentItem.url}
                alt={currentItem.title}
                className={`max-w-full max-h-[70vh] rounded-xl object-contain transition-transform duration-300 ${
                  zoom ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setZoom(!zoom)}
              />
              
              {/* Image label overlay */}
              <div className="mt-4 text-center text-white px-4">
                <span className="text-[10px] bg-brand-primary text-white font-mono px-2.5 py-0.5 rounded-full uppercase font-bold">
                  {currentItem.category}
                </span>
                <h3 className="font-poppins font-black text-lg text-white mt-1.5 leading-none">{currentItem.title}</h3>
                <p className="text-xs text-neutral-400 font-sans mt-1 max-w-xl">{currentItem.description}</p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
