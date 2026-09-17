"use client";

import { useState, useRef, type MouseEvent } from "react";

const signatureServices = [
  {
    id: "01",
    title: "Gourmet Cuisine",
    desc: "Indulge in world-class dishes crafted with fresh, high-quality ingredients and innovative techniques.",
    icon: "🍽️",
    cardBg: "from-[#2a1708]/90 via-[#180e06]/95 to-[#0b0704]/98",
    border: "border-amber-500/40",
    glowColor: "rgba(245, 158, 11, 0.45)",
    ambientLight: "rgba(217, 119, 6, 0.28)",
    accent: "text-amber-400",
  },
  {
    id: "02",
    title: "Premium Bar & Cocktails",
    desc: "Enjoy a curated selection of fine wines, artisanal cocktails, and premium spirits.",
    icon: "🍸",
    cardBg: "from-[#07243b]/90 via-[#041524]/95 to-[#020b12]/98",
    border: "border-sky-500/40",
    glowColor: "rgba(14, 165, 233, 0.45)",
    ambientLight: "rgba(2, 132, 199, 0.28)",
    accent: "text-sky-400",
  },
  {
    id: "03",
    title: "Valet Parking",
    desc: "Complimentary valet parking for a seamless and luxurious arrival experience.",
    icon: "🚘",
    cardBg: "from-[#062c1d]/90 via-[#031910]/95 to-[#020d08]/98",
    border: "border-emerald-500/40",
    glowColor: "rgba(16, 185, 129, 0.45)",
    ambientLight: "rgba(5, 150, 105, 0.26)",
    accent: "text-emerald-400",
  },
  {
    id: "04",
    title: "Private Dining",
    desc: "Exclusive private dining areas for intimate gatherings and special celebrations.",
    icon: "🕯️",
    cardBg: "from-[#28113c]/90 via-[#190926]/95 to-[#0a0311]/98",
    border: "border-purple-500/40",
    glowColor: "rgba(168, 85, 247, 0.45)",
    ambientLight: "rgba(147, 51, 234, 0.26)",
    accent: "text-purple-400",
  },
  {
    id: "05",
    title: "Live Music Evenings",
    desc: "Immerse yourself in an enchanting ambiance with live instrumental and jazz performances.",
    icon: "🎷",
    cardBg: "from-[#380e1e]/90 via-[#230812]/95 to-[#0e0207]/98",
    border: "border-rose-500/40",
    glowColor: "rgba(244, 63, 94, 0.45)",
    ambientLight: "rgba(225, 29, 72, 0.26)",
    accent: "text-rose-400",
  },
  {
    id: "06",
    title: "Chef’s Special Menu",
    desc: "Indulge in our chef’s signature dishes, featuring unique flavors and exquisite presentation.",
    icon: "👨‍🍳",
    cardBg: "from-[#332208]/90 via-[#1f1404]/95 to-[#0c0802]/98",
    border: "border-yellow-500/50",
    glowColor: "rgba(234, 179, 8, 0.48)",
    ambientLight: "rgba(202, 138, 4, 0.3)",
    accent: "text-amber-300",
  },
];

export function ServicesSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
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
      : "rgba(212, 175, 55, 0.16)";

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 py-9 md:py- px-4 md:px-[max(1.25rem,calc((100vw-93.75rem)/2))] border-t border-[var(--line)] scroll-mt-20 overflow-hidden bg-[oklch(0.08_0_0)]"
    >
      {/* 1. Interactive Dynamic Ambient Light (reacts to selected card) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] rounded-full blur-[160px] pointer-events-none transition-colors duration-1000 ease-out -z-10"
        style={{
          background: `radial-gradient(circle, ${activeColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-60 transition-opacity duration-300 -z-10"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.04), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* 3. Futuristic Grid Pattern with Center Mask */}
      <div
        className="absolute inset-0 -z-20 opacity-35 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto relative z-10" data-reveal data-motion="blur">
        <div className="inline-flex items-center gap-3 mb-3.5">
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
          <span className="text-[var(--gold)] font-display text-[0.72rem] tracking-[0.32em] uppercase font-semibold">
            TANNE · SIGNATURE SERVICES
          </span>
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
        </div>

        <h2 className="m-0 font-display font-bold text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight">
          Exceptional Culinary Experiences
        </h2>
        <p className="mt-4 text-[var(--soft)] text-sm md:text-base font-light max-w-lg">
          Click any card to inspect the craft and shift the salon's ambiance.
        </p>
      </div>

      {/* Card Deck Stage */}
      <div className="relative min-h-[40rem] md:min-h-[46rem] mt-8 flex items-center justify-center">
        {/* DESKTOP / TABLET: Wide Fanned Cards */}
        <div className="hidden md:flex relative w-full max-w-6xl h-[36rem] items-center justify-center">
          {signatureServices.map((service, index) => {
            const isSelected = selectedCard === index;
            const hasSelection = selectedCard !== null;

            const total = signatureServices.length;
            const centerIndex = (total - 1) / 2;
            const offsetMultiplier = index - centerIndex;

            // Spaced-out idle fanning metrics
            const idleRotate = offsetMultiplier * 6.5;
            const idleTranslateX = offsetMultiplier * 105; // Expanded spacing between cards
            const idleTranslateY = Math.abs(offsetMultiplier) * 16;

            // Docked metrics when another card is active
            const dockTranslateX = offsetMultiplier * 85;
            const dockTranslateY = 190;
            const dockRotate = offsetMultiplier * 2.5;

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
                    ? `0 35px 80px -15px ${service.glowColor}, 0 0 50px ${service.glowColor}`
                    : `0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 25px ${service.glowColor}`,
                }}
                className={`absolute w-[21rem] h-[28rem] rounded-3xl p-8 flex flex-col justify-between cursor-pointer border backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] select-none bg-gradient-to-b ${service.cardBg} ${service.border} ${
                  isSelected
                    ? "border-white/70 ring-1 ring-white/30"
                    : "hover:-translate-y-6 hover:scale-[1.03] hover:border-white/50"
                }`}
              >
                {/* Subtle Card Glow Highlight */}
                <div
                  className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-40 transition-opacity duration-500"
                  style={{ background: service.glowColor }}
                />

                {/* Top Section */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <span className="w-14 h-14 rounded-2xl bg-black/60 border border-white/15 flex items-center justify-center text-3xl shadow-[inset_0_2px_8px_rgba(255,255,255,0.15)]">
                      {service.icon}
                    </span>
                    <span className="font-mono text-xs text-white/70 border border-white/15 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md">
                      {service.id}
                    </span>
                  </div>

                  <h3 className="m-0 font-display font-semibold text-2xl text-white tracking-tight leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10">
                  <p className="m-0 text-sm font-light text-white/85 leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="mt-7 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
                    <span className={`${service.accent} font-display font-medium tracking-widest uppercase text-[0.72rem]`}>
                      {isSelected ? "✦ Selected Experience" : "Tap to inspect"}
                    </span>
                    <span className="text-white/40 font-mono">Tanne // Atelier</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE VIEW: Staggered Glass Cards */}
        <div className="md:hidden grid grid-cols-1 gap-5 w-full px-2">
          {signatureServices.map((service, index) => (
            <div
              key={service.title}
              onClick={() => setSelectedCard(selectedCard === index ? null : index)}
              style={{
                boxShadow: `0 15px 35px -5px ${service.glowColor}`,
              }}
              className={`p-6 rounded-2xl border ${service.border} bg-gradient-to-b ${service.cardBg} backdrop-blur-xl transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-3.5">
                <span className="w-12 h-12 rounded-xl bg-black/50 border border-white/15 flex items-center justify-center text-2xl">
                  {service.icon}
                </span>
                <div>
                  <span className="text-[0.65rem] font-mono text-white/60 uppercase">{service.id} // Experience</span>
                  <h3 className="m-0 font-display font-medium text-xl text-white">{service.title}</h3>
                </div>
              </div>
              <p className="m-0 text-xs text-white/85 font-light leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Close & Reset Button */}
      {selectedCard !== null && (
        <div className="hidden md:flex justify-center mt-6 relative z-10">
          <button
            type="button"
            onClick={() => setSelectedCard(null)}
            className="px-6 py-2.5 rounded-full border border-[var(--line)] bg-[var(--glass-heavy)] backdrop-blur-xl text-xs text-[var(--gold)] font-display tracking-widest uppercase hover:border-[var(--gold)] hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer"
          >
            ✕ Reset Ambience & Fan Deck
          </button>
        </div>
      )}
    </section>
  );
}