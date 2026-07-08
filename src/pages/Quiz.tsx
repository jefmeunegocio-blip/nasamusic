import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, ArrowRight, ArrowLeft, Check, Sparkles, Zap, Award, Target, 
  Timer, Compass, MessageSquare, RotateCcw, Volume2, ShieldCheck, Heart 
} from 'lucide-react';
import { Course, SchoolConfig } from '../types';
import professorSabinoImg from '../assets/images/professor_sabino_1783545273840.jpg';

interface QuizProps {
  config: SchoolConfig;
  courses: Course[];
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: 'single' | 'multiple';
  options: {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    value: string; // instrument, level, genre, artist, goal, frequency
  }[];
}

export default function Quiz({ config, courses }: QuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // 1. INSTRUMENTO
  // 2. NÍVEL
  // 3. ESTILO MUSICAL
  // 4. ARTISTAS / INSPIRAÇÕES
  // 5. OBJETIVOS
  // 6. FREQUÊNCIA DE ESTUDO

  const questions: Question[] = [
    {
      id: 'instrument',
      title: 'Qual instrumento faz seu coração bater mais forte?',
      subtitle: 'Escolha aquele que você sempre sonhou em dominar.',
      type: 'single',
      options: [
        { 
          id: 'violao', 
          label: 'Violão Acústico', 
          description: 'Timbre quente, cordas de nylon ou aço. Perfeito para MPB, dedilhados e rodas de amigos.', 
          value: 'violao',
          icon: <span className="text-2xl font-bold text-purple-400 font-sans">🎸</span> 
        },
        { 
          id: 'guitarra', 
          label: 'Guitarra Elétrica', 
          description: 'Sons distorcidos, solos marcantes, energia pura. Perfeito para Rock, Blues, Jazz e Metal.', 
          value: 'guitarra',
          icon: <Zap className="h-5 w-5 text-amber-400" />
        },
        { 
          id: 'ambos', 
          label: 'Quero descobrir / Ambos', 
          description: 'Tenho interesse em mais de um ou ainda não decidi o meu caminho exato.', 
          value: 'ambos',
          icon: <Compass className="h-5 w-5 text-brand-light" />
        },
      ]
    },
    {
      id: 'level',
      title: 'Qual é o seu nível de experiência atual?',
      subtitle: 'Seja sincero! Nosso método se adapta perfeitamente do zero ao avançado.',
      type: 'single',
      options: [
        { 
          id: 'zero', 
          label: 'Iniciante Absoluto', 
          description: 'Nunca segurei um instrumento antes ou sei apenas afinar e nada mais.', 
          value: 'Iniciante',
          icon: <span className="text-xs font-mono font-black text-purple-400 bg-purple-950/40 px-2 py-1 rounded">NÍVEL 0</span>
        },
        { 
          id: 'basico', 
          label: 'Iniciante com Noção', 
          description: 'Sei fazer alguns acordes simples, ler uma cifra básica e arriscar um ritmo leve.', 
          value: 'Iniciante',
          icon: <span className="text-xs font-mono font-black text-brand-light bg-purple-950/40 px-2 py-1 rounded">NÍVEL 1</span>
        },
        { 
          id: 'intermediario', 
          label: 'Intermediário', 
          description: 'Consigo tocar músicas completas no tempo, mas quero evoluir em solos, dedilhados e teoria.', 
          value: 'Intermediário',
          icon: <span className="text-xs font-mono font-black text-amber-400 bg-amber-950/40 px-2 py-1 rounded">NÍVEL 2</span>
        },
        { 
          id: 'avancado', 
          label: 'Avançado', 
          description: 'Já domino o instrumento e busco improvisação sofisticada, arranjos complexos e modos gregos.', 
          value: 'Avançado',
          icon: <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded">NÍVEL 3</span>
        },
      ]
    },
    {
      id: 'genre',
      title: 'Quais estilos musicais você mais gostaria de tocar?',
      subtitle: 'O repertório das aulas é montado sob medida com base nos seus estilos preferidos.',
      type: 'single',
      options: [
        { 
          id: 'rock', 
          label: 'Rock, Metal & Alternativo', 
          description: 'Riffs pesados, energia, solos eletrizantes e pegada marcante.', 
          value: 'rock',
          icon: <FlameIcon /> 
        },
        { 
          id: 'blues', 
          label: 'Blues, Jazz & Fusion', 
          description: 'Expressividade, improvisação, grooves sofisticados e acordes ricos.', 
          value: 'blues',
          icon: <Sparkles className="h-4 w-4 text-cyan-400" />
        },
        { 
          id: 'mpb', 
          label: 'MPB, Bossa Nova & Samba', 
          description: 'A riqueza da música brasileira, ritmos sincopados e harmonias lindas.', 
          value: 'mpb',
          icon: <Heart className="h-4 w-4 text-emerald-400" />
        },
        { 
          id: 'pop', 
          label: 'Pop, Folk, Indie & Gospel', 
          description: 'Acompanhamento vocal, batidas rítmicas de violão, dedilhados limpos.', 
          value: 'pop',
          icon: <Music className="h-4 w-4 text-purple-400" />
        },
      ]
    },
    {
      id: 'artist',
      title: 'Quem é uma das suas maiores inspirações?',
      subtitle: 'Escolha o artista que faz você querer pegar o instrumento e praticar.',
      type: 'single',
      options: [
        { id: 'metallica', label: 'Metallica / Pink Floyd / Led Zeppelin', description: 'Gosto de clássicos do Rock e Metal histórico.', value: 'Metallica', icon: <span className="text-xl">⚡</span> },
        { id: 'hendrix', label: 'Jimi Hendrix / B.B. King / John Mayer', description: 'Amo o feeling do Blues e a alma da guitarra/violão.', value: 'Jimi Hendrix', icon: <span className="text-xl">🎸</span> },
        { id: 'gil', label: 'Djavan / Gilberto Gil / Caetano Veloso', description: 'Valorizo a harmonia rebuscada e o molho da MPB.', value: 'Djavan', icon: <span className="text-xl">🌴</span> },
        { id: 'sheeran', label: 'Ed Sheeran / Taylor Swift / Coldplay', description: 'Prefiro canções contemporâneas, dedilhado e pop.', value: 'Ed Sheeran', icon: <span className="text-xl">🎤</span> },
      ]
    },
    {
      id: 'goal',
      title: 'Qual é o seu principal objetivo na música hoje?',
      subtitle: 'Isso nos ajuda a traçar o cronograma ideal para manter sua motivação em alta.',
      type: 'single',
      options: [
        { 
          id: 'hobby', 
          label: 'Tocar por Hobby e Relaxar', 
          description: 'Quero uma válvula de escape da rotina, tocar para mim e em reuniões familiares.', 
          value: 'hobby',
          icon: <Compass className="h-4 w-4 text-brand-light" />
        },
        { 
          id: 'band', 
          label: 'Tocar em uma Banda / Palco', 
          description: 'Sonho em me apresentar ao vivo, interagir com outros músicos e dominar o palco.', 
          value: 'banda',
          icon: <Award className="h-4 w-4 text-amber-400" />
        },
        { 
          id: 'theory', 
          label: 'Compor, Improvisar & Criar', 
          description: 'Quero dominar a teoria prática para criar meus próprios solos e harmonias.', 
          value: 'teoria',
          icon: <Target className="h-4 w-4 text-emerald-400" />
        },
        { 
          id: 'technique', 
          label: 'Velocidade & Alta Performance', 
          description: 'Foco no desenvolvimento mecânico de alto nível (Sweep, Slap, Fingerstyle complexo).', 
          value: 'tecnica',
          icon: <Zap className="h-4 w-4 text-brand-accent" />
        },
      ]
    },
    {
      id: 'frequency',
      title: 'Quanto tempo você pretende dedicar aos treinos em casa?',
      subtitle: 'Seja realista! A consistência de treinos curtos supera treinos longos ocasionais.',
      type: 'single',
      options: [
        { 
          id: 'curto', 
          label: '15 a 30 minutos por dia', 
          description: 'Rotina compacta e eficiente, excelente para quem tem dias muito corridos.', 
          value: 'curto',
          icon: <Timer className="h-4 w-4 text-purple-400" />
        },
        { 
          id: 'medio', 
          label: '30 a 60 minutos por dia', 
          description: 'Foco constante e equilibrado para evolução musical rápida.', 
          value: 'medio',
          icon: <Timer className="h-4 w-4 text-amber-400" />
        },
        { 
          id: 'longo', 
          label: 'Mais de 1 hora por dia', 
          description: 'Treino intensivo para quem quer dominar o instrumento em tempo recorde.', 
          value: 'longo',
          icon: <Timer className="h-4 w-4 text-emerald-400" />
        },
      ]
    }
  ];

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsFinished(false);
  };

  // RECOMMENDATION ALGORITHM
  const getRecommendation = () => {
    const chosenInstrument = answers.instrument as string;
    const chosenLevel = answers.level as string;
    const chosenGenre = answers.genre as string;
    const chosenArtist = answers.artist as string;
    const chosenGoal = answers.goal as string;
    const chosenFrequency = answers.frequency as string;

    // Determine recommended course ID
    let courseId = 'violao';
    if (chosenInstrument === 'violao') {
      courseId = 'violao';
    } else if (chosenInstrument === 'guitarra') {
      courseId = 'guitarra';
    } else {
      // undecided/both - fallback based on genre and inspiration
      if (chosenGenre === 'rock' || chosenGenre === 'blues') {
        courseId = 'guitarra';
      } else {
        courseId = 'violao';
      }
    }

    const matchedCourse = courses.find(c => c.id === courseId) || courses[0];

    // Determine customized profile title
    let profileTitle = 'Violonista em Evolução';
    let profileDescription = '';
    
    if (courseId === 'violao') {
      if (chosenGenre === 'mpb') {
        profileTitle = 'Mestre da Bossa & MPB';
        profileDescription = `O violão acústico é a alma da música brasileira. Pelas suas respostas, você valoriza a sofisticação de acordes, dedilhados ricos e ritmos com o "balanço" do samba e bossa nova. Suas maiores inspirações residem na riqueza poética e melódica. Nosso curso vai te ensinar desde a sincronia rítmica da mão direita até o entendimento avançado do campo harmônico.`;
      } else if (chosenGenre === 'pop') {
        profileTitle = 'Violonista Pop & Folk';
        profileDescription = `Seu perfil está focado em canções envolventes, acompanhamento de voz e melodias folk que cativam qualquer público. O violão acústico de aço ou nylon será seu companheiro para animar rodas de amigos, tocar suas canções favoritas ou expressar suas próprias composições com ritmos dinâmicos e clareza acústica.`;
      } else {
        profileTitle = 'Violonista Versátil';
        profileDescription = `Você procura o equilíbrio perfeito no violão clássico e popular. Nosso Curso Completo de Violão aborda postura, leitura de tablaturas, digitação limpa e harmonia. Seja tocando dedilhados intrincados de fingerstyle ou batidas clássicas de pop/rock, você desenvolverá uma coordenação impecável.`;
      }
    } else if (courseId === 'guitarra') {
      if (chosenGenre === 'rock') {
        profileTitle = 'Virtuoso do Rock & Metal';
        profileDescription = `O seu destino está no som pesado, nos riffs energéticos e nos solos empolgantes! O Curso de Guitarra da NASA vai guiar você pelo mundo da palhetada alternada veloz, sweeps, ligados, bends expressivos e uso de efeitos como distorção e delay para criar sua própria assinatura sonora de rock.`;
      } else if (chosenGenre === 'blues') {
        profileTitle = 'Guitarrista de Blues & Jazz Feeling';
        profileDescription = `Para você, música é sobre sentimento, improvisação e alma. Seu foco é aprender a expressar emoções através das cordas, dominando a escala pentatônica, licks clássicos, dinâmicas de palhetada e harmonia jazzística. No curso, vamos desmitificar o braço da guitarra para que você possa improvisar livremente.`;
      } else {
        profileTitle = 'Guitarrista Moderno';
        profileDescription = `Você deseja dominar a guitarra elétrica em sua totalidade — das bases limpas de funk/pop aos solos marcantes de rock. Ensinaremos técnicas fundamentais de timbragem de pedais, modulações, ritmo preciso e improvisação, fornecendo as ferramentas para que você brilhe em qualquer banda ou estúdio.`;
      }
    }

    // Determine recommended teacher
    let teacherName = 'Professor Sabino';
    let teacherRole = 'Fundador & Especialista em Harmonia';
    let teacherBio = 'Músico profissional com mais de 20 anos de experiência. Sabino desenvolveu a metodologia de ensino prático para violão, harmonia intuitiva e arranjos expressivos.';
    let teacherImg = professorSabinoImg;

    if (courseId === 'guitarra' && chosenGenre === 'rock') {
      teacherName = 'Diego Ramos';
      teacherRole = 'Especialista em Guitarra de Alta Performance';
      teacherBio = 'Guitarrista de metal instrumental, especialista em palhetada alternada rápida, sweep picking, ligados de alta precisão e timbragem fina de amplificadores digitais e analógicos.';
      teacherImg = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
    }

    // Determine recommended plan based on commitment frequency
    let planId = 'intermediario'; // Semestral (default balanced)
    let planName = 'Plano Semestral (Mais Recomendado)';
    let planPrice = 'R$ 260';
    let planDesc = 'O plano perfeito para quem busca evolução consistente e segura com acompanhamento de médio prazo, estúdio liberado para ensaio e recital final inclusos.';

    if (chosenFrequency === 'curto') {
      planId = 'basico';
      planName = 'Plano Trimestral';
      planPrice = 'R$ 290';
      planDesc = 'Ideal para quem tem a agenda corrida e quer experimentar a dinâmica das aulas particulares semanais com flexibilidade contratual de curto prazo.';
    } else if (chosenFrequency === 'longo') {
      planId = 'premium';
      planName = 'Plano Anual';
      planPrice = 'R$ 220';
      planDesc = 'Melhor custo-benefício para quem quer assumir um compromisso real com sua arte, obtendo isenção total de matrícula, kit exclusivo de boas-vindas e agendamento prioritário.';
    }

    // Generate pre-filled WhatsApp message
    const cleanInstrumentName = 
      courseId === 'violao' ? 'Violão Acústico' : 'Guitarra Elétrica';
    
    const messageText = `Olá! Realizei o Quiz de Orientação Musical no site da NASA e meu resultado indicou o perfil: *${profileTitle}* (${cleanInstrumentName} - nível *${chosenLevel}*). Gostaria de agendar uma conversa com o *${teacherName}* e marcar uma aula experimental gratuita para conhecer o método!`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${config.whatsapp.replace(/\D/g, '')}&text=${encodeURIComponent(messageText)}`;

    return {
      course: matchedCourse,
      profileTitle,
      profileDescription,
      teacherName,
      teacherRole,
      teacherBio,
      teacherImg,
      planName,
      planPrice,
      planDesc,
      whatsappUrl,
      chosenLevel,
      cleanInstrumentName
    };
  };

  const recommendation = isFinished ? getRecommendation() : null;
  const currentQuestion = questions[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <div className="relative pt-28 pb-20 px-4 min-h-screen flex flex-col justify-center bg-brand-dark">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full z-10">
        
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key="quiz-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="glass-panel rounded-3xl p-6 sm:p-10 border border-purple-500/10 shadow-2xl"
            >
              {/* Header inside Card */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2 text-brand-light font-mono text-[10px] tracking-widest uppercase">
                  <Music className="h-4 w-4 animate-pulse" />
                  <span>Orientação Vocacional NASA</span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  Etapa {currentStep + 1} de {questions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-neutral-900 h-1.5 rounded-full mb-8 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-brand-primary to-brand-accent h-full rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Question title */}
              <div className="space-y-2 mb-8">
                <h1 className="font-poppins font-black text-xl sm:text-2xl text-white tracking-tight">
                  {currentQuestion.title}
                </h1>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {currentQuestion.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.value;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(currentQuestion.id, option.value)}
                      className={`flex items-start text-left p-5 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                        isSelected
                          ? 'bg-purple-950/40 border-brand-accent shadow-md shadow-brand-primary/10'
                          : 'bg-brand-gray border-neutral-800 hover:border-purple-500/20 hover:bg-neutral-900'
                      }`}
                    >
                      <div className="mr-4 mt-0.5 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 group-hover:text-white transition-colors">
                        {option.icon || <Check className="h-4 w-4 opacity-0" />}
                      </div>
                      <div className="space-y-1 pr-6">
                        <span className="block font-poppins font-bold text-sm text-white">
                          {option.label}
                        </span>
                        {option.description && (
                          <span className="block text-xs text-neutral-400 leading-relaxed font-sans">
                            {option.description}
                          </span>
                        )}
                      </div>
                      
                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 h-5 w-5 bg-brand-accent text-white rounded-full flex items-center justify-center border border-white/10">
                          <Check className="h-3 w-3 stroke-[3px]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-900">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`flex items-center space-x-1.5 text-xs font-bold font-poppins transition-colors ${
                    currentStep === 0 
                      ? 'text-neutral-600 cursor-not-allowed' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Voltar</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id]}
                  className={`flex items-center space-x-1.5 px-6 py-3 rounded-full text-xs font-bold font-poppins transition-all duration-300 ${
                    answers[currentQuestion.id]
                      ? 'bg-gradient-to-r from-brand-primary to-brand-accent hover:scale-103 text-white shadow-md shadow-brand-accent/25'
                      : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-900'
                  }`}
                >
                  <span>{currentStep === questions.length - 1 ? 'Ver Resultado' : 'Avançar'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            // RESULTS INTERACTIVE CARD
            <motion.div
              key="results-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Confetti styling header */}
              <div className="text-center space-y-2 mb-4">
                <div className="inline-flex items-center justify-center bg-purple-950/40 text-brand-light p-3 rounded-full border border-purple-500/20 mb-3 animate-bounce">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="block text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
                  Diagnóstico Concluído com Sucesso!
                </span>
                <h1 className="font-poppins font-black text-3xl sm:text-4xl text-white">
                  Seu Perfil Musical Revelado
                </h1>
              </div>

              {/* Main Profile & Course Card */}
              <div className="glass-panel rounded-3xl border border-purple-500/10 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                {/* Visual Cover / Recommended Course Info */}
                <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[250px] bg-neutral-900">
                  <img 
                    src={recommendation?.course.image || null} 
                    alt={recommendation?.course.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-dark/95 via-brand-dark/40 to-transparent" />
                  
                  {/* Floating badges on image */}
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <span className="inline-block bg-brand-accent text-white font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-md font-bold">
                      Recomendado para você
                    </span>
                    <h3 className="font-poppins font-black text-lg text-white leading-tight">
                      {recommendation?.course.name}
                    </h3>
                    <p className="text-neutral-300 text-xs flex items-center space-x-1 font-mono">
                      <Timer className="h-3 w-3 text-brand-light" />
                      <span>Duração sugerida: {recommendation?.course.duration}</span>
                    </p>
                  </div>
                </div>

                {/* Profile Breakdown Text */}
                <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-light bg-purple-950/40 px-2.5 py-1 rounded">
                      Perfil: {recommendation?.profileTitle}
                    </span>
                    <h2 className="font-poppins font-bold text-xl text-white mt-3">
                      Seu caminho ideal no {recommendation?.cleanInstrumentName} ({recommendation?.chosenLevel})
                    </h2>
                    <p className="text-neutral-400 mt-3 text-xs sm:text-sm leading-relaxed font-sans">
                      {recommendation?.profileDescription}
                    </p>
                  </div>

                  <hr className="border-neutral-900" />

                  {/* Highlights of course contents */}
                  <div className="space-y-3">
                    <span className="block text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">
                      O que você vai dominar no curso:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                      {recommendation?.course.contentList.slice(0, 4).map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic details section: Recommended Teacher and Plan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Teacher recommendation */}
                <div className="glass-panel p-6 rounded-3xl border border-purple-500/10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-neutral-400 tracking-wider font-bold uppercase block">
                      Professor Tutor Recomendado
                    </span>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={recommendation?.teacherImg || null} 
                        alt={recommendation?.teacherName} 
                        className="h-14 w-14 rounded-full object-cover object-top border-2 border-brand-accent/30"
                      />
                      <div>
                        <h4 className="font-poppins font-black text-sm text-white">
                          {recommendation?.teacherName}
                        </h4>
                        <p className="text-[10px] text-brand-light font-mono leading-tight">
                          {recommendation?.teacherRole}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      "{recommendation?.teacherBio}"
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-900 text-[10px] text-brand-light font-mono flex items-center space-x-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Acompanhamento Individual Semanal</span>
                  </div>
                </div>

                {/* Plan Recommendation */}
                <div className="glass-panel p-6 rounded-3xl border border-purple-500/10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-neutral-400 tracking-wider font-bold uppercase block">
                      Assinatura Sugerida
                    </span>
                    <div>
                      <h4 className="font-poppins font-black text-base text-white">
                        {recommendation?.planName}
                      </h4>
                      <p className="text-2xl font-black text-white font-poppins mt-1">
                        {recommendation?.planPrice}
                        <span className="text-xs text-neutral-500 font-normal"> / {recommendation?.planPrice.includes('mês') ? '' : 'mês'}</span>
                      </p>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      {recommendation?.planDesc}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center">
                    <Link 
                      to="/planos"
                      className="text-xs text-brand-light hover:text-white transition-colors font-mono hover:underline"
                    >
                      Ver detalhes dos Planos →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white px-6 py-4 rounded-full font-poppins font-bold text-xs cursor-pointer transition-all duration-300"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Refazer o Quiz</span>
                </button>

                <a
                  href={recommendation?.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-primary to-brand-accent text-white px-8 py-4 rounded-full font-poppins font-black text-xs hover:scale-102 cursor-pointer transition-transform duration-300 shadow-md shadow-brand-accent/25"
                >
                  <MessageSquare className="h-4 w-4 fill-current" />
                  <span>Agendar Aula Experimental Grátis</span>
                </a>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// Inline auxiliary icons to guarantee error-free compilation
function FlameIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-brand-accent"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
