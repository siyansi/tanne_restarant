"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Compass, 
  Clock, 
  Send, 
  ArrowUpRight,
  Sparkles 
} from "lucide-react";

interface ContactSectionProps {
  submitReservation: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ContactSection({ submitReservation }: ContactSectionProps) {
  // 3D Card Tilt State for the Interactive Map
  const [mapRotate, setMapRotate] = useState({ x: 0, y: 0 });

  const handleMapMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMapRotate({ x: -(y / 15), y: x / 15 });
  };

  const handleMapMouseLeave = () => {
    setMapRotate({ x: 0, y: 0 });
  };

  return (
    <section
      id="contact"
      className="relative z-10 py-28 md:py-40 px-4 md:px-[max(1.25rem,calc((100vw-93.75rem)/2))] border-t border-[var(--line)] scroll-mt-20 overflow-hidden bg-[oklch(0.06_0_0)] text-white"
    >
      {/* 1. Neon Radial Glow Mesh */}
      <div 
        className="absolute top-1/4 -left-40 w-[46rem] h-[46rem] rounded-full blur-[160px] pointer-events-none -z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--cyan)_18%,transparent)_0%,transparent_70%)] animate-pulse-glow" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-10 -right-40 w-[42rem] h-[42rem] rounded-full blur-[170px] pointer-events-none -z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_16%,transparent)_0%,transparent_70%)] animate-pulse-glow [animation-delay:3s]" 
        aria-hidden="true" 
      />

      {/* 2. Precision Background Matrix Grid */}
      <div
        className="absolute inset-0 -z-20 opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "3.5rem 3.5rem",
        }}
        aria-hidden="true"
      />

      {/* Main Grid: Left (Story/Coordinates/3D Map) & Right (Neon Glass Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-start">
        
        {/* LEFT COLUMN: Sanctuary Metadata & Interactive 3D Radar Map */}
        <div data-reveal data-motion="left" className="space-y-10">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full border border-[var(--cyan)]/30 bg-[var(--cyan)]/10 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-[var(--cyan)] animate-spin [animation-duration:12s]" />
              <span className="text-[var(--cyan)] font-display font-medium text-xs tracking-[0.26em] uppercase">
                Chapter 06 · Coordinates
              </span>
            </div>

            <h2 className="m-0 font-display font-bold text-[clamp(2.8rem,5vw,5rem)] leading-[0.94] tracking-tight">
              Find your <br />
              way <em className="text-[var(--gold)] font-serif italic not-italic">in</em>.
            </h2>
            <p className="mt-4 text-[var(--soft)] text-sm md:text-base font-light max-w-md leading-relaxed">
              Arrive along the tree-lined Avinashi corridor into secluded courtyard gardens and evening lanterns.
            </p>
          </div>

          {/* Quick Click-to-Action Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <a
              href="tel:+918489988007"
              className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--glass)] backdrop-blur-xl flex items-center gap-3.5 transition-all duration-300 hover:border-[var(--cyan)] hover:shadow-[0_0_25px_color-mix(in_oklab,var(--cyan)_20%,transparent)] group"
            >
              <span className="w-10 h-10 rounded-xl bg-[var(--cyan)]/10 border border-[var(--cyan)]/30 flex items-center justify-center text-[var(--cyan)] group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[0.68rem] text-[var(--soft)] font-mono uppercase tracking-wider block">Reservations</span>
                <span className="text-sm font-display font-medium text-white group-hover:text-[var(--cyan)] transition-colors">+91 84899 88007</span>
              </div>
            </a>

            <a
              href="mailto:admin@tanne.in"
              className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--glass)] backdrop-blur-xl flex items-center gap-3.5 transition-all duration-300 hover:border-[var(--gold)] hover:shadow-[0_0_25px_color-mix(in_oklab,var(--gold)_20%,transparent)] group"
            >
              <span className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[0.68rem] text-[var(--soft)] font-mono uppercase tracking-wider block">Direct Concierge</span>
                <span className="text-sm font-display font-medium text-white group-hover:text-[var(--gold)] transition-colors">admin@tanne.in</span>
              </div>
            </a>
          </div>

          {/* INTERACTIVE 3D RADAR MAP PREVIEW CARD */}
          <motion.div
            style={{
              perspective: 1000,
              rotateX: mapRotate.x,
              rotateY: mapRotate.y,
            }}
            onMouseMove={handleMapMouseMove}
            onMouseLeave={handleMapMouseLeave}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative rounded-3xl p-6 border border-[color-mix(in_oklab,var(--gold)_30%,var(--line))] bg-[#0d0905]/90 backdrop-blur-2xl shadow-2xl overflow-hidden group cursor-pointer"
          >
            {/* Ambient Map Topographic Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:1.25rem_1.25rem]" />

            <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--gold)] animate-bounce" />
                <span className="text-xs font-display tracking-widest uppercase text-white font-medium">Tanne Sanctuary Coordinates</span>
              </div>
              <span className="text-[0.65rem] font-mono text-[var(--cyan)]">LIVE RADAR</span>
            </div>

            {/* Simulated 3D Vector Map Visual */}
            <div className="relative h-44 my-4 rounded-2xl overflow-hidden border border-white/10 bg-[#090604] flex items-center justify-center">
              {/* Concentric Radar Rings */}
              <div className="absolute w-28 h-28 rounded-full border border-[var(--cyan)]/25 animate-ping [animation-duration:3s]" />
              <div className="absolute w-48 h-48 rounded-full border border-[var(--gold)]/20" />
              <div className="absolute w-64 h-64 rounded-full border border-white/5" />

              {/* Scanning Radar Line */}
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,color-mix(in_oklab,var(--cyan)_20%,transparent)_360deg)] animate-[spin_6s_linear_infinite]" />

              {/* Pin Center Beacon */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="relative flex h-4 w-4 mb-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--gold)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--gold)] border-2 border-black" />
                </span>
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[var(--gold)]/40 text-[0.65rem] font-mono text-[var(--gold)] tracking-wider">
                  TANNE · ARASUR
                </span>
              </div>
            </div>

            {/* Address & Google Maps Link */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 text-xs text-[var(--soft)]">
              <address className="not-italic leading-relaxed">
                Pirivu 5/171/B1, Avinashi – Coimbatore Rd,<br />
                Arasur, Coimbatore, TN 641407
              </address>
              <a
                href="https://g.co/kgs/aYQzbSS"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--gold)] font-display font-medium hover:text-[var(--cyan)] transition-colors uppercase tracking-wider"
              >
                <span>Navigate Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Neon-Bordered Glass Reservation Form */}
        <div data-reveal data-motion="right" className="relative">
          {/* Animated Neon Light Border Frame */}
          <div className="relative p-[1.5px] rounded-3xl overflow-hidden">
            <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--cyan)_0%,var(--gold)_50%,var(--cyan)_100%)] opacity-85" />
            
            <form
              onSubmit={submitReservation}
              className="relative rounded-[calc(1.5rem-1px)] p-7 md:p-10 bg-[#0f0a06]/95 backdrop-blur-3xl shadow-[0_30px_90px_oklch(0_0_0/0.8)] grid gap-5 z-10"
            >
              {/* Form Kicker */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                  <p className="m-0 text-[var(--gold)] font-display font-medium text-xs uppercase tracking-[0.22em]">
                    Instant Reservation Desk
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[0.65rem] font-mono text-[var(--soft)]">
                  <Clock className="w-3 h-3 text-[var(--cyan)]" />
                  <span>Avg reply: 4 mins</span>
                </div>
              </div>

              {/* Field Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="grid gap-2 text-[var(--soft)] text-[0.72rem] uppercase tracking-wider font-mono">
                  Full Name
                  <input
                    name="name"
                    required
                    placeholder="E.g. Vikramaditya"
                    className="w-full min-h-[3.35rem] px-4 rounded-xl border border-[var(--line)] bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--cyan)] focus:bg-[var(--cyan)]/[0.04] focus:shadow-[0_0_20px_color-mix(in_oklab,var(--cyan)_25%,transparent)]"
                  />
                </label>

                <label className="grid gap-2 text-[var(--soft)] text-[0.72rem] uppercase tracking-wider font-mono">
                  Phone (WhatsApp)
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full min-h-[3.35rem] px-4 rounded-xl border border-[var(--line)] bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--cyan)] focus:bg-[var(--cyan)]/[0.04] focus:shadow-[0_0_20px_color-mix(in_oklab,var(--cyan)_25%,transparent)]"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="grid gap-2 text-[var(--soft)] text-[0.72rem] uppercase tracking-wider font-mono">
                  Date of Visit
                  <input
                    name="date"
                    required
                    type="date"
                    className="w-full min-h-[3.35rem] px-4 rounded-xl border border-[var(--line)] bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--gold)] focus:bg-[var(--gold)]/[0.04] focus:shadow-[0_0_20px_color-mix(in_oklab,var(--gold)_25%,transparent)]"
                  />
                </label>

                <label className="grid gap-2 text-[var(--soft)] text-[0.72rem] uppercase tracking-wider font-mono">
                  Guests Count
                  <input
                    name="guests"
                    required
                    type="number"
                    min="1"
                    max="35"
                    placeholder="2 to 30 guests"
                    className="w-full min-h-[3.35rem] px-4 rounded-xl border border-[var(--line)] bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--gold)] focus:bg-[var(--gold)]/[0.04] focus:shadow-[0_0_20px_color-mix(in_oklab,var(--gold)_25%,transparent)]"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-[var(--soft)] text-[0.72rem] uppercase tracking-wider font-mono">
                Occasion & Lounge Preference
                <input
                  name="occasion"
                  placeholder="Anniversary, Chef's Table, Family Lounge, VIP Cellar…"
                  className="w-full min-h-[3.35rem] px-4 rounded-xl border border-[var(--line)] bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--cyan)] focus:bg-[var(--cyan)]/[0.04] focus:shadow-[0_0_20px_color-mix(in_oklab,var(--cyan)_25%,transparent)]"
                />
              </label>

              {/* Neon Glow Submit Trigger */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-3 min-h-[3.25rem] py-3.5 px-6 rounded-full border border-[var(--gold)] bg-gradient-to-r from-[var(--gold)] to-[#b58b29] text-[oklch(0.12_0_0)] font-display font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_35px_color-mix(in_oklab,var(--gold)_30%,transparent)] transition-shadow hover:shadow-[0_0_50px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
                type="submit"
              >
                <span>Request via WhatsApp Concierge</span>
                <Send className="w-4 h-4" />
              </motion.button>
              
              <p className="m-0 text-center text-[0.68rem] text-[var(--soft)] font-mono">
                ✦ Zero booking deposit required · Instant direct reservation confirmation
              </p>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}