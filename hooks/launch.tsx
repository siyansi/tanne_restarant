"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface LoungeSpace {
  title: string;
  tagline: string;
  price: string;
  period: string;
  desc: string;
  image: any;
}

interface SpacesSectionProps {
  loungeSpaces: LoungeSpace[];
}

export default function SpacesSection({ loungeSpaces }: SpacesSectionProps) {
  return (
    <section
      id="spaces"
      className="relative z-10 py-9 px-4 md:px-[max(1.25rem,calc((100vw-93.75rem)/2))] bg-[#070503] text-[#f5efe6] scroll-mt-20 overflow-hidden select-none"
    >
      {/* ===================================================
          1. SKEWED RECTANGLES & GEOMETRIC ILLUSION BACKDROP
      ==================================================== */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden -z-20 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_65%,transparent_100%)]"
        aria-hidden="true"
      >
        {/* Angled Skewed Light Columns */}
        <div className="absolute -inset-[35%] -skew-y-12 flex justify-between opacity-35">
          <div className="w-[14vw] h-[200%] bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--gold)_14%,transparent)] to-transparent border-x border-[var(--gold)]/15" />
          <div className="w-[18vw] h-[200%] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent border-x border-white/5" />
          <div className="w-[13vw] h-[200%] bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--cyan)_12%,transparent)] to-transparent border-x border-[var(--cyan)]/15" />
          <div className="w-[20vw] h-[200%] bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--gold)_16%,transparent)] to-transparent border-x border-[var(--gold)]/20" />
        </div>

        {/* Skewed Architectural Horizontal Struts */}
        <div className="absolute inset-0 -skew-y-12 flex flex-col justify-around opacity-30">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--gold)]/70 to-transparent" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--cyan)]/70 to-transparent" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
        </div>
      </div>

      {/* ===================================================
          2. METEOR SHOWER EFFECT
      ==================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        {/* <Meteors number={22} /> */}
      </div>

      {/* Ambient Spotlight Halo */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] rounded-full blur-[180px] pointer-events-none -z-10 bg-[radial-gradient(circle,rgba(215,186,114,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
          <span className="text-[var(--gold)] font-display text-[0.72rem] tracking-[0.3em] uppercase font-medium">
            Tanne · Private Sanctuaries
          </span>
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
        </div>

        <h2 className="m-0 font-serif font-normal text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-white">
          Private Dining & <br />
          <span className="italic text-[var(--gold)] font-normal">Exclusive</span> Lounges
        </h2>

        <p className="mt-4 text-white/60 text-sm md:text-base font-light max-w-md leading-relaxed">
          Scroll down to discover our private salons step by step.
        </p>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-7xl mx-auto">
        {loungeSpaces.slice(0, 4).map((space, index) => (
          <SpaceCard key={space.title} space={space} index={index} />
        ))}
      </div>
    </section>
  );
}

function SpaceCard({ space, index }: { space: LoungeSpace; index: number }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // When card enters screen: wait 1.2s to view picture, then slide open ONLY on mobile
  const handleViewportEnter = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const timer = setTimeout(() => {
        setIsMobileOpen(true);
      }, 1200 + index * 100);

      return () => clearTimeout(timer);
    }
  };

  // Close when scrolling away on mobile
  const handleViewportLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  return (
    <motion.div
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      viewport={{ once: false, amount: 0.55 }}
      className="group relative w-full h-[22rem] sm:h-[24rem] md:h-[26rem] rounded-3xl overflow-hidden bg-[#0d0905] shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer"
    >
      {/* UNDERNEATH LAYER: Full Details, Descriptions, & Pricing */}
      <div className="absolute inset-0 p-7 sm:p-9 flex flex-col justify-between z-0 bg-gradient-to-r from-[#140d07] via-[#0d0905] to-[#070503]">
        <div>
          <span className="text-[0.68rem] uppercase tracking-[0.25em] text-[var(--gold)] font-mono">
            {space.tagline}
          </span>

          <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-serif text-white tracking-wide">
            {space.title}
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
            {space.desc}
          </p>
        </div>

        <div className="pt-5 flex items-end justify-between">
          {/* Price Block */}
          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40 font-mono block">
              Reservation
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl sm:text-2xl font-display font-semibold text-[var(--gold)]">
                {space.price}
              </span>
              <span className="text-xs text-white/40 font-light">
                /{space.period}
              </span>
            </div>
          </div>

          {/* Micro-Interactive Magnetic Liquid Button */}
          <motion.a
            href="#contact"
            whileTap={{ scale: 0.94 }}
            className="group/btn relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full overflow-hidden border border-[var(--gold)]/40 bg-white/[0.03] backdrop-blur-md cursor-pointer select-none"
          >
            {/* 1. Smooth Liquid Bubble Expansion on Hover */}
            <span className="absolute inset-0 m-auto w-0 h-0 rounded-full bg-gradient-to-r from-[var(--gold)] to-[#b89543] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/btn:w-[220%] group-hover/btn:h-[220%]" />

            {/* 2. Dual Rolling Text Layer */}
            <span className="relative z-10 block overflow-hidden h-[1.15em] text-xs font-display font-semibold tracking-widest uppercase">
              <span className="block text-[var(--gold)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-full">
                Reserve
              </span>
              <span className="absolute inset-0 block text-[#090604] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover/btn:translate-y-0">
                Reserve
              </span>
            </span>

            {/* 3. Sliding / Ejecting Arrow Animation */}
            <span className="relative z-10 flex items-center justify-center w-4 h-4 overflow-hidden text-[var(--gold)] group-hover/btn:text-[#090604] transition-colors duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4" />
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 absolute -translate-x-4 translate-y-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
            </span>
          </motion.a>
        </div>
      </div>

      {/* TOP LAYER: 
          - Mobile: Controlled strictly via `isMobileOpen`
          - Desktop (md:): Controlled purely via cursor hover (`md:group-hover:-translate-x-full`)
      */}
      <div
        className={`absolute inset-0 z-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden bg-black shadow-[25px_0_50px_rgba(0,0,0,0.95)] ${
          isMobileOpen ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        } md:group-hover:-translate-x-full`}
      >
        <Image
          src={space.image}
          alt={space.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center brightness-[0.88] contrast-[1.06]"
        />

        {/* Natural Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

        {/* Resting Cover Title */}
        <div
          className={`absolute inset-x-6 bottom-6 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
            isMobileOpen ? "opacity-0 md:opacity-100" : "opacity-100"
          } md:group-hover:opacity-0`}
        >
          <div>
            <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--gold)] font-mono block mb-1">
              Landscape Atelier
            </span>
            <h3 className="m-0 font-serif text-xl sm:text-2xl text-white tracking-wide">
              {space.title}
            </h3>
          </div>

          <span className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-sm text-white/80">
            →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// function Meteors({ number = 20 }: { number?: number }) {
//   const meteors = [...new Array(number).fill(true)];

//   return (
//     <>
//       {meteors.map((_, idx) => (
//         <span
//           key={`meteor-${idx}`}
//           className="animate-[meteor_5s_linear_infinite] absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-[var(--gold)] shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
//           style={{
//             top: `${Math.floor(Math.random() * 100)}%`,
//             left: `${Math.floor(Math.random() * 100)}%`,
//             animationDelay: `${Math.random() * 2 + 0.2}s`,
//             animationDuration: `${Math.floor(Math.random() * 8 + 4)}s`,
//           }}
//         >
//           <span className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[60px] -translate-y-1/2 bg-gradient-to-r from-[var(--gold)] via-[var(--cyan)] to-transparent" />
//         </span>
//       ))}
//     </>
//   );
// }