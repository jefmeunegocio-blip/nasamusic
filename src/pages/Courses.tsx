import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Course, SchoolConfig } from '../types';
import { BookOpen, CheckCircle, Clock, Award, Shield, ArrowRight, Music, Zap, Layers, Play } from 'lucide-react';

interface CoursesProps {
  config: SchoolConfig;
  courses: Course[];
}

export default function Courses({ config, courses }: CoursesProps) {
  const [selectedTab, setSelectedTab] = useState<'violao' | 'guitarra' | 'all'>('all');

  const filteredCourses = selectedTab === 'all' 
    ? courses 
    : courses.filter(c => c.instrument === selectedTab);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${config.whatsapp.replace(/\D/g, '')}&text=Olá! Gostaria de agendar uma aula de violão/guitarra.`;

  return (
    <div className="relative pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
            Nossos Cursos
          </span>
          <h1 className="font-poppins font-black text-4xl sm:text-5xl text-white tracking-tight mt-2">
            Especializações por Instrumento
          </h1>
          <p className="text-neutral-400 mt-4 text-sm font-sans">
            Selecione o instrumento desejado e mergulhe em um plano curricular completo, do iniciante absoluto às técnicas de nível avançado.
          </p>
        </div>

        {/* Custom Tab Filters */}
        <div className="flex justify-center items-center space-x-2 mb-16 flex-wrap gap-y-2">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'violao', label: 'Violão' },
            { id: 'guitarra', label: 'Guitarra Elétrica' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as 'violao' | 'guitarra' | 'all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-poppins transition-all duration-300 ${
                selectedTab === tab.id
                  ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-md shadow-brand-accent/25'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Detailed Courses Listing */}
        <div className="space-y-24">
          {filteredCourses.map((course, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={course.id} 
                className={`flex flex-col lg:flex-row gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image & Decorative Cards */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
                  
                  <div className="relative rounded-3xl overflow-hidden border border-neutral-900 shadow-2xl h-[300px] sm:h-[400px] group">
                    <img 
                      src={course.image} 
                      alt={course.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <span className="absolute top-6 left-6 bg-brand-accent text-white font-mono text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full font-bold shadow-lg">
                      {course.level}
                    </span>
                  </div>
                </div>

                {/* Course Content Details */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex items-center space-x-2 text-brand-light font-mono text-xs font-semibold uppercase tracking-widest">
                    <Music className="h-4 w-4" />
                    <span>Módulo Completo</span>
                  </div>

                  <h2 className="font-poppins font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {course.name}
                  </h2>

                  <p className="text-neutral-300 font-sans text-sm leading-relaxed">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center space-x-2 text-xs text-neutral-400">
                      <Clock className="h-4 w-4 text-brand-light" />
                      <div>
                        <p className="font-semibold text-white leading-none">Duração Estimada</p>
                        <p className="mt-1 font-mono text-[10px]">{course.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-neutral-400">
                      <Award className="h-4 w-4 text-brand-light" />
                      <div>
                        <p className="font-semibold text-white leading-none">Certificação</p>
                        <p className="mt-1">Inclusa no Módulo Final</p>
                      </div>
                    </div>
                  </div>

                  <hr className="border-neutral-900" />

                  {/* Syllabus / Content Tree */}
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-white mb-4 flex items-center space-x-1.5">
                      <BookOpen className="h-4 w-4 text-brand-light" />
                      <span>O que você vai aprender na prática:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.contentList.map((item, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs text-neutral-400 leading-normal">
                          <CheckCircle className="h-3.5 w-3.5 text-brand-light shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                    <Link
                      to="/contato"
                      className="flex items-center justify-center space-x-1.5 w-full sm:w-auto bg-gradient-to-r from-brand-primary to-brand-accent text-white font-poppins font-bold text-xs px-6 py-3.5 rounded-full transition-transform duration-300 hover:scale-102"
                    >
                      <span>Quero uma Aula Experimental Grátis</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-1.5 w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-poppins font-bold text-xs px-6 py-3.5 rounded-full transition-transform duration-300 hover:scale-102"
                    >
                      <span>Tire dúvidas no WhatsApp</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* High quality credentials summary card */}
        <div className="mt-32 glass-panel border border-purple-500/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-purple-500/5 rounded-full blur-2xl" />
          <h3 className="font-poppins font-black text-xl sm:text-2xl text-white mb-4">
            Como funcionam as nossas aulas?
          </h3>
          <p className="text-neutral-400 font-sans text-sm max-w-3xl mx-auto leading-relaxed mb-8">
            Nossos encontros semanais ocorrem individualmente em salas com excelente isolamento acústico e equipadas com instrumentos de primeira linha. Fornecemos suporte completo via WhatsApp diretamente com seu professor para tirar dúvidas durante seus treinos diários em casa.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-4 bg-neutral-900/30 rounded-xl border border-neutral-800">
              <span className="font-montserrat font-black text-brand-light text-2xl">50 min</span>
              <p className="text-xs text-neutral-300 font-sans mt-1">Duração da aula prática individual semanal</p>
            </div>
            <div className="p-4 bg-neutral-900/30 rounded-xl border border-neutral-800">
              <span className="font-montserrat font-black text-brand-light text-2xl">100%</span>
              <p className="text-xs text-neutral-300 font-sans mt-1">Material de apoio digital gratuito incluso</p>
            </div>
            <div className="p-4 bg-neutral-900/30 rounded-xl border border-neutral-800">
              <span className="font-montserrat font-black text-brand-light text-2xl">Flexível</span>
              <p className="text-xs text-neutral-300 font-sans mt-1">Avisando com 24h, agende reposição de faltas</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
