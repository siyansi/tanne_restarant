

"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import heroImage from "../../assets/cafe background - Google Search.jpg";
import dishImage from "../../assets/restaurant-interior.jpg";

interface SlideData {
  image: StaticImageData;
  tag: string;
  location: string;
  titlePrefix: string;
  flipWords: string[];
  description: string;
}

const slides: SlideData[] = [
  {
    image: heroImage,
    tag: "Est. 2010 · Coimbatore",
    location: "Avinashi Road, Arasur",
    titlePrefix: "A quiet sanctuary of",
    flipWords: ["Elegance", "Shadows", "Warmth", "Fire"],
    description:
      "Where timeless culinary heritage meets an open courtyard beneath the night canopy.",
  },
  {
    image: dishImage,
    tag: "Woodfire Hearth · Atelier",
    location: "Open Air & Private Salons",
    titlePrefix: "Honoring the craft of",
    flipWords: ["Flavors", "Seasons", "Textures", "Heritage"],
    description:
      "Charcoal-smoked delicacies shaped with hand-harvested Nilgiri mountain produce.",
  },
];

const menuItems = [
  { number: "01", title: "Home", href: "#home" },
  { number: "02", title: "Services", href: "#services" },
  { number: "03", title: "Menu", href: "#menu" },
  { number: "04", title: "Gallery", href: "#gallery" },
  { number: "05", title: "Reserve", href: "#contact" },
];

export default function TanneHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flipIndex, setFlipIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Background rotation every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // 3D Flip Word rotation every 2.6 seconds
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setFlipIndex((prev) => (prev + 1) % slides[currentSlide].flipWords.length);
    }, 2600);
    return () => clearInterval(wordTimer);
  }, [currentSlide]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const activeSlide = slides[currentSlide];

  return (
    <>
      <section
        id="home"
        className="relative h-[100svh] w-full overflow-hidden bg-black text-[#eee7da] select-none"
      >
        {/* ===================================================
            LAYER 1: FULL-VIEW BACKGROUND CAROUSEL (z-0)
            Uses Ken Burns slow zoom and smooth cross-dissolve
        ==================================================== */}
        <div className="absolute inset-0 h-full w-full overflow-hidden z-0 pointer-events-none">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={activeSlide.image}
                alt="Tanne Fine Dining Atmosphere"
                fill
                priority
                unoptimized
                sizes="100vw"
                className="object-cover object-center brightness-[0.72] contrast-[1.05]"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* LAYER 2: CINEMATIC RESORT GRADIENTS (z-10) */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black via-black/35 to-black/40" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

        {/* Ambient Subtle Gold Spotlight Mesh */}
        <div 
          className="absolute -top-32 -left-32 w-[34rem] h-[34rem] rounded-full blur-[140px] pointer-events-none z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_18%,transparent)_0%,transparent_70%)]" 
          aria-hidden="true" 
        />

        {/* ===================================================
            LAYER 3: HEADER BAR (z-30)
        ==================================================== */}
        {/* <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
          <a href="#home" className="flex flex-col group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-[#d7ba72]">
              TANNE
            </span>
            <span className="text-[7px] uppercase tracking-[0.45em] text-white/50 font-mono mt-0.5">
              Coimbatore · Salon
            </span>
          </a>

          <div className="flex items-center gap-5">
            <a
              href="#contact"
              className="hidden sm:inline-flex px-6 py-2.5 rounded-full border border-[#d7ba72]/50 bg-[#120d08]/70 backdrop-blur-md text-xs uppercase tracking-[0.2em] text-[#d7ba72] hover:bg-[#d7ba72] hover:text-black transition-all duration-300"
            >
              Reserve a Table
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Toggle navigation drawer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white transition hover:border-[#d7ba72] hover:text-[#d7ba72] cursor-pointer"
            >
              <Menu size={18} />
            </button>
          </div>
        </header> */}

        {/* ===================================================
            LAYER 4: HERO EDITORIAL STAGE (z-20)
        ==================================================== */}
        <div className="relative z-20 flex h-full w-full flex-col justify-end px-6 pb-20 md:px-14 md:pb-24 max-w-7xl mx-auto">
          
          {/* Heritage Tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${currentSlide}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-4 inline-flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7ba72] animate-pulse" />
              <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-[#d7ba72]">
                {activeSlide.tag}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Headline Stage with Live Cascade & 3D Flip */}
          <div className="max-w-4xl" style={{ perspective: "1000px" }}>
            <h1 className="font-serif text-[clamp(2.4rem,6.2vw,5.6rem)] leading-[1.06] tracking-tight text-white m-0">
              <SmoothTypewriter key={activeSlide.titlePrefix} text={activeSlide.titlePrefix} />
              <br />

              {/* 3D Perspective Flip Word */}
              <span className="inline-block relative overflow-hidden h-[1.28em] align-top">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSlide.flipWords[flipIndex]}
                    initial={{ rotateX: 85, opacity: 0, y: 30, filter: "blur(3px)" }}
                    animate={{ rotateX: 0, opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ rotateX: -85, opacity: 0, y: -30, filter: "blur(3px)" }}
                    transition={{
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: "50% 50% -20px", display: "inline-block" }}
                    className="italic text-[#d6b66b] font-normal"
                  >
                    {activeSlide.flipWords[flipIndex]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Description Fade */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="mt-6 max-w-xl text-sm md:text-base font-light leading-relaxed text-white/85"
              >
                {activeSlide.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Slide Indicator Line Buttons */}
          <div className="mt-10 flex items-center gap-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group relative h-1 cursor-pointer overflow-hidden rounded-full bg-white/25 transition-all duration-500"
                style={{ width: currentSlide === idx ? "2.6rem" : "1.2rem" }}
              >
                {currentSlide === idx && (
                  <motion.div
                    layoutId="activeSlideIndicator"
                    className="absolute inset-0 bg-[#d7ba72]"
                    transition={{ duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

       
      </section>

      {/* =======================================================
          SLIDE-OUT LUXURY NAVIGATION DRAWER
      ======================================================== */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 left-0 z-[90] w-full max-w-[420px] border-r border-[#c7a35d]/30 bg-[#090705] p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="font-serif text-2xl tracking-[0.2em] text-[#d7ba72] m-0">
                      TANNE
                    </p>
                    <p className="text-[7px] uppercase tracking-[0.4em] text-white/35 font-mono mt-1 m-0">
                      Fine Dining Atelier
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 hover:border-[#d7ba72] hover:text-[#d7ba72] transition cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="mt-10">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.title}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + index * 0.05 }}
                      className="group flex items-center justify-between border-b border-white/[0.06] py-5 transition-colors"
                    >
                      <div className="flex items-center gap-5">
                        <span className="font-mono text-xs text-[#d7ba72]">
                          {item.number}
                        </span>
                        <span className="font-serif text-2xl text-white/70 group-hover:text-[#d7ba72] transition-colors">
                          {item.title}
                        </span>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-white/20 group-hover:text-[#d7ba72] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </motion.a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="font-serif italic text-sm text-white/50 m-0">
                  "Where every table tells a story."
                </p>
                <p className="text-[8px] uppercase tracking-[0.3em] text-[#d7ba72] font-mono mt-2 m-0">
                  Coimbatore · Tamil Nadu
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Subcomponent: Smooth Spring-Staggered Typewriter
function SmoothTypewriter({ text }: { text: string }) {
  const characters = Array.from(text);

  return (
    <span className="inline-block mr-2">
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            delay: index * 0.035,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <span className="inline-block w-[2px] h-[0.85em] bg-[#d7ba72] ml-1 animate-pulse align-middle" />
    </span>
  );
}