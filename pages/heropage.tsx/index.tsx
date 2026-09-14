
"use client";

import { FormEvent, useEffect, useRef, useState, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";

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

  return (
    <div
      ref={pageRef}
      className={`relative min-h-screen overflow-x-clip transition-colors duration-500  bg-[var(--page)] text-[var(--ink)] ${
        light ? "light" : ""
      }`}
    >
      {/* Intro Overlay */}
      {introVisible && (
     <AnimatePresence>
      {introVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1], when: "afterChildren" },
          }}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden bg-[oklch(0.06_0_0)] select-none pointer-events-auto"
          aria-label="Welcome to Tanne Fine Dining"
        >
          {/* Top & Bottom Shutter Slices for Cinematic Curtain Exit */}
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[oklch(0.07_0_0)] z-0 pointer-events-none"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
            style={{ transformOrigin: "bottom" }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[oklch(0.07_0_0)] z-0 pointer-events-none"
          />

          {/* 1. Ambient Lighting Embers */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full blur-[140px] pointer-events-none z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_20%,transparent)_0%,color-mix(in_oklab,var(--cyan)_12%,transparent)_60%,transparent_75%)] animate-pulse-glow"
            aria-hidden="true"
          />

          {/* 2. Floating Star Particles */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {Array.from({ length: 28 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  scale: [0.2, 1.4, 0.2],
                  y: [-10, -40],
                }}
                transition={{
                  duration: 2.2 + (i % 3) * 0.8,
                  repeat: Infinity,
                  delay: (i * 0.12),
                  ease: "easeInOut",
                }}
                style={{
                  left: `${(i * 3.7) % 94 + 3}%`,
                  top: `${(i * 7.1) % 86 + 7}%`,
                }}
                className="absolute w-1 h-1 rounded-full bg-[var(--gold)] shadow-[0_0_12px_var(--gold)]"
              />
            ))}
          </div>

          {/* 3. Subtle Corner Crosshairs */}
          <div className="absolute inset-8 md:inset-12 pointer-events-none z-10 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[var(--gold)]/40 font-mono text-[0.65rem] tracking-widest">
              <span>+ 11.0168° N, 76.9558° E</span>
              <span>EST. 2010 · COIMBATORE +</span>
            </div>
            <div className="flex justify-between items-center text-[var(--gold)]/40 font-mono text-[0.65rem] tracking-widest">
              <span>+ SALON ARCHITECTURE</span>
              <span>FINE DINING SANCTUARY +</span>
            </div>
          </div>

          {/* 4. Center Typography Composition */}
          <div className="relative z-20 flex flex-col items-center text-center px-4">
            
            {/* Elegant Script Kicker */}
            <div className="overflow-hidden mb-2">
              <motion.p
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="m-0 font-serif italic text-[clamp(1.4rem,3.2vw,2.4rem)] text-[var(--cyan)] font-normal tracking-wide"
              >
                Welcome to the sanctuary of
              </motion.p>
            </div>

            {/* Main Brand Title with Split-Letter Stagger & Shimmer */}
            <div className="overflow-hidden py-2 flex items-center justify-center">
              <div className="flex items-center">
                {brandLetters.map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: "130%", rotate: index % 2 === 0 ? -6 : 6, opacity: 0 }}
                    animate={{ y: "0%", rotate: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.45 + index * 0.08,
                    }}
                    className="inline-block font-display font-extrabold text-[clamp(4.2rem,13vw,10.5rem)] leading-[0.88] tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-b from-white via-[oklch(0.96_0.008_95)] to-[var(--gold)] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
                  >
                    {char}
                  </motion.span>
                ))}
                
                {/* Accent Period Dot */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.1, type: "spring", stiffness: 300 }}
                  className="inline-block font-display font-bold text-[clamp(4.2rem,13vw,10.5rem)] leading-[0.88] text-[var(--gold)]"
                >
                  .
                </motion.span>
              </div>
            </div>

            {/* Laser Line Sweeper */}
            <div className="relative w-[min(28rem,70vw)] h-[1px] my-5 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.4, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </div>

            {/* Sub-Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-ping" />
              <p className="m-0 font-display font-medium text-[0.7rem] md:text-xs tracking-[0.45em] text-[var(--gold)] uppercase">
                GARDEN DINING · FIRE · SALONS
              </p>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
              <Sparkles className="w-5 h-5 relative z-10 animate-pulse" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

    </div>

      {/* Header */}
     <header
  className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out flex flex-col items-center pointer-events-none ${
    scrolled ? "pt-3 px-4" : "pt-4 px-3 md:px-5"
  }`}
>
  <nav
    className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-between border border-[var(--line)] rounded-full bg-[var(--glass-heavy)] backdrop-blur-xl backdrop-saturate-150 ${
      scrolled
        ? "w-full max-w-[58rem] h-[3.15rem] py-1 px-3 md:px-4 shadow-[0_20px_45px_oklch(0_0_0/0.45)] border-[color-mix(in_oklab,var(--gold)_30%,var(--line))]"
        : "w-full max-w-[93.75rem] h-[3.4rem] md:h-[3.75rem] py-2 px-3 md:px-5 shadow-[0_18px_60px_oklch(0_0_0/0.12)]"
    }`}
    aria-label="Main navigation"
  >
    <a
      href="#home"
      className={`text-[var(--ink)] font-display font-bold leading-none tracking-normal transition-all duration-300 ${
        scrolled ? "text-[0.98rem]" : "text-[1.1rem]"
      }`}
    >
      TANNE<span className="text-[var(--gold)]">.</span>
    </a>

    <div
      className={`hidden md:flex items-center transition-all duration-500 ${
        scrolled ? "gap-6" : "gap-8"
      }`}
    >
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className={`text-[var(--soft)] transition-colors duration-250 hover:text-[var(--cyan)] ${
            scrolled ? "text-[0.78rem]" : "text-[0.82rem]"
          }`}
        >
          {item}
        </a>
      ))}
    </div>

    <div className="flex items-center gap-2">
      <button
        type="button"
        className={`border border-[var(--line)] rounded-full grid place-items-center bg-transparent text-[var(--ink)] cursor-pointer transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:rotate-20 ${
          scrolled ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"
        }`}
        onClick={toggleTheme}
        aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
        title={light ? "Dark theme" : "Light theme"}
      >
        <span aria-hidden="true">{light ? "☾" : "☼"}</span>
      </button>

      <a
        href="#reserve"
        className={`hidden md:inline-flex items-center justify-center border border-[var(--gold)] bg-[var(--gold)] text-[oklch(0.12_0_0)] rounded-full font-display font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_color-mix(in_oklab,var(--gold)_24%,transparent)] ${
          scrolled
            ? "min-h-[2.35rem] px-4 text-[0.8rem]"
            : "min-h-[2.75rem] px-5 text-[0.88rem]"
        }`}
      >
        Reserve
      </a>

      <button
        type="button"
        className={`md:hidden border border-[var(--line)] rounded-full grid place-content-center gap-[0.28rem] bg-transparent text-[var(--ink)] cursor-pointer transition-all duration-300 ${
          scrolled ? "w-8 h-8" : "w-10 h-10"
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Open navigation menu"
      >
        <span className="block w-3.5 h-[1px] bg-current" />
        <span className="block w-3.5 h-[1px] bg-current" />
      </button>
    </div>
  </nav>

  {/* Mobile Dropdown Panel */}
  {menuOpen && (
    <div
      className={`pointer-events-auto md:hidden mt-2.5 w-full p-4 grid gap-1 border border-[var(--line)] rounded-2xl bg-[var(--glass-heavy)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ${
        scrolled ? "max-w-[58rem]" : "max-w-[93.75rem]"
      }`}
    >
      {navItems.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          onClick={() => setMenuOpen(false)}
          className="p-3 text-[var(--ink)] font-medium text-sm"
        >
          {item}
        </a>
      ))}
    </div>
  )}
</header>





      <main>
        {/* Hero Section */}
        <section id="home" className="">
         <HeroSection />
        </section>





        {/* About Section */}
      <section
  id="about"
  className="relative z-10 py-9 md:py- px-4 md:px-[max(1.25rem,calc((100vw-93.75rem)/2))] border-t border-[var(--line)] scroll-mt-20 overflow-hidden"
>
  {/* Background Atmospheric Glow */}
  <div 
    className="absolute top-1/3 -left-32 w-96 h-96 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_14%,transparent)_0%,transparent_70%)] blur-3xl pointer-events-none -z-10" 
    aria-hidden="true" 
  />

  <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-16 lg:gap-24 items-center">
    
    {/* Left Column: Editorial Narrative */}
    <div data-reveal data-motion="left" className="relative">
      
      {/* Chapter Marker Pill */}
   <div className="inline-flex items-center gap-2.5">
  <span className="w-6 h-6 rounded-md border border-[var(--gold)]/50 bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center font-display font-bold text-xs shadow-[0_0_12px_color-mix(in_oklab,var(--gold)_20%,transparent)]">
    01
  </span>
  <div className="flex flex-col">
    <span className="font-display font-bold text-[0.62rem] tracking-[0.28em] text-[var(--gold)] uppercase">
      The Heritage
    </span>
    <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--gold)] to-transparent mt-0.5" />
  </div>
</div>

      <h2 className="mt-6 font-display font-bold text-[clamp(2.8rem,5.5vw,5.4rem)] leading-[0.94] tracking-tight text-balance">
        A story of<br />
        culinary <em className="text-[var(--cyan)] not-italic relative inline-block">
          obsession
          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-[var(--cyan)] to-transparent" />
        </em>.
      </h2>

      <p className="max-w-[32rem] mt-8 text-[var(--soft)] text-[1.05rem] leading-[1.8] font-light">
        Founded with an uncompromising passion for culinary craft, Tanne has shaped Coimbatore’s dining landscape since 2010. 
        Ancient heritage recipes meet avant-garde fire techniques inside an architectural sanctuary of dark water reflections, raw brass, and living foliage.
      </p>

      {/* Philosophy Points */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-[32rem]">
        <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--glass)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--cyan)]/40">
          <p className="text-xs font-display tracking-wider text-[var(--cyan)] uppercase m-0">Zero Compromise</p>
          <p className="text-xs text-[var(--soft)] mt-1 m-0">Sourced directly from organic hill estates across the Nilgiris.</p>
        </div>
        <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--glass)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--gold)]/40">
          <p className="text-xs font-display tracking-wider text-[var(--gold)] uppercase m-0">Open Fire Theatre</p>
          <p className="text-xs text-[var(--soft)] mt-1 m-0">Slow-smoked over wild fruitwood coals nightly.</p>
        </div>
      </div>

      {/* Button & Links */}
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <a
          href="#spaces"
          className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_12%,transparent)] text-[var(--gold)] font-display font-medium text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_color-mix(in_oklab,var(--gold)_30%,transparent)]"
        >
          <span className="relative z-10">Explore the sanctuaries</span>
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] to-[var(--cyan)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
        </a>

        <a
          href="#menu"
          className="text-[var(--soft)] hover:text-[var(--ink)] font-display text-sm tracking-wider uppercase transition-colors"
        >
          View Tasting Menu ↗
        </a>
      </div>

      {/* Elevated Stat Counters */}
      <div className="grid grid-cols-2 gap-6 mt-14 pt-8 border-t border-[var(--line)] max-w-[32rem]">
        <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--glass)] backdrop-blur-md transition-all duration-300 hover:border-[var(--gold)]/50 group">
          <div className="flex items-baseline gap-1">
            <strong className="text-[var(--ink)] font-display font-medium text-4xl tracking-tight group-hover:text-[var(--gold)] transition-colors">
              2010
            </strong>
            <span className="text-[var(--gold)] text-sm">✦</span>
          </div>
          <span className="block mt-1 text-[var(--soft)] text-[0.68rem] uppercase tracking-[0.16em]">
            Year of Inception
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--glass)] backdrop-blur-md transition-all duration-300 hover:border-[var(--cyan)]/50 group">
          <div className="flex items-baseline gap-1">
            <strong className="text-[var(--ink)] font-display font-medium text-4xl tracking-tight group-hover:text-[var(--cyan)] transition-colors">
              06
            </strong>
            <span className="text-[var(--cyan)] text-sm">+</span>
          </div>
          <span className="block mt-1 text-[var(--soft)] text-[0.68rem] uppercase tracking-[0.16em]">
            Curated Spaces
          </span>
        </div>
      </div>
    </div>

    {/* Right Column: Hero Cinematic Visual & Glass Overlays */}
    <div className="relative" data-reveal data-motion="scale">
      
      {/* Outer Glow Halo behind the frame */}
      <div 
        className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-[var(--gold)]/20 via-transparent to-[var(--cyan)]/25 blur-2xl opacity-60 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Main Visual Frame */}
      <div className="group relative rounded-[2rem] p-2 sm:p-3 border border-[var(--line)] bg-[var(--glass-heavy)] backdrop-blur-2xl transition-all duration-700 hover:border-[var(--gold)]/50 hover:shadow-[0_30px_90px_oklch(0_0_0/0.65)]">
        
        {/* Subtle Decorative Architectural Crosshairs */}
        <span className="absolute -top-1.5 -left-1.5 text-[var(--gold)] font-mono text-xs opacity-70">+</span>
        <span className="absolute -top-1.5 -right-1.5 text-[var(--gold)] font-mono text-xs opacity-70">+</span>
        <span className="absolute -bottom-1.5 -left-1.5 text-[var(--gold)] font-mono text-xs opacity-70">+</span>
        <span className="absolute -bottom-1.5 -right-1.5 text-[var(--gold)] font-mono text-xs opacity-70">+</span>

        <figure className="image-reveal relative overflow-hidden rounded-[1.4rem] m-0 h-[65vh] lg:h-[46rem] min-h-[30rem]">
          <Image
            src={chefImage}
            alt="Chef carefully plating a Tanne signature dish"
            width={1024}
            height={1280}
            loading="lazy"
            className="w-full h-full object-cover brightness-[0.9] contrast-[1.05] transition-all duration-1000 ease-out group-hover:scale-105 group-hover:brightness-100"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0_0/0.95)] via-transparent to-[oklch(0.08_0_0/0.25)] pointer-events-none" />

          {/* Rotating Stamp / Circular Badge (Top Right) */}
          <div className="absolute top-5 right-5 z-20 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none hidden sm:block">
            <svg 
              className="w-full h-full animate-[spin_20s_linear_infinite]" 
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              <path
                id="textPathCircle"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[9.5px] uppercase tracking-[0.24em] fill-[var(--gold)] font-display font-medium">
                <textPath href="#textPathCircle">
                  EST. 2010 · TANNE FINE DINING · COIMBATORE ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 m-auto w-8 h-8 rounded-full border border-[var(--gold)]/40 flex items-center justify-center bg-[oklch(0.08_0_0/0.6)] backdrop-blur-md">
              <span className="text-[var(--gold)] text-xs font-serif">✦</span>
            </div>
          </div>

          {/* Floating Glassmorphic Chef Note Card (Bottom Left) */}
          <div className="absolute left-4 right-4 sm:right-auto sm:left-6 bottom-6 z-20 sm:max-w-xs p-5 rounded-2xl border border-[oklch(0.96_0.008_95/0.18)] bg-[oklch(0.09_0_0/0.75)] backdrop-blur-2xl shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase font-display tracking-widest text-[var(--cyan)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-ping" />
                Live Kitchen
              </span>
              <span className="text-[0.65rem] text-[var(--soft)] font-mono">TN // 641407</span>
            </div>
            <h4 className="text-[var(--ink)] font-display font-medium text-base m-0 leading-snug">
              "Every plate is a composition of seasonal memory and ember."
            </h4>
            <div className="mt-3 pt-3 border-t border-[oklch(0.96_0.008_95/0.1)] flex items-center justify-between text-[0.7rem] text-[var(--soft)]">
              <span>Executive Chef</span>
              <span className="text-[var(--gold)] font-medium">Tanne Atelier</span>
            </div>
          </div>
        </figure>
      </div>

    </div>

  </div>
</section>






        {/* Spaces Section */}
       <section
  id="spaces"
  className="relative z-10 py-9 md:py- px-4 md:px-[max(1.25rem,calc((100vw-93.75rem)/2))] border-t border-[var(--line)] scroll-mt-20 overflow-hidden"
>
  {/* Ambient Atmosphere Spotlight */}
  <div
    className="absolute top-1/2 right-0 w-[35rem] h-[35rem] rounded-full blur-[140px] pointer-events-none -z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_16%,transparent)_0%,transparent_70%)]"
    aria-hidden="true"
  />

  {/* Header directly inspired by Tanne Video Presentation */}
  <div className="flex flex-col items-center text-center max-w-2xl mx-auto" data-reveal data-motion="blur">
    <div className="inline-flex items-center gap-3 mb-3">
      <span className="text-[var(--gold)] text-xs font-serif">∼</span>
      <span className="text-[var(--gold)] font-display text-[0.72rem] tracking-[0.3em] uppercase font-medium">
        TANNE · EXQUISITE DINING SPACES
      </span>
      <span className="text-[var(--gold)] text-xs font-serif">∼</span>
    </div>

    <h2 className="m-0 font-display font-bold text-[clamp(2.4rem,5vw,4.2rem)] leading-[1] tracking-tight">
      Private Dining &<br />
      <span className="text-[var(--gold)] font-serif italic font-normal">Exclusive</span> Lounges
    </h2>

    <p className="mt-4 text-[var(--soft)] text-sm md:text-base font-light max-w-md">
      Reserve your dedicated sanctuary. Tailored for family gatherings, executive dinners, and private celebrations under the stars.
    </p>
  </div>

  {/* Luxury Bento Presentation Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 mt-14" data-reveal data-motion="scale">
    
    {/* Space 1: Chef's Table (lg:col-span-5) */}
    <article className="lg:col-span-5 relative group overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--glass)] h-[24rem] md:h-[28rem] transition-all duration-500 hover:border-[var(--gold)]/50 hover:shadow-[0_20px_50px_oklch(0_0_0/0.45)]">
      <Image
        src={loungeSpaces[0].image}
        alt={loungeSpaces[0].title}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-cover brightness-[0.78] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:brightness-[0.9]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0_0/0.95)] via-[oklch(0.07_0_0/0.3)] to-transparent" />
      
      {/* Top Number & Tag */}
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
        <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70">
          {loungeSpaces[0].id}
        </span>
        <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--cyan)] px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[var(--cyan)]/30">
          {loungeSpaces[0].tagline}
        </span>
      </div>

      {/* Bottom Content & Price Badge */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="m-0 font-display font-medium text-2xl text-[var(--ink)]">
            {loungeSpaces[0].title}
          </h3>
          <div className="text-right">
            <span className="text-[var(--gold)] font-display font-bold text-xl">{loungeSpaces[0].price}</span>
            <span className="text-[var(--soft)] text-xs ml-1 font-light">/{loungeSpaces[0].period}</span>
          </div>
        </div>
        <p className="mt-2 text-[var(--soft)] text-xs md:text-sm font-light line-clamp-2 leading-relaxed">
          {loungeSpaces[0].desc}
        </p>
      </div>
    </article>

    {/* Space 2: Family Lounge (lg:col-span-7 - Featured Wide Card) */}
    <article className="lg:col-span-7 relative group overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--gold)_35%,var(--line))] bg-[var(--glass)] h-[24rem] md:h-[28rem] transition-all duration-500 hover:border-[var(--gold)] hover:shadow-[0_25px_60px_oklch(0_0_0/0.5)]">
      <Image
        src={loungeSpaces[1].image}
        alt={loungeSpaces[1].title}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        className="object-cover brightness-[0.78] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:brightness-[0.92]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0_0/0.95)] via-[oklch(0.07_0_0/0.25)] to-transparent" />
      
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
        <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[var(--gold)]/40 text-[var(--gold)]">
          {loungeSpaces[1].id} · Featured
        </span>
        <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)] px-3 py-1 rounded-full bg-[var(--gold)]/15 backdrop-blur-md border border-[var(--gold)]/40">
          {loungeSpaces[1].tagline}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="m-0 font-display font-medium text-2xl md:text-3xl text-[var(--ink)]">
            {loungeSpaces[1].title}
          </h3>
          <div className="text-right">
            <span className="text-[var(--gold)] font-display font-bold text-2xl">{loungeSpaces[1].price}</span>
            <span className="text-[var(--soft)] text-xs ml-1 font-light">/{loungeSpaces[1].period}</span>
          </div>
        </div>
        <p className="mt-2 text-[var(--soft)] text-xs md:text-sm font-light max-w-lg leading-relaxed">
          {loungeSpaces[1].desc}
        </p>
      </div>
    </article>

    {/* Space 3: Business Meeting Room (lg:col-span-6) */}
    <article className="lg:col-span-6 relative group overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--glass)] h-[24rem] md:h-[26rem] transition-all duration-500 hover:border-[var(--gold)]/50 hover:shadow-[0_20px_50px_oklch(0_0_0/0.45)]">
      <Image
        src={loungeSpaces[2].image}
        alt={loungeSpaces[2].title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover brightness-[0.78] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:brightness-[0.9]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0_0/0.95)] via-[oklch(0.07_0_0/0.3)] to-transparent" />
      
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
        <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70">
          {loungeSpaces[2].id}
        </span>
        <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--cyan)] px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[var(--cyan)]/30">
          {loungeSpaces[2].tagline}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="m-0 font-display font-medium text-2xl text-[var(--ink)]">
            {loungeSpaces[2].title}
          </h3>
          <div className="text-right">
            <span className="text-[var(--gold)] font-display font-bold text-xl">{loungeSpaces[2].price}</span>
            <span className="text-[var(--soft)] text-xs ml-1 font-light">/{loungeSpaces[2].period}</span>
          </div>
        </div>
        <p className="mt-2 text-[var(--soft)] text-xs md:text-sm font-light line-clamp-2 leading-relaxed">
          {loungeSpaces[2].desc}
        </p>
      </div>
    </article>

    {/* Space 4: Exclusive VIP Lounge (lg:col-span-6) */}
    <article className="lg:col-span-6 relative group overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--glass)] h-[24rem] md:h-[26rem] transition-all duration-500 hover:border-[var(--gold)]/50 hover:shadow-[0_20px_50px_oklch(0_0_0/0.45)]">
      <Image
        src={loungeSpaces[3].image}
        alt={loungeSpaces[3].title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover brightness-[0.78] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:brightness-[0.9]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0_0/0.95)] via-[oklch(0.07_0_0/0.3)] to-transparent" />
      
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
        <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70">
          {loungeSpaces[3].id}
        </span>
        <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)] px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-[var(--gold)]/30">
          {loungeSpaces[3].tagline}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-10">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="m-0 font-display font-medium text-2xl text-[var(--ink)]">
            {loungeSpaces[3].title}
          </h3>
          <div className="text-right">
            <span className="text-[var(--gold)] font-display font-bold text-xl">{loungeSpaces[3].price}</span>
            <span className="text-[var(--soft)] text-xs ml-1 font-light">/{loungeSpaces[3].period}</span>
          </div>
        </div>
        <p className="mt-2 text-[var(--soft)] text-xs md:text-sm font-light line-clamp-2 leading-relaxed">
          {loungeSpaces[3].desc}
        </p>
      </div>
    </article>

  </div>

  {/* Quick Booking Anchor Cue */}
  <div className="mt-12 text-center" data-reveal data-motion="blur">
    <a
      href="#contact"
      className="inline-flex items-center gap-2 text-[var(--gold)] font-display font-medium text-sm tracking-wider uppercase underline underline-offset-8 decoration-[color-mix(in_oklab,var(--gold)_40%,transparent)] hover:text-[var(--cyan)] hover:decoration-[var(--cyan)] transition-colors"
    >
      Request a private lounge walkthrough <span>↗</span>
    </a>
  </div>
</section>







        {/* Services Section */}
       <section
  id="services"
  className=""
>
 <ServicesSection />
</section>







        {/* Menu Section */}
        <section
          id="menu"
          className=""
        >
         <MenuBookSection />
        </section>






        {/* Reservation CTA Section */}
        <section
          id="reserve"
          className="relative min-h-[70vh] py-9 px-5 grid place-items-center text-center border-t border-[var(--line)] overflow-hidden scroll-mt-20"
        >
          {/* 1. Deep Atmospheric Dual Lights */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--cyan)_22%,transparent)_0%,transparent_70%)] blur-[120px] pointer-events-none animate-pulse-glow" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-[35%] -translate-y-[60%] w-[32rem] h-[32rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_18%,transparent)_0%,transparent_70%)] blur-[140px] pointer-events-none animate-pulse-glow [animation-delay:2.5s]" 
        aria-hidden="true" 
      />

      {/* 2. Radial Geometric Ring Grid */}
      <div 
        className="absolute inset-0 -z-10 opacity-25 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "3rem 3rem",
        }}
        aria-hidden="true"
      />

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Live Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--cyan)]/30 bg-[color-mix(in_oklab,var(--cyan)_8%,transparent)] backdrop-blur-xl mb-6 shadow-[0_0_20px_color-mix(in_oklab,var(--cyan)_15%,transparent)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan)]" />
          </span>
          <span className="text-[var(--cyan)] font-display font-medium text-xs tracking-[0.26em] uppercase">
            Limited Nightly Seating · 18 Covers
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="m-0 font-display font-bold text-[clamp(3.2rem,8vw,7.5rem)] leading-[0.92] tracking-tight text-balance text-white"
        >
          Claim your seat <br />
          in the <em className="text-[var(--gold)] font-serif italic not-italic relative inline-block">
            night
            <span className="absolute left-0 -bottom-2 w-full h-[2px] bg-gradient-to-r from-[var(--gold)] via-[var(--cyan)] to-transparent" />
          </em>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-[var(--soft)] text-sm md:text-base font-light max-w-md mx-auto leading-relaxed"
        >
          Curated garden tables, open fire courses, and intimate private lounges. Reservations recommended 48 hours in advance.
        </motion.p>

        {/* 3. Futuristic Moving-Border Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 200 }}
          className="mt-12 relative group p-[1.5px] rounded-full overflow-hidden"
        >
          {/* Animated Orbiting Border Beam */}
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--cyan)_0%,var(--gold)_50%,var(--cyan)_100%)] opacity-80 group-hover:opacity-100 transition-opacity" />

          {/* Button Surface */}
          <a
            href="#contact"
            className="relative z-10 flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#120d09] border border-white/10 backdrop-blur-2xl text-[var(--gold)] font-display font-medium text-sm md:text-base tracking-widest uppercase transition-all duration-300 group-hover:bg-[#1a120b] group-hover:text-white group-hover:shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_35%,transparent)] cursor-pointer select-none"
          >
            <span>Reserve Table</span>
            <span className="w-7 h-7 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 flex items-center justify-center text-xs text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:bg-[var(--gold)] group-hover:text-black">
              ↗
            </span>
          </a>
        </motion.div>

        {/* Guarantee details */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex items-center gap-6 text-xs text-[var(--soft)] font-mono tracking-wider uppercase"
        >
          <span>✦ Instant WhatsApp Confirmation</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>Valet Included</span>
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