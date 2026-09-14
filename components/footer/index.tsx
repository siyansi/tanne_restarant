"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import dishImage from "../../assets/tanne-dish.jpg";
import gardenImage from "../../assets/tanne-garden.jpg";
import heroImage from "../../assets/tanne-hero.jpg";
import cocktailImage from "../../assets/tanne-cocktail.jpg";
import loungeImage from "../../assets/tanne-lounge.jpg";

interface MenuItem {
  name: string;
  price: string;
  desc: string;
  diet: "veg" | "non-veg";
  image?: StaticImageData;
}

interface MenuSection {
  title: string;
  subtitle: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "Appetizers",
    subtitle: "Pratham / First Servings",
    items: [
      {
        name: "Smoked paneer tikka",
        price: "₹460",
        desc: "Slow-roasted malai paneer infused with green cardamom and mountain herb butter.",
        diet: "veg",
        image: dishImage,
      },
      {
        name: "Lotus stem crisp",
        price: "₹390",
        desc: "Crisped river lotus tossed in tamarind jaggery glaze and roasted wild sesame.",
        diet: "veg",
      },
      {
        name: "Pepper lamb seekh",
        price: "₹580",
        desc: "Hand-pounded Chettinad peppercorn lamb seared over charcoal embers.",
        diet: "non-veg",
      },
      {
        name: "Garden burrata",
        price: "₹520",
        desc: "Local artisanal burrata over heirloom tomato carpaccio and basil reduction.",
        diet: "veg",
        image: gardenImage,
      },
    ],
  },
  {
    title: "Main Course",
    subtitle: "Mukhya / Fire & Hearth",
    items: [
      {
        name: "Charred forest chicken",
        price: "₹720",
        desc: "Country chicken dry-rubbed in black pepper, kaffir leaf, and smoked fruitwood.",
        diet: "non-veg",
        image: heroImage,
      },
      {
        name: "Coastal sea bass",
        price: "₹890",
        desc: "Wild line-caught sea bass poached softly in golden turmeric and coconut broth.",
        diet: "non-veg",
      },
      {
        name: "Wild mushroom nihari",
        price: "₹640",
        desc: "Slow-braised forest morels and button fungi in a rich caramelized onion gravy.",
        diet: "veg",
      },
      {
        name: "Tanne black dal",
        price: "₹420",
        desc: "Simmered for 36 hours over clay pit coals with cultured organic churned butter.",
        diet: "veg",
        image: dishImage,
      },
    ],
  },
  {
    title: "Desserts",
    subtitle: "Madhur / Sweet Closure",
    items: [
      {
        name: "Saffron cloud",
        price: "₹380",
        desc: "Featherweight whipped Kashmiri saffron mousse crowned with pistachios.",
        diet: "veg",
        image: cocktailImage,
      },
      {
        name: "Dark cacao garden",
        price: "₹420",
        desc: "70% Anaimalai dark chocolate ganache with edible moss and sea salt crisp.",
        diet: "veg",
      },
      {
        name: "Tender coconut brûlée",
        price: "₹360",
        desc: "Caramelized palm sugar crust atop silky tender coconut custard.",
        diet: "veg",
      },
      {
        name: "Gold leaf kulfi",
        price: "₹390",
        desc: "Dense stone-ground malai kulfi encased in 24-karat delicate gold leaf.",
        diet: "veg",
        image: loungeImage,
      },
    ],
  },
];

export default function MenuBookSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDish, setActiveDish] = useState<MenuItem | null>(null);

  return (
    <section
      id="menu"
      className="relative z-10 py-9 md:py- px-4 md:px-[max(1.25rem,calc((100vw-93.75rem)/2))] border-t border-[var(--line)] scroll-mt-20 overflow-hidden bg-[oklch(0.08_0_0)]"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54rem] h-[54rem] rounded-full blur-[160px] pointer-events-none -z-10 bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_16%,transparent)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16" data-reveal data-motion="blur">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            <span className="text-[var(--gold)] font-display text-xs tracking-[0.28em] uppercase font-semibold">
              Chapter 04 · Culinary Folio
            </span>
          </div>
          <h2 className="m-0 font-display font-bold text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.98] tracking-tight">
            A menu built <br />
            in <em className="text-[var(--gold)] font-serif italic not-italic">unfolding</em> chapters.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="/tanne-tasting-menu.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--line)] bg-[var(--glass-heavy)] backdrop-blur-xl text-white font-display text-xs uppercase tracking-widest hover:border-[var(--cyan)] hover:text-[var(--cyan)] transition-colors cursor-pointer"
          >
            <span>Download PDF</span>
            <span aria-hidden="true">↓</span>
          </motion.a>
        </div>
      </div>

      {/* 3D Book Stage */}
      <div
        className="relative w-full min-h-[44rem] flex items-center justify-center"
        style={{ perspective: "2400px" }}
      >
        {/* DESKTOP 3D TRI-FOLD REAL BOOK ENGINE */}
        <div className="hidden lg:flex relative items-center justify-center">
          
          {/* Floating Minimalist Top-Right Close Button */}
          <AnimatePresence>
            {isOpen && (
              <motion.button
                key="corner-close-btn"
                initial={{ opacity: 0, scale: 0.4, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.4, y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close folio"
                title="Fold menu"
                className="absolute -top-3.5 -right-3.5 z-50 w-7 h-7 rounded-full border border-[var(--gold)]/60 bg-[#150e09]/95 text-[var(--gold)] backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.65)] flex items-center justify-center text-xs font-light cursor-pointer hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-colors"
              >
                ✕
              </motion.button>
            )}
          </AnimatePresence>

          {/* LEFT PAGE (Hinged on Right Edge) */}
          <motion.div
            initial={false}
            animate={{
              rotateY: isOpen ? 0 : 180,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
            }}
            transition={{
              duration: 0.9,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
            }}
            className="w-[23rem] h-[36rem] rounded-l-2xl p-7 border-y border-l border-[var(--gold)]/35 bg-gradient-to-r from-[#110c07] to-[#1a120b] shadow-[-25px_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between select-none"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/20">
                <span className="font-mono text-xs text-[var(--cyan)]">01 //</span>
                <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)]">
                  {menuSections[0].subtitle}
                </span>
              </div>
              <h3 className="mt-4 mb-5 font-display font-medium text-2xl text-white uppercase tracking-wide">
                {menuSections[0].title}
              </h3>
              <div className="grid gap-3.5">
                {menuSections[0].items.map((item) => (
                  <DishRow key={item.name} item={item} onSelect={setActiveDish} />
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between text-[0.68rem] text-[var(--soft)] font-mono">
              <span>Chapter I</span>
              <span className="text-[var(--gold)]">Nilgiri Harvest</span>
            </div>
          </motion.div>

          {/* CENTER PAGE (Base Anchor & Cover) */}
          <motion.div
            animate={{
              scale: isOpen ? 1 : 0.95,
            }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-[24rem] h-[37rem] rounded-xl p-8 border border-[var(--gold)]/45 bg-[#140d07] shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col justify-between z-10"
          >
            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="closed-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setIsOpen(true)}
                  className="h-full flex flex-col justify-between items-center text-center cursor-pointer group"
                >
                  <div className="pt-4">
                    <span className="text-[var(--gold)] text-xs tracking-[0.3em] font-serif uppercase">
                      ∼ Coimbatore · Est. 2010 ∼
                    </span>
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent mx-auto mt-2" />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-2 border-[var(--gold)]/40 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-inner group-hover:border-[var(--gold)] group-hover:scale-105 transition-all duration-300">
                      <span className="text-3xl text-[var(--gold)] font-serif">T</span>
                    </div>
                    <h3 className="mt-6 text-3xl font-display font-bold text-white tracking-widest">
                      TANNE
                    </h3>
                    <p className="mt-1 text-[var(--gold)] font-display text-[0.72rem] tracking-[0.3em] uppercase">
                      Fine Dining Folio
                    </p>
                  </div>

                  <div className="pb-4">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] font-display text-xs tracking-widest uppercase transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:text-black">
                      <span>Click to Open Folio</span>
                      <span>→</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="open-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/20">
                      <span className="font-mono text-xs text-[var(--cyan)]">02 //</span>
                      <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)]">
                        {menuSections[1].subtitle}
                      </span>
                    </div>
                    <h3 className="mt-4 mb-5 font-display font-medium text-2xl text-white uppercase tracking-wide">
                      {menuSections[1].title}
                    </h3>
                    <div className="grid gap-3.5">
                      {menuSections[1].items.map((item) => (
                        <DishRow key={item.name} item={item} onSelect={setActiveDish} />
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex justify-between text-[0.68rem] text-[var(--soft)] font-mono">
                    <span>Chapter II</span>
                    <span className="text-[var(--gold)]">Fire & Hearth</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT PAGE (Hinged on Left Edge) */}
          <motion.div
            initial={false}
            animate={{
              rotateY: isOpen ? 0 : -180,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
            }}
            transition={{
              duration: 0.9,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
            }}
            className="w-[23rem] h-[36rem] rounded-r-2xl p-7 border-y border-r border-[var(--gold)]/35 bg-gradient-to-l from-[#110c07] to-[#1a120b] shadow-[25px_20px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between select-none"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/20">
                <span className="font-mono text-xs text-[var(--cyan)]">03 //</span>
                <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)]">
                  {menuSections[2].subtitle}
                </span>
              </div>
              <h3 className="mt-4 mb-5 font-display font-medium text-2xl text-white uppercase tracking-wide">
                {menuSections[2].title}
              </h3>
              <div className="grid gap-3.5">
                {menuSections[2].items.map((item) => (
                  <DishRow key={item.name} item={item} onSelect={setActiveDish} />
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between text-[0.68rem] text-[var(--soft)] font-mono">
              <span>Chapter III</span>
              <span className="text-[var(--gold)]">Sweet Closure</span>
            </div>
          </motion.div>

        </div>

        {/* MOBILE VIEW (Accordion List) */}
        <div className="lg:hidden w-full grid grid-cols-1 gap-6">
          {menuSections.map((section, idx) => (
            <div
              key={section.title}
              className="p-6 rounded-2xl border border-[var(--gold)]/30 bg-[#140d07] backdrop-blur-xl"
            >
              <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-4">
                <span className="font-mono text-xs text-[var(--cyan)]">0{idx + 1} //</span>
                <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)]">
                  {section.subtitle}
                </span>
              </div>
              <h3 className="text-xl font-display font-medium text-white mb-4 uppercase">{section.title}</h3>
              <div className="grid gap-3">
                {section.items.map((item) => (
                  <DishRow key={item.name} item={item} onSelect={setActiveDish} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DISH PHOTO PREVIEW MODAL */}
      <AnimatePresence>
        {activeDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={() => setActiveDish(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 15 }}
              transition={{
                type: "spring",
                damping: 26,
                stiffness: 300,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-[var(--gold)]/50 bg-[#150e09] p-6 shadow-2xl cursor-default"
            >
              {/* Dish Photo */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-4 border border-white/15 bg-black/50 shadow-inner">
                {activeDish.image && (
                  <Image
                    src={activeDish.image}
                    alt={activeDish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                )}
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[var(--gold)] font-display font-bold text-xs shadow-md">
                  {activeDish.price}
                </span>
              </div>

              {/* Dish Metadata */}
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeDish.diet === "veg" ? "bg-emerald-400" : "bg-rose-400"
                  }`}
                />
                <h4 className="m-0 font-display font-bold text-xl text-white">
                  {activeDish.name}
                </h4>
              </div>

              <p className="mt-2 text-xs text-[var(--soft)] font-light leading-relaxed">
                {activeDish.desc}
              </p>

              <button
                type="button"
                onClick={() => setActiveDish(null)}
                className="mt-6 w-full py-2.5 rounded-xl border border-[var(--line)] bg-[var(--glass-heavy)] text-white text-xs font-display tracking-widest uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DishRow({
  item,
  onSelect,
}: {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}) {
  return (
    <div
      onClick={() => item.image && onSelect(item)}
      className={`group/item flex flex-col p-2 rounded-lg transition-colors ${
        item.image ? "cursor-pointer hover:bg-white/[0.06]" : ""
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              item.diet === "veg" ? "bg-emerald-400" : "bg-rose-400"
            }`}
          />
          <span className="font-display font-medium text-xs text-[var(--ink)] group-hover/item:text-[var(--gold)] transition-colors">
            {item.name}
          </span>
          {item.image && (
            <span className="text-[0.62rem] px-1 py-0.2 rounded bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30 font-mono">
              Photo ✦
            </span>
          )}
        </div>
        <span className="font-display font-semibold text-xs text-[var(--gold)]">
          {item.price}
        </span>
      </div>
      <p className="mt-1 m-0 text-[0.72rem] text-[var(--soft)] font-light leading-relaxed line-clamp-1">
        {item.desc}
      </p>
    </div>
  );
}