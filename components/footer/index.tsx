"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import dishImage from "../../assets/tanne-dish.jpg";
import gardenImage from "../../assets/tanne-garden.jpg";
import heroImage from "../../assets/restaurant-interior.jpg";
import cocktailImage from "../../assets/tanne-hero.jpg";

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
    subtitle: "Pratham · First Servings",
    items: [
      {
        name: "Smoked paneer tikka",
        price: "₹460",
        desc: "Slow-roasted malai paneer infused with cardamom and mountain herb butter.",
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
        desc: "Hand-pounded Chettinad peppercorn lamb seared over fruitwood embers.",
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
    subtitle: "Mukhya · Fire & Hearth",
    items: [
      {
        name: "Charred forest chicken",
        price: "₹720",
        desc: "Country chicken dry-rubbed in black pepper, kaffir leaf, and smoked coals.",
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
        desc: "Slow-braised forest morels and button fungi in caramelized onion gravy.",
        diet: "veg",
      },
      {
        name: "Tanne black dal",
        price: "₹420",
        desc: "Simmered for 36 hours over clay pit coals with cultured churned butter.",
        diet: "veg",
        image: dishImage,
      },
    ],
  },
  {
    title: "Desserts",
    subtitle: "Madhur · Sweet Closure",
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
      },
    ],
  },
];

export default function MenuBookSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDish, setActiveDish] = useState<MenuItem | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState(0);

  return (
    <section
      id="menu"
      className="relative z-10 py-9 px-4 md:px-8 scroll-mt-20 overflow-hidden bg-[#070503] text-[#f5efe6] select-none"
    >
      {/* ===================================================
          BACKGROUND: SKEWED RECTANGLES ILLUSION (PRESERVED)
      ==================================================== */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden -z-20 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      >
        <div className="absolute -inset-[30%] -skew-y-12 flex justify-around opacity-40">
          <div className="w-[14vw] h-[180%] bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--gold)_12%,transparent)] to-transparent" />
          <div className="w-[18vw] h-[180%] bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
          <div className="w-[12vw] h-[180%] bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--cyan)_10%,transparent)] to-transparent" />
          <div className="w-[20vw] h-[180%] bg-gradient-to-b from-transparent via-[color-mix(in_oklab,var(--gold)_14%,transparent)] to-transparent" />
          <div className="w-[15vw] h-[180%] bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        </div>

        <div className="absolute inset-0 -skew-y-12 flex flex-col justify-around opacity-25">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent" />
        </div>
      </div>

      {/* Ambient Central Spotlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52rem] h-[52rem] rounded-full blur-[180px] pointer-events-none -z-10 bg-[radial-gradient(circle,rgba(215,186,114,0.12)_0%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* ===================================================
          CENTERED EDITORIAL HEADER
      ==================================================== */}
      <div className="flex flex-col items-center text-center max-w-6xl mx-auto mb-16">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
          <span className="text-[var(--gold)] font-display text-[0.72rem] tracking-[0.3em] uppercase font-medium">
            Culinary Folio · Evenings at Tanne
          </span>
          <span className="text-[var(--gold)] text-xs font-serif">∼</span>
        </div>

        <h2 className="m-0 font-serif font-normal text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[1.05] tracking-tight text-white">
          A Menu Built in <br />
          <em className="italic text-[var(--gold)] font-normal">Unfolding</em> Chapters
        </h2>

        <p className="mt-4 text-white/70 text-sm md:text-base font-light max-w-lg leading-relaxed">
          Open the leather folio below to reveal our slow-smoked heirloom recipes, seasonal harvest selections, and sweet closures.
        </p>

        {/* Delicate Border Capsule for Download Link */}
        <div className="mt-7">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="/tanne-tasting-menu.pdf"
            target="_blank"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-xs font-display tracking-[0.2em] uppercase text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-all shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          >
            <span>Download Tasting Folio (PDF)</span>
            <span aria-hidden="true">↓</span>
          </motion.a>
        </div>
      </div>

      {/* ===================================================
          3D TRI-FOLD BOOK STAGE (WHISPER-THIN GOLD BORDERS ON PC)
      ==================================================== */}
      <div
        className="relative w-full min-h-[42rem] flex items-center justify-center"
        style={{ perspective: "2600px" }}
      >
        {/* DESKTOP 3D FOLDING FOLIO */}
        <div className="hidden lg:flex relative items-center justify-center">
          
          {/* Close Floating Button */}
          <AnimatePresence>
            {isOpen && (
              <motion.button
                key="folio-close"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                whileHover={{ scale: 1.15, rotate: 90 }}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fold folio closed"
                className="absolute -top-5 -right-5 z-50 w-9 h-9 rounded-full border border-amber-700/20 bg-[#18110a]/95 backdrop-blur-xl text-[var(--gold)] shadow-[0_8px_30px_rgba(0,0,0,0.9)] flex items-center justify-center text-xs font-light cursor-pointer hover:bg-[var(--gold)] hover:text-black transition-colors"
              >
                ✕
              </motion.button>
            )}
          </AnimatePresence>

          {/* LEFT FOLIO LEAF (Hinged Right) */}
          <motion.div
            initial={false}
            animate={{
              rotateY: isOpen ? 0 : 180,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
            }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
            }}
            className="w-[22rem] h-[36rem] rounded-l-3xl p-8 border-y border-l border-amber-700/20 bg-gradient-to-r from-[#100b07]/95 via-[#140e09]/90 to-[#18120a]/80 backdrop-blur-2xl shadow-[-30px_25px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/15 text-center">
                <span className="font-mono text-xs text-[var(--gold)]/80">Chapter 01</span>
                <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)]">
                  {menuSections[0].subtitle}
                </span>
              </div>

              <h3 className="mt-3 mb-6 font-serif font-normal text-2xl text-white text-center">
                {menuSections[0].title}
              </h3>

              <div className="grid gap-2">
                {menuSections[0].items.map((item) => (
                  <DishRow key={item.name} item={item} onSelect={setActiveDish} />
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--gold)]/15 flex justify-between text-[0.68rem] text-white/40 font-mono">
              <span>Section I</span>
              <span className="text-[var(--gold)]">Nilgiri Harvest</span>
            </div>
          </motion.div>

          {/* CENTER FOLIO SPINE (Cover when closed, Mains when open) */}
          <motion.div
            animate={{ scale: isOpen ? 1 : 0.96 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-[24rem] h-[37rem] rounded-3xl p-9 border border-[var(--gold)]/25 bg-[#140e09]/95 backdrop-blur-3xl shadow-[0_35px_90px_rgba(0,0,0,0.98)] flex flex-col justify-between z-10"
          >
            <AnimatePresence mode="wait">
              {!isOpen ? (
                /* CLOSED COVER PRESENTATION */
                <motion.div
                  key="closed-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setIsOpen(true)}
                  className="h-full flex flex-col justify-between items-center text-center cursor-pointer group py-4"
                >
                  <div>
                    <span className="text-[var(--gold)] text-xs tracking-[0.3em] font-serif uppercase">
                      ∼ Coimbatore · Est. 2010 ∼
                    </span>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent mx-auto mt-2.5" />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border border-amber-700/20 flex items-center justify-center bg-white/[0.04] backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] group-hover:scale-105 group-hover:border-[var(--gold)]/50 transition-all duration-300">
                      <span className="text-3xl text-[var(--gold)] font-serif">T</span>
                    </div>
                    
                    <h3 className="mt-6 text-3xl font-serif text-white tracking-[0.2em] font-normal">
                      TANNE
                    </h3>
                    
                    <p className="mt-1 text-[var(--gold)] font-display text-[0.72rem] tracking-[0.3em] uppercase">
                      Living Garden Folio
                    </p>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[var(--gold)]/35 bg-[var(--gold)]/10 text-[var(--gold)] font-display text-xs tracking-widest uppercase transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:text-black shadow-[0_8px_25px_rgba(0,0,0,0.6)]">
                      <span>Unfold Tasting Folio</span>
                      <span>→</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* OPEN CENTER PAGE: MAINS */
                <motion.div
                  key="open-mains"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-amber-700/20 text-center">
                      <span className="font-mono text-xs text-[var(--gold)]/80">Chapter 02</span>
                      <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)]">
                        {menuSections[1].subtitle}
                      </span>
                    </div>

                    <h3 className="mt-3 mb-6 font-serif font-normal text-2xl text-white text-center">
                      {menuSections[1].title}
                    </h3>

                    <div className="grid gap-2">
                      {menuSections[1].items.map((item) => (
                        <DishRow key={item.name} item={item} onSelect={setActiveDish} />
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--gold)]/15 flex justify-between text-[0.68rem] text-white/40 font-mono">
                    <span>Section II</span>
                    <span className="text-[var(--gold)]">Fire & Hearth</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT FOLIO LEAF (Hinged Left) */}
          <motion.div
            initial={false}
            animate={{
              rotateY: isOpen ? 0 : -180,
              opacity: isOpen ? 1 : 0,
              pointerEvents: isOpen ? "auto" : "none",
            }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
            }}
            className="w-[22rem] h-[36rem] rounded-r-3xl p-8 border-y border-r border-[var(--gold)]/20 bg-gradient-to-l from-[#100b07]/95 via-[#140e09]/90 to-[#18120a]/80 backdrop-blur-2xl shadow-[30px_25px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--gold)]/15 text-center">
                <span className="font-mono text-xs text-[var(--gold)]/80">Chapter 03</span>
                <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)]">
                  {menuSections[2].subtitle}
                </span>
              </div>

              <h3 className="mt-3 mb-6 font-serif font-normal text-2xl text-white text-center">
                {menuSections[2].title}
              </h3>

              <div className="grid gap-2">
                {menuSections[2].items.map((item) => (
                  <DishRow key={item.name} item={item} onSelect={setActiveDish} />
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-amber-700/20 flex justify-between text-[0.68rem] text-white/40 font-mono">
              <span>Section III</span>
              <span className="text-[var(--gold)]">Sweet Closure</span>
            </div>
          </motion.div>

        </div>

        {/* ===================================================
            MOBILE VIEW: INTERACTIVE SWIPEABLE TABS (PRESERVED)
        ==================================================== */}
        <div className="lg:hidden w-full max-w-md mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between p-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            {menuSections.map((section, idx) => {
              const isCurrent = activeMobileTab === idx;
              return (
                <button
                  key={section.title}
                  type="button"
                  onClick={() => setActiveMobileTab(idx)}
                  className={`relative flex-1 py-2.5 rounded-full text-xs font-display tracking-widest uppercase transition-colors duration-300 cursor-pointer ${
                    isCurrent ? "text-black font-semibold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isCurrent && (
                    <motion.div
                      layoutId="activeMenuTab"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[var(--gold)] shadow-[0_4px_16px_rgba(199,163,93,0.35)]"
                    />
                  )}
                  <span className="relative z-10">0{idx + 1}</span>
                </button>
              );
            })}
          </div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMobileTab}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 rounded-3xl border border-amber-700/20 bg-[#140e09]/95 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
              >
                <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-3">
                  <span className="font-mono text-xs text-[var(--gold)]/80">
                    Chapter 0{activeMobileTab + 1}
                  </span>
                  <span className="text-[0.68rem] font-display uppercase tracking-widest text-[var(--gold)]">
                    {menuSections[activeMobileTab].subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-white mb-5 text-center">
                  {menuSections[activeMobileTab].title}
                </h3>

                <div className="grid gap-2">
                  {menuSections[activeMobileTab].items.map((item) => (
                    <DishRow key={item.name} item={item} onSelect={setActiveDish} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ===================================================
          DISH PHOTO PREVIEW MODAL
      ==================================================== */}
      <AnimatePresence>
        {activeDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveDish(null)}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-[var(--gold)]/35 bg-[#160f0a]/95 backdrop-blur-3xl p-6 shadow-[0_30px_90px_rgba(0,0,0,0.98)] cursor-default"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 bg-black/40 border border-white/10 shadow-inner">
                {activeDish.image && (
                  <Image
                    src={activeDish.image}
                    alt={activeDish.name}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                )}
                <span className="absolute top-3 right-3 px-3.5 py-1.5 rounded-full border border-[var(--gold)]/30 bg-black/75 backdrop-blur-xl text-[var(--gold)] font-serif text-sm font-semibold shadow-lg">
                  {activeDish.price}
                </span>
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeDish.diet === "veg" ? "bg-emerald-400" : "bg-rose-400"
                  }`}
                />
                <h4 className="m-0 font-serif text-xl text-white">
                  {activeDish.name}
                </h4>
              </div>

              <p className="mt-2 text-xs text-white/70 font-light leading-relaxed">
                {activeDish.desc}
              </p>

              <button
                type="button"
                onClick={() => setActiveDish(null)}
                className="mt-6 w-full py-3 rounded-full border border-[var(--gold)]/30 bg-white/[0.04] text-white hover:bg-[var(--gold)] hover:text-black text-xs font-display tracking-widest uppercase transition-colors cursor-pointer shadow-md"
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
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => item.image && onSelect(item)}
      className={`group/item flex flex-col p-3 rounded-2xl transition-all duration-300 ${
        item.image
          ? "cursor-pointer hover:bg-white/[0.04] hover:border-white/5"
          : "cursor-default"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              item.diet === "veg" ? "bg-emerald-400" : "bg-rose-400"
            }`}
          />
          <span className="font-serif text-sm text-white group-hover/item:text-[var(--gold)] transition-colors">
            {item.name}
          </span>
          {item.image && (
            <span className="text-[0.6rem] px-1.5 py-0.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/15 text-[var(--gold)] font-mono">
              ✦
            </span>
          )}
        </div>
        <span className="font-serif text-xs text-[var(--gold)] font-medium">
          {item.price}
        </span>
      </div>
      <p className="mt-1.5 m-0 text-[0.72rem] text-white/60 font-light leading-relaxed line-clamp-1">
        {item.desc}
      </p>
    </motion.div>
  );
}