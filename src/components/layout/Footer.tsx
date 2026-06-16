"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Heart, ArrowUp } from "lucide-react";

const quotes = [
  "Automate Everything Repetitive.",
  "Build Systems, Not Tasks.",
  "AI Is Not The Future. It Is The Present.",
  "Great Engineers Build Tools. Exceptional Engineers Build Autonomous Systems.",
];

export function Footer() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-8">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="section-container relative z-10">
        {/* Quote rotation */}
        <div className="text-center mb-12">
          <div className="h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl text-slate-400 italic max-w-2xl mx-auto"
              >
                &ldquo;{quotes[currentQuote]}&rdquo;
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Divider */}
        <div className="w-20 h-px bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-white">
              Nikhil<span className="text-cyan-400">.</span>Jesani
            </span>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400" /> and AI •{" "}
            {new Date().getFullYear()}
          </p>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors group"
          >
            <ArrowUp className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  );
}
