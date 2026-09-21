"use client";

import { useState, useRef, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Wine, Car, Sparkles, Music, ChefHat, ChevronUp, ChevronDown } from "lucide-react";

const signatureServices = [
  {
    id: "01",
    title: "Gourmet Cuisine",
    desc: "Slow-roasted heirloom recipes crafted with high-altitude produce and woodfire techniques.",
    icon: Utensils,
    cardBg: "from-[#22180d]/95 via-[#160f08]/95 to-[#0b0804]/98",
    border: "border-[var(--gold)]/25",
    glowColor: "rgba(224, 189, 116, 0.40)",
    ambientLight: "rgba(224, 189, 116, 0.22)",
    accent: "text-[var(--gold)]",
  },
  {
    id: "02",
    title: "Premium Bar & Atelier",
    desc: "A curated cellar of vintage labels, botanical infusions, and hand-carved ice mixology.",
    icon: Wine,
    cardBg: "from-[#1e130a]/95 via-[#130c06]/95 to-[#090603]/98",
    border: "border-[#d8a852]/20",
    glowColor: "rgba(216, 168, 82, 0.36)",
    ambientLight: "rgba(216, 168, 82, 0.20)",
    accent: "text-[#d8a852]",
  },
  {
    id: "03",
    title: "Valet & Arrival",
    desc: "Effortless curb concierge and sheltered carriage reception from the moment you reach our gates.",
    icon: Car,
    cardBg: "from-[#190f07]/95 via-[#100905]/95 to-[#080502]/98",
    border: "border-[#c4923e]/15",
    glowColor: "rgba(196, 146, 62, 0.32)",
    ambientLight: "rgba(196, 146, 62, 0.18)",
    accent: "text-[#c4923e]",
  },
  {
    id: "04",
    title: "Private Sanctuaries",
    desc: "Secluded salons and secluded garden canopies reserved exclusively for private occasions.",
    icon: Sparkles,
    cardBg: "from-[#150c06]/95 via-[#0e0704]/95 to-[#060402]/98",
    border: "border-[#ad7e30]/15",
    glowColor: "rgba(173, 126, 48, 0.28)",
    ambientLight: "rgba(173, 126, 48, 0.16)",
    accent: "text-[#ad7e30]",
  },
  {
    id: "05",
    title: "Live Acoustic Evenings",
    desc: "Subtle nocturnal jazz and live classical strings blending into the courtyard breeze.",
    icon: Music,
    cardBg: "from-[#120a05]/95 via-[#0a0603]/95 to-[#050301]/98",
    border: "border-[#966b24]/12",
    glowColor: "rgba(150, 107, 36, 0.24)",
    ambientLight: "rgba(150, 107, 36, 0.14)",
    accent: "text-[#966b24]",
  },
  {
    id: "06",
    title: "Chef's Table Experience",
    desc: "An intimate multi-course culinary tasting orchestrated live by our executive masters.",
    icon: ChefHat,
    cardBg: "from-[#0e0804]/95 via-[#080502]/95 to-[#030201]/98",
    border: "border-[#80581c]/10",
    glowColor: "rgba(128, 88, 28, 0.22)",
    ambientLight: "rgba(128, 88, 28, 0.12)",
    accent: "text-[#80581c]",
  },
];

export function ServicesSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [activeMobileStack, setActiveMobileStack] = useState(2); // Top visible card index
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const activeColor =
    selectedCard !== null
      ? signatureServices[selectedCard].ambientLight
      : "rgba(212, 175, 55, 0.12)";

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 py-9 px-4 md:px-[max(1.25rem,calc((100vw-93.75rem)/2))] scroll-mt-20 overflow-hidden bg-[#070503] text-[#eee7da] select-none"
    >
      {/* ===================================================
          1. NEW FLUID AURORA NEBULA ANIMATION (NO HARSH LINES)
      ==================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20" aria-hidden="true">
        {/* Shifting Aurora Bloom 1 */}
        <motion.div
          animate={{
            x: ["-20%", "20%", "-20%"],
            y: ["-15%", "15%", "-15%"],
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 w-[45rem] h-[45rem] rounded-full blur-[160px] bg-[radial-gradient(circle,rgba(215,186,114,0.14)_0%,transparent_70%)]"
        />

        {/* Shifting Aurora Bloom 2 */}
        <motion.div
          animate={{
            x: ["20%", "-20%", "20%"],
            y: ["15%", "-15%", "15%"],
            scale: [1.2, 0.9, 1.2],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] rounded-full blur-[170px] bg-[radial-gradient(circle,rgba(168,124,52,0.12)_0%,transparent_75%)]"
        />

        {/* Subtle Micro Star Dots */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Reactive Selected Ambient Spot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] rounded-full blur-[170px] pointer-events-none transition-colors duration-1000 ease-out -z-10"
        style={{
          background: `radial-gradient(circle, ${activeColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Cursor Follower (Desktop Only) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-40 transition-opacity duration-300 -z-10 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(215, 186, 114, 0.05), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-3 mb-3.5">
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
          <span className="text-[var(--gold)] font-display text-[0.72rem] tracking-[0.32em] uppercase font-semibold">
            TANNE · SIGNATURE SERVICES
          </span>
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
        </div>

        <h2 className="m-0 font-serif font-normal text-[clamp(2.4rem,5.2vw,4.5rem)] leading-[1.05] tracking-tight text-white">
          Exceptional Hospitality & <br />
          <span className="italic text-[var(--gold)] font-normal">Living</span> Experiences
        </h2>
        
        <p className="mt-4 text-white/60 text-sm md:text-base font-light max-w-md leading-relaxed">
          Hover or tap any experience to shift the salon's ambiance.
        </p>
      </div>

      {/* ===================================================
          DESKTOP / TABLET: WIDE FANNED GOLD DECK (LITE BORDERS)
      ==================================================== */}
      <div className="hidden md:flex relative min-h-[42rem] mt-6 items-center justify-center">
        <div className="relative w-full max-w-6xl h-[36rem] flex items-center justify-center">
          {signatureServices.map((service, index) => {
            const isSelected = selectedCard === index;
            const hasSelection = selectedCard !== null;
            const Icon = service.icon;

            const total = signatureServices.length;
            const centerIndex = (total - 1) / 2;
            const offsetMultiplier = index - centerIndex;

            const idleRotate = offsetMultiplier * 5.5;
            const idleTranslateX = offsetMultiplier * 115;
            const idleTranslateY = Math.abs(offsetMultiplier) * 14;

            const dockTranslateX = offsetMultiplier * 85;
            const dockTranslateY = 190;
            const dockRotate = offsetMultiplier * 2;

            return (
              <div
                key={service.title}
                onClick={() => setSelectedCard(isSelected ? null : index)}
                style={{
                  transform: isSelected
                    ? "translate3d(0px, -35px, 90px) scale(1.12) rotate(0deg)"
                    : hasSelection
                    ? `translate3d(${dockTranslateX}px, ${dockTranslateY}px, ${index * 3}px) scale(0.72) rotate(${dockRotate}deg)`
                    : `translate3d(${idleTranslateX}px, ${idleTranslateY}px, ${index * 6}px) scale(1) rotate(${idleRotate}deg)`,
                  zIndex: isSelected ? 50 : index + 10,
                  boxShadow: isSelected
                    ? `0 35px 80px -15px ${service.glowColor}, 0 0 40px ${service.glowColor}`
                    : `0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 20px ${service.glowColor}`,
                }}
                className={`absolute w-[21rem] h-[28rem] rounded-3xl p-8 flex flex-col justify-between cursor-pointer border ${service.border} backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] select-none bg-gradient-to-b ${service.cardBg} ${
                  isSelected
                    ? "border-[var(--gold)]/60 ring-1 ring-[var(--gold)]/30"
                    : "hover:-translate-y-6 hover:scale-[1.03] hover:border-[var(--gold)]/40"
                }`}
              >
                {/* Soft Corner Glow */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-30 transition-opacity duration-500"
                  style={{ background: service.glowColor }}
                />

                {/* Top Section */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/90 shadow-inner">
                      <Icon className="w-6 h-6 text-[var(--gold)]" />
                    </span>
                    <span className="font-mono text-xs text-white/70 border border-white/10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md">
                      {service.id}
                    </span>
                  </div>

                  <h3 className="m-0 font-serif font-normal text-2xl text-white tracking-wide leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10">
                  <p className="m-0 text-xs sm:text-sm font-light text-white/75 leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="mt-7 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className={`${service.accent} font-display font-medium tracking-widest uppercase text-[0.72rem]`}>
                      {isSelected ? "✦ Selected Experience" : "Tap to inspect"}
                    </span>
                    <span className="text-white/40 font-mono text-[0.68rem]">Tanne // Salon</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW: iPHONE NOTIFICATION STACK (SLIDES UP & DOCKS AT THE TOP)
      ========================================================================== */}
      <div className="md:hidden relative w-full max-w-sm mx-auto min-h-[31rem] pt-6 flex flex-col justify-between">
        {/* iOS Notification Stack Container */}
        <div className="relative h-[22rem] w-full flex items-start justify-center">
          {signatureServices.map((service, index) => {
            const Icon = service.icon;
            const diff = index - activeMobileStack;
            
            // Cards above stack dock tightly under the header like iOS alerts
            const isDockedAbove = diff < 0;
            const isCurrent = diff === 0;
            const isWaitingBelow = diff > 0;

            // Compute iOS stack positioning
            let translateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isDockedAbove) {
              // Collapsed under the top
              translateY = Math.max(-36, diff * 12);
              scale = Math.max(0.85, 1 + diff * 0.05);
              opacity = Math.max(0.2, 1 + diff * 0.35);
              zIndex = 10 + diff;
            } else if (isCurrent) {
              translateY = 0;
              scale = 1;
              opacity = 1;
              zIndex = 40;
            } else if (isWaitingBelow) {
              // Waiting down below
              translateY = 120 + (diff - 1) * 35;
              scale = 0.94;
              opacity = 0;
              zIndex = 5;
            }

            return (
              <motion.div
                key={service.title}
                animate={{
                  y: translateY,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                  mass: 0.8,
                }}
                onClick={() => {
                  if (diff !== 0) setActiveMobileStack(index);
                }}
                style={{
                  boxShadow: isCurrent
                    ? `0 20px 45px -10px ${service.glowColor}`
                    : "0 8px 25px rgba(0,0,0,0.8)",
                }}
                className={`absolute inset-x-2 top-10 rounded-3xl p-6 border ${service.border} bg-gradient-to-b ${service.cardBg} backdrop-blur-2xl cursor-pointer will-change-transform`}
              >
                {/* Notification Top Pill Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--gold)]" />
                    </span>
                    <span className="text-[0.68rem] tracking-[0.2em] font-mono uppercase text-white/50">
                      Tanne Atelier
                    </span>
                  </div>
                  <span className="text-[0.65rem] font-mono text-[var(--gold)]">
                    0{index + 1} / 06
                  </span>
                </div>

                <h3 className="m-0 font-serif text-xl text-white tracking-wide mb-2">
                  {service.title}
                </h3>

                <p className="m-0 text-xs text-white/75 font-light leading-relaxed">
                  {service.desc}
                </p>

                <div className="mt-4 pt-3 flex items-center justify-between">
                  <span className={`${service.accent} font-display text-[0.68rem] tracking-wider uppercase`}>
                    Curated Sanctuary
                  </span>
                  <span className="text-[0.65rem] text-white/40 font-mono">Tap to expand</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* iOS Step Slider Controls */}
        <div className="flex items-center justify-between mt-6 px-4 z-50">
          <button
            type="button"
            disabled={activeMobileStack === 0}
            onClick={() => setActiveMobileStack((prev) => Math.max(0, prev - 1))}
            className="w-11 h-11 rounded-full border border-[var(--gold)]/20 bg-white/[0.03] flex items-center justify-center text-[var(--gold)] disabled:opacity-25 disabled:cursor-not-allowed transition-all active:scale-95"
            aria-label="Previous notification card"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          {/* Stepper Progress Bar */}
          <div className="flex items-center gap-1.5">
            {signatureServices.map((_, i) => (
              <span
                key={i}
                onClick={() => setActiveMobileStack(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeMobileStack === i
                    ? "w-7 bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]"
                    : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={activeMobileStack === signatureServices.length - 1}
            onClick={() => setActiveMobileStack((prev) => Math.min(signatureServices.length - 1, prev + 1))}
            className="w-11 h-11 rounded-full border border-[var(--gold)]/20 bg-white/[0.03] flex items-center justify-center text-[var(--gold)] disabled:opacity-25 disabled:cursor-not-allowed transition-all active:scale-95"
            aria-label="Next notification card"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Reset Deck Button */}
      {selectedCard !== null && (
        <div className="hidden md:flex justify-center mt-6 relative z-10">
          <button
            type="button"
            onClick={() => setSelectedCard(null)}
            className="px-7 py-2.5 rounded-full border border-[var(--gold)]/30 bg-[#0d0905]/80 backdrop-blur-xl text-xs text-[var(--gold)] font-display tracking-widest uppercase hover:bg-[var(--gold)] hover:text-black transition-all duration-300 shadow-xl cursor-pointer"
          >
            ✕ Reset Ambience & Fan Deck
          </button>
        </div>
      )}
    </section>
  );
}