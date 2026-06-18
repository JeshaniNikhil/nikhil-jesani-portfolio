"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "#about",        label: "About" },
  { href: "#journey",      label: "Journey" },
  { href: "#projects",     label: "Projects" },
  { href: "#agents",       label: "AI Lab" },
  { href: "#skills",       label: "Skills" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact",      label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#030014]/80 backdrop-blur-2xl border-b border-white/[0.07] shadow-xl shadow-black/30"
            : "bg-[#030014]/20 backdrop-blur-md"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-[72px] gap-4">

            {/* ── Logo ── */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              {/* Monogram mark */}
              <div className="relative w-9 h-9 flex-shrink-0">
                {/* Glow behind */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
                {/* Card */}
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-[13px] font-black text-white tracking-tight leading-none">NJ</span>
                </div>
              </div>

              {/* Wordmark */}
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-bold text-white tracking-tight">Nikhil Jesani</span>
                <span className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase">AI Engineer</span>
              </div>
            </button>

            {/* ── Desktop nav links — centred inside the 1fr column ── */}
            <div className="hidden xl:flex items-center justify-center gap-6">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 rounded-xl bg-white/[0.07] border border-white/[0.1]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="navDot"
                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400"
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ── Right side: CTA + hamburger — always pinned right ── */}
            <div className="flex items-center justify-end gap-3">

              {/* Let's Connect button */}
              <motion.button
                onClick={() => scrollTo("#contact")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full
                  bg-gradient-to-r from-cyan-500 to-purple-600
                  text-white text-sm font-semibold
                  shadow-lg shadow-cyan-500/20
                  hover:shadow-cyan-500/40 hover:from-cyan-400 hover:to-purple-500
                  transition-all duration-300
                  border border-white/10
                  whitespace-nowrap"
              >
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse flex-shrink-0" />
                Let&apos;s Connect
                <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
              </motion.button>

              {/* Hamburger — visible below xl */}
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="xl:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                    exit={{ rotate: 90,    opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.18 }}
                  >
                    {open ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-slate-300" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0   }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#030014]/95 backdrop-blur-2xl"
              onClick={() => setOpen(false)}
            />

            {/* Menu panel */}
            <div className="relative flex flex-col items-center justify-center h-full gap-2 px-8">
              {/* Logo in menu */}
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <span className="text-[13px] font-black text-white">NJ</span>
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04]"
              >
                <X className="w-4 h-4 text-slate-300" />
              </button>

              {/* Nav links */}
              <div className="flex flex-col items-center gap-1 w-full max-w-xs">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => scrollTo(link.href)}
                    className={`w-full text-center px-6 py-3.5 rounded-xl text-lg font-semibold transition-all ${
                      active === link.href.replace("#", "")
                        ? "text-cyan-400 bg-white/[0.06] border border-white/[0.08]"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0  }}
                transition={{ delay: 0.5 }}
                onClick={() => scrollTo("#contact")}
                className="mt-6 flex items-center gap-2 px-8 py-3.5 rounded-full
                  bg-gradient-to-r from-cyan-500 to-purple-600
                  text-white text-base font-semibold
                  shadow-lg shadow-cyan-500/20"
              >
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                Let&apos;s Connect
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>

              {/* Bottom line */}
              <p className="absolute bottom-8 text-[11px] text-slate-600 font-mono">
                nikhiljesani.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
