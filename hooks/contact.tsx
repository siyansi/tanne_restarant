"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Loader2, ArrowUpRight, Check } from "lucide-react";

interface ContactSectionProps {
  submitReservation?: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ContactSection({ submitReservation }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const date = formData.get("date") as string;
    const guests = formData.get("guests") as string;
    const occasion = formData.get("occasion") as string;

    // Simulate concierge dispatch delay
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsSubmitting(false);
    setIsSuccess(true);

    // Build curated WhatsApp reservation dispatch
    const text = encodeURIComponent(
      `Hello Tanne Fine Dining Concierge,\n\nI would like to request a table reservation:\n\n• Name: ${name}\n• Phone: ${phone}\n• Date: ${date}\n• Guests: ${guests}\n• Lounge/Occasion: ${occasion || "Dinner Service"}\n\nPlease confirm availability.`
    );

    setTimeout(() => {
      window.open(`https://wa.me/918489988007?text=${text}`, "_blank");
      setIsSuccess(false);
    }, 700);

    if (submitReservation) {
      submitReservation(e);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 py-9 px-5 md:px-[max(1.5rem,calc((100vw-90rem)/2))] bg-[#070503] text-[#eee7da] border-t border-white/10 scroll-mt-20 overflow-hidden select-none"
    >
      {/* Subtle Atmospheric Hearth Glow */}
      <div 
        className="absolute bottom-0 right-0 w-[42rem] h-[42rem] rounded-full blur-[180px] pointer-events-none -z-10 bg-[radial-gradient(circle,rgba(199,163,93,0.08)_0%,transparent_75%)]"
        aria-hidden="true" 
      />

      <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-start max-w-7xl mx-auto">
        
        {/* ===================================================
            LEFT COLUMN: Coordinates, Heritage & Real Map
        ==================================================== */}
        <div className="space-y-10">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-[var(--gold)] text-xs font-serif">∼</span>
              <span className="font-display text-[0.72rem] tracking-[0.3em] uppercase text-[var(--gold)] font-medium">
                Sanctuary Coordinates
              </span>
              <span className="text-[var(--gold)] text-xs font-serif">∼</span>
            </div>

            <h2 className="m-0 font-serif font-normal text-[clamp(2.4rem,4.8vw,4.2rem)] leading-[1.05] tracking-tight text-white">
              An unhurried arrival <br />
              <span className="italic text-[var(--gold)]">to table</span>.
            </h2>

            <p className="mt-5 text-white/70 text-sm md:text-base font-light max-w-md leading-relaxed">
              Nestled off the Avinashi corridor into private dining courtyards, reflective ponds, and quiet evening arbor.
            </p>
          </div>

          {/* Quick Concierge Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="tel:+918489988007"
              className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center gap-3.5 transition-colors duration-300 hover:border-[var(--gold)]/50 group"
            >
              <span className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[var(--gold)] transition-transform duration-300 group-hover:scale-105">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[0.68rem] text-white/40 font-mono uppercase tracking-wider block">Direct Concierge</span>
                <span className="text-sm font-serif text-white group-hover:text-[var(--gold)] transition-colors">+91 84899 88007</span>
              </div>
            </a>

            <a
              href="mailto:admin@tanne.in"
              className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center gap-3.5 transition-colors duration-300 hover:border-[var(--gold)]/50 group"
            >
              <span className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[var(--gold)] transition-transform duration-300 group-hover:scale-105">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[0.68rem] text-white/40 font-mono uppercase tracking-wider block">Reservations Desk</span>
                <span className="text-sm font-serif text-white group-hover:text-[var(--gold)] transition-colors">admin@tanne.in</span>
              </div>
            </a>
          </div>

          {/* REAL EMBEDDED GOOGLE MAP (DARK ARCHITECTURAL STYLING) */}
          <div className="rounded-3xl border border-white/10 bg-[#0d0905] p-3 shadow-2xl overflow-hidden group">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-[#15100a]">
              <iframe
                title="Tanne Fine Dining Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.6318625603716!2d77.0864!3d11.0664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8ff440a3692ab%3A0x6b453e9a7e80d4f2!2sAvinashi%20Rd%2C%20Arasur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale invert contrast-[1.18] brightness-[0.75] transition-all duration-700 group-hover:brightness-[0.88] group-hover:contrast-[1.1]"
              />
              <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-2xl" />
            </div>

            {/* Address Footer */}
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  Pirivu 5/171/B1, Avinashi – Coimbatore Rd, Arasur, TN 641407
                </address>
              </div>

              <a
                href="https://g.co/kgs/aYQzbSS"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--gold)] font-display uppercase tracking-widest text-[0.7rem] hover:text-white transition-colors"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ===================================================
            RIGHT COLUMN: Reservation Form (Transparent Action)
        ==================================================== */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-[#c7a35d]/30 bg-[#0c0805]/80 backdrop-blur-2xl p-8 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.85)] relative overflow-hidden"
          >
            {/* Subtle Top Accent Ribbon */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />

            <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/10">
              <div>
                <p className="m-0 font-serif text-2xl text-white">Table Request</p>
                <p className="m-0 text-[0.68rem] tracking-[0.2em] uppercase text-[var(--gold)] font-mono mt-1">
                  Private Lounges & Courtyard
                </p>
              </div>

              <span className="text-[0.68rem] tracking-widest font-mono text-white/40 uppercase">
                Dinner Service
              </span>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[0.68rem] uppercase tracking-widest text-white/50 font-mono block">
                    Full Name
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="E.g. Vikramaditya"
                    className="w-full h-12 px-4 rounded-xl border border-white/15 bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--gold)] focus:bg-white/[0.05]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[0.68rem] uppercase tracking-widest text-white/50 font-mono block">
                    Phone (WhatsApp)
                  </label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full h-12 px-4 rounded-xl border border-white/15 bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--gold)] focus:bg-white/[0.05]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[0.68rem] uppercase tracking-widest text-white/50 font-mono block">
                    Date of Visit
                  </label>
                  <input
                    name="date"
                    required
                    type="date"
                    className="w-full h-12 px-4 rounded-xl border border-white/15 bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--gold)] focus:bg-white/[0.05] [color-scheme:dark]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[0.68rem] uppercase tracking-widest text-white/50 font-mono block">
                    Guests Count
                  </label>
                  <input
                    name="guests"
                    required
                    type="number"
                    min="1"
                    max="30"
                    placeholder="2 to 24 guests"
                    className="w-full h-12 px-4 rounded-xl border border-white/15 bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--gold)] focus:bg-white/[0.05]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[0.68rem] uppercase tracking-widest text-white/50 font-mono block">
                  Lounge Preference / Special Notes
                </label>
                <input
                  name="occasion"
                  placeholder="Anniversary, Chef's Table, Family Lounge, Courtyard Canopy…"
                  className="w-full h-12 px-4 rounded-xl border border-white/15 bg-white/[0.03] text-white text-sm outline-none transition-all duration-300 focus:border-[var(--gold)] focus:bg-white/[0.05]"
                />
              </div>

              {/* TRANSPARENT ACTION BUTTON WITH SENDING / SPINNER / SUCCESS TRANSITION */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="group relative w-full mt-3 h-14 rounded-full border border-[var(--gold)] bg-transparent text-[var(--gold)] font-display text-xs md:text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:border-white hover:text-white cursor-pointer disabled:opacity-75 disabled:cursor-wait"
              >
                {/* Micro Border Highlight */}
                <span className="absolute inset-0 rounded-full border border-white/0 group-hover:border-white/10 transition-colors" />

                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <Loader2 className="w-4 h-4 animate-spin text-[var(--gold)]" />
                      <span>Connecting with Concierge…</span>
                    </motion.span>
                  ) : isSuccess ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 text-white"
                    >
                      <Check className="w-4 h-4 text-[var(--gold)]" />
                      <span>Opening WhatsApp Concierge</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative z-10 flex items-center justify-center gap-3"
                    >
                      <span>Request via WhatsApp</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <p className="m-0 text-center text-[0.68rem] text-white/40 font-mono tracking-wider">
                ✦ Unhurried Seating · Direct Confirmation via Resident Concierge
              </p>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}