/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Only register custom cursors on devices supporting pointer hovering (desktop/touchpads)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // Fade in cursor once elements have moved onto active viewport coordinates
      if (!isVisible && e.clientX > 0 && e.clientY > 0) {
        setIsVisible(true);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    // Detect if mouse is over interactive links, buttons or select cards
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest('[role="button"]') !== null ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") !== null;

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 w-6 h-6 rounded-full border-2 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      style={{
        x: mouseX,
        y: mouseY,
        willChange: "transform",
        backgroundColor: isHovered ? "color-mix(in srgb, var(--saffron) 20%, transparent)" : "transparent",
        borderColor: isHovered ? "var(--saffron)" : "color-mix(in srgb, var(--saffron) 80%, transparent)",
      }}
      animate={{
        scale: isClicked ? 0.75 : isHovered ? 1.4 : 1,
      }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    />
  );
};
