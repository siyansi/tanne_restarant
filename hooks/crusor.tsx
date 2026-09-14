"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CulinaryCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    // Detect clickable elements dynamically
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest("a, button, [role='button'], input, select, textarea, .cursor-pointer, .menu-card")
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[999] select-none will-change-transform"
    >
      {/* 1. Ambient Trailing Glow Mesh */}
      <motion.div
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isHovered ? 0.45 : 0.25,
          backgroundColor: isHovered ? "var(--cyan)" : "var(--gold)",
        }}
        transition={{ duration: 0.25 }}
        className="absolute -top-6 -left-6 w-12 h-12 rounded-full blur-md"
      />

      {/* 2. Main Icon Morphing Stage */}
      <motion.div
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.25 : 1,
          rotate: isHovered ? -12 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative -top-3 -left-3 flex items-center justify-center"
      >
        {isHovered ? (
          /* STATE B: CHEF'S CAP (When hovering over links/buttons) */
          <div className="relative p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[var(--cyan)]/60 shadow-[0_0_18px_color-mix(in_oklab,var(--cyan)_45%,transparent)]">
            <svg
              className="w-5 h-5 text-[var(--cyan)] fill-current"
              viewBox="0 0 24 24"
            >
              {/* Chef Cap Silhouette */}
              <path d="M18.5 9.5C18.5 8.12 17.38 7 16 7c-.24 0-.46.04-.68.1C14.72 5.25 13 4 11 4 9 4 7.28 5.25 6.68 7.1c-.22-.06-.44-.1-.68-.1-1.38 0-2.5 1.12-2.5 2.5 0 1.08.7 2 1.68 2.34-.11.36-.18.74-.18 1.16v2h14v-2c0-.42-.07-.8-.18-1.16.98-.34 1.68-1.26 1.68-2.34zM7 17h10v2H7v-2z" />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-ping" />
          </div>
        ) : (
          /* STATE A: FORK & KNIFE (Default Cursor State) */
          <div className="relative p-1 rounded-full bg-black/45 backdrop-blur-sm border border-[var(--gold)]/40 shadow-[0_0_14px_color-mix(in_oklab,var(--gold)_30%,transparent)]">
            <svg
              className="w-5 h-5 text-[var(--gold)] stroke-current fill-none stroke-[1.75]"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Fork */}
              <path d="M18 2v6a3 3 0 0 1-3 3e-5V2" />
              <path d="M16.5 2v4" />
              <path d="M16.5 11v11" />
              {/* Knife */}
              <path d="M7 2v20" />
              <path d="M7 2a5 5 0 0 1 5 5v5H7" />
            </svg>
            {/* Precision Aim Dot */}
            <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[var(--gold)] border border-black shadow-[0_0_8px_var(--gold)]" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}