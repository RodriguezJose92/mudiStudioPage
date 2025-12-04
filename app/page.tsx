"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Play,
  Zap,
  Instagram,
  Linkedin,
  Mail,
  ArrowUpRight,
  Check,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Filter,
  Clock,
  Calendar,
  Globe,
  Twitter,
  Send,
} from "lucide-react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showReel, setShowReel] = useState(false);

  // Estado para el filtro del portafolio
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logos de Clientes ACTUALIZADOS (Versiones Horizontales / Wordmarks)
  const clients = [
    {
      name: "Corferias",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Corferias_logo.png",
    },
    {
      name: "Honda",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/2560px-Honda_Logo.svg.png",
    },
    {
      name: "Challenger",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Challenger_logo.png/640px-Challenger_logo.png",
    }, // Placeholder visual similar
    {
      name: "Agua Bendita",
      logo: "https://cdn.shopify.com/s/files/1/0257/2763/1413/files/AB_Logo_Black.png?v=1613768266",
    },
    {
      name: "Mabe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Mabe_logo.svg/2560px-Mabe_logo.svg.png",
    },
    {
      name: "Electrolux",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Electrolux_new_logo.svg/2560px-Electrolux_new_logo.svg.png",
    },
    {
      name: "Rushbet",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Rushbet_Logo.png",
    }, // Placeholder visual similar
  ];

  // Fallback visual por si alguna URL externa falla (usamos texto estilizado temporalmente)
  const handleImageError = (e: any) => {
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "block";
  };

  // Datos del Portafolio
  const portfolioItems = [
    {
      id: 1,
      category: "video",
      title: "Nike: Hyperboot",
      client: "Nike Global",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1600",
      type: "Commercial AI",
      cols: "md:col-span-2",
    },
    {
      id: 2,
      category: "social",
      title: "Skincare Viral",
      client: "Glow Recipe",
      image:
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800",
      type: "Reels / TikTok",
      cols: "md:col-span-1",
    },
    {
      id: 3,
      category: "pdp",
      title: "Summer Collection",
      client: "Zara",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      type: "Catálogo AI",
      cols: "md:col-span-1",
    },
    {
      id: 4,
      category: "video",
      title: "NBA Finals Intro",
      client: "ESPN",
      image:
        "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=1600",
      type: "Broadcast",
      cols: "md:col-span-2",
    },
    {
      id: 5,
      category: "pdp",
      title: "Tech Gadgets",
      client: "Sony",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800",
      type: "Product Shot",
      cols: "md:col-span-1",
    },
    {
      id: 6,
      category: "social",
      title: "Festival Season",
      client: "Spotify",
      image:
        "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800",
      type: "Social Campaign",
      cols: "md:col-span-1",
    },
  ];

  const filteredItems =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

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
      `}</style>

      {/* Video Reel Overlay */}
      {showReel && (
        <div className="fixed inset-0 z-[60] bg-[#1D1D1D]/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <button
            onClick={() => setShowReel(false)}
            className="absolute top-8 right-8 text-white hover:text-[#FDF0D5] transition-colors hover:rotate-90 duration-300"
          >
            <X size={40} strokeWidth={3} />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-xl border-[8px] border-[#FDF0D5] shadow-[20px_20px_0px_0px_rgba(0,0,0,0.3)] flex items-center justify-center relative overflow-hidden group transform rotate-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-orange-900/40 opacity-50"></div>
            <Play
              size={80}
              className="text-[#FDF0D5] drop-shadow-lg group-hover:scale-110 transition-transform duration-500 fill-current relative z-30"
            />
            <p className="absolute bottom-8 left-8 font-black text-xl uppercase tracking-widest text-white/80 z-30">
              Demo Reel 2025
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#F46036] shadow-xl border-b-4 border-[#FDF0D5]"
            : "py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group z-50">
            <img src="ball.png" alt="Logo" className="w-[70px]" />
            <div className="flex flex-col">
              <span
                className="text-2xl md:text-3xl font-black tracking-tight text-[#FDF0D5] leading-none uppercase"
                style={{ fontFamily: "var(--font-poppins), sans-serif" }}
              >
                Mudi AI
              </span>
              <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-white/90 uppercase leading-none mt-1">
                Creative Studios
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-2">
            <a
              href="#work"
              className="text-sm font-black uppercase tracking-widest text-white hover:text-[#F46036] hover:bg-[#FDF0D5] px-4 py-2 rounded-lg transition-all transform hover:-rotate-2"
            >
              Better
            </a>
            <a
              href="#speed"
              className="text-sm font-black uppercase tracking-widest text-white hover:text-[#F46036] hover:bg-[#FDF0D5] px-4 py-2 rounded-lg transition-all transform hover:rotate-2"
            >
              Faster
            </a>
            <a
              href="#solutions"
              className="text-sm font-black uppercase tracking-widest text-white hover:text-[#F46036] hover:bg-[#FDF0D5] px-4 py-2 rounded-lg transition-all transform hover:-rotate-2"
            >
              Cheaper
            </a>
          </div>

          <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#FDF0D5] text-[#F46036] border-b-4 border-r-4 border-black/10 rounded-lg text-xs font-black uppercase tracking-widest hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none hover:border-transparent transition-all shadow-lg">
            <span>Iniciar Proyecto</span>
            <ArrowUpRight size={16} strokeWidth={3} />
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
          <div className="relative lg:col-span-7 flex flex-col items-start justify-center">
            <div className="relative z-20 leading-none">
              <h1 className="text-[18vw] md:text-[14vw] lg:text-[11rem] font-black tracking-tighter text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,0.15)] transform -rotate-2 origin-bottom-left">
                Better
              </h1>
              <h1 className="text-[18vw] md:text-[14vw] lg:text-[11rem] font-black tracking-tighter text-[#FDF0D5] drop-shadow-[8px_8px_0px_rgba(0,0,0,0.15)] transform rotate-1 lg:-mt-12 lg:ml-24">
                Faster
              </h1>
              <h1 className="text-[18vw] md:text-[14vw] lg:text-[11rem] font-black tracking-tighter text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,0.15)] transform -rotate-1 lg:-mt-12">
                Cheaper
              </h1>
            </div>
          </div>

          <div
            className="relative group cursor-pointer lg:col-span-5 mt-12 lg:mt-0 perspective-1000"
            onClick={() => setShowReel(true)}
          >
            <div className="w-full aspect-video bg-black rounded-lg border-[12px] border-white shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] relative transform rotate-3 transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.02] group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] z-20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-24 h-24 rounded-full bg-[#FDF0D5]/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play
                    size={40}
                    fill="#F46036"
                    className="text-[#F46036] ml-2"
                  />
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1600"
                alt="Reel cover"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
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
            {/* Loop Triple para suavidad infinita */}
            {[...clients, ...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="mx-16 flex items-center justify-center group cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
              >
                {/* CLAVE: mix-blend-multiply ayuda a que si el logo tiene fondo blanco, 
                            se vuelva transparente sobre el fondo crema.
                        */}
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-20 w-auto object-contain mix-blend-multiply filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  onError={handleImageError}
                />
                {/* Fallback Texto por si falla la imagen externa */}
                <span className="hidden text-4xl font-black text-[#1D1D1D] uppercase tracking-tighter">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-[#FDF0D5] to-transparent z-30 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-[#FDF0D5] to-transparent z-30 pointer-events-none"></div>
        </div>
      </div>

      {/* --- SECCIÓN: FILTERABLE WORK GRID --- */}
      <section
        id="work"
        className="py-24 px-4 md:px-12 bg-[#F46036] relative z-20"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="bg-[#7AB8BF] text-white px-4 py-1 font-black text-xs uppercase tracking-[0.2em] mb-4 inline-block transform -rotate-1 border border-white/50 shadow-sm rounded-md">
                Selected Work
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-[#FDF0D5] leading-none uppercase">
                Nuestro <br />
                Trabajo
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 bg-[#1D1D1D]/10 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
              {["all", "video", "social", "pdp"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-[#FDF0D5] text-[#F46036] shadow-lg transform scale-105"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {cat === "all"
                    ? "Todo"
                    : cat === "video"
                    ? "Videos AI"
                    : cat === "pdp"
                    ? "Imágenes PDP"
                    : "Social"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[350px]">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-2 border-4 border-transparent hover:border-[#FDF0D5] ${item.cols} bg-gray-900 animate-in fade-in zoom-in duration-500 fill-mode-both`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>

                <div className="absolute top-6 right-6">
                  <span
                    className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20 backdrop-blur-md ${
                      item.category === "video"
                        ? "bg-red-500/80 text-white"
                        : item.category === "social"
                        ? "bg-[#7AB8BF]/90 text-[#1D1D1D]"
                        : "bg-[#FDF0D5]/90 text-[#F46036]"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#FDF0D5] rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(253,240,213,0.5)] z-20">
                  {item.category === "video" ? (
                    <Play size={24} fill="black" className="text-black ml-1" />
                  ) : (
                    <ArrowUpRight size={24} className="text-black" />
                  )}
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[#FDF0D5] text-xs font-bold tracking-widest uppercase mb-1">
                    {item.client}
                  </p>
                  <h3 className="text-3xl font-black text-white uppercase leading-none">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SPEED COMPARISON (FASTER 4X) --- */}
      <section
        id="speed"
        className="py-32 bg-[#FDF0D5] text-[#1D1D1D] relative overflow-hidden"
      >
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#F46036] rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#7AB8BF] rounded-full filter blur-[80px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-[#F46036] text-white px-4 py-2 font-black text-4xl transform -rotate-2 shadow-[4px_4px_0px_#1D1D1D] inline-block">
                  4X
                </span>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-[#1D1D1D]">
                  Faster
                </h2>
              </div>

              <p className="text-xl font-bold text-[#1D1D1D]/70 mb-12 max-w-lg leading-relaxed">
                Reinventamos el flujo de trabajo. Eliminamos la burocracia de la
                pre-producción tradicional y aceleramos la entrega con
                generación AI.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border-b-4 border-r-4 border-[#1D1D1D]/10">
                  <Clock size={32} className="text-[#F46036] mb-2" />
                  <p className="text-3xl font-black text-[#1D1D1D]">75%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Ahorro de Tiempo
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border-b-4 border-r-4 border-[#1D1D1D]/10">
                  <Zap size={32} className="text-[#F46036] mb-2" />
                  <p className="text-3xl font-black text-[#1D1D1D]">100%</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Creatividad
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="mb-12 relative opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-lg font-black uppercase text-[#1D1D1D]/60 flex items-center gap-2">
                    <Calendar size={18} /> Flujo Tradicional
                  </h3>
                  <span className="text-2xl font-black text-[#1D1D1D]/60">
                    4 Meses
                  </span>
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
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#1D1D1D]/40"
                    ></div>
                  ))}
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-[35%] z-20 animate-bounce text-[#F46036]">
                <ArrowRight size={40} className="rotate-90" strokeWidth={3} />
              </div>

              <div className="relative transform scale-105 bg-white p-8 rounded-3xl shadow-2xl border-4 border-[#F46036]">
                <div className="absolute -top-4 -right-4 bg-[#F46036] text-white px-4 py-1 font-black text-xs uppercase tracking-widest rounded-full transform rotate-3 shadow-lg animate-pulse">
                  AI Power
                </div>

                <div className="flex justify-between items-end mb-6">
                  <h3 className="text-xl font-black uppercase text-[#F46036] flex items-center gap-2">
                    <Zap size={24} fill="currentColor" /> Mudi Workflow
                  </h3>
                  <span className="text-4xl font-black text-[#F46036]">
                    1 Mes
                  </span>
                </div>

                <div className="w-full h-6 bg-[#FDF0D5] rounded-full relative overflow-hidden mb-4 border border-[#F46036]/20">
                  <div className="absolute top-0 left-0 h-full w-[25%] bg-gradient-to-r from-[#F46036] to-[#FFD166] rounded-full animate-[width_2s_ease-in-out_infinite]"></div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#FDF0D5] p-2 rounded-lg border border-[#F46036]/20">
                    <p className="text-[10px] font-black uppercase text-[#F46036]">
                      Brief & Creative
                    </p>
                  </div>
                  <div className="bg-[#F46036] p-2 rounded-lg shadow-lg transform -translate-y-1">
                    <p className="text-[10px] font-black uppercase text-white">
                      AI Production
                    </p>
                  </div>
                  <div className="bg-[#7AB8BF] p-2 rounded-lg">
                    <p className="text-[10px] font-black uppercase text-white">
                      Final Delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SIMPLE --- */}
      <section
        id="solutions"
        className="py-32 bg-[#1D1D1D] px-6 relative skew-y-2 transform origin-top-left z-10 border-t-[12px] border-[#FDF0D5]"
      >
        <div className="max-w-5xl mx-auto -skew-y-2">
          <div className="relative bg-gradient-to-br from-[#2a2a2a] to-[#111] rounded-[3rem] p-8 md:p-16 border border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] text-center group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F46036] via-[#FDF0D5] to-[#7AB8BF]"></div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#F46036] rounded-full blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div className="absolute -left-20 top-20 w-60 h-60 bg-[#7AB8BF] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>

            <div className="relative z-10 flex flex-col items-center">
              <span className="inline-flex items-center gap-2 text-[#FDF0D5] text-sm font-black uppercase tracking-[0.3em] mb-6 border border-[#FDF0D5]/20 px-6 py-2 rounded-full">
                <Sparkles size={14} /> Soluciones Enterprise
              </span>

              <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
                ¿Listo para <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDF0D5] to-[#F46036]">
                  Escalar?
                </span>
              </h2>

              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-medium leading-relaxed">
                Obtén producción de video AI, contenido social viral y
                fotografía de producto a escala masiva. Sin fricción. Sin
                límites.
              </p>

              <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                <button className="px-10 py-5 bg-[#F46036] hover:bg-[#ff7a50] text-white rounded-2xl text-base font-black uppercase tracking-widest transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(244,96,54,0.3)] flex items-center justify-center gap-3">
                  Contactar Ventas <ArrowRight size={20} />
                </button>
                <button className="px-10 py-5 bg-transparent border-2 border-white/20 hover:border-[#FDF0D5] text-white hover:text-[#FDF0D5] rounded-2xl text-base font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3">
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
      <footer
        id="contact"
        className="bg-[#0a0a0a] text-[#FDF0D5] pt-0 pb-0 relative overflow-hidden z-20"
      >
        <div className="bg-[#F46036] overflow-hidden py-3 transform rotate-1 scale-105 border-y-4 border-[#1D1D1D]">
          <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] flex gap-8">
            {[...Array(10)].map((_, i) => (
              <span
                key={i}
                className="text-2xl font-black uppercase text-[#1D1D1D] tracking-widest flex items-center gap-4"
              >
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
                  <span className="text-5xl font-black tracking-tighter leading-none uppercase text-white">
                    Mudi AI
                  </span>
                </a>
                <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-md mb-10">
                  Estudio creativo impulsado por inteligencia artificial.
                  Fusionamos arte humano con potencia computacional para marcas
                  que definen el futuro.
                </p>
                <div className="flex gap-3">
                  {["Bogotá", "CDMX", "Miami"].map((city) => (
                    <span
                      key={city}
                      className="px-4 py-1.5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60 hover:border-[#F46036] hover:text-[#F46036] transition-colors cursor-default"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div></div>
            {/* 
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="text-[#F46036] font-black uppercase tracking-widest text-xs mb-8">
                Explora
              </h4>
              <ul className="space-y-4 font-bold text-xl md:text-2xl text-white/80">
                <li>
                  <a
                    href="#work"
                    className="hover:text-[#F46036] hover:pl-2 transition-all block"
                  >
                    Portafolio
                  </a>
                </li>
                <li>
                  <a
                    href="#speed"
                    className="hover:text-[#F46036] hover:pl-2 transition-all block"
                  >
                    Proceso
                  </a>
                </li>
                <li>
                  <a
                    href="#solutions"
                    className="hover:text-[#F46036] hover:pl-2 transition-all block"
                  >
                    Soluciones
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#F46036] hover:pl-2 transition-all block text-white/40"
                  >
                    Carreras
                  </a>
                </li>
              </ul>
            </div> */}

            <div className="md:col-span-3">
              <h4 className="text-[#7AB8BF] font-black uppercase tracking-widest text-xs mb-8">
                Newsletter
              </h4>
              <div className="relative mb-8 group">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full bg-[#1D1D1D] border border-white/10 rounded-xl px-6 py-5 text-white focus:outline-none focus:border-[#F46036] transition-all placeholder:text-white/20"
                />
                <button className="absolute right-2 top-2 bg-[#F46036] p-3 rounded-lg text-white hover:bg-[#ff7a50] transition-colors shadow-lg group-hover:scale-105">
                  <Send size={18} fill="currentColor" />
                </button>
              </div>

              <div className="flex gap-4">
                {[Instagram, Linkedin, Twitter, Globe].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#1D1D1D] flex items-center justify-center text-white/60 hover:bg-[#FDF0D5] hover:text-black transition-all hover:-translate-y-1"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 mb-20">
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">
              © 2025 Mudi Studio AI. All rights reserved.
            </p>
            <div className="flex gap-8 text-white/30 text-xs font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sitemap
              </a>
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
