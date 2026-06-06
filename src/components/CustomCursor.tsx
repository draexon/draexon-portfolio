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
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Detect theme class on initialization
    const isLightMode = document.documentElement.classList.contains("light");
    setTheme(isLightMode ? "light" : "dark");

    // Observe theme class changes
    const observer = new MutationObserver(() => {
      const isLightNow = document.documentElement.classList.contains("light");
      setTheme(isLightNow ? "light" : "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Only register custom cursors on devices supporting pointer hovering (desktop/touchpads)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      observer.disconnect();
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
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const isLight = theme === "light";

  return (
    <motion.div
      className={`fixed top-0 left-0 w-6 h-6 rounded-full border-2 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 ${
        isLight ? "mix-blend-multiply" : "mix-blend-screen"
      }`}
      style={{
        x: mouseX,
        y: mouseY,
        willChange: "transform",
      }}
      animate={{
        scale: isClicked ? 0.75 : isHovered ? 1.4 : 1,
        backgroundColor: isHovered
          ? isLight
            ? "rgba(10, 10, 10, 0.15)"
            : "rgba(232, 88, 26, 0.2)"
          : isLight
            ? "rgba(10, 10, 10, 0)"
            : "rgba(232, 88, 26, 0)",
        borderColor: isHovered
          ? isLight
            ? "rgba(10, 10, 10, 1)"
            : "rgba(232, 88, 26, 1)"
          : isLight
            ? "rgba(10, 10, 10, 0.82)"
            : "rgba(232, 88, 26, 0.8)",
      }}
      transition={{ duration: 0.1, ease: "easeOut" }}
    />
  );
};
