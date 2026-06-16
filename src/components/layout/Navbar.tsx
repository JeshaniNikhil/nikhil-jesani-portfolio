"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#projects", label: "Projects" },
  { href: "#agents", label: "AI Lab" },
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#030014]/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20" : ""
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-shadow">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold">
                <span className="text-white">Nikhil</span>
                <span className="text-cyan-400">.</span>
              </span>
            </button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active === id ? "text-cyan-400" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {active === id && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-white/5 rounded-lg"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollTo("#contact")}
                className="hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-semibold whitespace-nowrap hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:-translate-y-0.5"
              >
                <Zap className="w-3.5 h-3.5" />
                Let&apos;s Connect
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg glass"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#030014]/97 backdrop-blur-xl lg:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-5 py-20">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-xl font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                onClick={() => scrollTo("#contact")}
                className="mt-4 flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold"
              >
                <Zap className="w-4 h-4" />
                Let&apos;s Connect
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
