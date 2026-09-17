"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CulinaryCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Exact coordinates without lag
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 850, damping: 45 });
  const springY = useSpring(mouseY, { stiffness: 850, damping: 45 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

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
      <motion.div
        animate={{
          scale: isClicked ? 0.88 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="relative -top-1 -left-1"
      >
        {isHovered ? (
          /* HOVER STATE: Classic Hand Pointer in Gold */
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
          >
            <path
              d="M8 13V4.5a1.5 1.5 0 0 1 3 0V11m0-3.5a1.5 1.5 0 0 1 3 0V11m0-2a1.5 1.5 0 0 1 3 0V12m0-1a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6H11a6 6 0 0 1-5.65-4L4 14.5a1.5 1.5 0 0 1 2.5-1.5L8 15"
              fill="var(--gold)"
              stroke="#0a0705"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          /* DEFAULT STATE: Standard Arrow Pointer in Gold */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
          >
            <path
              d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
              fill="var(--gold)"
              stroke="#0a0705"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}