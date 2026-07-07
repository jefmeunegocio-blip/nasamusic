import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FloatingWhatsappProps {
  phone: string;
}

export default function FloatingWhatsapp({ phone }: FloatingWhatsappProps) {
  const formattedPhone = phone.replace(/\D/g, '');
  const url = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=Ol%C3%A1%21+Gostaria+de+saber+mais+informa%C3%A7%C3%B5es+sobre+as+aulas+de+viol%C3%A3o+e+guitarra+do+N%C3%BAcleo+de+Artes+Sabino.`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 active:scale-95 duration-300 group"
      id="floating-whatsapp"
      title="Falar no WhatsApp"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 duration-1000"></span>
      <MessageSquare className="relative h-6 w-6 fill-current" />
      
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 rounded-lg bg-[#161616] px-3 py-1.5 text-xs font-medium text-white transition-all group-hover:scale-100 shadow-md border border-neutral-800 whitespace-nowrap">
        Agende sua Aula Experimental!
      </span>
    </a>
  );
}
