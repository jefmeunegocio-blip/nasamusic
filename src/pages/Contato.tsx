import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SchoolConfig } from '../types';
import { MapPin, Phone, Mail, Clock, MessageSquare, Instagram, Facebook, Youtube, Send, Sparkles, Check } from 'lucide-react';

interface ContactProps {
  config: SchoolConfig;
}

interface FormInputs {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function Contact({ config }: ContactProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    setIsSubmitting(true);
    // Simulate API form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      reset();
    }, 1800);
  };

  const formattedPhone = config.whatsapp.replace(/\D/g, '');
  const whatsappLink = `https://api.whatsapp.com/send?phone=${formattedPhone}&text=Olá! Preenchi o formulário no site e gostaria de agendar uma aula experimental de violão ou guitarra.`;

  return (
    <div className="relative pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
            Contato
          </span>
          <h1 className="font-poppins font-black text-4xl text-white tracking-tight mt-2">
            Fale Conosco
          </h1>
          <p className="text-neutral-400 mt-4 text-sm font-sans">
            Tem alguma dúvida ou quer agendar sua aula experimental gratuita? Envie uma mensagem pelo formulário ou nos chame diretamente no WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* SECTION A: CONTACT INFO (4 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="font-poppins font-black text-lg text-white">Informações de Contato</h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="h-5 w-5 text-brand-light shrink-0 mt-0.5" />
                  <div>
                    <p className="font-poppins font-bold text-white">Nossa Sede</p>
                    <p className="text-xs text-neutral-400 mt-1">{config.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Phone className="h-5 w-5 text-brand-light shrink-0 mt-0.5" />
                  <div>
                    <p className="font-poppins font-bold text-white">Telefone fixo / Whatsapp</p>
                    <p className="text-xs text-neutral-400 mt-1 font-mono">{config.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="h-5 w-5 text-brand-light shrink-0 mt-0.5" />
                  <div>
                    <p className="font-poppins font-bold text-white">E-mail de Suporte</p>
                    <p className="text-xs text-neutral-400 mt-1 font-mono">{config.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="h-5 w-5 text-brand-light shrink-0 mt-0.5" />
                  <div>
                    <p className="font-poppins font-bold text-white">Horário de Atendimento</p>
                    <p className="text-xs text-neutral-400 mt-1">Segunda a Sexta: 08:00 às 21:00<br />Sábados: 08:00 às 17:00</p>
                  </div>
                </div>
              </div>

              <hr className="border-neutral-900" />

              {/* Direct WhatsApp button */}
              <div>
                <p className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 mb-3">Atendimento imediato</p>
                <a
                  href={`https://api.whatsapp.com/send?phone=${formattedPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-full text-xs font-bold font-poppins shadow-md shadow-green-500/10 transition-colors"
                >
                  <MessageSquare className="h-4.5 w-4.5 fill-current" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Social media connections card */}
            <div className="glass-panel p-6 rounded-2xl flex items-center justify-between text-xs text-neutral-400">
              <span className="font-mono">Siga a NASA:</span>
              <div className="flex space-x-3 text-neutral-300">
                <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-light transition-colors"><Instagram className="h-4.5 w-4.5" /></a>
                <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-light transition-colors"><Facebook className="h-4.5 w-4.5" /></a>
                <a href={config.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-brand-light transition-colors"><Youtube className="h-4.5 w-4.5" /></a>
              </div>
            </div>
          </div>

          {/* SECTION B: VALIDATED CONTACT FORM (7 Columns) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-neutral-900">
            {isSuccess ? (
              <div className="text-center py-12 space-y-6">
                <div className="h-14 w-14 rounded-full bg-green-950/40 border border-green-500/20 flex items-center justify-center text-green-400 mx-auto animate-bounce">
                  <Check className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-poppins font-black text-xl text-white">Mensagem Enviada!</h3>
                  <p className="text-xs text-neutral-400 mt-2 max-w-md mx-auto leading-relaxed">
                    Agradecemos seu contato. Suas informações foram validadas com sucesso. Nossa secretaria ou equipe pedagógica responderá em até 2 horas.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#161616] border border-neutral-800 text-xs font-bold text-white hover:bg-neutral-800 transition-colors"
                  >
                    Enviar nova mensagem
                  </button>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-green-500 text-xs font-bold text-white hover:bg-green-600 transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <MessageSquare className="h-4 w-4 fill-current" />
                    <span>Chamar no WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <h3 className="font-poppins font-black text-lg text-white">Formulário de Atendimento</h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Preencha os campos abaixo com dados reais para agendar seu encontro de música.</p>
                </div>

                <hr className="border-neutral-900" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      {...register("name", { 
                        required: "Por favor, insira seu nome completo",
                        minLength: { value: 3, message: "O nome deve conter pelo menos 3 caracteres" }
                      })}
                      placeholder="Ex: Pedro de Souza"
                      className={`w-full bg-[#161616] border rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors ${
                        errors.name ? 'border-brand-danger focus:border-brand-danger' : 'border-neutral-800 focus:border-brand-accent'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[10px] text-brand-danger font-sans leading-none mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                      Telefone / Celular (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      {...register("phone", { 
                        required: "Por favor, insira um número de telefone para contato",
                        pattern: {
                          value: /^\(?[1-9]{2}\)?\s?[9]?[0-9]{4}-?[0-9]{4}$/,
                          message: "Insira um formato válido de celular. Ex: (11) 96280-3599"
                        }
                      })}
                      placeholder="Ex: (11) 96280-3599"
                      className={`w-full bg-[#161616] border rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors ${
                        errors.phone ? 'border-brand-danger focus:border-brand-danger' : 'border-neutral-800 focus:border-brand-accent'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-brand-danger font-sans leading-none mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Endereço de E-mail
                  </label>
                  <input
                    type="email"
                    {...register("email", { 
                      required: "E-mail de contato é obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "E-mail de contato inválido"
                      }
                    })}
                    placeholder="Ex: pedro@email.com"
                    className={`w-full bg-[#161616] border rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors ${
                      errors.email ? 'border-brand-danger focus:border-brand-danger' : 'border-neutral-800 focus:border-brand-accent'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-brand-danger font-sans leading-none mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Mensagem / Instrumento & Nível
                  </label>
                  <textarea
                    rows={4}
                    {...register("message", { 
                      required: "Escreva uma breve mensagem detalhando qual instrumento quer aprender e se tem nível iniciante ou avançado",
                      minLength: { value: 10, message: "Sua mensagem deve possuir ao menos 10 caracteres" }
                    })}
                    placeholder="Ex: Gostaria de agendar uma aula experimental de violão iniciante para a próxima terça-feira às 19:00..."
                    className={`w-full bg-[#161616] border rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors resize-none ${
                      errors.message ? 'border-brand-danger focus:border-brand-danger' : 'border-neutral-800 focus:border-brand-accent'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[10px] text-brand-danger font-sans leading-none mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white font-poppins font-bold text-xs py-3.5 rounded-full flex items-center justify-center space-x-2 shadow-lg shadow-brand-accent/15 hover:opacity-95 active:scale-99 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Validando & Enviando...</span>
                    </span>
                  ) : (
                    <>
                      <span>Enviar Mensagem</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Embedded Interactive Map section */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-light uppercase">
              Localização Física
            </span>
            <h2 className="font-poppins font-black text-2xl text-white tracking-tight mt-1">
              Visite Nosso Estúdio
            </h2>
            <p className="text-neutral-400 mt-2 text-xs font-sans">
              Estamos situados em Diadema, com infraestrutura climatizada de ponta.
            </p>
          </div>

          <div className="h-96 w-full rounded-3xl overflow-hidden border border-neutral-900 shadow-xl relative">
            <iframe
              title="NASA Diadema Localização Mapa"
              src={config.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
