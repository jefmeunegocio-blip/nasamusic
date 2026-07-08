import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Music, Compass, Star, Play, Award, HelpCircle } from 'lucide-react';
import { SchoolConfig } from '../types';

interface MetodologiaProps {
  config: SchoolConfig;
}

export default function Metodologia({ config }: MetodologiaProps) {
  const steps = [
    {
      num: "1",
      title: "Introdução & Ergonometria",
      desc: "Primeiro contato postural com o instrumento. Você aprenderá como segurar o violão ou guitarra de forma ergonômica sem sobrecarregar tendões, além das mecânicas de digitação leve e o uso correto de afinadores.",
      tip: "Dominado nas primeiras 2 aulas."
    },
    {
      num: "2",
      title: "Primeiros Acordes",
      desc: "Desmistificando a cifragem. Você aprenderá a ler diagramas de acordes e montar suas primeiras posições maiores, menores e com sétima dominante, focando na agilidade de troca de posições estruturadas.",
      tip: "Dominado entre a 2ª e a 4ª semana."
    },
    {
      num: "3",
      title: "Ritmos e Levadas de Apoio",
      desc: "Estudo rítmico prático da mão direita (ou mão de palheta). Você aprenderá levadas clássicas como Pop, Rock, Balada, Bossa Nova e MPB com metrônomo para garantir precisão de andamento.",
      tip: "Dominado nas primeiras 6 semanas."
    },
    {
      num: "4",
      title: "Campo Harmônico Fundamental",
      desc: "Chega de decorar listas de cifras sem nexo! Você entenderá como os acordes se relacionam em famílias tonais. Com isso, aprenderá a identificar tonalidades e tirar dezenas de músicas de ouvido.",
      tip: "Estudado a partir do 2º mês."
    },
    {
      num: "5",
      title: "Escalas Melódicas",
      desc: "O portal para os solos. Estudo anatômico e prático da Escala Pentatônica e das Escalas Maior e Menor Natural ao longo do braço do instrumento, mapeando desenhos conexos para agilizar a digitação.",
      tip: "Estudado a partir do 3º mês."
    },
    {
      num: "6",
      title: "Improvisação & Feeling",
      desc: "Aprenda a expressar suas próprias ideias musicais em tempo real. Estudos de licks, técnicas expressivas como Bends, Vibratos, Legatos e Slides sobre backing tracks exclusivas da NASA.",
      tip: "Consolidado em torno do 4º ao 5º mês."
    },
    {
      num: "7",
      title: "Performance & Timbragem",
      desc: "Tocar em casa é uma coisa, no palco é outra! Orientação sobre presença cênica, como timbrar pedais, captadores e amplificadores, além de como controlar a ansiedade e nervosismo ao se apresentar.",
      tip: "Treinado para o Recital semestral."
    },
    {
      num: "8",
      title: "Evolução Contínua",
      desc: "Após dominar os fundamentos básicos e intermediários, você iniciará módulos customizados avançados: arranjos Fingerstyle, Modos Gregos avançados, técnicas de Sweep Picking, Tapping, Jazz, Fusion ou composição solo.",
      tip: "Módulo avançado por tempo indeterminado."
    }
  ];

  return (
    <div className="relative pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
            Nosso Método
          </span>
          <h1 className="font-poppins font-black text-4xl sm:text-5xl text-white tracking-tight mt-2">
            Metodologia Prática NASA
          </h1>
          <p className="text-neutral-400 mt-4 text-sm font-sans">
            Construímos um caminho claro e livre de barreiras teóricas cansativas. Conheça as 8 etapas que transformarão sua coordenação motora e percepção musical.
          </p>
        </div>

        {/* Methodology Timeline */}
        <div className="relative ml-4 sm:ml-0 border-l-2 border-purple-900/30 max-w-4xl mx-auto pl-10 sm:pl-16 space-y-16">
          {/* Timeline absolute top light */}
          <div className="absolute top-0 -left-[6px] h-2.5 w-2.5 rounded-full bg-brand-light" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline bubble with numbers */}
              <div className="absolute -left-[64px] sm:-left-[88px] top-0.5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark border-2 border-brand-accent text-brand-light font-montserrat font-black text-lg shadow-lg group-hover:scale-105 transition-all duration-300">
                {step.num}
              </div>

              {/* Step Card Content */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl transition-all duration-300 group-hover:border-purple-500/25 group-hover:shadow-xl group-hover:shadow-black/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-4 mb-4">
                  <h3 className="font-poppins font-black text-lg sm:text-xl text-white group-hover:text-brand-light transition-colors">
                    {step.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-purple-950/30 border border-purple-500/10 rounded-full text-[10px] font-mono text-brand-light font-semibold self-start sm:self-auto">
                    {step.tip}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {step.desc}
                </p>

                {/* Micro checklist per step */}
                <div className="mt-5 flex items-center space-x-2 text-[10px] text-brand-light font-mono tracking-wider uppercase font-bold">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Módulo obrigatório para liberação do próximo nível</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic FAQ banner */}
        <div className="mt-28 bg-[#161616]/40 border border-neutral-900 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <HelpCircle className="h-8 w-8 text-brand-light mx-auto mb-4" />
          <h3 className="font-poppins font-black text-lg text-white mb-2">Ficou com alguma dúvida sobre o aprendizado?</h3>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-2xl mx-auto mb-6">
            Não se preocupe se você acha que não tem talento, coordenação ou que 'já passou da idade' de aprender. Nosso método foi desenvolvido para quebrar essas barreiras mentais através de pequenos exercícios focados no seu bem-estar e prazer em tocar.
          </p>
          <a
            href={`https://api.whatsapp.com/send?phone=${config.whatsapp.replace(/\D/g, '')}&text=Olá! Gostaria de conversar com o professor sobre o método NASA.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white px-6 py-3 rounded-full text-xs font-bold font-poppins"
          >
            <span>Conversar diretamente com o Professor</span>
          </a>
        </div>

      </div>
    </div>
  );
}
