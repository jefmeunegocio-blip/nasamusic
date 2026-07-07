export interface SchoolConfig {
  logoName: string;
  schoolName: string;
  slogan: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  phone: string;
  email: string;
  address: string;
  mapsEmbedUrl: string;
  // Dynamic customizable elements
  heroImage?: string;
  aboutTitle?: string;
  aboutSubtitle?: string;
  aboutText1?: string;
  aboutText2?: string;
  aboutText3?: string;
  aboutImage?: string;
  missionText?: string;
  visionText?: string;
  valuesText?: string;
}

export interface Course {
  id: string;
  name: string;
  instrument: 'violao' | 'guitarra' | 'ambos';
  description: string;
  contentList: string[];
  image: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos os níveis';
  duration: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  category: 'Aulas' | 'Apresentações' | 'Estúdio' | 'Alunos';
  url: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Técnica' | 'Teoria' | 'Repertório' | 'Equipamento' | 'Eventos';
  author: string;
  date: string;
  image: string;
  readTime: string;
}

export interface FAQItem {
  id: string;
  category: 'Aulas' | 'Matrícula' | 'Metodologia' | 'Geral';
  question: string;
  answer: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'exercise';
  url: string;
  category: 'Violão' | 'Guitarra' | 'Teoria' | 'Exercícios';
  description: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  urgent: boolean;
}

export interface ClassCalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Prática' | 'Teórica' | 'Masterclass' | 'Recital';
  teacherName: string;
}
