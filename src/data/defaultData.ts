import { SchoolConfig, Course, Plan, Teacher, GalleryItem, BlogPost, FAQItem, StudyMaterial, Announcement, ClassCalendarEvent } from '../types';

export const defaultSchoolConfig: SchoolConfig = {
  logoName: "NASA",
  schoolName: "NASA – Núcleo de Artes Sabino",
  slogan: "Escola de Música Especializada em Violão e Guitarra",
  heroTitle: "Aprenda Violão e Guitarra com quem realmente ensina.",
  heroSubtitle: "Do iniciante ao avançado, desenvolva sua técnica, musicalidade e repertório através de uma metodologia exclusiva voltada ao seu ritmo.",
  whatsapp: "5511962803599",
  instagram: "https://instagram.com/nucleodeartessabino",
  facebook: "https://facebook.com/nucleodeartessabino",
  tiktok: "https://tiktok.com/@nucleodeartessabino",
  youtube: "https://youtube.com/@nucleodeartessabino",
  phone: "(11) 96280-3599",
  email: "contato@nucleodeartessabino.com",
  address: "Rua Tupiniquins, 357 - Serraria, Diadema - SP",
  mapsEmbedUrl: "https://maps.google.com/maps?q=Rua%20Tupiniquins,%20357%20-%20Serraria,%20Diadema%20-%20SP&t=&z=15&ie=UTF8&iwloc=&output=embed",
  heroImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1600",
  aboutTitle: "Formando músicos de verdade desde 2006.",
  aboutSubtitle: "O Núcleo de Artes Sabino nasceu de uma insatisfação do Professor Sabino com o ensino tradicional de música. Muitas escolas focavam em exercícios de digitação excessivamente maçantes e mecânicos, ignorando a vontade do aluno de fazer música de verdade ou negligenciando a percepção auditiva.",
  aboutText1: "Nossa proposta inovadora foi criar um ambiente focado em atendimento personalizado de altíssimo nível, onde a teoria é compreendida à medida que é colocada em prática nas suas canções favoritas.",
  aboutText2: "Trabalhamos com turmas extremamente reduzidas ou encontros individuais exclusivos. Fornecemos os melhores instrumentos do mercado na sala de aula para que você possa estudar mesmo sem carregar seu instrumento na rotina diária de trabalho.",
  aboutImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800"
};

export const defaultCourses: Course[] = [
  {
    id: "violao",
    name: "Curso Completo de Violão",
    instrument: "violao",
    description: "Domine o violão acústico do zero absoluto às técnicas sofisticadas de dedilhado, fingerstyle e acompanhamento harmônico para diversos estilos musicais brasileiros e internacionais.",
    level: "Todos os níveis",
    duration: "12 a 24 meses",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800",
    contentList: [
      "Postura correta e afinação do instrumento",
      "Primeiros acordes maiores, menores e com sétima",
      "Padrões rítmicos essenciais (Pop, Rock, Bossa Nova, MPB)",
      "Leitura de Cifras e Tablaturas",
      "Técnicas de Dedilhado e Independência dos Dedos",
      "Campo Harmônico e Funções Tonais",
      "Dedilhado clássico e arranjos Fingerstyle",
      "Repertório personalizado focado no seu gosto musical"
    ]
  },
  {
    id: "guitarra",
    name: "Curso Completo de Guitarra",
    instrument: "guitarra",
    description: "Desenvolva sua pegada, velocidade, improvisação e timbragem. Aprenda as escalas de solo, técnicas de palhetada, licks e o uso correto de pedais, amplificadores e efeitos de rock, blues, jazz e metal.",
    level: "Todos os níveis",
    duration: "12 a 36 meses",
    image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=800",
    contentList: [
      "Técnicas básicas: Palhetada Alternada, Hammer-on, Pull-off",
      "Timbragem do instrumento, pedais e amplificação",
      "Estudo aprofundado das Escalas Pentatônica e Modos Gregos",
      "Técnicas advanced: Tapping, Sweep Picking, Legato e Bend",
      "Improvisação melódica e criação de Solos",
      "Riffs clássicos do Rock, Blues, Funk e Metal",
      "Desenvolvimento de ouvido musical e licks exclusivos",
      "Teoria avançada aplicada e campo harmônico expandido"
    ]
  }
];

export const defaultPlans: Plan[] = [
  {
    id: "basico",
    name: "Plano Trimestral",
    price: "R$ 290",
    period: "mês",
    features: [
      "1 aula presencial ou online por semana (50 min)",
      "Acesso completo à Área do Aluno",
      "Material didático digital incluso (PDFs)",
      "Suporte via WhatsApp diretamente com o professor",
      "Fidelidade de apenas 3 meses",
      "1 Workshop bônus no semestre"
    ],
    popular: false
  },
  {
    id: "intermediario",
    name: "Plano Semestral",
    price: "R$ 260",
    period: "mês",
    features: [
      "1 aula presencial ou online por semana (50 min)",
      "Acesso completo à Área do Aluno com vídeos extras",
      "Material didático premium (PDFs e Áudios de apoio)",
      "Suporte prioritário via WhatsApp",
      "Acesso livre ao estúdio de ensaio (com agendamento)",
      "Isenção da taxa de matrícula",
      "Participação garantida no Recital de Alunos"
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Plano Anual",
    price: "R$ 220",
    period: "mês",
    features: [
      "1 aula presencial ou online por semana (50 min)",
      "Acesso VIP Vitalício aos materiais de apoio",
      "Material didático premium completo",
      "Acompanhamento individual e cronograma personalizado",
      "Uso ilimitado do estúdio de ensaio",
      "Isenção de matrícula e kit NASA de boas-vindas",
      "Desconto de 20% em workshops e masterclasses externas",
      "1 aula bônus de gravação em estúdio por ano"
    ],
    popular: false
  }
];

export const defaultTeachers: Teacher[] = [
  {
    id: "sabino",
    name: "Professor Sabino",
    role: "Fundador & Diretor Pedagógico",
    bio: "Músico profissional com mais de 20 anos de carreira e docência. Formado em Música, dedicou sua vida ao ensino especializado de violão acústico e guitarra elétrica. Desenvolveu o Método NASA para transformar qualquer pessoa, do zero absoluto, em um instrumentista completo, combinando percepção musical prática com teoria intuitiva.",
    specialties: [
      "Harmonia Funcional",
      "Arranjo Fingerstyle",
      "Guitarra Blues e Fusion",
      "Improvisação Aplicada",
      "Metodologia para Iniciantes"
    ],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "diego",
    name: "Diego Ramos",
    role: "Professor de Guitarra Rock/Metal",
    bio: "Especialista em técnicas de alta performance na guitarra elétrica. Com forte bagagem no rock, metal e instrumental solo, Diego foca no desenvolvimento de velocidade controlada, timbragem fina e técnicas avançadas de palhetada e sweep.",
    specialties: [
      "Guitarra Metal e Rock",
      "Palhetada Alternada e Sweep Picking",
      "Tapping e Legatos",
      "Análise de Equipamento e Efeitos"
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
  }
];

export const defaultGallery: GalleryItem[] = [
  {
    id: "gal1",
    title: "Sala de Aula Presencial",
    type: "image",
    category: "Aulas",
    url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800",
    description: "Nosso ambiente presencial em Diadema, climatizado e equipado com excelentes instrumentos."
  },
  {
    id: "gal2",
    title: "Apresentação de Recital Anual",
    type: "image",
    category: "Apresentações",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
    description: "Palco onde os alunos vivem a experiência real de performance ao vivo com banda profissional de apoio."
  },
  {
    id: "gal3",
    title: "Estúdio de Gravação NASA",
    type: "image",
    category: "Estúdio",
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
    description: "Cabine acústica onde gravamos as apresentações dos alunos para análise técnica e material de portfólio."
  },
  {
    id: "gal4",
    title: "Aula Prática de Guitarra",
    type: "image",
    category: "Alunos",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    description: "Foco no desenvolvimento de postura e coordenação motora fina no braço do instrumento."
  },
  {
    id: "gal5",
    title: "Setup de Pedais e Efeitos",
    type: "image",
    category: "Estúdio",
    url: "https://images.unsplash.com/photo-1525201548912-c231bb2f5202?auto=format&fit=crop&q=80&w=800",
    description: "Estudo prático de timbres e periféricos analógicos e digitais."
  },
  {
    id: "gal6",
    title: "Aluno em Ensaio Geral",
    type: "image",
    category: "Alunos",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    description: "Sessões integradas onde alunos de violão e guitarra tocam juntos em grupo."
  }
];

export const defaultBlogPosts: BlogPost[] = [
  {
    id: "post1",
    title: "Como planejar sua rotina de estudos de Violão para evoluir 3x mais rápido",
    excerpt: "Estudar 3 horas de forma desordenada é pior do que focar 30 minutos com o cronograma correto. Conheça o roteiro definitivo para turbinar seus dedos.",
    content: `Estudar um instrumento musical requer muito mais do que apenas repetição automática. Se você sente que seus estudos de violão ou guitarra travam em determinados pontos, o segredo provavelmente reside na **qualidade de foco e organização** do seu treino diário, e não apenas no número bruto de horas praticadas.

Aqui na NASA, recomendamos o seguinte método de 4 passos estruturado para quem tem apenas **30 a 45 minutos diários**:

### 1. Aquecimento Ativo (5 a 10 Minutos)
Antes de começar qualquer música, faça exercícios de digitação lentos com metrônomo (ex: 1-2-3-4 cromático nas primeiras cordas). Isso prepara suas articulações, regula o fluxo sanguíneo nas mãos e ajuda a fixar a sincronia entre a mão do ritmo (direita) e a mão das notas (esquerda).

### 2. Estudo de Técnica Específica (15 Minutos)
Escolha um obstáculo técnico para vencer. Pode ser a pestana, a transição ágil de acordes com dissonância, ou palhetada alternada em semicolcheias. Foque exclusivamente nessa micro-habilidade, repetindo-a em velocidade extremamente baixa, até que o movimento seja feito de forma limpa e sem esforço excessivo.

### 3. Teoria Prática e Percepção (10 Minutos)
Não decore apenas posições! Tente entender o que está tocando. Se está usando um acorde de Dó maior (C) e vai para Sol maior (G), identifique que essa é uma relação clássica de tônica e dominante (Graus I e V). Isso ajudará você a memorizar centenas de músicas no futuro de forma intuitiva.

### 4. Aplicação de Repertório (10 Minutos finais)
Por fim, recompense seu cérebro! Toque sua música atual do início ao fim. Evite parar no primeiro erro – tente manter o fluxo do ritmo. Deixe para corrigir a passagem difícil especificamente na sessão técnica do dia seguinte.

Gostou do roteiro? Venha agendar uma aula experimental presencial e vamos desenhar um cronograma personalizado de acordo com seu estilo favorito!`,
    category: "Técnica",
    author: "Prof. Sabino",
    date: "04 Jul 2026",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800",
    readTime: "4 min de leitura"
  },
  {
    id: "post2",
    title: "Modos Gregos Desmistificados: O guia prático para aplicar nos seus Solos",
    excerpt: "Você já ouviu falar de Jônio, Dórico, Frígio, Lídio, Mixolídio, Eólio e Lócrio e achou grego de verdade? Vamos explicar de forma simples e direta com exemplos de canções.",
    content: `Muitos guitarristas e violonistas tremem ao ouvir o termo **Modos Gregos**. Eles imaginam fórmulas matemáticas impossíveis, tabelas complexas de notas e decorebas sem fim. Mas a verdade é que os modos gregos nada mais são do que **o sabor e a cor** que você dá para uma escala maior comum.

### O que são de fato os Modos?
Imagine a escala de Dó Maior (C, D, E, F, G, A, B). Se você toca essas mesmas sete notas começando e terminando no próprio Dó (C), você está tocando o **Modo Jônio** (que é a própria escala maior).
Porém, se você tocar exatamente as mesmas notas da escala de Dó maior, mas começar e repousar na nota Ré (D, E, F, G, A, B, C, D), a atmosfera sonora muda drasticamente! A escala agora soa menor, melancólica, com uma sonoridade muito usada no Blues e no Jazz. Esse é o **Modo Dórico**.

### Breve 'Sabor' de Cada Modo:
* **Jônio (I grau):** Alegre, brilhante, resolutivo. Usado em 90% das músicas pop/rock alegres.
* **Dórico (II grau):** Menor, levemente jazzístico. Extremamente usado por Carlos Santana e em solos de Blues moderno.
* **Frígio (III grau):** Sonoridade espanhola, flamenca, misteriosa ou pesada no Heavy Metal.
* **Lídio (IV grau):** Sonoridade mística, espacial, de trilha sonora de ficção científica (muito usada por Joe Satriani e Steve Vai).
* **Mixolídio (V grau):** A clássica escala maior com sétima menor. Perfeita para MPB, Rock'n'roll clássico e solos com pegada de Blues/Nordeste.
* **Eólio (VI grau):** A escala menor natural. Triste, expressiva, emotiva. Clássica nas baladas de rock.
* **Lócrio (VII grau):** Tensa, sombria, instável. Pouco usada, mas vital para acordes meio-diminutos no Jazz.

### Como aplicar?
Em vez de estudar apenas os desenhos das escalas no braço da guitarra, pratique o seu **ouvido**. Toque um acorde estático, como Am7, e solfeje ou improvise notas focando na sexta maior (F#), que é a nota característica do modo Dórico. Você sentirá imediatamente o efeito se destacando no seu som.

Na NASA, nós ensinamos os modos de forma 100% auditiva antes de passar os desenhos de escala. Assim, você aprende a expressar sentimentos, e não apenas ligar pontos!`,
    category: "Teoria",
    author: "Diego Ramos",
    date: "28 Jun 2026",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
    readTime: "6 min de leitura"
  },
  {
    id: "post3",
    title: "Pestana sem dor: 3 truques mecânicos que ninguém te conta nas videoaulas",
    excerpt: "Sua pestana sai abafada ou dói a articulação do polegar? O problema não é falta de força, mas sim posicionamento físico e uso de alavanca.",
    content: `Quem está começando a estudar violão ou guitarra tem um inimigo em comum número um: o acorde de **Fá maior (F)** com pestana. A dor na mão e o som abafado ou trastejado desanimam muitos alunos novos.

Muitas videoaulas na internet dizem apenas: 'Pratique mais que uma hora sua mão ganha força'. Mas o segredo **não é força**, e sim a física mecânica do seu braço! Aqui estão três truques anatômicos que resolvem a pestana quase que instantaneamente:

### 1. Não use a parte 'gorda' e plana do dedo indicador
Se você colocar o dedo indicador totalmente reto, as cordas vão cair nas dobras das suas articulações (onde a carne é mais macia), fazendo a corda abafar. 
**A Solução:** Gire levemente o dedo indicador de lado (cerca de 30 graus para a esquerda). Use a lateral externa do dedo, onde há mais osso e a superfície é mais rígida. É necessário muito menos esforço para pressionar as cordas assim!

### 2. Puxe o violão contra o corpo (Efeito Alavanca)
Muitos alunos tentam fazer a pestana apertando o indicador contra o braço do instrumento fazendo uma pinça forte com o dedão. Isso fadiga e machuca o músculo do polegar rapidamente.
**A Solução:** Use o seu braço direito (que apoia o corpo do violão) para puxar o corpo do violão levemente em direção à sua costela. Isso fará com que o braço do violão vá para trás, pressionando as cordas contra o seu dedo indicador esquerdo sem que você precise forçar o dedão! É uma alavanca física pura.

### 3. Posicione o indicador colado no traste
Sempre posicione a pestana o mais próximo possível do ferrinho (traste) do lado direito da casa (para destros). Quanto mais longe do traste (em direção à tarraxa), mais força você terá que fazer para evitar o trastejo abafado.

Se você colocar esses três truques em prática juntos, seu Fá Maior vai soar limpo em poucos minutos de ajuste. Venha testar isso presencialmente conosco!`,
    category: "Técnica",
    author: "Prof. Sabino",
    date: "15 Jun 2026",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    readTime: "5 min de leitura"
  }
];

export const defaultFAQs: FAQItem[] = [
  {
    id: "faq1",
    category: "Aulas",
    question: "Preciso ter o meu próprio instrumento para começar as aulas?",
    answer: "Nas aulas presenciais na NASA, nós disponibilizamos violões e guitarras de altíssima qualidade para você utilizar sem custo adicional! No entanto, para estudar e praticar em casa entre uma aula e outra, é altamente recomendável que você adquira o seu próprio instrumento. Nossos professores prestam assessoria gratuita para ajudar você a escolher o melhor instrumento de acordo com seu orçamento."
  },
  {
    id: "faq2",
    category: "Matrícula",
    question: "Como funciona a aula experimental gratuita?",
    answer: "A aula experimental é um encontro individual de 40 a 50 minutos com o professor. Nós avaliamos seu nível atual (mesmo que seja zero absoluto), entendemos suas preferências de repertório e objetivos musicais, e você já sai tocando seu primeiro padrão ou acorde na hora! É a melhor forma de conhecer nossa metodologia exclusiva sem compromisso."
  },
  {
    id: "faq3",
    category: "Metodologia",
    question: "Quanto tempo demora para aprender a tocar as primeiras músicas?",
    answer: "Com a metodologia da NASA, a grande maioria dos alunos iniciantes consegue tocar sua primeira música simplificada com ritmo e acordes básicos em até 4 semanas de estudo dedicado. Para solos e técnicas mais elaboradas, o desenvolvimento costuma se consolidar em torno de 3 a 6 meses."
  },
  {
    id: "faq4",
    category: "Aulas",
    question: "As aulas são em grupo ou individuais?",
    answer: "Oferecemos ambas as modalidades! Nosso foco principal é o atendimento individual, garantindo que o cronograma ande na velocidade exata do aluno. No entanto, também temos sessões em grupos pequenos (máximo de 3 alunos) e workshops coletivos mensais para incentivar a interação social e a prática de tocar junto com outras pessoas."
  },
  {
    id: "faq5",
    category: "Matrícula",
    question: "Quais são as formas de pagamento disponíveis?",
    answer: "Aceitamos Cartões de Crédito (com recorrência mensal que não consome todo o limite do seu cartão), Pix, Transferência Bancária ou Boleto. Para os planos semestrais e anuais, oferecemos descontos atrativos nas mensalidades."
  },
  {
    id: "faq6",
    category: "Geral",
    question: "E se eu precisar faltar a uma aula agendada?",
    answer: "Pedimos apenas que nos avise com pelo menos 24 horas de antecedência. Dessa forma, você poderá repor a aula sem qualquer prejuízo em outro horário acordado com o professor dentro do mesmo mês corrente."
  }
];

export const defaultStudyMaterials: StudyMaterial[] = [
  {
    id: "mat1",
    title: "Apostila Básica de Acordes e Postura",
    type: "pdf",
    category: "Teoria",
    url: "#",
    description: "PDF completo contendo postura ergonômica, posicionamento das mãos, afinação passo a passo e o dicionário com os 24 acordes mais usados na música pop e MPB."
  },
  {
    id: "mat2",
    title: "Videoaula: Domando a Pestana em 3 Passos",
    type: "video",
    category: "Exercícios",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Treinamento em vídeo com closes detalhados mostrando o uso da alavanca e rotação do indicador para tirar som limpo sem dores no polegar."
  },
  {
    id: "mat3",
    title: "Ficha de Exercícios: Independência de Dedos 1-2-3-4",
    type: "exercise",
    category: "Exercícios",
    url: "#",
    description: "Cronograma de treino físico diário para ganho de agilidade, sincronia de palhetada alternada e força no quarto dedo (mínimo)."
  },
  {
    id: "mat4",
    title: "E-book: Introdução ao Campo Harmônico Maior",
    type: "pdf",
    category: "Teoria",
    url: "#",
    description: "Aprenda a tirar músicas de ouvido entendendo as regras das famílias de acordes maiores, menores e diminutos."
  },
  {
    id: "mat5",
    title: "Videoaula: Escala Pentatônica e Primeiros Licks de Blues",
    type: "video",
    category: "Guitarra",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Videoaula exclusiva de improvisação desvendando o padrão número 1 da pentatônica e técnicas de vibrato e bend de blues."
  }
];

export const defaultAnnouncements: Announcement[] = [
  {
    id: "ann1",
    title: "Inscrições abertas para o Recital de Inverno 2026",
    content: "Alunos de todos os níveis já podem se inscrever na secretaria para participar do nosso Recital de Inverno que ocorrerá em Agosto. Venha viver a experiência de tocar com uma banda profissional de apoio em um palco profissional de verdade!",
    date: "04 Jul 2026",
    urgent: true
  },
  {
    id: "ann2",
    title: "Workshop Gratuito: Timbragem Fina de Pedais e Amps",
    content: "No próximo sábado, às 14:00, teremos um workshop presencial com o Prof. Diego Ramos ensinando como regular compressores, drives, delays e simulações digitais para extrair o timbre perfeito.",
    date: "01 Jul 2026",
    urgent: false
  }
];

export const defaultClassCalendar: ClassCalendarEvent[] = [
  {
    id: "cal1",
    title: "Sua Aula Semanal de Violão",
    date: "Toda Terça-feira",
    time: "19:00 - 19:50",
    type: "Prática",
    teacherName: "Prof. Sabino"
  },
  {
    id: "cal2",
    title: "Masterclass de Teoria e Campo Harmônico",
    date: "Sábado, 11 Jul 2026",
    time: "10:00 - 12:00",
    type: "Masterclass",
    teacherName: "Prof. Sabino"
  },
  {
    id: "cal3",
    title: "Workshop de Palhetada Sweep",
    date: "Sábado, 18 Jul 2026",
    time: "14:00 - 16:00",
    type: "Recital",
    teacherName: "Diego Ramos"
  }
];
