'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Play, Zap, Instagram, Linkedin, Mail, ArrowUpRight, Check, Sparkles, Camera, Image as ImageIcon, Filter, Clock, Calendar, Globe, Twitter, Send, Loader, MessageSquare, Lightbulb, Layers, Download, User, Briefcase, CheckCircle, MessageCircle, Heart } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showReel, setShowReel] = useState(false);

  // --- ESTADOS PARA GEMINI AI BRAINSTORM ---
  const [showBrainstorm, setShowBrainstorm] = useState(false);
  const [brandInput, setBrandInput] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState('');

  // --- ESTADO PARA PROJECT POPUP ---
  const [selectedProject, setSelectedProject] = useState(null);

  // --- ESTADO PARA CONTACT FORM ---
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', company: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  // --- ESTADO PARA WHATSAPP MODAL ---
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

  // API Key para Gemini (configurada vacía para runtime environment)
  const apiKey = "AIzaSyAz6SSvieFedEJzd-AcNLQiABaobtYQZAI";

  // Estado para el filtro del portafolio
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- FUNCIÓN CONTACTO ---
  const handleContactSubmit = (e: any) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      const subject = `Nuevo Lead Mudi AI: ${contactForm.company}`;
      const body = `Nombre: ${contactForm.name}%0D%0AEmpresa: ${contactForm.company}%0D%0AEmail: ${contactForm.email}%0D%0A%0D%0AMensaje:%0D%0A${contactForm.message}`;
      window.location.href = `mailto:jplazas@mudi.com.co?subject=${subject}&body=${body}`;

      setIsSending(false);
      setFormStatus('success');
      setContactForm({ name: '', company: '', email: '', message: '' });
    }, 1500);
  };

  const closeContactModal = () => {
    setShowContact(false);
    setTimeout(() => setFormStatus('idle'), 300);
  };

  // --- FUNCIÓN NEWSLETTER ---
  const handleNewsletterSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const subject = "Suscripción Newsletter Mudi AI";
    const body = `Hola, deseo suscribirme al newsletter de Mudi AI.%0D%0A%0D%0AMi correo es: ${email}`;
    window.location.href = `mailto:jplazas@mudi.com.co?subject=${subject}&body=${body}`;
  };

  // --- WHATSAPP CONFIG ---
  const whatsappNumber = "573142084087";
  const whatsappMessage = "¡Hola! Estoy interesado en sus productos con IA!";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // --- FUNCIÓN PARA LLAMAR A GEMINI API ---
  const generateConcept = async () => {
    if (!brandInput.trim()) return;

    setIsGenerating(true);
    setLoadingStep('conceptualizing');
    setError('');
    setAiResult(null);
    setGeneratedImage(null);

    const textPrompt = `Actúa como un director creativo premiado de "Mudi AI". 
    El usuario ingresó la marca/producto: "${brandInput}".
    Genera una propuesta creativa en formato JSON estricto con:
    1. "concept": Un nombre corto y potente para la campaña (Concepto).
    2. "creative_idea": Explicación de la idea creativa en 2 líneas.
    3. "image_prompt": Un prompt detallado EN INGLÉS para generar una imagen fotorealista, cinemática y de alta calidad que represente visualmente esta idea. Debe ser descriptivo (iluminación, composición, estilo).
    Responde SOLO con el JSON.`;

    try {
      const textResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: textPrompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          }),
        }
      );

      if (!textResponse.ok) throw new Error('Error al conectar con el cerebro creativo.');

      const textData = await textResponse.json();
      const generatedText = textData.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) throw new Error('No se generó contenido textual.');

      const parsedResult = JSON.parse(generatedText);
      setAiResult(parsedResult);

      setLoadingStep('visualizing');

      const imageResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt: parsedResult.image_prompt }],
            parameters: { sampleCount: 1 }
          }),
        }
      );

      if (!imageResponse.ok) throw new Error('Error al generar la visualización.');

      const imageData = await imageResponse.json();
      const base64Image = imageData.predictions?.[0]?.bytesBase64Encoded;

      if (base64Image) {
        {/* @ts-ignore */ }
        setGeneratedImage(`data:image/png;base64,${base64Image}`);
      } else {
        throw new Error('No se pudo renderizar la imagen.');
      }

    } catch (err) {
      console.error(err);
      setError('Nuestra IA tuvo un bloqueo creativo. Intenta de nuevo.');
    } finally {
      setIsGenerating(false);
      setLoadingStep('');
    }
  };

  const clients = [
    { name: 'Corferias', logo: 'https://corferias.com/img/logo-b.svg' },
    { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/2560px-Honda_Logo.svg.png' },
    { name: 'Challenger', logo: 'https://60204e326d.cbaul-cdnwnd.com/c2b30ec4ad4f504845333953e3a6a174/200000043-11c3a11c3b/logo%20challenger.png?ph=60204e326d' },
    { name: 'Agua Bendita', logo: 'https://www.saltwatergreece.com/wp-content/uploads/2021/11/AGUA-BENDITA_logo.png' },
    { name: 'Mabe', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Logotipo_Mabe.svg/250px-Logotipo_Mabe.svg.png' },
    { name: 'Electrolux', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Electrolux_2015.svg/330px-Electrolux_2015.svg.png' },
    { name: 'Rushbet', logo: 'https://static.wikia.nocookie.net/logopedia/images/2/27/RushBet_logo.png' },
  ];

  const handleImageError = (e: any) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'block';
  };

  const portfolioItems = [
    {
  id: 1,
  category: 'video',
  title: "Feria del automovil 2025",
  client: "Corferias",
  image: "https://mudi.com.co/mudiStudioAssets/img/FrameAuto.png",
  video: "https://mudi.com.co/mudiStudioAssets/videos/Reelprincipal.mp4", // ⬅️ aquí va el video
  type: "Automotor",
  cols: "md:col-span-2",
  description: "Texto pendiente"
},
    {
      id: 2,
      category: 'social',
      title: "",
      client: "Mabe",
      image: "https://mudi.com.co/mudiStudioAssets/img/FrameMabeRedes.png",
      type: "Reels / TikTok",
      cols: "md:col-span-1",
      description: "Una serie de 15 piezas de contenido vertical diseñadas para retención máxima. Hooks generados por análisis de tendencias y avatares AI para demostraciones de producto hiperrealistas."
    },
    {
      id: 3,
      category: 'pdp',
      title: "Mabe",
      client: "",
      image: "https://mudi.com.co/mudiStudioAssets/img/galeriaMabe/DM1260TPSS.png",
      type: "PDP AI",
      cols: "md:col-span-1",
      description: "",
      gallery: [
        "https://mudi.com.co/mudiStudioAssets/img/galeriaMabe/LMH72205WDAB1.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaMabe/EMH7602JS0.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaMabe/PTM12HDBWJP0.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaMabe/HMM07PBN.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaMabe/RMP438FGCT.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaMabe/LMA9020WDGAB0.png",
        
 
      ]
    },
    {
      id: 4,
      category: 'video',
      title: "Va con tu estilo",
      client: "Challenger",
      image: "https://mudi.com.co/mudiStudioAssets/img/FrameChallenger.png",
      type: "Electro Digital",
      cols: "md:col-span-2",
      description: "Texto Pendiente"
    },
    {
      id: 5,
      category: 'pdp',
      title: "",
      client: "Ilusion",
      image: "https://mudi.com.co/mudiStudioAssets/img/galeriaIlusion/vestidoArena.png",
      type: "Catalogo AI",
      cols: "md:col-span-1",
      description: "",
      gallery: [
          "https://mudi.com.co/mudiStudioAssets/img/galeriaIlusion/chamarraDorada.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaIlusion/lenceriaNegra.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaIlusion/pijama.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaIlusion/sueterBlanco.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaIlusion/sueterNavidad.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaIlusion/trajeBañoMulti.png",
        "https://mudi.com.co/mudiStudioAssets/img/galeriaIlusion/vestidoArena.png",
      
      ]
    },
    {
      id: 6,
      category: 'social',
      title: "",
      client: "Challenger",
      image: "https://mudi.com.co/mudiStudioAssets/img/FrameChallengerRedes.png",
      type: "Social Campaign",
      cols: "md:col-span-1",
      description: ""
    },

    
  ];

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F46036] text-white font-sans selection:bg-[#FDF0D5] selection:text-[#F46036] overflow-x-hidden">

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .pause-on-hover:hover .animate-marquee {
          animation-play-state: paused;
        }
        .gallery-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .gallery-scroll::-webkit-scrollbar-track {
          background: #111; 
        }
        .gallery-scroll::-webkit-scrollbar-thumb {
          background: #333; 
          border-radius: 4px;
        }
        .gallery-scroll::-webkit-scrollbar-thumb:hover {
          background: #F46036; 
        }
        
        /* Entrance Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* --- WHATSAPP PRE-MODAL --- */}
      {showWhatsappModal && (
        <div className="fixed inset-0 z-[100] bg-[#1D1D1D]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-scale-in">
          <button
            onClick={() => setShowWhatsappModal(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-[#F46036] transition-colors z-50"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-md bg-[#FDF0D5] text-[#1D1D1D] rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl border-4 border-white">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F46036]/20 rounded-full blur-[40px]"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Heart size={36} className="text-[#F46036] fill-current animate-pulse" />
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-none">
                Conecta con <br /> Humanos
              </h3>

              <p className="text-[#1D1D1D]/70 font-bold mb-8 leading-relaxed">
                Tenemos un equipo detrás de la IA feliz de atenderte. Hablemos de tu próximo proyecto.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowWhatsappModal(false)}
                className="w-full py-4 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                <MessageCircle size={20} fill="currentColor" /> Continuar a WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTACT MODAL --- */}
      {showContact && (
        <div className="fixed inset-0 z-[90] bg-[#1D1D1D]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-scale-in">
          <button
            onClick={closeContactModal}
            className="absolute top-6 right-6 text-white/50 hover:text-[#F46036] transition-colors z-50 bg-black/20 p-2 rounded-full hover:rotate-90 duration-300"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F46036]/10 rounded-full blur-[80px] pointer-events-none"></div>

            {formStatus === 'success' ? (
              // --- PANTALLA DE ÉXITO ---
              <div className="relative z-10 flex flex-col items-center justify-center text-center py-10 animate-fade-up">
                <div className="w-24 h-24 bg-[#FDF0D5] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(253,240,213,0.3)] animate-scale-in">
                  <CheckCircle size={48} className="text-[#F46036]" strokeWidth={3} />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">¡Enviado!</h2>
                <p className="text-white/60 mb-8 font-medium text-lg max-w-md">
                  Gracias por tu interés. Hemos recibido tu solicitud y nuestro equipo te contactará en breve.
                </p>
                <button
                  onClick={closeContactModal}
                  className="px-8 py-3 border-2 border-white/20 hover:border-[#FDF0D5] text-white hover:text-[#FDF0D5] rounded-xl font-black uppercase tracking-widest transition-all"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              // --- FORMULARIO ---
              <div className="relative z-10 animate-fade-up">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">Empecemos a <span className="text-[#F46036]">Crear</span></h2>
                <p className="text-white/60 mb-8 font-medium">Cuéntanos sobre tu proyecto. Te responderemos en menos de 24 horas.</p>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-[#F46036] ml-1">Nombre</label>
                      <div className="relative">
                        <User size={18} className="absolute left-4 top-4 text-white/30" />
                        <input
                          required
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Tu nombre"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#F46036] focus:bg-white/10 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-[#F46036] ml-1">Empresa</label>
                      <div className="relative">
                        <Briefcase size={18} className="absolute left-4 top-4 text-white/30" />
                        <input
                          type="text"
                          value={contactForm.company}
                          onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                          placeholder="Tu marca"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#F46036] focus:bg-white/10 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[#F46036] ml-1">Email Corporativo</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-4 text-white/30" />
                      <input
                        required
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="nombre@empresa.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#F46036] focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[#F46036] ml-1">
                      ¿Qué necesitas?
                    </label>

                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Quiero escalar mi producción de video..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 
               text-white placeholder-white/40 
               focus:outline-none focus:border-[#F46036] 
               focus:bg-white/10 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-4 bg-[#F46036] hover:bg-[#ff7a50] text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group mt-4 disabled:opacity-50"
                  >
                    {isSending ? (
                      <><Loader size={20} className="animate-spin" /> Enviando...</>
                    ) : (
                      <>Enviar Solicitud <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- PROJECT POPUP / LIGHTBOX --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[80] bg-[#1D1D1D]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-scale-in">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-[#F46036] transition-colors z-50 bg-black/20 p-2 rounded-full hover:rotate-90 duration-300"
          >
            <X size={32} />
          </button>

          <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row shadow-2xl max-h-[90vh]">
            {/* Media Side */}
            <div className="md:w-2/3 h-[40vh] md:h-auto bg-black relative group overflow-hidden bg-grid-pattern">
              {/* @ts-ignore */}
              {selectedProject.category === 'pdp' && selectedProject.gallery ? (
                <div className="h-full w-full overflow-y-auto p-2 gallery-scroll">
                  <div className="grid grid-cols-2 gap-2">
                    {/* @ts-ignore */}
                    {selectedProject.gallery.map((img, idx) => (
                      <div key={idx} className={`relative overflow-hidden rounded-xl group/item animate-fade-up ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                        <img src={img} className="object-cover w-full h-full hover:scale-105 transition-transform duration-700" alt={`Gallery ${idx}`} />
                        <div className="absolute inset-0 bg-black/20 group-hover/item:bg-transparent transition-colors"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* @ts-ignore */}
                  <img src={selectedProject.image} alt={selectedProject.title} className="object-cover w-full h-full opacity-90 animate-scale-in" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  {/* @ts-ignore */}
                  {selectedProject.category === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center animate-fade-up delay-200">
                      <div className="w-20 h-20 bg-[#FDF0D5]/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(253,240,213,0.3)] animate-pulse cursor-pointer hover:scale-110 transition-transform">
                        <Play size={40} fill="#1D1D1D" className="text-[#1D1D1D] ml-1" />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Content Side */}
            <div className="md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-[#111111] overflow-y-auto animate-fade-up delay-100">
              <div className="mb-auto">
                <div className="flex items-center gap-3 mb-4">
                  {/* @ts-ignore */}
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 ${selectedProject.category === 'video' ? 'text-[#F46036] border-[#F46036]/30' : 'text-[#7AB8BF] border-[#7AB8BF]/30'}`}>  {selectedProject.type}
                  </span>
                  {/* @ts-ignore */}
                  {selectedProject.category === 'pdp' && (
                    <span className="flex items-center gap-1 text-[#FDF0D5] text-[10px] font-black uppercase tracking-widest"><Layers size={12} /> Galería</span>
                  )}
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">2025</span>
                </div>
                {/* @ts-ignore */}
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-[0.9] uppercase tracking-tight">{selectedProject.title}</h2>
                {/* @ts-ignore */}
                <p className="text-[#F46036] font-bold text-sm uppercase tracking-widest mb-8">Cliente: {selectedProject.client}</p>
                <div className="w-12 h-1 bg-white/10 mb-8"></div>
                {/* @ts-ignore */}
                <p className="text-gray-400 text-base font-medium leading-relaxed mb-8">{selectedProject.description}</p>
              </div>
              <div className="mt-8 pt-8 border-t border-white/10">
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full py-4 bg-white text-black hover:bg-[#FDF0D5] rounded-xl text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  Solicitar Similar <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- GEMINI AI BRAINSTORM MODAL --- */}
      {showBrainstorm && (
        <div className="fixed inset-0 z-[70] bg-[#1D1D1D]/95 backdrop-blur-xl flex items-center justify-center p-4 animate-scale-in">
          <button
            onClick={() => setShowBrainstorm(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-[#F46036] transition-colors"
          >
            <X size={32} />
          </button>

          <div className="w-full max-w-4xl bg-black/40 border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row gap-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7AB8BF]/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F46036]/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className={`relative z-10 flex flex-col ${aiResult ? 'md:w-1/2' : 'w-full text-center'}`}>
              <div className={`inline-flex items-center gap-2 bg-[#FDF0D5] text-[#F46036] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 ${!aiResult && 'mx-auto'}`}>
                <Sparkles size={14} fill="currentColor" /> Powered by Mudi Studio Ai
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
                AI Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDF0D5] to-[#F46036]">Studio</span>
              </h2>

              {!aiResult ? (
                <>
                  <p className="text-white/60 mb-8 max-w-md mx-auto text-sm font-medium animate-fade-up delay-100">
                    Describe tu producto y nuestra IA generará el concepto, el copy y la imagen visual para tu campaña.
                  </p>
                  <div className="flex flex-col gap-4 max-w-md mx-auto w-full animate-fade-up delay-200">
                    <input
                      type="text"
                      value={brandInput}
                      onChange={(e) => setBrandInput(e.target.value)}
                      placeholder="Ej: Café colombiano de alta montaña..."
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#F46036] focus:bg-white/10 transition-all text-center font-bold"
                      onKeyDown={(e) => e.key === 'Enter' && generateConcept()}
                    />
                    <button
                      onClick={generateConcept}
                      disabled={isGenerating || !brandInput}
                      className="w-full py-4 bg-[#F46036] hover:bg-[#ff7a50] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3 group"
                    >
                      {isGenerating ? (
                        <><Loader size={20} className="animate-spin" /> {loadingStep === 'conceptualizing' ? 'Redactando Concepto...' : 'Generando Imagen...'}</>
                      ) : (
                        <>Generar Campaña <Sparkles size={20} className="group-hover:rotate-12 transition-transform" /></>
                      )}
                    </button>
                    {error && <p className="text-red-400 text-xs font-bold mt-2">{error}</p>}
                  </div>
                </>
              ) : (
                <div className="animate-fade-up h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <h4 className="text-[#7AB8BF] text-xs font-black uppercase tracking-widest mb-2">Concepto</h4>
                      {/* @ts-ignore */}
                      <p className="text-2xl font-black text-[#FDF0D5] leading-tight uppercase">"{aiResult.concept}"</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-[#F46036] text-xs font-black uppercase tracking-widest mb-2"><Lightbulb size={14} className="inline mr-1" /> Idea Creativa</h4>
                      {/* @ts-ignore */}
                      <p className="text-white/80 text-sm font-medium leading-relaxed">{aiResult.creative_idea}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setAiResult(null); setGeneratedImage(null); setBrandInput(''); }}
                    className="mt-4 w-full py-3 border border-white/20 hover:bg-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  >
                    Nueva Idea
                  </button>
                </div>
              )}
            </div>

            {aiResult && (
              <div className="md:w-1/2 relative bg-black/50 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center min-h-[300px] animate-fade-up delay-200">
                {generatedImage ? (
                  <div className="relative w-full h-full group">
                    <img src={generatedImage} alt="AI Generated" className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={generatedImage} download="mudi-ai-concept.png" className="bg-[#FDF0D5] text-[#1D1D1D] p-3 rounded-full shadow-lg flex items-center hover:scale-110 transition-transform">
                        <Download size={20} />
                      </a>
                    </div>
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                      Generado con Imagen 3
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-white/30 p-8 text-center">
                    <Loader size={40} className="animate-spin mb-4 text-[#F46036]" />
                    <p className="text-xs font-black uppercase tracking-widest">Renderizando Visual...</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

{/* Video Reel Overlay */}
{showReel && (
  <div className="fixed inset-0 z-[60] bg-[#1D1D1D]/90 backdrop-blur-md flex items-center justify-center p-4 animate-scale-in">
    <button
      onClick={() => setShowReel(false)}
      className="absolute top-8 right-8 text-white hover:text-[#FDF0D5] transition-colors hover:rotate-90 duration-300"
    >
      <X size={40} strokeWidth={3} />
    </button>

    <div className="w-full max-w-5xl aspect-video bg-black rounded-xl border-[8px] border-[#FDF0D5] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden">
      <video
        src="https://mudi.com.co/mudiStudioAssets/videos/Reelprincipal.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onLoadedMetadata={(e) => {
          //@ts-ignore
          e.target.currentTime = 3; 

        }}
      />
    </div>
  </div>
)}



      {/* --- WHATSAPP FLOAT BUTTON (STYLED TO MATCH) --- */}
      <button
        onClick={() => setShowWhatsappModal(true)}
        className="fixed bottom-28 right-8 z-50 bg-[#FDF0D5] text-[#1D1D1D] p-3 rounded-full shadow-[0_0_20px_rgba(253,240,213,0.5)] border-2 border-[#1D1D1D] hover:scale-110 transition-transform group animate-bounce-slow"
      >
        <MessageCircle size={28} fill="currentColor" />
      </button>

      {/* --- BOTÓN FLOTANTE AI --- */}
      <button
        onClick={() => setShowBrainstorm(true)}
        className="fixed bottom-8 right-8 z-50 bg-[#1D1D1D] text-[#FDF0D5] p-4 rounded-full shadow-[0_0_20px_rgba(244,96,54,0.5)] border-2 border-[#F46036] hover:scale-110 transition-transform group animate-bounce-slow"
      >
        <Sparkles size={32} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#F46036] rounded-full border-2 border-[#1D1D1D]"></span>
      </button>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-[#F46036] shadow-xl border-b-4 border-[#FDF0D5]' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">

          <a href="#" className="flex items-center gap-3 group z-50">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#FFD166] to-[#F46036] shadow-[0_0_15px_rgba(255,209,102,0.4)] border-2 border-white/20 group-hover:scale-110 transition-transform">
              <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 blur-sm rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black tracking-tight text-[#FDF0D5] leading-none uppercase" style={{ fontFamily: 'Inter, sans-serif' }}>Mudi AI</span>
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-white/90 uppercase leading-none mt-1">Creative Studios</span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-2">
            <a href="#work" className="text-sm font-black uppercase tracking-widest text-white hover:text-[#F46036] hover:bg-[#FDF0D5] px-4 py-2 rounded-lg transition-all transform hover:-rotate-2">Portafolio</a>
            <a href="#speed" className="text-sm font-black uppercase tracking-widest text-white hover:text-[#F46036] hover:bg-[#FDF0D5] px-4 py-2 rounded-lg transition-all transform hover:rotate-2">Proceso</a>
            <a href="#solutions" className="text-sm font-black uppercase tracking-widest text-white hover:text-[#F46036] hover:bg-[#FDF0D5] px-4 py-2 rounded-lg transition-all transform hover:-rotate-2">Soluciones</a>
          </div>

          <button
            onClick={() => setShowBrainstorm(true)}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#FDF0D5] text-[#F46036] border-b-4 border-r-4 border-black/10 rounded-lg text-xs font-black uppercase tracking-widest hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none hover:border-transparent transition-all shadow-lg"
          >
            <span>Crear Idea</span>
            <Sparkles size={16} strokeWidth={3} />
          </button>

          <button
            className="md:hidden z-50 text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 md:px-8 lg:px-12 pt-32 pb-20 overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-[#FFD166] rounded-full mix-blend-overlay filter blur-[100px] opacity-40 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#7AB8BF] rounded-full mix-blend-overlay filter blur-[80px] opacity-40 pointer-events-none"></div>

        <div className="max-w-8xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="relative lg:col-span-7 flex flex-col items-start justify-center animate-fade-up">
            <div className="relative z-20 leading-none">
              <h1 className="text-[18vw] md:text-[14vw] lg:text-[11rem] font-black tracking-tighter text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,0.15)] transform -rotate-2 origin-bottom-left hover:scale-105 transition-transform duration-500 cursor-default">
                Better
              </h1>
              <h1 className="text-[18vw] md:text-[14vw] lg:text-[11rem] font-black tracking-tighter text-[#FDF0D5] drop-shadow-[8px_8px_0px_rgba(0,0,0,0.15)] transform rotate-1 lg:-mt-12 lg:ml-24 hover:scale-105 transition-transform duration-500 cursor-default">
                Faster
              </h1>
              <h1 className="text-[18vw] md:text-[14vw] lg:text-[11rem] font-black tracking-tighter text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,0.15)] transform -rotate-1 lg:-mt-12 hover:scale-105 transition-transform duration-500 cursor-default">
                Cheaper
              </h1>
            </div>
          </div>

          <div className="relative group cursor-pointer lg:col-span-5 mt-12 lg:mt-0 perspective-1000 animate-scale-in delay-200" onClick={() => setShowReel(true)}>
            <div className="w-full aspect-video bg-black rounded-lg border-[12px] border-white shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] relative transform rotate-3 transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.02] group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] z-20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-24 h-24 rounded-full bg-[#FDF0D5]/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={40} fill="#F46036" className="text-[#F46036] ml-2" />
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1600" alt="Reel cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F46036]/60 to-transparent mix-blend-overlay"></div>
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#FDF0D5]/50 -rotate-2 z-30"></div>
          </div>
        </div>
      </header>

      {/* --- CLIENTS TICKER (TAPE LOOK + WORDMARK LOGOS) --- */}
      <div className="bg-[#FDF0D5] py-16 border-y-8 border-[#1D1D1D] overflow-hidden relative z-30 transform -rotate-1 skew-y-1 shadow-2xl">
        <div className="absolute inset-0 bg-[#FDF0D5] z-10"></div>
        <div className="relative z-20 pause-on-hover">
          <div className="flex animate-marquee items-center min-w-max">
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div key={i} className="mx-16 flex items-center justify-center group cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-20 w-auto object-contain mix-blend-multiply filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  onError={handleImageError}
                />
                <span className="hidden text-4xl font-black text-[#1D1D1D] uppercase tracking-tighter">{client.name}</span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-[#FDF0D5] to-transparent z-30 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-[#FDF0D5] to-transparent z-30 pointer-events-none"></div>
        </div>
      </div>

      {/* --- SECCIÓN: FILTERABLE WORK GRID --- */}
      <section id="work" className="py-24 px-4 md:px-12 bg-[#F46036] relative z-20">
        <div className="max-w-7xl mx-auto relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-fade-up">
            <div>
              <span className="bg-[#7AB8BF] text-white px-4 py-1 font-black text-xs uppercase tracking-[0.2em] mb-4 inline-block transform -rotate-1 border border-white/50 shadow-sm rounded-md">
                Selected Work
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-[#FDF0D5] leading-none uppercase">
                Nuestro <br />Trabajo
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 bg-[#1D1D1D]/10 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
              {['all', 'video', 'social', 'pdp'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 ${activeCategory === cat
                      ? 'bg-[#FDF0D5] text-[#F46036] shadow-lg transform scale-105'
                      : 'text-white hover:bg-white/10'
                    }`}
                >
                  {cat === 'all' ? 'Todo' : cat === 'video' ? 'Videos AI' : cat === 'pdp' ? 'Imágenes AI' : 'Social'}
                </button>
              ))}
            </div>
          </div>
          

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[350px]">
            

            {filteredItems.map((item, index) => (
              <div


                key={item.id}
              // @ts-ignore
                onClick={() => setSelectedProject(item)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-2 border-4 border-transparent hover:border-[#FDF0D5] ${item.cols} bg-gray-900 animate-scale-in fill-mode-both`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

                <div className="absolute top-6 right-6 flex gap-2">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md ${item.category === 'video' ? 'bg-red-500/80 text-white' : item.category === 'social' ? 'bg-[#7AB8BF]/90 text-[#1D1D1D]' : 'bg-[#FDF0D5]/90 text-[#F46036]'}`}>
                    {item.type}
                  </span>
                  {item.category === 'pdp' && (
                    <span className="p-2 bg-black/50 backdrop-blur-md rounded-full text-[#FDF0D5] border border-white/20">
                      <Layers size={12} />
                    </span>
                  )}
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#FDF0D5] rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(253,240,213,0.5)] z-20">
                  {item.category === 'video' ? <Play size={24} fill="black" className="text-black ml-1" /> : <ArrowUpRight size={24} className="text-black" />}
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[#FDF0D5] text-xs font-bold tracking-widest uppercase mb-1">{item.client}</p>
                  <h3 className="text-3xl font-black text-white uppercase leading-none">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SPEED COMPARISON (FASTER 4X) --- */}
      <section id="speed" className="py-32 bg-[#FDF0D5] text-[#1D1D1D] relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#F46036] rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#7AB8BF] rounded-full filter blur-[80px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="animate-fade-up">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-[#F46036] text-white px-4 py-2 font-black text-4xl transform -rotate-2 shadow-[4px_4px_0px_#1D1D1D] inline-block hover:rotate-2 transition-transform duration-300">
                  4X
                </span>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-[#1D1D1D]">
                  Faster
                </h2>
              </div>

              <p className="text-xl font-bold text-[#1D1D1D]/70 mb-12 max-w-lg leading-relaxed">
                Reinventamos el flujo de trabajo. Eliminamos la burocracia de la pre-producción tradicional y aceleramos la entrega con generación AI.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border-b-4 border-r-4 border-[#1D1D1D]/10 hover:-translate-y-1 transition-transform">
                  <Clock size={32} className="text-[#F46036] mb-2" />
                  <p className="text-3xl font-black text-[#1D1D1D]">75%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Ahorro de Tiempo</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-b-4 border-r-4 border-[#1D1D1D]/10 hover:-translate-y-1 transition-transform delay-100">
                  <Zap size={32} className="text-[#F46036] mb-2" />
                  <p className="text-3xl font-black text-[#1D1D1D]">100%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Creatividad</p>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-up delay-200">

              <div className="mb-12 relative opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-lg font-black uppercase text-[#1D1D1D]/60 flex items-center gap-2">
                    <Calendar size={18} /> Flujo Tradicional
                  </h3>
                  <span className="text-2xl font-black text-[#1D1D1D]/60">4 Meses</span>
                </div>

                <div className="w-full h-4 bg-[#1D1D1D]/20 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-full bg-stripes-gray animate-slide"></div>
                </div>

                <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-widest text-[#1D1D1D]/40">
                  <span>Concept</span>
                  <span>Storyboard</span>
                  <span>Shooting</span>
                  <span>Post</span>
                  <span>Delivery</span>
                </div>

                <div className="absolute top-[2.2rem] left-0 w-full flex justify-between px-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#1D1D1D]/40"></div>
                  ))}
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-[35%] z-20 animate-bounce text-[#F46036]">
                <ArrowRight size={40} className="rotate-90" strokeWidth={3} />
              </div>

              <div className="relative transform scale-105 bg-white p-8 rounded-3xl shadow-2xl border-4 border-[#F46036] hover:scale-110 transition-transform duration-500">
                <div className="absolute -top-4 -right-4 bg-[#F46036] text-white px-4 py-1 font-black text-xs uppercase tracking-widest rounded-full transform rotate-3 shadow-lg animate-pulse">
                  AI Power
                </div>

                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-xl font-black uppercase text-[#F46036] flex items-center gap-2">
                    <Zap size={24} fill="currentColor" /> Mudi Workflow
                  </h3>
                  <span className="text-4xl font-black text-[#F46036]">1 Mes</span>
                </div>

                <div className="w-full h-6 bg-[#FDF0D5] rounded-full relative overflow-hidden mb-4 border border-[#F46036]/20">
                  <div className="absolute top-0 left-0 h-full w-[25%] bg-gradient-to-r from-[#F46036] to-[#FFD166] rounded-full animate-[width_2s_ease-in-out_infinite]"></div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#FDF0D5] p-2 rounded-lg border border-[#F46036]/20">
                    <p className="text-[10px] font-black uppercase text-[#F46036]">Brief & Creative</p>
                  </div>
                  <div className="bg-[#F46036] p-2 rounded-lg shadow-lg transform -translate-y-1">
                    <p className="text-[10px] font-black uppercase text-white">AI Production</p>
                  </div>
                  <div className="bg-[#7AB8BF] p-2 rounded-lg">
                    <p className="text-[10px] font-black uppercase text-white">Final Delivery</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- CTA SIMPLE --- */}
      <section id="solutions" className="py-32 bg-[#1D1D1D] px-6 relative skew-y-2 transform origin-top-left z-10 border-t-[12px] border-[#FDF0D5]">
        <div className="max-w-5xl mx-auto -skew-y-2">

          <div className="relative bg-gradient-to-br from-[#2a2a2a] to-[#111] rounded-[3rem] p-8 md:p-16 border border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] text-center group animate-fade-up">

            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F46036] via-[#FDF0D5] to-[#7AB8BF]"></div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#F46036] rounded-full blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div className="absolute -left-20 top-20 w-60 h-60 bg-[#7AB8BF] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>

            <div className="relative z-10 flex flex-col items-center">
              <span className="inline-flex items-center gap-2 text-[#FDF0D5] text-sm font-black uppercase tracking-[0.3em] mb-6 border border-[#FDF0D5]/20 px-6 py-2 rounded-full">
                <Sparkles size={14} /> Soluciones Enterprise
              </span>

              <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
                ¿Listo para <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDF0D5] to-[#F46036]">Escalar?</span>
              </h2>

              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed">
                Obtén producción de video AI, contenido social viral y fotografía de producto a escala masiva. Sin fricción. Sin límites.
              </p>

              <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                <button
                  onClick={() => setShowContact(true)}
                  className="px-10 py-5 bg-[#F46036] hover:bg-[#ff7a50] text-white rounded-2xl text-base font-black uppercase tracking-widest transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(244,96,54,0.3)] flex items-center justify-center gap-3"
                >
                  Contactar Ventas <ArrowRight size={20} />
                </button>
                <button className="px-10 py-5 bg-transparent border-2 border-white/20 hover:border-[#FDF0D5] text-white hover:text-[#FDF0D5] rounded-2xl text-base font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 hover:scale-105">
                  Ver Demo <Play size={20} />
                </button>
              </div>

              <p className="mt-8 text-white/30 text-xs font-bold uppercase tracking-widest">
                Respuesta en menos de 24 horas
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- MEGA FOOTER --- */}
      <footer id="contact" className="bg-[#0a0a0a] text-[#FDF0D5] pt-0 pb-0 relative overflow-hidden z-20">

        <div className="bg-[#F46036] overflow-hidden py-3 transform rotate-1 scale-105 border-y-4 border-[#1D1D1D]">
          <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex gap-8">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-2xl font-black uppercase text-[#1D1D1D] tracking-widest flex items-center gap-4">
                LET'S CREATE THE FUTURE <Zap size={20} fill="black" />
              </span>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#7AB8BF]/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">

            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <a href="#" className="flex items-center gap-4 group mb-8">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD166] to-[#F46036] shadow-[0_0_25px_rgba(244,96,54,0.3)] border-2 border-white/10 group-hover:scale-110 transition-transform"></div>
                  <span className="text-5xl font-black tracking-tighter leading-none uppercase text-white">Mudi AI</span>
                </a>
                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md mb-10">
                  Estudio creativo impulsado por inteligencia artificial. Fusionamos arte humano con potencia computacional para marcas que definen el futuro.
                </p>
                <div className="flex gap-3">
                  {['Bogotá', 'Miami'].map((city) => (
                    <span key={city} className="px-4 py-1.5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60 hover:border-[#F46036] hover:text-[#F46036] transition-colors cursor-default">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <h4 className="text-[#F46036] font-black uppercase tracking-widest text-xs mb-8">Explora</h4>
              <ul className="space-y-4 font-bold text-xl md:text-2xl text-white/80">
                <li><a href="#work" className="hover:text-[#F46036] hover:pl-2 transition-all block">Better</a></li>
                <li><a href="#speed" className="hover:text-[#F46036] hover:pl-2 transition-all block">Faster</a></li>
                <li><a href="#solutions" className="hover:text-[#F46036] hover:pl-2 transition-all block">Cheaper</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[#7AB8BF] font-black uppercase tracking-widest text-xs mb-8">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="relative mb-8 group">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  className="w-full bg-[#1D1D1D] border border-white/10 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-[#F46036] transition-all placeholder:text-white/20"
                />
                <button type="submit" className="absolute right-2 top-2 bg-[#F46036] p-3 rounded-lg text-white hover:bg-[#ff7a50] transition-colors shadow-lg group-hover:scale-105">
                  <Send size={18} fill="currentColor" />
                </button>
              </form>

              <div className="flex gap-4">
                {[Instagram, Linkedin, Twitter, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#1D1D1D] flex items-center justify-center text-white/60 hover:bg-[#FDF0D5] hover:text-black transition-all hover:-translate-y-1">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 mb-20">
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">© 2025 Mudi Studio AI. All rights reserved.</p>
            <div className="flex gap-8 text-white/30 text-xs font-bold uppercase tracking-widest">
            </div>
          </div>

          <h1 className="text-[18vw] font-black text-center text-white/5 leading-[0.8] tracking-tighter select-none pointer-events-none absolute bottom-[-4vw] left-0 w-full z-0 mix-blend-overlay">
            MUDI STUDIO
          </h1>
        </div>
      </footer>
    </div>
  );
};

export default App;