import React from 'react';
import { Teacher } from '../types';
import { Award, Music, CheckCircle, Clock } from 'lucide-react';

interface TeachersProps {
  teachers: Teacher[];
}

export default function Teachers({ teachers }: TeachersProps) {
  return (
    <div className="relative pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
            Nossos Mentores
          </span>
          <h1 className="font-poppins font-black text-4xl sm:text-5xl text-white tracking-tight mt-2">
            Professores Especialistas
          </h1>
          <p className="text-neutral-400 mt-4 text-sm font-sans">
            Aprenda com quem vive e respira música diariamente. Nossos mentores combinam excelência acadêmica com anos de experiência prática de palco e produção em estúdio.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {teachers.map((teacher) => (
            <div 
              key={teacher.id}
              className="glass-panel rounded-3xl overflow-hidden border border-neutral-900 flex flex-col justify-between h-full group transition-all duration-300 hover:border-purple-500/15"
            >
              <div>
                {/* Visual Header / Portrait */}
                <div className="h-80 sm:h-[480px] relative overflow-hidden">
                  <img 
                    src={teacher.image || null} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
                  />
                  {/* Subtle fade shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-transparent to-transparent" />
                  
                  {/* Absolute Badge */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-brand-light font-bold uppercase tracking-wider">
                        {teacher.role}
                      </span>
                      <h2 className="font-poppins font-black text-xl sm:text-2xl text-white mt-1">
                        {teacher.name}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Biography details */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h4 className="font-poppins font-bold text-xs text-brand-light uppercase tracking-widest mb-2 font-mono">
                      Biografia & Trajetória
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                      {teacher.bio}
                    </p>
                  </div>

                  <hr className="border-neutral-900" />

                  {/* Specialties checklist */}
                  <div>
                    <h4 className="font-poppins font-bold text-xs text-white uppercase tracking-widest mb-3.5 flex items-center space-x-1.5 font-mono">
                      <Award className="h-4 w-4 text-brand-light" />
                      <span>Especialidades de Ensino:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {teacher.specialties.map((spec, i) => (
                        <div key={i} className="flex items-center space-x-2 text-xs text-neutral-400">
                          <CheckCircle className="h-3.5 w-3.5 text-brand-light shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Card Footer credentials */}
              <div className="bg-neutral-900/30 px-6 sm:px-8 py-5 border-t border-neutral-900 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Horários Flexíveis</span>
                </div>
                <div className="flex items-center">
                  <Music className="h-3.5 w-3.5 mr-1" />
                  <span>Método Exclusivo NASA</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
