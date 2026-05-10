import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Search, User, ShoppingCart, Facebook, Twitter, Linkedin, Instagram,
  MapPin, Mail, Phone, ChevronDown, Play, Heart, ArrowRight, ArrowLeft,
  Star, Menu, X, CheckCircle2, ShieldCheck, Clock
} from "lucide-react";

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Animation Variables */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Handle scroll events for sticky header styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-text-muted overflow-x-hidden selection:bg-accent selection:text-white">
      
      {/* 1. TOP BAR (Desktop Only) */}
      <div className="bg-primary text-gray-300 py-3 text-[13px] border-b border-white/10 hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white tracking-wide">Partagez sur :</span>
            <div className="flex items-center gap-4 text-white/70">
              <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors"><Facebook size={14} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-accent transition-colors"><Twitter size={14} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-accent transition-colors"><Linkedin size={14} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><Instagram size={14} /></a>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <a href="#adresse" className="flex items-center gap-2 hover:text-white transition-colors">
              <MapPin size={14} className="text-accent" />
              <span>Longjumeau, 91160</span>
            </a>
            <a href="mailto:contact@lafermedelongjumeau.fr" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} className="text-accent" />
              <span>contact@lafermedelongjumeau.fr</span>
            </a>
            <a href="tel:0169819242" className="flex items-center gap-2 text-white font-semibold transition-colors group">
              <Phone size={14} className="text-accent group-hover:animate-pulse" />
              <span>01 69 81 92 42</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header 
        className={cn(
          "bg-white sticky top-0 z-50 transition-all duration-300 w-full",
          isScrolled ? "shadow-[0_10px_40px_rgba(0,0,0,0.06)] h-[80px]" : "shadow-[0_4px_30px_rgba(0,0,0,0.02)] h-[100px]"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-full flex justify-between items-center">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-lg" aria-label="Accueil La Ferme">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="font-display font-[900] text-[24px] tracking-tight text-primary uppercase leading-none">
                La Ferme
              </h1>
              <span className="text-[10px] uppercase font-bold text-accent tracking-[0.2em] mt-0.5">De Longjumeau</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10 font-display font-bold text-[14px] uppercase tracking-wide">
            <a href="#" className="text-accent flex items-center gap-1 relative py-2">
              Accueil
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full"></span>
            </a>
            <a href="#about" className="text-primary hover:text-accent transition-colors py-2">À Propos</a>
            <div className="relative group py-2">
              <button aria-haspopup="true" className="text-primary group-hover:text-accent transition-colors flex items-center gap-1 select-none">
                Notre Viande <ChevronDown size={14} strokeWidth={3} className="ml-0.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              {/* Dropdown simulate */}
              <div className="absolute top-full left-0 w-48 bg-white shadow-xl opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out border border-gray-100 flex flex-col py-2">
                 <a href="#" className="px-4 py-2 hover:bg-gray-50 text-text-muted hover:text-accent">Bœuf Charolais</a>
                 <a href="#" className="px-4 py-2 hover:bg-gray-50 text-text-muted hover:text-accent">Veaux de Lait</a>
                 <a href="#" className="px-4 py-2 hover:bg-gray-50 text-text-muted hover:text-accent">Volailles Bio</a>
              </div>
            </div>
            <a href="#shop" className="text-primary hover:text-accent transition-colors py-2">Boutique</a>
            <a href="#contact" className="text-primary hover:text-accent transition-colors py-2">Contact</a>
          </nav>

          {/* Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-5">
            <button aria-label="Recherche" className="text-primary hover:text-accent transition-colors hidden sm:block">
              <Search size={22} strokeWidth={2} />
            </button>
            <button aria-label="Compte Client" className="text-primary hover:text-accent transition-colors hidden sm:block">
              <User size={22} strokeWidth={2} />
            </button>
            <button aria-label="Panier" className="text-primary hover:text-accent transition-colors relative group">
              <ShoppingCart size={22} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                0
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              aria-label="Menu" 
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              className="text-primary hover:text-accent transition-colors lg:hidden ml-2 focus:outline-none"
            >
              <Menu size={28} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white z-[70] shadow-2xl flex flex-col p-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-display font-[900] text-2xl text-primary tracking-tighter uppercase">Menu</h2>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              <nav className="flex flex-col gap-2 font-display font-bold text-[16px] uppercase tracking-wide">
                {[
                  { label: "Accueil", active: true },
                  { label: "À Propos", active: false },
                  { label: "Notre Viande", active: false },
                  { label: "Boutique", active: false },
                  { label: "Contact", active: false }
                ].map((item, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "py-4 flex items-center justify-between border-b border-gray-100 transition-colors",
                      item.active ? "text-accent" : "text-primary hover:text-accent"
                    )}
                  >
                    {item.label}
                    <ArrowRight size={16} className={item.active ? "opacity-100" : "opacity-30"} />
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-gray-100 pb-4">
                <a href="tel:0169819242" className="flex items-center gap-3 text-primary mb-4 font-bold">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <Phone size={18} />
                  </div>
                  01 69 81 92 42
                </a>
                <a href="mailto:contact@lafermedelongjumeau.fr" className="flex items-center gap-3 text-primary font-bold">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                    <Mail size={18} />
                  </div>
                  contact@lafermedelongjumeau.fr
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        {/* 3. HERO SECTION */}
        <section className="relative w-full bg-primary pt-[80px] lg:pt-[100px] flex items-center min-h-[100svh] lg:min-h-[85vh] lg:max-h-[900px] overflow-hidden">
          
          {/* Background Visual */}
          <div className="absolute inset-0 z-0 bg-primary">
            {/* 
              VIDÉO EN ARRIÈRE PLAN 
              Le paramètre "poster" affiche l'image pendant le chargement.
            */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              poster="https://images.pexels.com/video-frames/5588604/free-video-frame-5588604-hd.jpg"
              className="absolute inset-0 w-full h-full object-cover select-none" 
            >
              <source src="https://videos.pexels.com/video-files/5588604/5588604-hd_1920_1080_24fps.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay Gradient pour garantir la lisibilité du texte */}
            <div className="absolute inset-0 z-10 bg-primary/70 md:bg-primary/50 lg:bg-transparent lg:bg-gradient-to-r lg:from-primary/95 lg:via-primary/60 lg:to-primary/10"></div>
          </div>

          {/* Text Content */}
          <div className="relative z-30 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-0">
            <motion.div 
              className="max-w-[700px] xl:max-w-[650px] 2xl:max-w-[700px]"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                <span className="w-10 h-[2px] bg-accent"></span>
                <span className="text-white font-display font-bold tracking-[0.2em] uppercase text-[12px] md:text-[14px]">Artisan Boucher</span>
              </motion.div>

              <motion.h2 
                variants={fadeUp}
                className="font-display text-[45px] sm:text-[60px] md:text-[75px] lg:text-[85px] font-[900] text-white leading-[1.05] tracking-tighter mb-8"
              >
                L'Excellence <br />
                <span className="text-accent">Bouchère</span> Traditionnelle.
              </motion.h2>
              
              <motion.p 
                variants={fadeUp}
                className="text-[16px] md:text-[18px] text-white/90 font-medium mb-10 md:mb-12 max-w-[540px] leading-relaxed"
              >
                Découvrez au cœur de Longjumeau une sélection premium de viandes maturées, de volailles bio et de produits artisanaux. Le goût authentique, sans compromis.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-12 lg:mb-16">
                <a 
                  href="#boutique" 
                  className="group relative inline-flex items-center justify-center bg-accent text-white px-10 py-[18px] font-display font-bold text-[14px] uppercase tracking-[0.1em] overflow-hidden w-full sm:w-auto shadow-[0_10px_30px_rgba(224,60,49,0.3)] hover:shadow-[0_15px_40px_rgba(224,60,49,0.4)] transition-shadow rounded-full"
                >
                  <span className="absolute inset-0 bg-black/10 transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    Commander en Ligne
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </a>
                
                <a href="#contact" className="flex items-center justify-center gap-4 text-white font-display font-bold text-[14px] uppercase tracking-[0.1em] hover:text-accent transition-colors group w-full sm:w-auto py-3">
                  <span className="w-[56px] h-[56px] rounded-full border border-white/30 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center bg-white/10 backdrop-blur-md transition-all duration-300 shrink-0 shadow-lg">
                    <MapPin size={18} className="group-hover:scale-110 transition-transform" />
                  </span>
                  Notre Adresse
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 4. FEATURES SECTION */}
        <section id="features" className="py-20 lg:py-24 bg-white relative">
          <div className="max-w-[1240px] mx-auto px-6">
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center max-w-[700px] mx-auto mb-20"
            >
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-4">
                <span className="w-8 h-[2px] bg-accent"></span>
                <span className="text-accent font-display font-bold tracking-[0.2em] uppercase text-[12px]">Nos Spécialités</span>
                <span className="w-8 h-[2px] bg-accent"></span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display text-[38px] md:text-[50px] font-[900] text-primary leading-tight mb-6">
                Production Authentique<br />Par Notre Ferme
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[16px] text-text-muted max-w-[550px] mx-auto leading-relaxed">
                Une sélection rigoureuse pour garantir goût, tendreté et traçabilité de la ferme jusqu'à votre assiette.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                {
                  title: "Viandes Rouges",
                  desc: "Des races sélectionnées (Charolaise, Limousine) pour des pièces à la tendreté incomparable.",
                  icon: <path d="M4 10v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6 M4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 M8 8V4M12 8V2M16 8V4" />
                },
                {
                  title: "Volailles Bio",
                  desc: "Élevées en plein air. Des volailles avec une chair ferme et délicieuse pour tous vos repas.",
                  icon: <path d="M8 12a4 4 0 0 1 8 0c0 4.418-4 8-4 8s-4-3.582-4-8Z M12 4v4M10 2v2M14 2v2" />
                },
                {
                  title: "Charcuterie Maison",
                  desc: "Notre charcutier élabore sur place terrines, saucissons et jambons selon des recettes traditionnelles.",
                  icon: <path d="M18.5 6a4.5 4.5 0 0 0-4.5-4.5c-2.5 0-4.5 2-4.5 4.5v12c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5v-12Z M9.5 6a4.5 4.5 0 0 0-4.5-4.5A4.5 4.5 0 0 0 0.5 6v12a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 9.5 18" />
                }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="flex flex-col items-center group cursor-default"
                >
                  <div className="w-[130px] h-[130px] rounded-full border-[2px] border-dashed border-accent/30 flex items-center justify-center relative mb-8 group-hover:border-accent group-hover:scale-105 transition-all duration-500 bg-gray-50/50">
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 bg-accent rounded-full shadow-md shadow-accent/40 transform group-hover:-translate-y-1 transition-transform"></div>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                       {feature.icon}
                    </svg>
                  </div>
                  <h3 className="font-display text-[22px] font-[800] text-primary mb-4">{feature.title}</h3>
                  <p className="text-[15px] text-text-muted leading-relaxed px-4">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ABOUT SECTION */}
        <section id="about" className="py-20 lg:py-32 bg-white relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f9fafc] rounded-full blur-[100px] opacity-60 -z-10 translate-x-[30%] -translate-y-[20%]"></div>
          
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Left Images (Staggered Layout) */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative mx-auto w-[90%] max-w-[450px] lg:max-w-none mb-10 lg:mb-0"
              >
                <img 
                  src="https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=800&auto=format&fit=crop" 
                  alt="Notre boucher passionné" 
                  className="w-[85%] aspect-[3/4] object-cover rounded-sm"
                  loading="lazy" 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-10 right-0 w-[55%] aspect-square border-[10px] border-white shadow-2xl bg-white overflow-hidden"
                >
                   <img 
                      src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop" 
                      alt="Détail de notre viande de bœuf" 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                      loading="lazy" 
                    />
                </motion.div>
              </motion.div>

              {/* Right Content */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="pb-10 lg:pb-0 relative z-10 pt-16 lg:pt-0"
              >
                 <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-[2px] bg-accent"></span>
                  <span className="text-accent font-display font-bold tracking-[0.2em] uppercase text-[12px]">Notre Histoire</span>
                </motion.div>
                
                <motion.h2 variants={fadeUp} className="font-display text-[38px] md:text-[50px] font-[900] text-primary leading-tight mb-8">
                  Savoir-Faire Artisanal<br />Depuis 3 Générations
                </motion.h2>
                
                <motion.p variants={fadeUp} className="text-[16px] text-text-muted leading-relaxed mb-6">
                  Installée au cœur de Longjumeau, La Ferme est une institution dédiée à la viande de haute qualité. Nous travaillons exclusivement avec des éleveurs respectueux des cycles naturels et du bien-être animal.
                </motion.p>
                
                <motion.p variants={fadeUp} className="text-[16px] text-primary font-medium leading-relaxed mb-10 border-l-4 border-accent pl-5 py-2 bg-gray-50/50">
                  Notre mission : redonner au produit brut sa vraie valeur gustative grâce à une maturation longue et une découpe experte.
                </motion.p>
                
                <motion.ul variants={fadeUp} className="space-y-4 mb-10">
                  {[
                    "Élevages 100% Français et Locaux",
                    "Maturation sur os en chambre spécifique",
                    "Conseils de cuisson personnalisés"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[15px] font-bold text-primary font-display">
                      <CheckCircle2 size={20} className="text-accent" />
                      {item}
                    </li>
                  ))}
                </motion.ul>

                <motion.div variants={fadeUp}>
                  <a href="#shop" className="group relative inline-flex items-center justify-center bg-accent text-white px-10 py-[18px] font-display font-bold text-[14px] uppercase tracking-[0.1em] overflow-hidden rounded-full shadow-[0_10px_30px_rgba(224,60,49,0.3)] hover:shadow-[0_15px_40px_rgba(224,60,49,0.4)] transition-shadow">
                    <span className="absolute inset-0 bg-black/10 transform translate-x-[100%] transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
                    <span className="relative z-10 flex items-center gap-2">
                      Découvrir Nos Produits
                      <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </a>
                </motion.div>
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* 6. SHOP PREVIEW SECTION */}
        <section id="shop" className="py-24 overflow-hidden relative">
          {/* Angular background effect mimicking template dynamics */}
          <div className="absolute inset-0 bg-[#F9FAFC] -skew-y-3 origin-top-left z-0 transform scale-110 lg:scale-100"></div>
          
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
             
             <motion.div 
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={staggerContainer}
               className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
             >
                <div className="max-w-[600px]">
                  <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
                    <span className="w-8 h-[2px] bg-accent"></span>
                    <span className="text-accent font-display font-bold tracking-[0.2em] uppercase text-[12px]">Boutique</span>
                  </motion.div>
                  <motion.h2 variants={fadeUp} className="font-display text-[40px] md:text-[50px] font-[900] text-primary leading-tight">
                    Pièces de notre<br />Sélection du Moment
                  </motion.h2>
                </div>
                <motion.div variants={fadeUp}>
                   <a href="#" className="font-display text-primary font-bold text-[14px] uppercase tracking-wide flex items-center gap-2 hover:text-accent transition-colors border-b-2 border-primary hover:border-accent pb-1">
                     Voir Tout Le Catalogue <ArrowRight size={18} />
                   </a>
                </motion.div>
             </motion.div>

             <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                  hidden: { opacity: 0 }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {[
                  { title: "Côte de Bœuf Maturée", price: "45.00€/kg", img: "https://images.unsplash.com/photo-1602164945488-322a0e0a09e4?q=80&w=600&auto=format&fit=crop" },
                  { title: "Entrecôte Charolaise", price: "32.00€/kg", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" },
                  { title: "Plateau Barbecue", price: "28.50€", img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=600&auto=format&fit=crop" },
                  { title: "Rôti de Veau Orloff", price: "24.00€/kg", img: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600&auto=format&fit=crop" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeUp}
                    className="bg-white p-5 lg:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300 group rounded-2xl flex flex-col border border-gray-50"
                  >
                     <div className="relative h-[240px] xl:h-[280px] overflow-hidden mb-6 -mx-2 bg-gray-100 rounded-xl">
                        <img 
                          src={item.img} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-all duration-[800ms] ease-out" 
                          loading="lazy" 
                        />
                        {/* Fake Tag */}
                        {idx === 0 && (
                           <div className="absolute top-4 left-4 bg-accent text-white font-display font-bold text-[11px] uppercase tracking-wide px-3 py-1 z-10 shadow-lg">
                             Top Vente
                           </div>
                        )}
                        {/* Hover Overlay Action */}
                         <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                           <button className="bg-white text-primary rounded-full p-4 hover:bg-accent hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                              <ShoppingCart size={20} className="ml-[-2px]" />
                           </button>
                         </div>
                     </div>
                     
                     <div className="flex flex-col flex-grow">
                       <h4 className="font-display font-[800] text-[18px] text-primary mb-2 transition-colors group-hover:text-accent">
                         {item.title}
                       </h4>
                       <div className="flex text-[#FFB800] mb-3">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                       </div>
                       <span className="font-bold text-[20px] text-accent mt-auto">
                         {item.price}
                       </span>
                       
                       <div className="flex items-center justify-between border-t border-gray-100 mt-5 pt-5 relative overflow-hidden">
                         <button className="text-[13px] font-bold font-display uppercase tracking-[0.05em] text-primary/70 group-hover:text-primary transition-colors flex items-center gap-2">
                           En savoir plus <ArrowRight size={14} />
                         </button>
                         <button aria-label="Favoris" className="text-gray-300 hover:text-accent transition-colors">
                           <Heart size={18} />
                         </button>
                       </div>
                     </div>
                  </motion.div>
                ))}
             </motion.div>
          </div>
        </section>

        {/* 7. FULL WIDTH VIDEO / PROMO */}
        <section className="py-20 lg:py-32 bg-white relative">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
             <div className="relative min-h-[400px] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden group shadow-2xl rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=2000&auto=format&fit=crop" 
                  alt="Préparation en cuisine" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out min-h-[400px] sm:min-h-0" 
                  loading="lazy" 
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex flex-col justify-end p-8 lg:p-16">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button 
                      aria-label="Lancer la vidéo"
                      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_0_15px_rgba(224,60,49,0.3)] animate-pulse"
                    >
                      <Play fill="white" size={32} className="text-white translate-x-1 w-6 sm:w-8" />
                    </button>
                  </div>
                  
                  <div className="relative z-10 max-w-[600px] text-center md:text-left mt-10 md:mt-0">
                    <h3 className="font-display font-[900] text-[26px] md:text-[30px] lg:text-[45px] text-white leading-tight mb-4">
                      Visitez nos cuisines
                    </h3>
                    <p className="text-white/80 text-[15px] md:text-[16px] font-medium leading-relaxed">
                      Découvrez l'hygiène rigoureuse et le savoir-faire de notre équipe au quotidien.
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS SECTION */}
        <section className="py-20 lg:py-32 bg-[#F9FAFC] relative">
          <div className="max-w-[1240px] mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
             
             {/* Left Collage Images */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="w-full lg:w-1/2 flex gap-4 lg:gap-6"
             >
               <div className="w-1/2 h-[350px] sm:h-[450px] lg:h-[550px] transform -translate-y-6">
                 <img src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=600&auto=format&fit=crop" alt="Viande cuite" className="w-full h-full object-cover rounded-sm shadow-md" loading="lazy" />
               </div>
               <div className="w-1/2 h-[350px] sm:h-[450px] lg:h-[550px] transform translate-y-6">
                 <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" alt="Cuisson au barbecue" className="w-full h-full object-cover rounded-sm shadow-2xl" loading="lazy" />
               </div>
             </motion.div>
             
             {/* Right Text Content */}
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 w-full mt-10 md:mt-0"
              >
               <div className="flex items-center gap-4 mb-4">
                  <span className="w-8 h-[2px] bg-accent"></span>
                  <span className="text-accent font-display font-bold tracking-[0.2em] uppercase text-[12px]">Témoignages</span>
               </div>
               <h2 className="font-display text-[38px] md:text-[45px] font-[900] text-primary leading-tight mb-8">
                 Ce Que Nos Clients<br />Disent De Nous
               </h2>
               
               {/* Testimonial Quote */}
               <div className="relative">
                 {/* Large decorative quotes */}
                 <span className="absolute -top-6 -left-4 text-accent/10 font-serif text-[100px] leading-none pointer-events-none select-none">"</span>
                 
                 <p className="text-[17px] md:text-[19px] text-primary/80 leading-relaxed font-serif italic mb-10 border-l-4 border-accent pl-6 py-2 relative z-10">
                   "La meilleure boucherie de la région sans hésitation ! La viande est d'une tendreté exceptionnelle et les conseils de préparation sont toujours justes. Un accueil chaleureux qui donne envie de revenir."
                 </p>
                 
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" 
                        alt="Rebeka Dawson" 
                        className="w-16 h-16 rounded-full border-[3px] border-white shadow-[0_5px_15px_rgba(0,0,0,0.1)] object-cover" 
                      />
                      <div>
                        <h5 className="font-display font-[800] text-primary text-[17px]">Marie D.</h5>
                        <span className="text-[13px] text-accent font-bold uppercase tracking-wider">Cliente Fidéle</span>
                      </div>
                    </div>
                    
                    {/* Navigation Arrows (Visual only for template) */}
                    <div className="flex gap-3">
                       <button aria-label="Précédent" className="w-12 h-12 border border-gray-200 bg-white flex items-center justify-center rounded-full hover:bg-primary hover:border-primary hover:text-white transition-colors text-primary shadow-sm">
                         <ArrowLeft size={18} />
                       </button>
                       <button aria-label="Suivant" className="w-12 h-12 border border-accent flex items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover transition-colors shadow-sm">
                         <ArrowRight size={18} />
                       </button>
                    </div>
                 </div>
               </div>
             </motion.div>
          </div>
        </section>

        {/* 9. FAQ SECTION */}
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
           {/* Abstract Decorative SVG (Watermark) */}
           <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-[600px] h-[600px] -z-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-primary">
                <path d="M84.7,-119C111.4,-100.8,135.5,-78.3,149.5,-50.2C163.5,-22.1,167.3,11.6,156.4,41.4C145.4,71.2,119.7,97,90.4,115.1C61,133.2,28,143.5,0.8,142.5C-26.4,141.4,-52.8,128.9,-77.9,110.1C-103,91.3,-126.8,66,-138.8,36.4C-150.8,6.8,-151,-27.1,-136.9,-54.6C-122.8,-82.1,-94.3,-103.3,-65.4,-120.3C-36.5,-137.3,-7.2,-150.3,18.5,-146.4C44.2,-142.5,70,-121.7,84.7,-119Z" transform="translate(100 100)" />
              </svg>
           </div>

          <div className="max-w-[1240px] mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24">
             
             {/* Text & Accordion Content */}
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="flex-1 z-10"
             >
               <div className="flex items-center gap-4 mb-4">
                  <span className="w-8 h-[2px] bg-accent"></span>
                  <span className="text-accent font-display font-bold tracking-[0.2em] uppercase text-[12px]">FAQ</span>
               </div>
               <h2 className="font-display text-[38px] md:text-[50px] font-[900] text-primary leading-tight mb-10">
                 Questions<br />Fréquemment Posées.
               </h2>
               
               {/* Accessible Accordion Component */}
               <div className="space-y-4">
                  {[
                    {
                      q: "Vos viandes sont-elles toutes d'origine française ?",
                      a: "Absolument. Nous privilégions les circuits courts et travaillons avec un réseau d'éleveurs français partenaires, principalement situés dans le Charolais et le Limousin, garantissant des méthodes d'élevage traditionnelles."
                    },
                    {
                      q: "Proposez-vous un service traiteur ou rôtisserie ?",
                      a: "Oui, notre rôtisserie est ouverte du vendredi au dimanche. Nous préparons poulets fermiers rôtis, rôtis de porc et accompagnements maison. Pensez à réserver par téléphone !"
                    },
                    {
                      q: "Faites-vous la livraison à domicile ?",
                      a: "Nous assurons des livraisons dans un rayon de 15km autour de Longjumeau pour toute commande supérieure à 50€. La commande doit être passée au moins 24h à l'avance."
                    }
                  ].map((faq, index) => {
                    const isOpen = activeFaq === index;
                    return (
                      <div 
                        key={index} 
                        className={cn(
                          "transition-colors duration-300",
                          isOpen ? "bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] border-l-4 border-accent" : "bg-gray-50/50 hover:bg-gray-50 border border-gray-100"
                        )}
                      >
                         <button 
                           onClick={() => toggleFaq(index)}
                           aria-expanded={isOpen}
                           className="w-full text-left p-6 sm:px-8 py-6 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                         >
                           <h4 className={cn("font-display font-[800] text-[17px] pr-8 transition-colors", isOpen ? "text-primary" : "text-primary/80")}>
                             {faq.q}
                           </h4>
                           <ChevronDown 
                             size={20} 
                             className={cn("shrink-0 transition-transform duration-300", isOpen ? "text-accent rotate-180" : "text-gray-400")} 
                           />
                         </button>
                         <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                 <p className="px-6 sm:px-8 pb-6 text-[15px] text-text-muted leading-relaxed">
                                   {faq.a}
                                 </p>
                              </motion.div>
                            )}
                         </AnimatePresence>
                      </div>
                    )
                  })}
               </div>
             </motion.div>
             
             {/* Decorative FAQ Images */}
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="w-full lg:w-[45%] relative z-10 hidden md:block"
             >
               <img 
                 src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=800&auto=format&fit=crop" 
                 alt="Boucher expert en préparation" 
                 className="w-[80%] ml-auto aspect-square object-cover shadow-2xl rounded-sm" 
                 loading="lazy" 
               />
               <img 
                 src="https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600&auto=format&fit=crop" 
                 alt="Découpe soignée de viande" 
                 className="absolute -bottom-10 -left-10 w-[55%] aspect-[4/3] object-cover border-[10px] border-white shadow-xl rounded-sm" 
                 loading="lazy" 
               />
             </motion.div>
          </div>
        </section>

        {/* 10. CONTACT & INFORMATIONS PRATIQUES */}
        <section id="contact" className="py-20 lg:py-32 bg-white relative">
          <div className="max-w-[1240px] mx-auto px-6">
             <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                
                {/* Contact Info */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-8 h-[2px] bg-accent"></span>
                    <span className="text-accent font-display font-bold tracking-[0.2em] uppercase text-[12px]">Localisation</span>
                  </div>
                  <h2 className="font-display text-[38px] md:text-[50px] font-[900] text-primary leading-tight mb-8">
                    Venez Nous<br />Rendre Visite.
                  </h2>
                  <p className="text-[16px] text-text-muted leading-relaxed mb-10 max-w-[450px]">
                    Notre équipe vous accueille avec le sourire pour vous conseiller les meilleures pièces selon vos envies et recettes.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-5 bg-gray-50/50 border border-gray-100 rounded-2xl">
                      <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center shrink-0 text-accent">
                        <MapPin size={22} />
                      </div>
                      <div>
                        <h4 className="font-display font-[800] text-[18px] text-primary mb-1">Notre Adresse</h4>
                        <p className="text-text-muted text-[15px]">12 Rue de la Ferme<br />91160 Longjumeau, France</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-5 bg-gray-50/50 border border-gray-100 rounded-2xl">
                      <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center shrink-0 text-accent">
                        <Clock size={22} />
                      </div>
                      <div className="w-full">
                        <h4 className="font-display font-[800] text-[18px] text-primary mb-2">Horaires d'Ouverture</h4>
                        <ul className="text-text-muted text-[15px] space-y-1">
                          <li className="flex justify-between border-b border-gray-200/50 pb-1">
                            <span>Lundi</span> <span className="text-accent font-medium">Fermé</span>
                          </li>
                          <li className="flex justify-between border-b border-gray-200/50 py-1">
                            <span>Mar - Sam</span> <span>08:30 - 13:00 / 15:30 - 19:30</span>
                          </li>
                          <li className="flex justify-between pt-1">
                            <span>Dimanche</span> <span>08:30 - 13:00</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-gray-50/50 border border-gray-100 rounded-2xl">
                      <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center shrink-0 text-accent">
                        <Phone size={22} />
                      </div>
                      <div>
                        <h4 className="font-display font-[800] text-[18px] text-primary mb-1">Réservations & Commandes</h4>
                        <a href="tel:0169819242" className="text-text-muted text-[15px] hover:text-accent transition-colors block">01 69 81 92 42</a>
                        <p className="text-[13px] text-primary/50 mt-1 italic">N'hésitez pas à appeler pour réserver votre rôtisserie le week-end.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Map Interface */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 w-full relative z-10 flex flex-col"
                >
                  <div className="w-full h-[400px] lg:h-[500px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group mb-6">
                    <iframe 
                      src="https://maps.google.com/maps?q=12%20Rue%20de%20la%20Ferme,%2091160%20Longjumeau,%20France&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps Location"
                    ></iframe>
                  </div>
                  
                  <a 
                    href="https://maps.google.com/?q=12+Rue+de+la+Ferme,+91160+Longjumeau,+France" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 font-display font-bold text-[14px] uppercase tracking-[0.1em] rounded-full shadow-[0_10px_30px_rgba(10,15,26,0.3)] hover:bg-accent hover:shadow-[0_10px_30px_rgba(224,60,49,0.3)] transition-all"
                  >
                    Ouvrir dans Google Maps <ArrowRight size={16} className="ml-1" />
                  </a>
                </motion.div>
                
             </div>
          </div>
        </section>

      </main>

      {/* 11. REAL FOOTER SECTION */}
      <footer className="bg-primary text-white pt-20 pb-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
              
              {/* Brand Column */}
              <div className="flex flex-col">
                <a href="#" className="flex items-center gap-3 mb-6" aria-label="Accueil La Ferme">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <h1 className="font-display font-[900] text-[22px] tracking-tight text-white uppercase leading-none">
                    La Ferme
                  </h1>
                </a>
                <p className="text-[14px] text-gray-400 leading-relaxed mb-6">
                  Artisan boucher passionné à Longjumeau. Viandes d'exception, charcuterie artisanale et conseils personnalisés.
                </p>
                <div className="flex flex-wrap gap-3">
                   <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors"><Facebook size={18} /></a>
                   <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors"><Instagram size={18} /></a>
                   <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors"><Twitter size={18} /></a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-display font-[800] text-[18px] mb-6">Liens Rapides</h4>
                <ul className="space-y-3 flex flex-col">
                   <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-[14px] flex items-center gap-2"><ArrowRight size={14} className="text-accent" /> À Propos</a></li>
                   <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-[14px] flex items-center gap-2"><ArrowRight size={14} className="text-accent" /> Notre Viande</a></li>
                   <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-[14px] flex items-center gap-2"><ArrowRight size={14} className="text-accent" /> Boutique</a></li>
                   <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-[14px] flex items-center gap-2"><ArrowRight size={14} className="text-accent" /> Blog & Recettes</a></li>
                   <li><a href="#" className="text-gray-400 hover:text-accent transition-colors text-[14px] flex items-center gap-2"><ArrowRight size={14} className="text-accent" /> Contact</a></li>
                </ul>
              </div>

              {/* Working Hours */}
              <div>
                <h4 className="font-display font-[800] text-[18px] mb-6">Horaires d'Ouverture</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-400 text-[14px]">
                    <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-medium mb-1">Mardi - Vendredi :</strong>
                      08:00 - 13:00 / 15:30 - 19:30
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400 text-[14px]">
                    <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-medium mb-1">Samedi :</strong>
                      08:00 - 19:30 (Non-stop)
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400 text-[14px]">
                    <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-medium mb-1">Dimanche :</strong>
                      08:00 - 13:00 (Lundi fermé)
                    </div>
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="font-display font-[800] text-[18px] mb-6">Newsletter</h4>
                <p className="text-gray-400 text-[14px] mb-4 leading-relaxed">
                  Abonnez-vous pour recevoir nos offres spéciales et nos meilleures recettes.
                </p>
                <form className="relative flex" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="Votre adresse email" 
                    required
                    className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 outline-none focus:border-accent transition-colors text-[14px] rounded-sm"
                  />
                  <button 
                    type="submit" 
                    aria-label="S'abonner"
                    className="absolute right-0 top-0 h-full px-4 bg-accent hover:bg-accent-hover transition-colors rounded-r-sm text-white flex items-center justify-center"
                  >
                     <ArrowRight size={18} />
                  </button>
                </form>
              </div>

           </div>

           {/* Bottom Bar */}
           <div className="pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <p className="text-gray-500 text-[13px] mt-4 md:mt-0">
                 &copy; {new Date().getFullYear()} La Ferme de Longjumeau. Tous droits réservés.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-[13px] text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
                <a href="#" className="hover:text-white transition-colors">CGV</a>
              </div>
           </div>
        </div>
      </footer>

      {/* Floating Action Button (Mobile Call) */}
      <a 
        href="tel:0169819242"
        className="lg:hidden fixed bottom-0 left-0 w-full bg-accent text-white h-16 font-display font-bold flex items-center justify-center gap-3 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] z-[45] tracking-wide uppercase text-[14px] active:bg-accent-hover transition-colors"
      >
        <Phone size={20} strokeWidth={2.5} className="animate-pulse" />
        Appeler la Boucherie
      </a>
      
      {/* Spacer for FAB on mobile */}
      <div className="h-16 lg:hidden w-full bg-primary" aria-hidden="true"></div>

    </div>
  );
}
