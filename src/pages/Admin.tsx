import React, { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import ImageUploader from '../components/ImageUploader';
import { SchoolConfig, Course, Plan, Teacher, GalleryItem, BlogPost, FAQItem, StudyMaterial, Announcement } from '../types';
import { 
  Lock, Settings, BarChart2, ShieldCheck, Save, Trash, Plus, Check, X,
  Globe, Phone, Mail, MapPin, Layers, Award, Image as ImageIcon, BookOpen, HelpCircle, AlertCircle, LogOut
} from 'lucide-react';

interface AdminProps {
  config: SchoolConfig;
  onUpdateConfig: (newConfig: SchoolConfig) => void;
  courses: Course[];
  onUpdateCourses: (newCourses: Course[]) => void;
  plans: Plan[];
  onUpdatePlans: (newPlans: Plan[]) => void;
  teachers: Teacher[];
  onUpdateTeachers: (newTeachers: Teacher[]) => void;
  gallery: GalleryItem[];
  onUpdateGallery: (newGallery: GalleryItem[]) => void;
  blogPosts: BlogPost[];
  onUpdateBlogPosts: (newPosts: BlogPost[]) => void;
  faqs: FAQItem[];
  onUpdateFAQs: (newFAQs: FAQItem[]) => void;
  materials: StudyMaterial[];
  onUpdateMaterials: (newMaterials: StudyMaterial[]) => void;
  announcements: Announcement[];
  onUpdateAnnouncements: (newAnnouncements: Announcement[]) => void;
}

export default function Admin({
  config, onUpdateConfig,
  courses, onUpdateCourses,
  plans, onUpdatePlans,
  teachers, onUpdateTeachers,
  gallery, onUpdateGallery,
  blogPosts, onUpdateBlogPosts,
  faqs, onUpdateFAQs,
  materials, onUpdateMaterials,
  announcements, onUpdateAnnouncements
}: AdminProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState('admin@nasa.com');
  const [password, setPassword] = useState('nasa2026');
  const [activeTab, setActiveTab] = useState<'metrics' | 'config' | 'courses' | 'plans' | 'teachers' | 'gallery'>('metrics');

  // Load and save state updates helper triggers
  useEffect(() => {
    const checkLogin = () => {
      setIsLogged(localStorage.getItem('nasa_admin_logged') === 'true');
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'nasa2026') {
      localStorage.setItem('nasa_admin_logged', 'true');
      setIsLogged(true);
      window.dispatchEvent(new Event('storage'));
    } else {
      alert('Senha incorreta! Use "nasa2026" para acessar.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('nasa_admin_logged');
    setIsLogged(false);
    window.dispatchEvent(new Event('storage'));
  };

  // EDIT STATE FOR CONFIG
  const [editConfig, setEditConfig] = useState<SchoolConfig>({ ...config });
  useEffect(() => {
    setEditConfig({ ...config });
  }, [config]);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveConfig(editConfig);
    onUpdateConfig(editConfig);
    alert('Configurações salvas com sucesso!');
  };

  // EDIT STATE FOR COURSES
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const handleEditCourse = (course: Course | null) => {
    if (course === null) {
      setEditingCourse({ id: 'course_' + Date.now(), name: '', instrument: 'violao', description: '', level: 'Todos os níveis', duration: '12 meses', image: '', contentList: [] });
    } else {
      setEditingCourse({ ...course });
    }
  };
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      const c = editingCourse as Course;
      dbService.saveCourse(c);
      onUpdateCourses(dbService.getCourses());
      setEditingCourse(null);
      alert('Curso salvo com sucesso!');
    }
  };
  const handleDeleteCourse = (id: string) => {
    if (confirm('Tem certeza que deseja remover este curso?')) {
      dbService.deleteCourse(id);
      onUpdateCourses(dbService.getCourses());
    }
  };

  // EDIT STATE FOR PLANS
  const [editingPlan, setEditingPlan] = useState<Partial<Plan> | null>(null);
  const handleEditPlan = (plan: Plan | null) => {
    if (plan === null) {
      setEditingPlan({ id: 'plan_' + Date.now(), name: '', price: 'R$ 250', period: 'mês', features: [], popular: false });
    } else {
      setEditingPlan({ ...plan });
    }
  };
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlan) {
      const p = editingPlan as Plan;
      dbService.savePlan(p);
      onUpdatePlans(dbService.getPlans());
      setEditingPlan(null);
      alert('Plano salvo!');
    }
  };
  const handleDeletePlan = (id: string) => {
    if (confirm('Tem certeza?')) {
      dbService.deletePlan(id);
      onUpdatePlans(dbService.getPlans());
    }
  };

  // EDIT STATE FOR TEACHERS
  const [editingTeacher, setEditingTeacher] = useState<Partial<Teacher> | null>(null);
  const handleEditTeacher = (t: Teacher | null) => {
    if (t === null) {
      setEditingTeacher({ id: 'teacher_' + Date.now(), name: '', role: '', bio: '', specialties: [], image: '' });
    } else {
      setEditingTeacher({ ...t });
    }
  };
  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTeacher) {
      const t = editingTeacher as Teacher;
      dbService.saveTeacher(t);
      onUpdateTeachers(dbService.getTeachers());
      setEditingTeacher(null);
      alert('Professor salvo!');
    }
  };
  const handleDeleteTeacher = (id: string) => {
    if (confirm('Deseja excluir este professor?')) {
      dbService.deleteTeacher(id);
      onUpdateTeachers(dbService.getTeachers());
    }
  };

  // EDIT STATE FOR GALLERY
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);
  const handleEditGallery = (g: GalleryItem | null) => {
    if (g === null) {
      setEditingGallery({ id: 'gal_' + Date.now(), title: '', type: 'image', category: 'Aulas', url: '', description: '' });
    } else {
      setEditingGallery({ ...g });
    }
  };
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGallery) {
      const g = editingGallery as GalleryItem;
      dbService.saveGalleryItem(g);
      onUpdateGallery(dbService.getGallery());
      setEditingGallery(null);
      alert('Item da Galeria salvo!');
    }
  };
  const handleDeleteGallery = (id: string) => {
    if (confirm('Deseja excluir?')) {
      dbService.deleteGalleryItem(id);
      onUpdateGallery(dbService.getGallery());
    }
  };

  // EDIT STATE FOR BLOG
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const handleEditPost = (p: BlogPost | null) => {
    if (p === null) {
      setEditingPost({ id: 'post_' + Date.now(), title: '', excerpt: '', content: '', category: 'Técnica', author: 'Prof. Sabino', date: '04 Jul 2026', image: '', readTime: '5 min' });
    } else {
      setEditingPost({ ...p });
    }
  };
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      const p = editingPost as BlogPost;
      dbService.saveBlogPost(p);
      onUpdateBlogPosts(dbService.getBlogPosts());
      setEditingPost(null);
      alert('Postagem de Blog salva!');
    }
  };
  const handleDeletePost = (id: string) => {
    if (confirm('Deseja remover este post?')) {
      dbService.deleteBlogPost(id);
      onUpdateBlogPosts(dbService.getBlogPosts());
    }
  };

  // EDIT STATE FOR FAQ
  const [editingFAQ, setEditingFAQ] = useState<Partial<FAQItem> | null>(null);
  const handleEditFAQ = (f: FAQItem | null) => {
    if (f === null) {
      setEditingFAQ({ id: 'faq_' + Date.now(), category: 'Aulas', question: '', answer: '' });
    } else {
      setEditingFAQ({ ...f });
    }
  };
  const handleSaveFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFAQ) {
      const f = editingFAQ as FAQItem;
      dbService.saveFAQ(f);
      onUpdateFAQs(dbService.getFAQs());
      setEditingFAQ(null);
      alert('FAQ salva!');
    }
  };
  const handleDeleteFAQ = (id: string) => {
    if (confirm('Deseja remover?')) {
      dbService.deleteFAQ(id);
      onUpdateFAQs(dbService.getFAQs());
    }
  };

  const handleRestoreDefaults = () => {
    if (confirm('Atenção: Isso reverterá TODOS os textos e cadastros aos padrões originais da escola NASA. Continuar?')) {
      dbService.resetAll();
      onUpdateConfig(dbService.getConfig());
      onUpdateCourses(dbService.getCourses());
      onUpdatePlans(dbService.getPlans());
      onUpdateTeachers(dbService.getTeachers());
      onUpdateGallery(dbService.getGallery());
      onUpdateBlogPosts(dbService.getBlogPosts());
      onUpdateFAQs(dbService.getFAQs());
      onUpdateMaterials(dbService.getStudyMaterials());
      onUpdateAnnouncements(dbService.getAnnouncements());
      alert('Dados restaurados com sucesso! Recarregue ou navegue pelas páginas.');
    }
  };

  // LOGIN SCREEN
  if (!isLogged) {
    return (
      <div className="relative pt-32 pb-24 px-4 flex items-center justify-center min-h-[85vh]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-64 w-64 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="glass-panel border border-purple-500/15 p-8 rounded-3xl max-w-sm w-full space-y-6 relative z-10 shadow-2xl">
          <div className="text-center">
            <div className="h-10 w-10 bg-purple-950/40 border border-purple-500/20 text-amber-500 flex items-center justify-center rounded-xl mx-auto mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="font-poppins font-black text-xl text-white">Painel Administrativo</h2>
            <p className="text-xs text-neutral-400 mt-1">NASA – Núcleo de Artes Sabino</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Administrador
              </label>
              <input
                type="email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent transition-colors animate-none"
                placeholder="admin@nasa.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Senha Administrativa
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white font-poppins font-bold text-xs py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Autenticar Painel
            </button>
          </form>

          {/* Helper Credentials Banner */}
          <div className="bg-[#161616] border border-purple-950/30 rounded-xl p-3 text-[10px] text-neutral-400 font-mono space-y-1">
            <p className="font-semibold text-amber-500 text-center uppercase">Acesso Demonstrativo:</p>
            <p><strong>Senha:</strong> nasa2026</p>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED-IN ADMIN CONSOLE
  return (
    <div className="relative pt-24 pb-20 px-4 min-h-screen text-neutral-300">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP BOARD */}
        <div className="glass-panel p-6 rounded-3xl border border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="h-10 w-10 bg-purple-950/40 border border-purple-500/20 text-brand-light flex items-center justify-center rounded-xl">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-poppins font-black text-lg text-white">Consola de Administração de Conteúdos</h2>
              <p className="text-[10px] text-neutral-400 font-mono">Status: Conexão Local Storage Ativa (Simulador Firestore)</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRestoreDefaults}
              className="px-4 py-2 border border-brand-danger/30 hover:border-brand-danger bg-brand-danger/5 hover:bg-brand-danger/10 text-brand-danger rounded-full text-xs font-bold font-poppins transition-colors"
              title="Apagar modificações locais e voltar ao padrão"
            >
              Restaurar Padrão NASA
            </button>
            <button
              onClick={handleLogout}
              className="p-2 bg-[#161616] hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full transition-colors"
              title="Sair do Administrador"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* TABS CONTROLS */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'metrics', label: 'Estatísticas', icon: BarChart2 },
            { id: 'config', label: 'Customização de Páginas & Dados', icon: Globe },
            { id: 'courses', label: 'Cursos', icon: Layers },
            { id: 'plans', label: 'Planos', icon: Award },
            { id: 'teachers', label: 'Professores', icon: ShieldCheck },
            { id: 'gallery', label: 'Galeria', icon: ImageIcon }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setEditingCourse(null); setEditingPlan(null); setEditingTeacher(null); setEditingGallery(null); setEditingPost(null); setEditingFAQ(null); }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-bold font-poppins transition-colors ${
                  isActive 
                    ? 'bg-brand-accent text-white shadow-md' 
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800/40'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* VIEW 1: METRICS WIDGET */}
        {activeTab === 'metrics' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <div className="glass-panel p-6 rounded-2xl border border-neutral-900 space-y-2">
              <p className="text-[10px] font-mono text-neutral-500 uppercase">Cursos Cadastrados</p>
              <p className="font-poppins font-black text-3xl text-white">{courses.length}</p>
              <p className="text-[10.5px] text-neutral-400">Violão e Guitarra</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-neutral-900 space-y-2">
              <p className="text-[10px] font-mono text-neutral-500 uppercase">Planos Ativos</p>
              <p className="font-poppins font-black text-3xl text-white">{plans.length}</p>
              <p className="text-[10.5px] text-neutral-400">Trimestral, Semestral e Anual</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-neutral-900 space-y-2">
              <p className="text-[10px] font-mono text-neutral-500 uppercase">Professores na Equipe</p>
              <p className="font-poppins font-black text-3xl text-white">{teachers.length}</p>
              <p className="text-[10.5px] text-neutral-400">Profissionais qualificados</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-neutral-900 space-y-2">
              <p className="text-[10px] font-mono text-neutral-500 uppercase">Galeria de Mídias</p>
              <p className="font-poppins font-black text-3xl text-white">{gallery.length}</p>
              <p className="text-[10.5px] text-neutral-400">Fotos e vídeos reais da escola</p>
            </div>
          </div>
        )}

        {/* VIEW 2: SCHOOL CONFIGURATION EDITOR */}
        {activeTab === 'config' && (
          <form onSubmit={handleSaveConfig} className="glass-panel p-6 sm:p-8 rounded-3xl border border-neutral-900 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4">
              <div>
                <h3 className="font-poppins font-black text-base text-white">Editar Dados da Escola</h3>
                <p className="text-[11px] text-neutral-400">Modifique o endereço, telefones, redes sociais e slogan do rodapé.</p>
              </div>
              <button 
                type="submit"
                className="flex items-center space-x-1.5 bg-gradient-to-r from-brand-primary to-brand-accent text-white px-5 py-2.5 rounded-full text-xs font-bold font-poppins hover:opacity-90"
              >
                <Save className="h-4 w-4" />
                <span>Salvar Tudo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Logo Name</label>
                <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.logoName} onChange={(e) => setEditConfig({ ...editConfig, logoName: e.target.value })} />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">School Name</label>
                <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.schoolName} onChange={(e) => setEditConfig({ ...editConfig, schoolName: e.target.value })} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Slogan Principal</label>
              <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.slogan} onChange={(e) => setEditConfig({ ...editConfig, slogan: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">WhatsApp Telefone (Apenas dígitos)</label>
                <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.whatsapp} onChange={(e) => setEditConfig({ ...editConfig, whatsapp: e.target.value })} />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Telefone Exibido</label>
                <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.phone} onChange={(e) => setEditConfig({ ...editConfig, phone: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Instagram URL</label>
                <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.instagram} onChange={(e) => setEditConfig({ ...editConfig, instagram: e.target.value })} />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">E-mail Acadêmico</label>
                <input type="email" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.email} onChange={(e) => setEditConfig({ ...editConfig, email: e.target.value })} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Endereço Físico Completo</label>
              <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.address} onChange={(e) => setEditConfig({ ...editConfig, address: e.target.value })} />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Google Maps Embed Iframe URL src</label>
              <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white font-mono" value={editConfig.mapsEmbedUrl} onChange={(e) => setEditConfig({ ...editConfig, mapsEmbedUrl: e.target.value })} />
            </div>

            {/* SEÇÃO EXTRA DE CUSTOMIZAÇÃO DE IMAGENS E TEXTOS GERAIS */}
            <div className="border-t border-neutral-900 pt-6 mt-6 space-y-5">
              <h4 className="font-poppins font-black text-sm text-brand-light uppercase tracking-wider">
                Customização Visual & Textos de Páginas
              </h4>
              <p className="text-xs text-neutral-400 mt-1">Configure as principais fotos de fundo, títulos e parágrafos da sua escola.</p>

              <div className="space-y-6">
                <ImageUploader 
                  label="Imagem de Fundo (Hero - Home)" 
                  value={editConfig.heroImage || ''} 
                  onChange={(val) => setEditConfig({ ...editConfig, heroImage: val })} 
                />
                <ImageUploader 
                  label="Imagem Principal (Sobre Nós)" 
                  value={editConfig.aboutImage || ''} 
                  onChange={(val) => setEditConfig({ ...editConfig, aboutImage: val })} 
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Título do Banner Principal (Hero - Home)</label>
                <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.heroTitle} onChange={(e) => setEditConfig({ ...editConfig, heroTitle: e.target.value })} placeholder="Ex: Aprenda Violão e Guitarra com quem realmente ensina." />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Subtítulo do Banner Principal (Hero - Home)</label>
                <textarea rows={2} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white resize-none" value={editConfig.heroSubtitle} onChange={(e) => setEditConfig({ ...editConfig, heroSubtitle: e.target.value })} placeholder="Ex: Do iniciante ao avançado, desenvolva sua técnica..." />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Título Principal (Sobre Nós)</label>
                <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white" value={editConfig.aboutTitle || ''} onChange={(e) => setEditConfig({ ...editConfig, aboutTitle: e.target.value })} placeholder="Ex: Formando músicos de verdade desde 2006." />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Parágrafo de Introdução / Slogan (Sobre Nós)</label>
                <textarea rows={3} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white resize-none" value={editConfig.aboutSubtitle || ''} onChange={(e) => setEditConfig({ ...editConfig, aboutSubtitle: e.target.value })} placeholder="O Núcleo de Artes Sabino nasceu de uma insatisfação..." />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Corpo de Texto - Coluna 1 (Sobre Nós)</label>
                  <textarea rows={4} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white resize-none" value={editConfig.aboutText1 || ''} onChange={(e) => setEditConfig({ ...editConfig, aboutText1: e.target.value })} placeholder="Nossa proposta inovadora..." />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Corpo de Texto - Coluna 2 (Sobre Nós)</label>
                  <textarea rows={4} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white resize-none" value={editConfig.aboutText2 || ''} onChange={(e) => setEditConfig({ ...editConfig, aboutText2: e.target.value })} placeholder="Trabalhamos com turmas extremamente reduzidas..." />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-neutral-900 pt-5 mt-5">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Texto de Missão</label>
                  <textarea rows={3} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white resize-none" value={editConfig.missionText || ''} onChange={(e) => setEditConfig({ ...editConfig, missionText: e.target.value })} placeholder="Desmistificar o ensino de cordas..." />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Texto de Visão</label>
                  <textarea rows={3} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white resize-none" value={editConfig.visionText || ''} onChange={(e) => setEditConfig({ ...editConfig, visionText: e.target.value })} placeholder="Ser consolidada como..." />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Texto de Valores</label>
                  <textarea rows={3} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white resize-none" value={editConfig.valuesText || ''} onChange={(e) => setEditConfig({ ...editConfig, valuesText: e.target.value })} placeholder="Comprometimento com resultados..." />
                </div>
              </div>
            </div>
          </form>
        )}

        {/* VIEW 3: COURSES MANAGER */}
        {activeTab === 'courses' && (
          <div className="space-y-6 animate-fade-in">
            {editingCourse ? (
              <form onSubmit={handleSaveCourse} className="glass-panel p-6 rounded-3xl border border-neutral-900 space-y-5">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-poppins font-black text-sm text-white">
                    {editingCourse.name ? `Editar Curso: ${editingCourse.name}` : 'Cadastrar Novo Curso'}
                  </h3>
                  <button type="button" onClick={() => setEditingCourse(null)} className="text-xs text-neutral-400 hover:text-white">Cancelar</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Identificador único (ID)</label>
                    <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono" value={editingCourse.id} onChange={(e) => setEditingCourse({ ...editingCourse, id: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Nome do Curso</label>
                    <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white" value={editingCourse.name} onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })} required />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Descrição</label>
                  <textarea rows={3} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white resize-none" value={editingCourse.description} onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Instrumento</label>
                    <select className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white" value={editingCourse.instrument} onChange={(e) => setEditingCourse({ ...editingCourse, instrument: e.target.value as any })}>
                      <option value="violao">Violão</option>
                      <option value="guitarra">Guitarra</option>
                      <option value="ambos">Ambos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Nível recomendado</label>
                    <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white" value={editingCourse.level} onChange={(e) => setEditingCourse({ ...editingCourse, level: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Duração estimada</label>
                    <input type="text" className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white" value={editingCourse.duration} onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })} />
                  </div>
                </div>

                <ImageUploader 
                  label="Foto / Imagem de Capa do Curso" 
                  value={editingCourse.image} 
                  onChange={(val) => setEditingCourse({ ...editingCourse, image: val })} 
                />

                <div>
                  <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">Grade Curricular (Separar itens com vírgulas)</label>
                  <textarea rows={2} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white resize-none" value={editingCourse.contentList?.join(', ')} onChange={(e) => setEditingCourse({ ...editingCourse, contentList: e.target.value.split(',').map(s => s.trim()) })} />
                </div>

                <button type="submit" className="flex items-center space-x-1.5 bg-brand-accent text-white font-poppins font-bold text-xs px-6 py-3 rounded-full">
                  <Save className="h-4 w-4" />
                  <span>Salvar Curso</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins font-black text-base text-white">Lista de Cursos</h3>
                  <button onClick={() => handleEditCourse(null)} className="flex items-center space-x-1 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-light border border-brand-accent/20 px-4 py-2 rounded-full text-xs font-bold font-poppins">
                    <Plus className="h-4 w-4" />
                    <span>Adicionar Curso</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((c) => (
                    <div key={c.id} className="glass-panel p-5 rounded-2xl border border-neutral-900 flex justify-between items-center">
                      <div>
                        <h4 className="font-poppins font-bold text-sm text-white">{c.name}</h4>
                        <p className="text-[10px] text-neutral-400 font-mono uppercase mt-0.5">{c.instrument} • {c.level}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditCourse(c)} className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 rounded-lg text-xs font-semibold text-neutral-300">Editar</button>
                        <button onClick={() => handleDeleteCourse(c.id)} className="p-1.5 bg-red-950/20 hover:bg-red-950/40 rounded-lg text-red-400"><Trash className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: PLANS MANAGER */}
        {activeTab === 'plans' && (
          <div className="space-y-6 animate-fade-in">
            {editingPlan ? (
              <form onSubmit={handleSavePlan} className="glass-panel p-6 rounded-3xl border border-neutral-900 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-poppins font-black text-sm text-white">Editar Plano</h3>
                  <button type="button" onClick={() => setEditingPlan(null)} className="text-xs text-neutral-400">Voltar</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nome" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2 text-xs" value={editingPlan.name} onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })} required />
                  <input type="text" placeholder="Preço (Ex: R$ 250)" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2 text-xs" value={editingPlan.price} onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })} required />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="text-xs text-neutral-400 flex items-center space-x-2">
                    <input type="checkbox" checked={editingPlan.popular} onChange={(e) => setEditingPlan({ ...editingPlan, popular: e.target.checked })} />
                    <span>Destaque popular</span>
                  </label>
                </div>
                <div>
                  <textarea placeholder="Benefícios (Separados por vírgulas)" rows={3} className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2 text-xs text-white" value={editingPlan.features?.join(', ')} onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value.split(',').map(s => s.trim()) })} />
                </div>
                <button type="submit" className="bg-brand-accent text-white font-poppins font-bold text-xs px-6 py-2.5 rounded-full">Salvar Plano</button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins font-black text-base text-white">Tabela de Preços</h3>
                  <button onClick={() => handleEditPlan(null)} className="flex items-center space-x-1 bg-brand-primary/10 text-brand-light border border-brand-accent/20 px-4 py-2 rounded-full text-xs font-bold font-poppins"><Plus className="h-4 w-4" /><span>Novo Plano</span></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {plans.map((p) => (
                    <div key={p.id} className="glass-panel p-5 rounded-xl border border-neutral-900 flex flex-col justify-between h-40">
                      <div>
                        <h4 className="font-poppins font-bold text-sm text-white">{p.name}</h4>
                        <p className="text-sm font-black text-brand-light mt-1">{p.price}</p>
                      </div>
                      <div className="flex justify-end space-x-2 pt-4 border-t border-neutral-900">
                        <button onClick={() => handleEditPlan(p)} className="px-3 py-1 bg-neutral-900 text-xs text-neutral-300 rounded">Editar</button>
                        <button onClick={() => handleDeletePlan(p.id)} className="p-1 text-red-400"><Trash className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: TEACHERS MANAGER */}
        {activeTab === 'teachers' && (
          <div className="space-y-6 animate-fade-in">
            {editingTeacher ? (
              <form onSubmit={handleSaveTeacher} className="glass-panel p-6 rounded-3xl border border-neutral-900 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-poppins font-black text-sm text-white">Editar Professor</h3>
                  <button type="button" onClick={() => setEditingTeacher(null)} className="text-xs text-neutral-400">Voltar</button>
                </div>
                <input type="text" placeholder="Nome" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full" value={editingTeacher.name} onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })} required />
                <input type="text" placeholder="Papel / Cargo (Ex: Professor de Violão)" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full" value={editingTeacher.role} onChange={(e) => setEditingTeacher({ ...editingTeacher, role: e.target.value })} required />
                <textarea placeholder="Biografia resumida" rows={3} className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full resize-none" value={editingTeacher.bio} onChange={(e) => setEditingTeacher({ ...editingTeacher, bio: e.target.value })} />
                <input type="text" placeholder="Especialidades (separadas por vírgula)" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full" value={editingTeacher.specialties?.join(', ')} onChange={(e) => setEditingTeacher({ ...editingTeacher, specialties: e.target.value.split(',').map(s => s.trim()) })} />
                <ImageUploader 
                  label="Foto do Professor" 
                  value={editingTeacher.image} 
                  onChange={(val) => setEditingTeacher({ ...editingTeacher, image: val })} 
                />
                <button type="submit" className="bg-brand-accent text-white font-poppins font-bold text-xs px-6 py-2.5 rounded-full">Salvar</button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins font-black text-base text-white">Corpo Docente</h3>
                  <button onClick={() => handleEditTeacher(null)} className="bg-brand-primary/10 text-brand-light border border-brand-accent/20 px-4 py-2 rounded-full text-xs font-bold font-poppins"><Plus className="h-4 w-4" /><span>Cadastrar Professor</span></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {teachers.map((t) => (
                    <div key={t.id} className="glass-panel p-5 rounded-2xl border border-neutral-900 flex justify-between items-center">
                      <div>
                        <h4 className="font-poppins font-bold text-sm text-white">{t.name}</h4>
                        <p className="text-[10px] text-neutral-400 font-mono uppercase">{t.role}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditTeacher(t)} className="px-3 py-1 bg-neutral-900 text-xs rounded text-neutral-300">Editar</button>
                        <button onClick={() => handleDeleteTeacher(t.id)} className="p-1 text-red-400"><Trash className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 6: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fade-in">
            {editingGallery ? (
              <form onSubmit={handleSaveGallery} className="glass-panel p-6 rounded-3xl border border-neutral-900 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-poppins font-black text-sm text-white">Editar Galeria</h3>
                  <button type="button" onClick={() => setEditingGallery(null)} className="text-xs text-neutral-400">Voltar</button>
                </div>
                <input type="text" placeholder="Título" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full" value={editingGallery.title} onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })} required />
                <ImageUploader 
                  label="Foto / Imagem da Galeria" 
                  value={editingGallery.url} 
                  onChange={(val) => setEditingGallery({ ...editingGallery, url: val })} 
                />
                <div className="grid grid-cols-2 gap-4">
                  <select className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2 text-xs" value={editingGallery.category} onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value as any })}>
                    <option value="Aulas">Aulas</option>
                    <option value="Apresentações">Apresentações</option>
                    <option value="Estúdio">Estúdio</option>
                    <option value="Alunos">Alunos</option>
                  </select>
                </div>
                <input type="text" placeholder="Descrição curta" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full" value={editingGallery.description} onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })} />
                <button type="submit" className="bg-brand-accent text-white font-poppins font-bold text-xs px-6 py-2.5 rounded-full">Salvar Item</button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins font-black text-base text-white">Mídias e Espaços</h3>
                  <button onClick={() => handleEditGallery(null)} className="bg-brand-primary/10 text-brand-light border border-brand-accent/20 px-4 py-2 rounded-full text-xs font-bold font-poppins"><Plus className="h-4 w-4" /><span>Novo Item</span></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((g) => (
                    <div key={g.id} className="glass-panel p-5 rounded-xl border border-neutral-900 flex justify-between items-center">
                      <div>
                        <h4 className="font-poppins font-bold text-sm text-white">{g.title}</h4>
                        <p className="text-[10px] text-neutral-400 font-mono uppercase">{g.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditGallery(g)} className="px-3 py-1 bg-neutral-900 text-xs rounded text-neutral-300">Editar</button>
                        <button onClick={() => handleDeleteGallery(g.id)} className="p-1 text-red-400"><Trash className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 7: BLOG POSTS MANAGER */}
        {activeTab === 'blog' && (
          <div className="space-y-6 animate-fade-in">
            {editingPost ? (
              <form onSubmit={handleSavePost} className="glass-panel p-6 rounded-3xl border border-neutral-900 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-poppins font-black text-sm text-white">Editar Artigo</h3>
                  <button type="button" onClick={() => setEditingPost(null)} className="text-xs text-neutral-400">Voltar</button>
                </div>
                <input type="text" placeholder="Título do Artigo" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full" value={editingPost.title} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })} required />
                <input type="text" placeholder="Resumo curto" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full" value={editingPost.excerpt} onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })} required />
                <textarea placeholder="Conteúdo completo em markdown/texto" rows={8} className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full resize-none text-white font-sans" value={editingPost.content} onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })} required />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <select className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2 text-xs" value={editingPost.category} onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value as any })}>
                    <option value="Técnica">Técnica</option>
                    <option value="Teoria">Teoria</option>
                    <option value="Repertório">Repertório</option>
                    <option value="Equipamento">Equipamento</option>
                    <option value="Eventos">Eventos</option>
                  </select>
                  <input type="text" placeholder="Autor" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2 text-xs" value={editingPost.author} onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })} />
                  <input type="text" placeholder="Tempo Leitura (Ex: 5 min)" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2 text-xs" value={editingPost.readTime} onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })} />
                </div>
                <ImageUploader 
                  label="Imagem de Capa do Artigo" 
                  value={editingPost.image} 
                  onChange={(val) => setEditingPost({ ...editingPost, image: val })} 
                />
                <button type="submit" className="bg-brand-accent text-white font-poppins font-bold text-xs px-6 py-2.5 rounded-full">Salvar Publicação</button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins font-black text-base text-white">Artigos Publicados</h3>
                  <button onClick={() => handleEditPost(null)} className="bg-brand-primary/10 text-brand-light border border-brand-accent/20 px-4 py-2 rounded-full text-xs font-bold font-poppins"><Plus className="h-4 w-4" /><span>Novo Artigo</span></button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {blogPosts.map((p) => (
                    <div key={p.id} className="glass-panel p-5 rounded-xl border border-neutral-900 flex justify-between items-center">
                      <div>
                        <h4 className="font-poppins font-bold text-sm text-white">{p.title}</h4>
                        <p className="text-[10px] text-neutral-400 font-mono mt-0.5">Por {p.author} • {p.date}</p>
                      </div>
                      <div className="flex space-x-2 shrink-0">
                        <button onClick={() => handleEditPost(p)} className="px-3 py-1 bg-neutral-900 text-xs rounded text-neutral-300">Editar</button>
                        <button onClick={() => handleDeletePost(p.id)} className="p-1 text-red-400"><Trash className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 8: FAQs MANAGER */}
        {activeTab === 'faq' && (
          <div className="space-y-6 animate-fade-in">
            {editingFAQ ? (
              <form onSubmit={handleSaveFAQ} className="glass-panel p-6 rounded-3xl border border-neutral-900 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-poppins font-black text-sm text-white">Editar FAQ</h3>
                  <button type="button" onClick={() => setEditingFAQ(null)} className="text-xs text-neutral-400">Voltar</button>
                </div>
                <input type="text" placeholder="Pergunta" className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full" value={editingFAQ.question} onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })} required />
                <textarea placeholder="Resposta explicativa" rows={4} className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2.5 text-xs w-full resize-none" value={editingFAQ.answer} onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })} required />
                <select className="bg-[#161616] border border-neutral-800 rounded-xl px-4 py-2 text-xs w-full" value={editingFAQ.category} onChange={(e) => setEditingFAQ({ ...editingFAQ, category: e.target.value as any })}>
                  <option value="Aulas">Aulas</option>
                  <option value="Matrícula">Matrícula</option>
                  <option value="Metodologia">Metodologia</option>
                  <option value="Geral">Geral</option>
                </select>
                <button type="submit" className="bg-brand-accent text-white font-poppins font-bold text-xs px-6 py-2.5 rounded-full">Salvar FAQ</button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins font-black text-base text-white">Perguntas Frequentes</h3>
                  <button onClick={() => handleEditFAQ(null)} className="bg-brand-primary/10 text-brand-light border border-brand-accent/20 px-4 py-2 rounded-full text-xs font-bold font-poppins"><Plus className="h-4 w-4" /><span>Nova FAQ</span></button>
                </div>
                <div className="space-y-3">
                  {faqs.map((f) => (
                    <div key={f.id} className="glass-panel p-5 rounded-xl border border-neutral-900 flex justify-between items-center">
                      <div>
                        <h4 className="font-poppins font-bold text-sm text-white">{f.question}</h4>
                        <p className="text-[10px] text-neutral-400 font-mono uppercase mt-0.5">{f.category}</p>
                      </div>
                      <div className="flex space-x-2 shrink-0">
                        <button onClick={() => handleEditFAQ(f)} className="px-3 py-1 bg-neutral-900 text-xs rounded text-neutral-300">Editar</button>
                        <button onClick={() => handleDeleteFAQ(f.id)} className="p-1 text-red-400"><Trash className="h-4 w-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
