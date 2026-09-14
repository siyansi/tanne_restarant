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
    subtitle: "A path lit in brass and garden shadow",
    tag: "Entrance",
    image: heroImage,
  },
  {
    id: "02",
    title: "The Plate",
    subtitle: "Fire, texture, and a flash of gold",
    tag: "Cuisine",
    image: dishImage,
  },
  {
    id: "03",
    title: "After Dark",
    subtitle: "Smoke settles over the first pour",
    tag: "Mixology",
    image: cocktailImage,
  },
  {
    id: "04",
    title: "Garden Hours",
    subtitle: "Under the canopy, the evening slows",
    tag: "Pavilion",
    image: gardenImage,
  },
  {
    id: "05",
    title: "Private Moments",
    subtitle: "A room reserved for your story",
    tag: "Sanctuary",
    image: loungeImage,
  },
  {
    id: "06",
    title: "The Craft",
    subtitle: "Precision, season, and live fire theatre",
    tag: "Kitchen",
    image: chefImage,
  },
];

export default function RibbonGallerySection() {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="gallery"
      className="relative z-20 py-24 md:py-36 px-4 md:px-[max(1.25rem,calc((100vw-93.75rem)/2))] bg-[oklch(0.08_0_0)] text-[oklch(0.96_0.008_95)] border-t border-[var(--line)] overflow-hidden"
    >
      {/* SVG Liquid Displacement Ripple Filter */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="tanne-liquid-ripple" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.03"
              numOctaves="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="8s"
                values="0.012 0.02; 0.022 0.035; 0.012 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Atmospheric Background Lights */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full blur-[170px] pointer-events-none -z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--cyan)_14%,transparent)_0%,color-mix(in_oklab,var(--gold)_12%,transparent)_50%,transparent_75%)]"
        aria-hidden="true" 
      />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-16" data-reveal data-motion="blur">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            <span className="text-[var(--gold)] font-display text-xs tracking-[0.28em] uppercase font-semibold">
              Chapter 05 · Visual Odyssey
            </span>
          </div>
          <h2 className="m-0 font-display font-bold text-[clamp(2.4rem,5vw,4.5rem)] leading-none tracking-tight">
            <span className="text-[var(--gold)]">(05)</span> Scroll into the night.
          </h2>
        </div>

        <p className="m-0 text-[oklch(0.96_0.008_95/0.55)] uppercase text-[0.72rem] tracking-[0.16em] font-mono">
          Click any ribbon to immerse <span className="text-[var(--cyan)]">✦</span>
        </p>
      </div>

      {/* HORIZONTAL RIBBON SLICE STAGE */}
      <div className="relative w-full max-w-7xl mx-auto h-[32rem] md:h-[38rem] flex items-center justify-center gap-2 md:gap-3 overflow-x-auto py-4 px-2 no-scrollbar">
        {gallerySlices.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`ribbon-container-${item.id}`}
            onClick={() => setActiveItem(item)}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="group relative h-full flex-1 min-w-[3.8rem] md:min-w-[5.2rem] max-w-[14rem] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-[oklch(0.96_0.008_95/0.14)] bg-black/40 shadow-2xl transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[2.8]"
          >
            {/* Ribbon Image */}
            <motion.div
              layoutId={`ribbon-image-wrapper-${item.id}`}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 30vw, 20vw"
                className="object-cover brightness-[0.7] saturate-[0.85] contrast-[1.08] transition-all duration-700 ease-out group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-110"
              />
            </motion.div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0_0/0.95)] via-black/20 to-transparent pointer-events-none" />

            {/* Top Index Badge */}
            <div className="absolute top-4 inset-x-0 flex justify-center z-10">
              <span className="font-mono text-[0.7rem] px-2 py-0.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-md text-white/70 group-hover:border-[var(--gold)]/50 group-hover:text-[var(--gold)] transition-colors">
                {item.id}
              </span>
            </div>

            {/* Bottom Vertical Label (Rotates horizontal on expansion) */}
            <div className="absolute inset-x-0 bottom-6 px-3 flex flex-col items-center justify-end z-10 text-center">
              <span className="text-[var(--cyan)] font-display text-[0.65rem] tracking-widest uppercase mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.tag}
              </span>
              <h3 className="m-0 font-display font-medium text-sm md:text-base text-white tracking-wide truncate max-w-full">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FULLSCREEN WATER RIPPLE MODAL VIEW */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="fullscreen-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center p-3 md:p-8 bg-black/90 backdrop-blur-2xl cursor-pointer select-none"
          >
            {/* The Expanded Image Card */}
            <motion.div
              layoutId={`ribbon-container-${activeItem.id}`}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              className="relative w-full max-w-5xl h-[80vh] md:h-[86vh] rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-[var(--gold)]/40 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.95)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image with Liquid Ripple Distortion */}
              <motion.div
                layoutId={`ribbon-image-wrapper-${activeItem.id}`}
                className="relative w-full h-full ripple-canvas"
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover brightness-[0.9] contrast-[1.05]"
                />
              </motion.div>

              {/* Atmospheric Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0_0/0.95)] via-black/20 to-[oklch(0.06_0_0/0.4)] pointer-events-none" />

              {/* Top Meta Bar */}
              <div className="absolute top-6 inset-x-6 md:inset-x-10 flex items-center justify-between z-10 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                  <span className="font-mono text-xs text-[var(--gold)] tracking-widest uppercase">
                    {activeItem.id} // {activeItem.tag}
                  </span>
                </div>

                <span className="text-white/60 font-mono text-xs hidden sm:block">
                  Coimbatore · Night Salon
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute inset-x-6 md:inset-x-10 bottom-20 md:bottom-24 z-10 pointer-events-none">
                <span className="text-[var(--cyan)] font-display text-xs tracking-widest uppercase mb-2 block">
                  Curated Sanctuary
                </span>
                <h3 className="m-0 font-display font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
                  {activeItem.title}
                </h3>
                <p className="mt-2 text-[var(--soft)] text-sm md:text-base font-light max-w-lg leading-relaxed">
                  {activeItem.subtitle}
                </p>
              </div>

              {/* EXACT "Click anywhere to close" Badge From Video */}
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full border border-white/20 bg-black/75 backdrop-blur-xl text-white/80 hover:text-white hover:border-[var(--gold)] font-display text-xs tracking-widest uppercase transition-colors shadow-2xl cursor-pointer flex items-center gap-2"
              >
                <span>Click anywhere to close</span>
                <span className="text-[var(--gold)] text-xs">✕</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}