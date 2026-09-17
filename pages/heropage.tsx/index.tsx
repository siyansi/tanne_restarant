
"use client";

import { FormEvent, useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowRight, Bell } from "lucide-react";

import heroImage from "../../assets/tanne-hero.jpg";
import chefImage from "../../assets/tanne-chef.jpg";
import gardenImage from "../../assets/tanne-garden.jpg";
import loungeImage from "../../assets/tanne-lounge.jpg";
import dishImage from "../../assets/tanne-dish.jpg";
import cocktailImage from "../../assets/tanne-cocktail.jpg";
import { ServicesSection } from "@/components/navbar";
import  MenuBookSection  from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import RibbonGallerySection from "@/components/gallery";
import HeroSection from "@/components/hero";
import ContactSection from "@/hooks/contact";
import SpacesSection from "@/hooks/launch";
import Navbar from "@/hooks/nav";
const navItems = ["Home", "About", "Spaces", "Services", "Menu", "Gallery", "Contact"];

const Instagram = ({ size = 24, strokeWidth = 2, className }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
  </svg>
);

const Facebook = ({ size = 24, className }: { size?: number; className?: string }) => (
  <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 8h3V4h-3c-2.76 0-5 2.24-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.55.45-1 1-1Z" />
  </svg>
);


const socialLinks = [
  {
    name: "Call Us",
    href: "tel:+918489988007",
    icon: Phone,
    color: "hover:text-[var(--cyan)] hover:border-[var(--cyan)] hover:shadow-[0_0_20px_color-mix(in_oklab,var(--cyan)_35%,transparent)]",
    bgGlow: "bg-[var(--cyan)]/15",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/918489988007",
    icon: MessageCircle,
    color: "hover:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(52,211,153,0.35)]",
    bgGlow: "bg-emerald-500/15",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: Facebook,
    color: "hover:text-sky-400 hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]",
    bgGlow: "bg-sky-500/15",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: Instagram,
    color: "hover:text-[var(--gold)] hover:border-[var(--gold)] hover:shadow-[0_0_20px_color-mix(in_oklab,var(--gold)_35%,transparent)]",
    bgGlow: "bg-[var(--gold)]/15",
  },
];

interface IntroScreenProps {
  visible: boolean;
}

export default function TannePage() {
  const [light, setLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
const [selectedCard, setSelectedCard] = useState<number | null>(null);
const brandLetters = "TANNE".split("");
const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("tanne-theme");
    if (saved === "light") setLight(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateGallery = () => {
      const section = galleryRef.current;
      const track = galleryTrackRef.current;
      if (!section || !track) return;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const travel = Math.max(0, track.scrollWidth - window.innerWidth + 32);
      track.style.transform = `translate3d(${-progress * travel}px, 0, 0)`;
      track.style.setProperty("--gallery-progress", `${progress}`);
      section.style.setProperty("--gallery-progress", `${progress}`);
    };
    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateGallery);
    };
    updateGallery();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 40);
  };
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  useEffect(() => {
    const nodes = pageRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!nodes) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setLight((current) => {
      const next = !current;
      window.localStorage.setItem("tanne-theme", next ? "light" : "dark");
      return next;
    });
  };

  const submitReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello Tanne, I'd like to reserve a table.\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nDate: ${data.get("date")}\nGuests: ${data.get("guests")}\nOccasion: ${data.get("occasion") || "—"}`;
    window.open(`https://wa.me/918489988007?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
const loungeSpaces = [
  {
    id: "01",
    title: "Chef’s Table",
    tagline: "Under Garden Canopy",
    price: "₹5,000",
    period: "Session",
    desc: "An intimate high-table counter set amidst fairy lights and living trees, curated for signature chef tasting courses.",
    image: dishImage, // Replace with your Chef's Table garden photo
    featured: false,
  },
  {
    id: "02",
    title: "Family Lounge",
    tagline: "Private Lawn & Screen",
    price: "₹8,000",
    period: "Night",
    desc: "Spacious outdoor green lawn equipped with dedicated private patio seating, open-air projection screen, and evening dining.",
    image: gardenImage, // Replace with the Family Lounge lawn photo
    featured: true,
  },
  {
    id: "03",
    title: "Business Meeting Room",
    tagline: "Villa Lawn & Terrace",
    price: "₹12,000",
    period: "Session",
    desc: "Private executive setting with manicured landscape surroundings, quiet ambient acoustics, and high-tier hospitality service.",
    image: loungeImage, // Replace with the Business Room photo
    featured: false,
  },
  {
    id: "04",
    title: "Exclusive VIP Lounge",
    tagline: "Paved Garden Pavilion",
    price: "₹15,000",
    period: "Night",
    desc: "A secluded stone-paved pavilion surrounded by shaded foliage and private waitstaff, tailored for premier celebrations.",
    image: cocktailImage, // Replace with the VIP Lounge patio photo
    featured: false,
  },
];

const pillars = [
    {
      title: "Estate Terroir",
      desc: "Heirloom produce gathered daily from organic high-altitude estates across the Nilgiris.",
    },
    {
      title: "Woodfire Hearth",
      desc: "Slow-roasted preparations shaped over wild fruitwood coals and clay vessels.",
    },
    {
      title: "Garden Architecture",
      desc: "Courtyard dining sheltered by reflective water bodies and open night foliage.",
    },
  ];


  return (
    <div
      ref={pageRef}
      className={`relative min-h-screen overflow-x-clip transition-colors duration-500  bg-[var(--page)] text-[var(--ink)] ${
        light ? "light" : ""
      }`}
    >
      {/* Intro Overlay */}
 {introVisible && (
         <div

          className="fixed inset-0 z-[100] grid place-content-center justify-items-center bg-[oklch(0.08_0_0)] text-[oklch(0.96_0.008_95)] animate-intro-exit"

          aria-label="Welcome to Tanne"

        >

          <div className="intro-glitter absolute inset-0 overflow-hidden" aria-hidden="true">

            {Array.from({ length: 24 }, (_, index) => (

              <i key={index} style={{ "--i": index } as CSSProperties} />

            ))}

          </div>

          <p className="relative z-[2] m-0 font-display font-normal text-[clamp(3.2rem,8vw,7.5rem)] leading-none animate-write-on">

            Welcome

          </p>

          <div className="w-[min(24rem,55vw)] h-[1px] mt-5 bg-gradient-to-r from-transparent via-[var(--cyan)] to-[var(--gold)] animate-intro-rule" />

          <p className="mt-5 text-[var(--gold)] font-display font-medium text-[0.72rem] leading-none tracking-[0.42em] animate-intro-brand">

            TO TANNE

          </p>

        </div>
      )}
      {/* Ambient Orbs */}
      <div
        className="fixed z-0 w-[34rem] h-[34rem] rounded-full blur-[130px] pointer-events-none -top-72 -left-72 bg-[color-mix(in_oklab,var(--cyan)_15%,transparent)] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="fixed z-0 w-[34rem] h-[34rem] rounded-full blur-[130px] pointer-events-none -right-80 -bottom-80 bg-[color-mix(in_oklab,var(--gold)_13%,transparent)] animate-pulse-glow [animation-delay:2s]"
        aria-hidden="true"
      />

      {/* Social Rail */}
     <div className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-center select-none">
      
      {/* Expanding Vertical Icons (Pops Upward) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col-reverse items-center gap-3 mb-3"
          >
            {socialLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 25, scale: 0.4 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 350,
                      damping: 24,
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: 20, 
                    scale: 0.5,
                    transition: {
                      delay: (socialLinks.length - 1 - index) * 0.03,
                      duration: 0.18,
                    }
                  }}
                  className="relative group flex items-center"
                >
                  {/* Tooltip Label */}
                  <span className="absolute right-14 px-3 py-1 rounded-full border border-[var(--line)] bg-[#120d09]/90 backdrop-blur-xl text-white font-display text-[0.7rem] uppercase tracking-wider opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 whitespace-nowrap shadow-xl">
                    {item.name}
                  </span>

                  {/* Icon Link Button */}
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={item.name}
                    className={`w-11 h-11 rounded-full border border-[var(--line)] bg-[#140d07]/90 backdrop-blur-xl flex items-center justify-center text-[var(--soft)] transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg ${item.color}`}
                  >
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle contact channels"
        aria-expanded={isOpen}
        className="relative w-13 h-13 rounded-full border border-[var(--gold)]/60 bg-gradient-to-tr from-[#1b120a] to-[#2a1a0d] text-[var(--gold)] shadow-[0_10px_35px_rgba(0,0,0,0.65)] backdrop-blur-xl flex items-center justify-center cursor-pointer overflow-hidden group"
      >
        {/* Ambient Ring Glow */}
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_30%,transparent)_0%,transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity" />

        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close-icon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 relative z-10" />
            </motion.span>
          ) : (
            <motion.span
              key="sparkles-icon"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Bell  className="w-5 h-5 relative z-10 animate-pulse" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

    </div>

      {/* Header */}
     <header
  className="" >
 <Navbar />
</header>





      <main>
        {/* Hero Section */}
        <section id="home" className="">
         <HeroSection />
        </section>





        {/* About Section */}
     <section
      id="about"
      className="relative z-10 p-9 px-5 md:px-[max(1.5rem,calc((100vw-90rem)/2))] bg-[#070503] text-[#f4efe6] border-t border-white/10 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[6fr_6fr] gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
        
        {/* LEFT COLUMN: Narrative & Resort Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-xl"
        >
          {/* Heritage Marker */}
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-[var(--gold)] text-xs font-serif">∼</span>
            <span className="font-display text-[0.72rem] tracking-[0.3em] uppercase text-[var(--gold)] font-medium">
              The Heritage · Est. 2010
            </span>
          </div>

          {/* Heading */}
          <h2 className="m-0 font-serif font-normal text-[clamp(2.4rem,4.8vw,4.4rem)] leading-[1.05] tracking-tight text-white">
            An evening crafted <br />
            in <em className="italic text-[var(--gold)] font-normal">quiet harmony</em>.
          </h2>

          {/* Narrative Body */}
          <p className="mt-7 text-white/75 text-base md:text-lg font-light leading-relaxed">
            Conceived as a secluded sanctuary away from the city rhythm, Tanne blends timeless hospitality with contemporary South Indian gastronomy. Here, dining slows to the cadence of the garden courtyard, where warm embers, gentle fountains, and starlit canopies shape an unforgettable arrival.
          </p>

          {/* Architectural Experience Pillars */}
          <div className="mt-10 space-y-6 pt-8 border-t border-white/10">
            {pillars.map((item, idx) => (
              <div key={item.title} className="grid grid-cols-[2rem_1fr] gap-4 items-baseline">
                <span className="font-serif italic text-sm text-[var(--gold)]/80">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="m-0 font-display font-medium text-sm md:text-base text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-white/60 font-light leading-relaxed m-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Heritage Timeline & Reservation Link */}
          <div className="mt-12 flex flex-wrap items-center gap-8 pt-8 border-t border-white/10">
            <div>
              <p className="font-serif text-3xl text-white tracking-tight m-0">
                16 <span className="text-sm font-sans text-[var(--gold)]">Years</span>
              </p>
              <p className="text-[0.68rem] tracking-[0.2em] uppercase text-white/40 font-mono mt-0.5 m-0">
                Of Culinary Legacy
              </p>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <p className="font-serif text-3xl text-white tracking-tight m-0">
                06 <span className="text-sm font-sans text-[var(--gold)]">Salons</span>
              </p>
              <p className="text-[0.68rem] tracking-[0.2em] uppercase text-white/40 font-mono mt-0.5 m-0">
                Open Air & Intimate
              </p>
            </div>

            <a
              href="#reserve"
              className="ml-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--gold)] hover:text-white transition-colors"
            >
              <span>Explore Sanctuaries</span>
              <span className="text-sm">→</span>
            </a>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Quiet Luxury Portrait Framing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Subtle Outer Frame Accent */}
          <div className="relative rounded-3xl p-3 md:p-4 bg-gradient-to-b from-[#16110b] to-[#0d0906] border border-[#c7a35d]/30 shadow-[0_30px_90px_rgba(0,0,0,0.85)]">
            
            {/* Fine Inset Line */}
            <div className="absolute inset-2 md:inset-3 rounded-2xl border border-white/10 pointer-events-none z-10" />

            {/* Chef/Atelier Photography */}
            <div className="relative h-[60vh] lg:h-[42rem] min-h-[28rem] rounded-xl overflow-hidden bg-black">
              <Image
                src={chefImage}
                alt="Culinary craft at Tanne Fine Dining"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center brightness-[0.85] contrast-[1.06]"
              />

              {/* Natural Shading Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

              {/* Minimalist Caption Plaque */}
              <div className="absolute inset-x-6 bottom-6 z-20 flex items-end justify-between">
                <div>
                  <p className="font-serif italic text-lg text-white/90 m-0">
                    "Every course honors the ember and season."
                  </p>
                  <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[var(--gold)] font-mono mt-1.5 m-0">
                    Tanne Atelier · Coimbatore
                  </p>
                </div>

                <span className="font-serif text-2xl text-[var(--gold)]/50 hidden sm:block">
                  
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>






        {/* Spaces Section */}
       <section
  id="spaces"
  className=""
>

<SpacesSection loungeSpaces={loungeSpaces} />
</section>




  {/* Menu Section */}
        <section
          id="menu"
          className=""
        >
         <MenuBookSection />
        </section>






        {/* Services Section */}
       <section
  id="services"
  className=""
>
 <ServicesSection />
</section>







      





        {/* Reservation CTA Section */}
     <section
      id="reserve"
      className="relative min-h-[60vh] py-9 px-6 bg-[#070503] text-[#eee7da] border-t border-white/10 overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. Subtle Warm Hearth Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(199,163,93,0.06)_0%,transparent_80%)]" 
        aria-hidden="true" 
      />

      {/* 2. Main Content Canvas */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        
        {/* Heritage Tag */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-3 mb-5"
        >
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
          <span className="font-display text-[0.72rem] tracking-[0.3em] uppercase text-[var(--gold)] font-medium">
            Table Reservations
          </span>
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
        </motion.div>

        {/* Serif Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="m-0 font-serif font-normal text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.08] tracking-tight text-white"
        >
          An evening set beneath <br />
          <span className="italic text-[var(--gold)]">the canopy</span>.
        </motion.h2>

        {/* Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-white/70 text-sm md:text-base font-light max-w-md leading-relaxed"
        >
          We preserve limited seating each service to ensure an unhurried, quiet dining experience. Reservations are welcomed in advance.
        </motion.p>

        {/* Minimal Linear Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-[var(--gold)]/40 my-9"
        />

        {/* 3. Refined Architectural Action Button */}
   <motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
  className="flex flex-col sm:flex-row items-center gap-4"
>
  {/* 1. Request Table Button: Fixed BG, Animated Spring Arrow */}
  <a
    href="#contact"
    className="group relative inline-flex items-center gap-3.5 px-8 py-3.5 rounded-full border border-[var(--gold)] bg-[var(--gold)] text-[oklch(0.12_0_0)] font-display font-semibold text-xs md:text-sm tracking-[0.18em] uppercase select-none"
  >
    <span>Request a Table</span>
    
    {/* Icon Spring Slide */}
    <span className="inline-flex overflow-hidden w-4 h-4 items-center">
      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
    </span>
  </a>

  {/* 2. View Menu Button: Vertical Text Slider Animation & Arrow Inset */}
  <a
    href="#menu"
    className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md text-white/80 font-display text-xs md:text-sm tracking-[0.16em] uppercase overflow-hidden transition-colors duration-300 hover:border-[var(--gold)] hover:text-white select-none"
  >
    {/* Icon Slides in from left */}
    <span className="inline-block transition-transform duration-300 -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-[var(--gold)]">
      →
    </span>

    {/* Dual Vertical Slide Text Layer */}
    <span className="relative inline-block overflow-hidden h-[1.2em]">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
        View Menu
      </span>
      <span className="absolute inset-0 block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0 text-[var(--gold)]">
        View Menu
      </span>
    </span>
  </a>
</motion.div>

        {/* Dining Credentials Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex items-center gap-6 text-[0.7rem] text-white/40 font-mono tracking-widest uppercase"
        >
          <span>Dinner 19:00 — 23:30</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Complimentary Valet</span>
          <span className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
          <span className="hidden sm:inline">Avinashi Road, Arasur</span>
        </motion.div>

      </div>
    </section>






        {/* Gallery Horizontal Scroll Section */}
        <section id="gallery" className="" ref={galleryRef}>
         <RibbonGallerySection />
        </section>





        {/* Contact & Reservation Form Section */}
        <section
          id="contact"
          className=""
        >
          <ContactSection submitReservation={function (e: FormEvent<HTMLFormElement>): void {
                      throw new Error("Function not implemented.");
                  } } />
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-[93.75rem] mx-auto py-10 px-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t border-[var(--line)] text-[var(--soft)] text-[0.75rem]">
        <a href="#home" className="text-[var(--ink)] font-display font-bold text-[1.1rem]">
          TANNE<span className="text-[var(--gold)]">.</span>
        </a>
        <p className="m-0">Culinary excellence since 2010 · Coimbatore</p>
        <p className="m-0">© 2026 Tanne Fine Dining</p>
      </footer>
    </div>
  );
}