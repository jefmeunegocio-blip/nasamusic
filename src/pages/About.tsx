import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Target, Eye, Sparkles, Award, Star, Clock } from 'lucide-react';
import { SchoolConfig } from '../types';

interface AboutProps {
  config: SchoolConfig;
}

export default function About({ config }: AboutProps) {
  const values = [
    {
      title: "Excelência Prática",
      desc: "Nossas aulas são planejadas para que o aluno toque e compreenda música de verdade, superando teorias abstratas.",
      icon: Award
    },
    {
      title: "Respeito ao Tempo",
      desc: "Cada cérebro e coordenação motora evoluem em ritmos diferentes. Adaptamos o cronograma exclusivamente para você.",
      icon: Clock
    },
    {
      title: "Comunidade Artística",
      desc: "Fomentamos a interação social através de recitais, ensaios coletivos, cafés e workshops integrados de alto padrão.",
      icon: Sparkles
    }
  ];

  const timeline = [
    {
      year: "2006",
      title: "Os Primeiros Acordes",
      desc: "O Prof. Sabino inicia o projeto de docência individual atendendo em seu próprio estúdio caseiro, moldando as primeiras diretrizes do que viria a ser o método NASA."
    },
    {
      year: "2012",
      title: "Nasce a Marca NASA",
      desc: "Com o aumento exponencial da demanda e dezenas de alunos ativos, o Núcleo de Artes Sabino é oficialmente fundado como escola física especializada."
    },
    {
      year: "2018",
      title: "Nossa Sede em Diadema",
      desc: "Inauguramos nossa sede premium em Diadema, integrando salas climatizadas, excelentes instrumentos e ambiente profissional de apoio para os alunos."
    },
    {
      year: "2023",
      title: "Área do Aluno Digital",
      desc: "Lançamos nosso portal EAD de apoio, onde alunos de todos os níveis acessam apostilas, tablaturas personalizadas, e exercícios de apoio para praticar em casa."
    },
    {
      year: "2026",
      title: "20 Anos de Didática",
      desc: "Alcançamos a marca de mais de 1.500 alunos formados e consolidados como referência absoluta no ensino especializado de violão e guitarra de São Paulo."
    }
  ];

  return (
    <div className="relative pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
            Sobre Nós
          </span>
          <h1 className="font-poppins font-black text-4xl sm:text-5xl text-white tracking-tight mt-2">
            Nossa História & Propósito
          </h1>
          <p className="text-neutral-400 mt-4 text-base font-sans">
            Conheça o Núcleo de Artes Sabino, onde o aprendizado musical é tratado como uma verdadeira arte de excelência pedagógica.
          </p>
        </div>

        {/* Story Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-900 group h-[400px] sm:h-[480px]">
            <img 
              src={config.aboutImage || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800"} 
              alt="Sobre a escola" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xs font-mono text-brand-light font-bold">Serraria, Diadema</p>
              <h3 className="font-poppins font-extrabold text-lg text-white mt-1">Ambiente de imersão artística profissional</h3>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl text-white">
              {config.aboutTitle || "Formando músicos de verdade desde 2006."}
            </h2>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              {config.aboutSubtitle || "O Núcleo de Artes Sabino nasceu de uma insatisfação do Professor Sabino com o ensino tradicional de música. Muitas escolas focavam em exercícios de digitação excessivamente maçantes e mecânicos, ignorando a vontade do aluno de fazer música de verdade ou negligenciando a percepção auditiva."}
            </p>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              {config.aboutText1 || "Nossa proposta inovadora foi criar um ambiente focado em atendimento personalizado de altíssimo nível, onde a teoria é compreendida à medida que é colocada em prática nas suas canções favoritas."}
            </p>
            <p className="text-neutral-300 font-sans text-sm leading-relaxed">
              {config.aboutText2 || "Trabalhamos com turmas extremamente reduzidas ou encontros individuais exclusivos. Fornecemos os melhores instrumentos do mercado na sala de aula para que você possa estudar mesmo sem carregar seu instrumento na rotina diária de trabalho."}
            </p>
          </div>
        </div>

        {/* Mission Vision Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-purple-950/40 border border-purple-500/20 text-brand-light">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-poppins font-black text-lg text-white">Missão</h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              {config.missionText || "Desmistificar o ensino de cordas através de metodologias práticas aceleradas que estimulam a criatividade, percepção e autoconfiança de cada aluno."}
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-purple-950/40 border border-purple-500/20 text-brand-light">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="font-poppins font-black text-lg text-white">Visão</h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              {config.visionText || "Ser consolidada como a mais respeitada e moderna escola especializada em violão e guitarra da capital paulista, aliando inovação digital com ensino de calor humano."}
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-purple-950/40 border border-purple-500/20 text-brand-light">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-poppins font-black text-lg text-white">Valores</h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              {config.valuesText || "Comprometimento com resultados reais, ética didática transparente, respeito à diversidade cultural de estilos e acolhimento familiar premium."}
            </p>
          </div>
        </div>

        {/* Detailed Values listing */}
        <div className="bg-[#161616]/40 rounded-3xl p-8 sm:p-12 mb-24 border border-neutral-900">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-extrabold text-2xl text-white">Pilares de Qualidade NASA</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center space-x-2 text-brand-light">
                  <v.icon className="h-5 w-5" />
                  <h4 className="font-poppins font-bold text-sm text-white">{v.title}</h4>
                </div>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Timeline */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
              Linha do Tempo
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl text-white tracking-tight mt-2">
              Nossa Cronologia de Conquistas
            </h2>
          </div>

          <div className="relative border-l border-neutral-800 max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-brand-accent border-4 border-brand-dark group-hover:scale-125 transition-transform duration-300" />
                
                {/* Content */}
                <div className="glass-panel p-6 rounded-2xl transition-all duration-300 group-hover:border-purple-500/25">
                  <span className="font-montserrat font-black text-brand-light text-sm sm:text-base tracking-widest">
                    {item.year}
                  </span>
                  <h3 className="font-poppins font-extrabold text-base text-white mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
