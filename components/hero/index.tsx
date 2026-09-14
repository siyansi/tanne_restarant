"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import heroImage from "../../assets/tanne-hero.jpg";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 }); // percentage
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 }); // px

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 28 });
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(smoothProgress, [0, 1], [1.05, 1.2]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: xPct, y: yPct });
    setMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Words for the cinematic stagger
  const lineOne = ["Sanctuary", "born", "of"];
  const lineTwo = ["fire,", "shadow", "&"];
  const lineThree = ["living", "foliage."];

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex items-end justify-center bg-[#070503] isolate overflow-hidden select-none cursor-default"
      style={{ perspective: "1400px" }}
    >
      {/* 1. LAYER A: Darkened Base Image */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] -z-30 pointer-events-none will-change-transform"
      >
        <Image
          src={heroImage}
          alt="Tanne architectural garden dining"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.32] contrast-[1.25] saturate-[0.6]"
        />
      </motion.div>

      {/* 2. LAYER B: Interactive Torchlight Mask (Reveals Vibrant Lighting under Cursor) */}
      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
          maskImage: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, black 25%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, black 25%, transparent 100%)`,
        }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] -z-20 pointer-events-none will-change-transform transition-[mask-image] duration-75"
      >
        <Image
          src={heroImage}
          alt="Tanne illuminated lantern spotlight"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.1] contrast-[1.15] saturate-[1.25]"
        />
      </motion.div>

      {/* 3. Golden Cursor Torch Core Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10 opacity-70"
        style={{
          background: `radial-gradient(550px circle at ${mouseCoords.x}px ${mouseCoords.y}px, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 4. Deep Atmospheric Shadows & Grain Vignette */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070503] via-[#070503]/50 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,transparent_0%,#070503_85%)]" />

      {/* 5. Floating Fire Ember Specks */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.85, 0],
              y: [-20, -400],
              x: [(i % 2 === 0 ? 15 : -15), (i % 2 === 0 ? -25 : 25)],
            }}
            transition={{
              duration: 4.5 + (i % 3) * 1.5,
              repeat: Infinity,
              delay: i * 0.35,
              ease: "easeOut",
            }}
            style={{
              left: `${(i * 6.2) % 92 + 4}%`,
              bottom: "10%",
            }}
            className="absolute w-1 h-1 rounded-full bg-[var(--gold)] shadow-[0_0_10px_var(--gold)]"
          />
        ))}
      </div>

      {/* 6. Top Technical Telemetry (Coordinate Bar) */}
      <div className="absolute top-24 md:top-28 inset-x-6 md:inset-x-12 z-20 flex justify-between items-center pointer-events-none border-b border-white/[0.07] pb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--gold)]" />
          </span>
          <span className="font-mono text-[0.68rem] tracking-[0.3em] uppercase text-white/70">
            Twilight Salon · Service 19:00 — 00:00
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 font-mono text-[0.68rem] tracking-[0.22em] text-[var(--soft)] uppercase">
          <span>Arasur // Pirivu</span>
          <span className="text-[var(--cyan)]">/</span>
          <span>Coimbatore</span>
        </div>
      </div>

      {/* 7. Main Editorial Headline Composition */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 w-full max-w-[94rem] mx-auto px-4 md:px-10 pt-32 pb-14 md:pb-20 text-white"
      >
        {/* Curated Kicker Pill */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[var(--gold)]/35 bg-[#120d08]/85 backdrop-blur-xl mb-6 shadow-xl"
        >
          <span className="text-[var(--gold)] font-mono text-xs">✦</span>
          <span className="font-display font-medium text-[0.7rem] md:text-xs tracking-[0.3em] uppercase text-[var(--gold)]">
            Haute Indian Gastronomy
          </span>
        </motion.div>

        {/* 3D Liquid-Perspective Words */}
        <div className="flex flex-col gap-1 md:gap-2">
          {/* Line 1 */}
          <div className="flex flex-wrap gap-x-4 md:gap-x-7 overflow-hidden">
            {lineOne.map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: "115%", rotateX: -45, opacity: 0 }}
                animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.25 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block font-display font-bold text-[clamp(2.8rem,8.4vw,7.8rem)] leading-[0.92] tracking-[-0.03em]"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap items-baseline gap-x-4 md:gap-x-7 overflow-hidden">
            {lineTwo.map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: "115%", rotateX: -45, opacity: 0 }}
                animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.45 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block font-display text-[clamp(2.8rem,8.4vw,7.8rem)] leading-[0.92] tracking-[-0.03em] ${
                  word.includes("shadow")
                    ? "font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] via-[var(--cyan)] to-[var(--gold)]"
                    : "font-bold"
                }`}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Line 3 */}
          <div className="flex flex-wrap gap-x-4 md:gap-x-7 overflow-hidden">
            {lineThree.map((word, i) => (
              <motion.span
                key={word}
                initial={{ y: "115%", rotateX: -45, opacity: 0 }}
                animate={{ y: "0%", rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.65 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block font-display font-bold text-[clamp(2.8rem,8.4vw,7.8rem)] leading-[0.92] tracking-[-0.03em] text-white/90"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Dynamic Architectural Beam Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.3, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          className="w-full h-[1px] my-9 bg-gradient-to-r from-[var(--gold)] via-[var(--cyan)]/40 to-transparent"
        />

        {/* Actions & Experience Credentials */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          
          {/* Action Hub */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center gap-4"
          >
            {/* High-Glass Beveled Booking CTA */}
            <a
              href="#reserve"
              className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full border border-[var(--gold)]/80 bg-gradient-to-r from-[#21160a] to-[#120c06] text-[var(--gold)] font-display font-semibold text-xs md:text-sm tracking-[0.2em] uppercase shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:border-[var(--gold)] hover:scale-[1.03] hover:shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_40%,transparent)] transition-all duration-300"
            >
              <span className="relative z-10">Request a table</span>
              <span className="w-6 h-6 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-[var(--gold)] group-hover:text-black">
                ↗
              </span>
            </a>

            {/* Ghost Folio Link */}
            <a
              href="#menu"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl text-white font-display text-xs md:text-sm tracking-[0.2em] uppercase hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-all duration-300"
            >
              <span>Explore Menu</span>
              <span className="text-[var(--cyan)]">📖</span>
            </a>
          </motion.div>

          {/* Heritage Credential Capsule */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.15 }}
            className="flex items-center gap-5 text-xs text-[var(--soft)] font-mono tracking-widest uppercase"
          >
            <div className="flex flex-col">
              <span className="text-white font-display font-medium text-sm">6 Curated Rooms</span>
              <span className="text-[0.65rem] text-[var(--soft)]">Open Garden · Private Salons</span>
            </div>
            <span className="w-[1px] h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[var(--gold)] font-display font-medium text-sm">Woodfire Atelier</span>
              <span className="text-[0.65rem] text-[var(--soft)]">Nilgiri Farm-to-Table</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 8. Pinned Interactive Scroll Gauge */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        href="#about"
        className="hidden lg:flex absolute right-8 bottom-12 flex-col items-center gap-2.5 text-[var(--soft)] hover:text-[var(--gold)] transition-colors group cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-[0.65rem] font-mono tracking-[0.25em] uppercase [writing-mode:vertical-rl]">
          Discover Sanctuary
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-1.5 group-hover:border-[var(--gold)] transition-colors">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-[var(--cyan)]"
          />
        </div>
      </motion.a>
    </section>
  );
}