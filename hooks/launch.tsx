"use client";

import { useId } from "react";
import Image from "next/image";
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
      className="relative z-10 py-9 px-4 md:px-[max(1.25rem,calc((100vw-93.75rem)/2))] bg-[#070503] text-[#f5efe6] border-t border-white/10 scroll-mt-20 overflow-hidden"
    >
      {/* ===================================================
          1. BACKGROUND: SKEWED LINES & GEOMETRIC ILLUSION
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
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
        <Meteors number={22} />
      </div> */}

      {/* Ambient Spotlight Halos */}
      {/* <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] rounded-full blur-[180px] pointer-events-none -z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_14%,transparent)_0%,transparent_70%)]"
        aria-hidden="true"
      /> */}

      {/* ===================================================
          3. HEADER SECTION
      ==================================================== */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 select-none">
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
          Hover across our sanctuaries to reveal their bespoke appointments.
        </p>
      </div>

      {/* ===================================================
          4. WIDE LANDSCAPE HOVER REVEAL GRID
      ==================================================== */}
    {/* 2-Columns Per Row Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
  {loungeSpaces.slice(0, 4).map((space) => (
    <div
      key={space.title}
      className="group relative w-full h-[22rem] sm:h-[24rem] md:h-[26rem] rounded-3xl p-[1.5px] overflow-hidden bg-white/5 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
    >
      {/* Animated Neon Light Edge (Triggers on hover) */}
      <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--gold)_50%,var(--cyan)_75%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Inner Core Container */}
      <div className="relative w-full h-full rounded-[calc(1.5rem-1.5px)] overflow-hidden bg-[#0d0905]">
        
        {/* UNDERNEATH LAYER: The Revealed Details */}
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-0 bg-gradient-to-r from-[#140d07] via-[#0d0905] to-[#070503]">
          <div>
            <span className="text-[0.68rem] uppercase tracking-[0.25em] text-[var(--cyan)] font-mono">
              {space.tagline}
            </span>

            <h3 className="mt-2 text-xl sm:text-2xl font-serif text-white tracking-wide">
              {space.title}
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed line-clamp-3">
              {space.desc}
            </p>
          </div>

          <div className="pt-5 border-t border-white/10 flex items-end justify-between">
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40 font-mono block">
                Reservation
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-display font-semibold text-[var(--gold)]">
                  {space.price}
                </span>
                <span className="text-xs text-white/40 font-light">
                  /{space.period}
                </span>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--gold)]/50 bg-[var(--gold)]/10 text-xs font-display tracking-widest uppercase text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-all"
            >
              <span>Reserve</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* TOP LAYER: Full Landscape Photo (Slides Away on Hover) */}
        <div className="absolute inset-0 z-10 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-x-[90%] overflow-hidden bg-black shadow-[15px_0_35px_rgba(0,0,0,0.9)]">
          <Image
            src={space.image}
            alt={space.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center brightness-[0.85] contrast-[1.06]"
          />

          {/* Natural Image Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

          {/* Cover Title Overlay */}
          <div className="absolute inset-x-6 bottom-6 flex items-center justify-between pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[var(--gold)] font-mono block mb-1">
                Landscape Atelier
              </span>
              <h3 className="m-0 font-serif text-xl sm:text-2xl text-white tracking-wide">
                {space.title}
              </h3>
            </div>

            <span className="w-9 h-9 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center text-sm text-white/80">
              →
            </span>
          </div>

          {/* Pull-Tab Indicator Ribbon */}
          <div className="absolute right-0 inset-y-0 w-7 bg-black/85 backdrop-blur-md border-l border-white/10 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[8px] uppercase tracking-[0.25em] text-[var(--gold)] font-mono [writing-mode:vertical-rl]">
              Curated Space
            </span>
          </div>
        </div>

      </div>
    </div>
  ))}
</div>
    </section>
  );
}

// =======================================================
// SUBCOMPONENT: METEOR SHOWER GENERATOR
// =======================================================
function Meteors({ number = 20 }: { number?: number }) {
  const meteors = [...new Array(number).fill(true)];

  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={`meteor-${idx}`}
          className="animate-[meteor_5s_linear_infinite] absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-[var(--gold)] shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 2 + 0.2}s`,
            animationDuration: `${Math.floor(Math.random() * 8 + 4)}s`,
          }}
        >
          {/* Meteor Glowing Trail */}
          <span className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[60px] -translate-y-1/2 bg-gradient-to-r from-[var(--gold)] via-[var(--cyan)] to-transparent" />
        </span>
      ))}
    </>
  );
}