"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef    = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [visible,    setVisible]    = useState(false);
  const [hovering,   setHovering]   = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
      if (cursorDotRef.current)
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    document.addEventListener("mousemove", move, { passive: true });

    const els = document.querySelectorAll("a, button, [data-cursor-hover]");
    els.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      els.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [visible]);

  return (
    <>
      {/* Ring — hidden until first mouse move */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-cyan-400/50 pointer-events-none z-[9999] hidden lg:block"
        style={{
          willChange: "transform",
          opacity: visible ? 1 : 0,
          transform: "translate(-100px, -100px)", // start off-screen
          transition: "opacity 0.3s, scale 0.25s",
          scale: hovering ? "1.6" : "1",
        }}
      />
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] hidden lg:block"
        style={{
          willChange: "transform",
          opacity: visible && !hovering ? 1 : 0,
          transform: "translate(-100px, -100px)", // start off-screen
          transition: "opacity 0.15s",
        }}
      />
    </>
  );
}
