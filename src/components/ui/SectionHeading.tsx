"use client";

import { motion } from "framer-motion";

interface Props { label: string; title: string; subtitle?: string; }

export function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 md:mb-14"
    >
      {/* Label chip — centered via flex */}
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[10px] font-mono uppercase tracking-[0.14em] text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
          {label}
        </span>
      </div>

      {/* Title — block with text-center */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-center">
        <span className="gradient-text">{title}</span>
      </h2>

      {/* Subtitle — flex centering (most reliable method) */}
      {subtitle && (
        <div className="flex justify-center">
          <p className="text-sm md:text-base text-slate-400 leading-relaxed text-center max-w-lg">
            {subtitle}
          </p>
        </div>
      )}
    </motion.div>
  );
}
