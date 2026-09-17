"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", id: "home", chapter: "01" },
  { name: "About", id: "about", chapter: "02" },
  { name: "Spaces", id: "spaces", chapter: "03" },
  { name: "Menu", id: "menu", chapter: "04" },
  { name: "Gallery", id: "gallery", chapter: "05" },
  { name: "Contact", id: "contact", chapter: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll threshold trigger
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock mobile body scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none select-none px-4 pt-3.5 md:pt-4">
      {/* GPU-ACCELERATED FLOATING ISLAND WITH CONTROLLED SPACING */}
      <motion.nav
        layout
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 30,
          mass: 0.8,
        }}
        className={`pointer-events-auto flex items-center justify-between border rounded-full backdrop-blur-2xl will-change-transform ${
          scrolled
            ? "w-full max-w-[54rem] h-[3.1rem] px-5 sm:px-7 bg-[#0c0805]/90 border-[var(--gold)]/35 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            : "w-full max-w-7xl h-[3.85rem] px-7 sm:px-10 bg-[#0c0805]/45 border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.35)]"
        }`}
        aria-label="Main navigation"
      >
        {/* BRAND LOGO */}
        <a 
          href="#home" 
          className="flex items-center gap-1.5 group shrink-0"
        >
          <span className="font-serif text-lg md:text-xl tracking-[0.22em] text-white group-hover:text-[var(--gold)] transition-colors duration-300">
            TANNE
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
        </a>

        {/* DESKTOP NAV LINKS WITH EXPANSIVE BREATHING ROOM */}
        <div 
          className={`hidden md:flex items-center mx-auto transition-all duration-500 ease-out ${
            scrolled ? "gap-6 lg:gap-8" : "gap-7 lg:gap-10"
          }`}
        >
          {navItems.map(({ name, id }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredItem === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                onMouseEnter={() => setHoveredItem(id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative py-1 font-display tracking-[0.16em] uppercase transition-colors duration-300 ${
                  scrolled ? "text-[0.74rem]" : "text-[0.8rem]"
                } ${
                  isActive
                    ? "text-[var(--gold)] font-medium"
                    : "text-white/65 hover:text-white"
                }`}
              >
                <span>{name}</span>

                {/* THEMED LOADING LASER-SWEEP UNDERLINE (HOVER) */}
                {isHovered && !isActive && (
                  <span className="absolute left-0 -bottom-0.5 w-full h-[1.5px] overflow-hidden rounded-full pointer-events-none">
                    {/* Scale-in base gradient using Gold & Cyan */}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "left" }}
                      className="absolute inset-0 bg-gradient-to-r from-[var(--gold)] via-[var(--cyan)] to-[var(--gold)]"
                    />
                    {/* Moving shimmer light beam */}
                    <motion.span
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 0.65,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
                    />
                  </span>
                )}

                {/* ACTIVE SECTION PERSISTENT GLOW LINE */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute left-0 -bottom-0.5 w-full h-[2px] rounded-full bg-gradient-to-r from-[var(--gold)] via-[var(--gold)] to-[color-mix(in_oklab,var(--gold)_30%,transparent)] shadow-[0_0_12px_var(--gold)]"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* RIGHT ACTION HUB */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#contact"
            className={`hidden md:inline-flex items-center justify-center rounded-full border border-[var(--gold)] bg-[var(--gold)] text-[#0c0805] font-display font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(199,163,93,0.45)] ${
              scrolled
                ? "h-8 px-4 text-[0.7rem]"
                : "h-9 px-5 text-[0.76rem]"
            }`}
          >
            Reserve
          </a>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation drawer"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white cursor-pointer"
          >
            <div className="w-4 h-3 flex flex-col justify-between items-center">
              <span
                className={`w-full h-[1px] bg-white transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[5.5px]" : ""
                }`}
              />
              <span
                className={`w-full h-[1px] bg-white transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-[1px] bg-white transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[5.5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* MOBILE EXPANSION DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto md:hidden fixed inset-x-4 top-20 rounded-3xl border border-[var(--gold)]/30 bg-[#0c0805]/95 backdrop-blur-3xl p-6 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(199,163,93,0.15)_0%,transparent_70%)] pointer-events-none" />

            <div className="flex flex-col gap-1.5 relative z-10">
              {navItems.map(({ name, id, chapter }, index) => {
                const isActive = activeSection === id;

                return (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04 }}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                        : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[0.65rem] text-[var(--gold)]">
                        {chapter}
                      </span>
                      <span className="font-serif text-lg tracking-wide">
                        {name}
                      </span>
                    </div>

                    <span className="text-xs text-white/30">→</span>
                  </motion.a>
                );
              })}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] uppercase tracking-widest text-white/40 font-mono m-0">
                  Dinner Service
                </p>
                <p className="text-xs font-serif text-[var(--gold)] mt-0.5 m-0">
                  19:00 — 23:30
                </p>
              </div>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2 rounded-full border border-[var(--gold)] bg-[var(--gold)] text-[#0c0805] text-xs font-display font-semibold tracking-wider uppercase"
              >
                Reserve Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}