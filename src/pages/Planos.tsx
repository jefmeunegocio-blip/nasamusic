import React, { useState, useEffect } from 'react';
import { Plan, SchoolConfig } from '../types';
import { CheckCircle, ArrowRight, Award, Music, Sparkles, X, ShieldAlert, Edit2, Check } from 'lucide-react';
import { dbService } from '../services/db';

interface PlansPageProps {
  config: SchoolConfig;
  plans: Plan[];
}

export default function PlansPage({ config, plans }: PlansPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredCode, setRegisteredCode] = useState<string | null>(null);

  // Quick edit state for professors/admins
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState('');

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('nasa_admin_logged') === 'true');
    };
    checkAdmin();
    window.addEventListener('storage', checkAdmin);
    return () => window.removeEventListener('storage', checkAdmin);
  }, []);

  const handleSavePriceInline = (plan: Plan) => {
    if (!tempPrice.trim()) return;
    const updatedPlan: Plan = {
      ...plan,
      price: tempPrice.trim()
    };
    dbService.savePlan(updatedPlan);
    // Dispatch localstorage storage event to trigger reactivity in all tabs/components
    window.dispatchEvent(new Event('storage'));
    setEditingPlanId(null);
  };

  const handleOpenModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setRegisteredCode(null);
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
    setRegisteredCode(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    setIsSubmitting(true);
    // Simulate API registration call
    setTimeout(() => {
      setIsSubmitting(false);
      // Generate unique registration confirmation code
      const randCode = 'NASA-' + Math.floor(100000 + Math.random() * 900000);
      setRegisteredCode(randCode);
    }, 1500);
  };

  const whatsappUrl = (planName: string) => {
    return `https://api.whatsapp.com/send?phone=${config.whatsapp.replace(/\D/g, '')}&text=Olá! Gostaria de efetuar minha matrícula no ${planName} do Núcleo de Artes Sabino.`;
  };

  const featuresMatrix = [
    { name: "Aulas práticas individuais (50 min)", basic: "1 / semana", intermediate: "1 / semana", premium: "1 / semana" },
    { name: "Acesso à Área do Aluno com PDFs", basic: "✓", intermediate: "✓", premium: "✓" },
    { name: "Suporte via WhatsApp diretamente com o professor", basic: "✓", intermediate: "✓ (Prioritário)", premium: "✓ (Prioritário)" },
    { name: "Isenção total da taxa de matrícula", basic: "✗ (R$ 80)", intermediate: "✓ (Grátis)", premium: "✓ (Grátis)" },
    { name: "Material de apoio em vídeo bônus", basic: "✗", intermediate: "✓", premium: "✓" },
    { name: "Acesso livre ao estúdio de ensaio", basic: "✗", intermediate: "✓ (Agendado)", premium: "✓ (Ilimitado)" },
    { name: "Participação garantida em Recitais", basic: "✗", intermediate: "✓", premium: "✓" },
    { name: "Kit NASA de boas-vindas", basic: "✗", intermediate: "✗", premium: "✓ (Grátis)" },
    { name: "Desconto de 20% em Workshops externos", basic: "✗", intermediate: "✗", premium: "✓" },
    { name: "1 Aula bônus de Gravação de estúdio / ano", basic: "✗", intermediate: "✗", premium: "✓" }
  ];

  return (
    <div className="relative pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner de Edição Rápida para o Professor */}
        {isAdmin && (
          <div className="mb-8 p-4 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border border-brand-accent/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="p-2 bg-brand-accent/20 rounded-xl text-brand-light shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Modo de Edição Rápida Ativo (Olá, Professor!)</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Você pode alterar os valores dos planos diretamente clicando no botão de lápis ao lado do preço.</p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-brand-accent text-white px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
              Painel do Professor
            </span>
          </div>
        )}

        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
            Planos e Matrícula
          </span>
          <h1 className="font-poppins font-black text-4xl sm:text-5xl text-white tracking-tight mt-2">
            Nossos Planos de Ensino
          </h1>
          <p className="text-neutral-400 mt-4 text-sm font-sans">
            Selecione o formato que se alinha aos seus objetivos e à sua rotina semanal. Não cobramos taxa de adesão ou de cancelamento em planos longos.
          </p>
        </div>

        {/* Core Plans Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-stretch">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`glass-panel rounded-3xl p-8 flex flex-col justify-between relative h-full transition-all duration-300 ${
                plan.popular 
                  ? 'border-brand-accent shadow-2xl shadow-brand-primary/10 -translate-y-2' 
                  : 'border-neutral-900'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-accent text-white font-mono text-[9px] tracking-widest uppercase px-3.5 py-1 rounded-full font-bold shadow-md shadow-brand-accent/25">
                  Mais Recomendado
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-poppins font-black text-xl text-white tracking-tight">{plan.name}</h3>
                  
                  {editingPlanId === plan.id ? (
                    <div className="mt-4 flex items-center space-x-2">
                      <input
                        type="text"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(e.target.value)}
                        className="bg-[#161616] border border-brand-accent rounded-xl px-3 py-2 text-sm font-black text-white w-32 focus:outline-none focus:ring-1 focus:ring-brand-accent"
                        placeholder="Ex: R$ 250"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSavePriceInline(plan)}
                        className="p-2 bg-brand-primary hover:bg-brand-accent text-white rounded-lg transition-colors flex items-center justify-center"
                        title="Salvar valor"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingPlanId(null)}
                        className="p-2 bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors flex items-center justify-center"
                        title="Cancelar"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-baseline">
                        <span className="font-montserrat font-black text-4xl sm:text-5xl text-white">{plan.price}</span>
                        <span className="text-xs text-neutral-400 font-sans ml-1">/ {plan.period}</span>
                      </div>
                      
                      {isAdmin && (
                        <button
                          onClick={() => {
                            setEditingPlanId(plan.id);
                            setTempPrice(plan.price);
                          }}
                          className="p-2 bg-neutral-900 border border-neutral-800 hover:border-brand-accent/40 text-brand-light rounded-full transition-all group flex items-center justify-center"
                          title="Editar valor do plano"
                        >
                          <Edit2 className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <hr className="border-neutral-900" />

                {/* Features listing */}
                <ul className="space-y-4 text-xs text-neutral-300 font-sans">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-brand-light shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => handleOpenModal(plan)}
                  className={`flex items-center justify-center space-x-1.5 w-full py-4 rounded-full text-xs font-black font-poppins transition-transform duration-300 hover:scale-102 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg' 
                      : 'bg-white text-brand-dark hover:bg-neutral-200'
                  }`}
                >
                  <span>Matricule-se Online</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <a
                  href={whatsappUrl(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-1.5 w-full py-3 border border-neutral-800 hover:border-purple-500/20 rounded-full text-xs font-bold text-neutral-400 hover:text-white bg-neutral-900/40 transition-colors"
                >
                  <span>Matricular via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Comparative Matrix table */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
              Comparativo
            </span>
            <h2 className="font-poppins font-black text-2xl sm:text-3xl text-white tracking-tight mt-2">
              Qual plano é ideal para você?
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-neutral-900 glass-panel">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-900/70 border-b border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  <th className="p-5 font-bold font-poppins">Diferenciais e Benefícios</th>
                  <th className="p-5 font-bold font-poppins text-center">Trimestral</th>
                  <th className="p-5 font-bold font-poppins text-center text-brand-light">Semestral (Popular)</th>
                  <th className="p-5 font-bold font-poppins text-center">Anual (VIP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/60 font-sans text-neutral-300">
                {featuresMatrix.map((row, i) => (
                  <tr key={i} className="hover:bg-neutral-900/20 transition-colors">
                    <td className="p-5 font-medium text-neutral-200">{row.name}</td>
                    <td className={`p-5 text-center font-mono ${row.basic === '✗' ? 'text-neutral-600' : ''}`}>{row.basic}</td>
                    <td className="p-5 text-center font-mono text-brand-light font-semibold">{row.intermediate}</td>
                    <td className="p-5 text-center font-mono text-white">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MATRICULA MODAL POPUP */}
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
            <div 
              className="glass-panel border border-purple-500/25 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                title="Fechar"
              >
                <X className="h-5 w-5" />
              </button>

              {!registeredCode ? (
                // Form view
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-light uppercase font-bold">
                      Matrícula Online Simplificada
                    </span>
                    <h3 className="font-poppins font-black text-xl text-white mt-1">
                      Inscrição: {selectedPlan.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Insira seus dados para gerar seu código de reserva. Nossa secretaria entrará em contato para agendar o primeiro horário das aulas.
                    </p>
                  </div>

                  <hr className="border-neutral-900" />

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: João da Silva"
                        className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                        E-mail de Contato
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex: joao@email.com"
                        className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ex: (11) 96280-3599"
                        className="w-full bg-[#161616] border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-brand-accent transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white font-poppins font-bold text-xs py-3.5 rounded-full flex items-center justify-center space-x-1.5 hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processando Matrícula...</span>
                      </span>
                    ) : (
                      <>
                        <span>Confirmar Matrícula</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                // Success code view
                <div className="text-center space-y-6 py-4">
                  <div className="h-12 w-12 rounded-full bg-green-950/45 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto animate-bounce">
                    <Sparkles className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-poppins font-black text-xl text-white">Matrícula Pré-Confirmada!</h3>
                    <p className="text-xs text-neutral-400 mt-2">
                      Parabéns, <strong>{formData.name}</strong>! Sua solicitação de matrícula no plano <strong>{selectedPlan.name}</strong> foi recebida com sucesso.
                    </p>
                  </div>

                  {/* Code frame */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 font-mono">
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">Seu Código de Reserva</p>
                    <p className="text-lg font-black text-brand-light tracking-widest mt-1">{registeredCode}</p>
                  </div>

                  <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">
                    Nossa equipe pedagógica entrará em contato nas próximas 24 horas via WhatsApp (ou e-mail) para fechar o contrato físico e agendar seu primeiro horário semanal. Guarde este código de reserva.
                  </p>

                  <button
                    onClick={handleCloseModal}
                    className="w-full bg-[#161616] hover:bg-neutral-800 border border-neutral-800 text-white font-poppins font-bold text-xs py-3 rounded-full"
                  >
                    Fechar e Voltar
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
