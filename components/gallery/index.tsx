"use client";

import { useState, useEffect } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import heroImage from "../../assets/tanne-hero.jpg";
import dishImage from "../../assets/tanne-dish.jpg";
import cocktailImage from "../../assets/tanne-cocktail.jpg";
import gardenImage from "../../assets/tanne-garden.jpg";
import loungeImage from "../../assets/tanne-lounge.jpg";
import chefImage from "../../assets/tanne-chef.jpg";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: StaticImageData;
}

const gallerySlices: GalleryItem[] = [
  {
    id: "01",
    title: "The Arrival",
    subtitle: "A secluded stone path lit in warm brass and garden shadow.",
    tag: "Sanctuary Entrance",
    image: heroImage,
  },
  {
    id: "02",
    title: "The Plate",
    subtitle: "Charcoal embers, heirloom produce, and modern plating craft.",
    tag: "Haute Cuisine",
    image: dishImage,
  },
  {
    id: "03",
    title: "After Dark",
    subtitle: "Aromatic botanicals and aged spirits settling over carved ice.",
    tag: "Atelier Bar",
    image: cocktailImage,
  },
  {
    id: "04",
    title: "Garden Hours",
    subtitle: "Courtyard dining sheltered by reflective water and night flora.",
    tag: "Open Pavilion",
    image: gardenImage,
  },
  {
    id: "05",
    title: "Private Moments",
    subtitle: "An intimate architectural salon reserved for quiet celebrations.",
    tag: "Exclusive Lounge",
    image: loungeImage,
  },
  {
    id: "06",
    title: "The Craft",
    subtitle: "Uncompromising culinary precision under live open fire theatre.",
    tag: "Kitchen Atelier",
    image: chefImage,
  },
];

export default function RibbonGallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isRippling, setIsRippling] = useState(false);

  // Trigger transient ripple effect on modal open, then turn it off
  useEffect(() => {
    if (activeItem) {
      setIsRippling(true);
      const timer = setTimeout(() => {
        setIsRippling(false);
      }, 850);
      return () => clearTimeout(timer);
    } else {
      setIsRippling(false);
    }
  }, [activeItem]);

  // Escape key handler to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const activeHeaderItem = gallerySlices[hoveredIndex];

  return (
    <section
      id="gallery"
      className="relative z-20 py-9 px-4 md:px-[max(1.5rem,calc((100vw-90rem)/2))] bg-[#070503] text-[#eee7da] border-t border-white/10 overflow-hidden select-none"
    >
      {/* Liquid Water Ripple Distortion Filter Definition */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="tanne-opening-ripple" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.04"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="1.2s"
                values="0.035 0.06; 0.015 0.025; 0.005 0.01"
                repeatCount="1"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="26"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Ambient Lighting Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54rem] h-[54rem] rounded-full blur-[180px] pointer-events-none -z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_12%,transparent)_0%,transparent_75%)]"
        aria-hidden="true" 
      />

      {/* ===================================================
          1. DYNAMIC HEADER (Words change on ribbon hover)
      ==================================================== */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16 max-w-7xl mx-auto">
        <div>
          {/* Heritage Tag */}
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="text-[var(--gold)] text-xs font-serif">∼</span>
            <span className="text-[var(--gold)] font-display text-[0.72rem] tracking-[0.3em] uppercase font-medium">
              Visual Anthology
            </span>
            <span className="text-[var(--gold)] text-xs font-serif">∼</span>
          </div>

          {/* Dynamic Headline Transitioning with Active Hover */}
          <div className="h-[4.5rem] md:h-[5.5rem] flex items-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeHeaderItem.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="m-0 font-serif font-normal text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[1.05] tracking-tight text-white"
              >
                {activeHeaderItem.title} <span className="italic text-[var(--gold)]">Atmosphere</span>.
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

        {/* Dynamic Subtitle / Tag */}
        <div className="max-w-md md:text-right">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeHeaderItem.subtitle}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="m-0 text-white/60 text-xs md:text-sm font-light leading-relaxed"
            >
              {activeHeaderItem.subtitle}
            </motion.p>
          </AnimatePresence>
          <span className="mt-2 block text-[0.68rem] tracking-[0.22em] uppercase text-[var(--gold)]/80 font-mono">
            {activeHeaderItem.tag} · Click slice to immerse
          </span>
        </div>
      </div>

      {/* ===================================================
          2. EXPANDING HORIZONTAL RIBBON STAGE
      ==================================================== */}
   {/* 2. EXPANDING HORIZONTAL RIBBON STAGE (Reduced Height) */}
<div className="relative w-full max-w-7xl mx-auto h-[22rem] md:h-[26rem] flex items-center justify-center gap-2.5 md:gap-3.5 py-2">
  {gallerySlices.map((item, index) => (
    <motion.div
      key={item.id}
      layoutId={`ribbon-container-${item.id}`}
      onClick={() => setActiveItem(item)}
      onMouseEnter={() => setHoveredIndex(index)}
      className="group relative h-full flex-1 min-w-[3.2rem] md:min-w-[4.8rem] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-[#0d0905] shadow-[0_16px_36px_rgba(0,0,0,0.8)] transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[3.2]"
    >
      {/* Ribbon Background Image */}
      <motion.div
        layoutId={`ribbon-image-${item.id}`}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={index < 2}
          sizes="(max-width: 768px) 40vw, 25vw"
          className="object-cover object-center brightness-[0.7] saturate-[0.8] contrast-[1.08] transition-all duration-700 ease-out group-hover:brightness-[0.95] group-hover:saturate-100 group-hover:scale-105"
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Top Index Marker */}
      <div className="absolute top-4 inset-x-0 flex justify-center z-10">
        {/* <span className="font-mono text-[0.68rem] tracking-widest px-2.5 py-0.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-white/70 group-hover:border-[var(--gold)]/60 group-hover:text-[var(--gold)] transition-colors">
          {item.id}
        </span> */}
      </div>

      {/* Bottom Caption Overlay */}
      <div className="absolute inset-x-0 bottom-4 px-3 flex flex-col items-center justify-end z-10 text-center">
        <span className="text-[0.62rem] uppercase tracking-[0.25em] text-[var(--gold)] font-mono mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.tag}
        </span>
        <h3 className="m-0 font-serif text-sm md:text-base text-white tracking-wide truncate max-w-full">
          {item.title}
        </h3>
      </div>
    </motion.div>
  ))}
</div>

      {/* ===================================================
          3. FULLSCREEN MODAL VIEW WITH TRANSIENT RIPPLE
      ==================================================== */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="gallery-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-2xl cursor-pointer"
          >
            <motion.div
              layoutId={`ribbon-container-${activeItem.id}`}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              className="relative w-full max-w-6xl h-[82vh] md:h-[88vh] rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-[var(--gold)]/35 bg-[#090705] shadow-[0_35px_120px_rgba(0,0,0,0.98)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Frame with Temporary Liquid Ripple Distortion */}
              <motion.div
                layoutId={`ribbon-image-${activeItem.id}`}
                style={{
                  filter: isRippling ? "url(#tanne-opening-ripple)" : "none",
                  transition: "filter 0.5s ease-out",
                }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center brightness-[0.88] contrast-[1.06]"
                />
              </motion.div>

              {/* Natural Shading Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/35 pointer-events-none" />

              {/* Top Meta Bar */}
              <div className="absolute top-6 md:top-8 inset-x-6 md:inset-x-12 flex items-center justify-between z-10 pointer-events-none">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/20 bg-black/65 backdrop-blur-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                  <span className="font-mono text-xs text-[var(--gold)] tracking-widest uppercase">
                    {activeItem.id} · {activeItem.tag}
                  </span>
                </div>

                <span className="text-white/60 font-mono text-xs tracking-wider uppercase hidden sm:block">
                  Coimbatore · Night Atelier
                </span>
              </div>

              {/* Bottom Editorial Caption */}
              <div className="absolute inset-x-6 md:inset-x-12 bottom-20 md:bottom-24 z-10 pointer-events-none max-w-2xl">
                <span className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--gold)] font-mono mb-2 block">
                  Sanctuary Archive
                </span>
                <h3 className="m-0 font-serif text-3xl md:text-5xl text-white tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="mt-3 text-white/75 text-sm md:text-base font-light leading-relaxed">
                  {activeItem.subtitle}
                </p>
              </div>

              {/* Minimal Bottom Close Control */}
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-6 py-2.5 rounded-full border border-white/20 bg-black/75 backdrop-blur-xl text-white/80 hover:text-white hover:border-[var(--gold)] font-display text-xs tracking-widest uppercase transition-all shadow-2xl cursor-pointer flex items-center gap-2.5"
              >
                <span>Dismiss View</span>
                <span className="text-[var(--gold)] text-xs">✕</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}