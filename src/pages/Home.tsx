import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, CheckCircle, MessageSquare, Play, Calendar, Star, ShieldCheck, 
  Award, BookOpen, Clock, Users, Coffee, Globe, Compass, Music, Disc, Guitar,
  Layers, Volume2, Key, ListMusic, Eye, Zap, Flame, Radio, Award as Medal, Sparkles
} from 'lucide-react';
import { Course, Plan, SchoolConfig, Teacher, GalleryItem, BlogPost } from '../types';

interface HomeProps {
  config: SchoolConfig;
  courses: Course[];
  plans: Plan[];
  teachers: Teacher[];
  gallery: GalleryItem[];
  blogPosts: BlogPost[];
}

export default function Home({ config, courses, plans, teachers, gallery, blogPosts }: HomeProps) {
  // Testimonials state
  const testimonials = [
    {
      name: "Mariana Silva",
      role: "Aluna de Violão (Iniciante)",
      text: "Comecei do zero absoluto há 4 meses. O método do Prof. Sabino é sensacional. Na primeira aula já sai tocando uma base de MPB simplificada! Hoje já toco mais de 10 músicas completas e entendo a estrutura de cada acorde.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Thiago Mendes",
      role: "Aluno de Guitarra (Avançado)",
      text: "Eu já tocava há anos, mas sentia que meus solos eram repetitivos e travavam no improviso. O Diego me ensinou sobre Modos Gregos e palhetada alternada de uma forma que destravou meu som. Minha velocidade e fluidez mudaram completamente.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    },
    {
      name: "Rodrigo Almeida",
      role: "Aluno de Violão Fingerstyle",
      text: "A estrutura física da escola em Diadema é fantástica, com ótimos instrumentos disponíveis. Mas o diferencial é o acompanhamento pedagógico. O plano de treino semanal cabe perfeitamente na minha rotina corrida de trabalho.",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const learningGrid = [
    { title: "Harmonia", desc: "Estruturas, acordes e tensões harmônicas avançadas.", icon: Key },
    { title: "Escalas", desc: "Pentatônica, Escala Maior, Menor e os Modos Gregos.", icon: Compass },
    { title: "Improvisação", desc: "Solos espontâneos, feeling e fluidez melódica.", icon: Flame },
    { title: "Campo Harmônico", desc: "Domine as famílias de acordes e tire músicas de ouvido.", icon: Layers },
    { title: "Leitura Musical", desc: "Cifras, tablaturas e partituras descomplicadas.", icon: BookOpen },
    { title: "Percepção", desc: "Identifique intervalos, acordes e ritmos pelo som.", icon: Eye },
    { title: "Repertório", desc: "Estudo prático focado nas suas músicas favoritas.", icon: ListMusic },
    { title: "Dedilhado", desc: "Padrões clássicos e modernos de independência dos dedos.", icon: Disc },
    { title: "Palhetada", desc: "Palhetada alternada, sweep picking, e precisão rítmica.", icon: Volume2 },
    { title: "Técnica Avançada", desc: "Tapping, bends, ligados, vibratos e sweep.", icon: Zap },
    { title: "Solo", desc: "Construção de solos épicos com começo, meio e fim.", icon: Radio },
    { title: "Composição", desc: "Regras de criação para compor suas próprias obras.", icon: Music },
    { title: "Fingerstyle", desc: "Melodia, harmonia e percussão no violão solo.", icon: Guitar },
    { title: "Treino Auditivo", desc: "Agilize seu ouvido para reproduzir ideias de imediato.", icon: HeadphoneIcon },
    { title: "Performance", desc: "Presença de palco, expressão e controle do nervosismo.", icon: Medal }
  ];

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${config.whatsapp.replace(/\D/g, '')}&text=Olá! Gostaria de agendar uma aula experimental de música.`;

  return (
    <div className="relative pt-16 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
        {/* Background photo overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('${config.heroImage || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1600'}')` 
          }}
        />
        {/* Dark radial overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-[#050505]/40" />
        
        {/* Purple ambient glow */}
        <div className="absolute -top-40 left-1/4 h-[400px] w-[400px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-accent/20 px-3 py-1.5 rounded-full mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            <span className="text-[11px] font-mono tracking-widest text-brand-light uppercase font-semibold">
              Matrículas Abertas • Diadema / Online
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-poppins font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] text-white"
          >
            {config.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 font-sans max-w-3xl mx-auto leading-relaxed"
          >
            {config.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <Link
              to="/contato"
              className="flex items-center space-x-2 w-full sm:w-auto justify-center bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-accent hover:to-purple-500 text-white font-poppins font-bold px-8 py-4 rounded-full shadow-lg shadow-brand-accent/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <Calendar className="h-4 w-4" />
              <span>Agendar Aula Experimental</span>
            </Link>
            
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 w-full sm:w-auto justify-center bg-[#161616] hover:bg-neutral-800 border border-neutral-800 hover:border-purple-500/30 text-white font-poppins font-bold px-8 py-4 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <MessageSquare className="h-4 w-4 text-green-400 fill-current" />
              <span>Falar no WhatsApp</span>
            </a>
          </motion.div>

          {/* Quiz Callout Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <Link
              to="/quiz"
              className="inline-flex items-center space-x-2 bg-purple-950/40 hover:bg-purple-950/60 border border-purple-500/25 px-5 py-2.5 rounded-full text-xs font-semibold text-brand-light transition-all duration-300 hover:scale-103 shadow-md shadow-purple-500/5"
            >
              <Sparkles className="h-4 w-4 animate-pulse text-brand-light" />
              <span>Dúvida sobre qual instrumento ou curso escolher? Faça nosso Quiz de Orientação →</span>
            </Link>
          </motion.div>

          {/* Quick core bullets list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 border-t border-neutral-900 pt-8"
          >
            <p className="text-xs text-neutral-400 font-mono tracking-widest uppercase mb-4">
              O que você vai dominar conosco:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-300">
              {['Harmonia', 'Escalas', 'Improvisação', 'Técnica', 'Repertório', 'Percepção', 'Leitura'].map((item) => (
                <div key={item} className="flex items-center space-x-1.5 font-sans">
                  <CheckCircle className="h-3.5 w-3.5 text-brand-light" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 opacity-60">
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-neutral-800 p-1 flex justify-center">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="h-2 w-1.5 rounded-full bg-brand-light"
            />
          </div>
        </div>
      </section>

      {/* 2. DIFERENCIAIS SECTION */}
      <section className="py-24 bg-brand-dark relative px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
              Por que escolher a NASA?
            </span>
            <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight mt-2">
              Diferenciais que aceleram sua evolução
            </h2>
            <p className="text-neutral-400 mt-4 text-sm font-sans">
              Esqueça métodos engessados ou apostilas genéricas de banca. Criamos uma experiência completa de aprendizagem artística de alto padrão.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Método Exclusivo",
                desc: "Estrutura unindo teoria prática e percepção auditiva desde a primeira aula para você aprender sem sofrimento.",
                icon: Award,
              },
              {
                title: "Professor Experiente",
                desc: "Profissional formado com mais de 20 anos de bagagem didática e performance prática nos palcos.",
                icon: ShieldCheck,
              },
              {
                title: "Aulas Presenciais",
                desc: "Estúdio climatizado, isolamento acústico refinado e excelentes instrumentos disponíveis em Diadema.",
                icon: Music,
              },
              {
                title: "Suporte Individual",
                desc: "Cada aluno possui seu próprio cronograma de estudos e suporte direto no WhatsApp para tirar dúvidas.",
                icon: Users,
              },
              {
                title: "Aulas Online de Apoio",
                desc: "Mantenha o ritmo mesmo viajando através da nossa sala virtual e Área de Aluno com vídeos gravados.",
                icon: Globe,
              },
              {
                title: "Material Didático Premium",
                desc: "Acesso a PDFs exclusivos, tablaturas diagramadas, cifras personalizadas e faixas de áudio play-along.",
                icon: BookOpen,
              },
              {
                title: "Certificado de Conclusão",
                desc: "Ao finalizar os módulos fundamentais e avançados, receba um certificado chancelando sua proficiência.",
                icon: Medal,
              },
              {
                title: "Ambiente Acolhedor",
                desc: "Muito mais que uma sala fria: café expresso quentinho, água gelada e muita conversa boa sobre música.",
                icon: Coffee,
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="glass-panel glass-panel-hover p-6 rounded-2xl transition-all duration-300 flex flex-col space-y-3"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-950/45 border border-purple-500/20 text-brand-light mb-1">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-poppins font-bold text-base text-white">{item.title}</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CURSOS PREVIEW */}
      <section className="py-24 bg-gradient-to-b from-brand-dark to-brand-gray relative px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
                Explore Nossos Programas
              </span>
              <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight mt-2">
                Cursos de Especialização Prática
              </h2>
              <p className="text-neutral-400 mt-4 text-sm font-sans">
                Seja qual for a sua escolha, violão clássico de náilon, violão folk de aço ou o peso e timbre da guitarra elétrica, temos o cronograma perfeito para você.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Link 
                to="/cursos" 
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-light hover:text-white transition-colors"
              >
                <span>Ver todos os cursos</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="glass-panel rounded-3xl overflow-hidden border border-neutral-900 group flex flex-col md:flex-row h-full transition-all duration-300 hover:border-purple-950/60 hover:shadow-2xl hover:shadow-black/60"
              >
                <div className="w-full md:w-2/5 h-56 md:h-auto overflow-hidden relative">
                  <img 
                    src={course.image || null} 
                    alt={course.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-gray via-transparent to-transparent" />
                  
                  {/* Category level tag */}
                  <span className="absolute top-4 left-4 bg-brand-primary/90 text-white font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full font-bold">
                    {course.level}
                  </span>
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h3 className="font-poppins font-extrabold text-lg sm:text-xl text-white leading-tight group-hover:text-brand-light transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-neutral-400 font-sans text-xs mt-2.5 leading-relaxed">
                      {course.description}
                    </p>
                    
                    {/* Mini contents list */}
                    <div className="mt-4 space-y-1.5">
                      {course.contentList.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center space-x-2 text-[11px] text-neutral-300">
                          <CheckCircle className="h-3 w-3 text-brand-light shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-900 text-xs">
                    <div className="flex items-center text-neutral-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    
                    <Link 
                      to={`/cursos`}
                      className="inline-flex items-center space-x-1 font-bold text-brand-light hover:text-white transition-colors"
                    >
                      <span>Grade Completa</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. O ALUNO APRENDERÁ SECTION */}
      <section className="py-24 bg-brand-dark px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
              Formação Artística Completa
            </span>
            <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight mt-2">
              Habilidades que Você Vai Desenvolver
            </h2>
            <p className="text-neutral-400 mt-4 text-sm font-sans">
              Nossa grade pedagógica abrange todos os pilares essenciais do instrumentista. Da mecânica motora fina ao feeling do improviso em público.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {learningGrid.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="glass-panel p-5 rounded-2xl hover:bg-neutral-900/60 hover:border-purple-500/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-950/20 text-brand-light mb-4">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-sm text-white">{item.title}</h3>
                    <p className="text-[10px] text-neutral-400 mt-1 font-sans leading-normal">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. METODOLOGIA PREVIEW */}
      <section className="py-24 bg-brand-gray border-t border-purple-950/20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
                Metodologia Passo a Passo
              </span>
              <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight mt-2 leading-none">
                Do zero à performance contínua.
              </h2>
              <p className="text-neutral-400 mt-6 text-sm font-sans leading-relaxed">
                Desenvolvemos uma cronologia estruturada em 8 níveis didáticos que respeitam seu tempo biológico de aprendizado. Sem decorebas, focado 100% em colocar as mãos nas cordas e compreender a física e emoção do som.
              </p>
              
              <div className="mt-8 space-y-4 text-xs">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                  <p className="text-neutral-300 font-sans"><strong className="text-white font-poppins">Teoria Integrada:</strong> Entenda por que você faz determinado movimento no braço do instrumento.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                  <p className="text-neutral-300 font-sans"><strong className="text-white font-poppins">Estágios Práticos:</strong> Músicas de apoio e exercícios divertidos para fixar técnicas no cérebro de forma prazerosa.</p>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  to="/metodologia"
                  className="inline-flex items-center space-x-2 bg-purple-900/30 hover:bg-purple-900/50 text-brand-light hover:text-white border border-purple-500/20 px-6 py-3 rounded-full text-xs font-bold font-poppins transition-all duration-300"
                >
                  <span>Conhecer a Metodologia completa</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Timeline teaser graphics */}
              <div className="space-y-4">
                {[
                  { id: "1", title: "Introdução", desc: "Primeiro contato ergonômico, digitação leve e mecânica postural corretiva." },
                  { id: "2", title: "Primeiros Acordes", desc: "Aprenda cifragem e monte as primeiras posições maiores, menores e ritmos." },
                  { id: "3", title: "Ritmos e Levadas", desc: "Coordenação rítmica com a mão direita para dar balanço e andamento real." },
                  { id: "4", title: "Campo Harmônico", desc: "Aprenda a entender a lógica das sequências de acordes e tire sons de ouvido." }
                ].map((step, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-2xl flex items-center space-x-4 border-l-4 border-l-brand-accent">
                    <span className="font-montserrat font-black text-2xl text-brand-accent/40 w-8">{step.id}</span>
                    <div>
                      <h4 className="font-poppins font-extrabold text-sm text-white">{step.title}</h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SLIDER SECTION */}
      <section className="py-24 bg-brand-dark relative overflow-hidden px-4">
        {/* Purple decorative light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
            Depoimentos Reais
          </span>
          <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight mt-2 mb-16">
            O que nossos alunos dizem
          </h2>

          <div className="relative min-h-[300px] sm:min-h-[220px] bg-neutral-900/40 border border-neutral-900 rounded-3xl p-8 sm:p-12 backdrop-blur-sm">
            
            {/* Stars */}
            <div className="flex items-center justify-center space-x-1 text-amber-400 mb-6">
              {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                <Star key={i} className="h-4.5 w-4.5 fill-current" />
              ))}
            </div>

            {/* Testimonial message */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-200 font-sans italic leading-relaxed">
              "{testimonials[activeTestimonial].text}"
            </p>

            {/* Profile Avatar & Info */}
            <div className="flex items-center justify-center space-x-3 mt-8">
              <img 
                src={testimonials[activeTestimonial].avatar || null} 
                alt={testimonials[activeTestimonial].name} 
                className="h-10 w-10 rounded-full object-cover border border-purple-500/30"
              />
              <div className="text-left">
                <h4 className="font-poppins font-bold text-sm text-white leading-none">
                  {testimonials[activeTestimonial].name}
                </h4>
                <span className="text-[11px] text-neutral-400 font-sans mt-1 inline-block">
                  {testimonials[activeTestimonial].role}
                </span>
              </div>
            </div>

            {/* Pagination indicators */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeTestimonial ? 'w-6 bg-brand-light' : 'w-2 bg-neutral-700'
                  }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 7. PLANOS PREVIEW */}
      <section className="py-24 bg-gradient-to-t from-brand-dark to-brand-gray relative px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
              Valores e Matrículas
            </span>
            <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight mt-2">
              Planos que Cabem no seu Bolso
            </h2>
            <p className="text-neutral-400 mt-4 text-sm font-sans">
              Não cobramos taxa de adesão em planos longos. Escolha o formato ideal para as suas metas de evolução.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`glass-panel rounded-3xl p-8 flex flex-col justify-between relative h-full transition-all duration-300 ${
                  plan.popular 
                    ? 'border-brand-accent shadow-xl shadow-brand-primary/10 -translate-y-2' 
                    : 'border-neutral-900'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-accent text-white font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full font-bold">
                    Mais Procurado
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-white">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="font-montserrat font-black text-3xl sm:text-4xl text-white">{plan.price}</span>
                      <span className="text-xs text-neutral-400 font-sans ml-1">/ {plan.period}</span>
                    </div>
                  </div>

                  <hr className="border-neutral-800" />

                  {/* Feature list */}
                  <ul className="space-y-3.5 text-xs text-neutral-300 font-sans">
                    {plan.features.slice(0, 5).map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-brand-light shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    to="/planos"
                    className={`flex items-center justify-center space-x-1.5 w-full py-3.5 rounded-full text-xs font-bold font-poppins transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-md shadow-brand-accent/20 hover:opacity-90' 
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800'
                    }`}
                  >
                    <span>Ver Detalhes do Plano</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONTATO QUICK CTA */}
      <section className="py-24 bg-brand-dark px-4 border-t border-neutral-900 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto glass-panel border border-purple-500/20 rounded-3xl p-8 sm:p-12 relative z-10 text-center overflow-hidden">
          <div className="absolute -top-10 -right-10 h-32 w-32 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-purple-500/10 rounded-full blur-2xl" />

          <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
            Sua primeira aula é por nossa conta
          </span>
          <h2 className="font-poppins font-black text-2xl sm:text-4xl text-white tracking-tight mt-3 leading-tight">
            Pronto para dar os primeiros acordes?
          </h2>
          <p className="text-neutral-400 mt-4 text-sm font-sans max-w-2xl mx-auto leading-relaxed">
            Agende hoje mesmo uma aula experimental gratuita na nossa escola em Diadema. Traga apenas sua vontade de aprender, nós fornecemos o instrumento!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contato"
              className="flex items-center space-x-2 w-full sm:w-auto justify-center bg-white text-brand-dark hover:bg-neutral-200 font-poppins font-bold px-8 py-4 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 text-sm"
            >
              <span>Agendar Aula Gratuita</span>
              <Calendar className="h-4 w-4" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 w-full sm:w-auto justify-center bg-[#161616] hover:bg-neutral-800 border border-neutral-800 text-white font-poppins font-bold px-8 py-4 rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 text-sm"
            >
              <MessageSquare className="h-4 w-4 text-green-400 fill-current" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple headphone icon helper fallback
function HeadphoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}
