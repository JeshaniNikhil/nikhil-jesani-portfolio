"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  MapPin, Terminal, ShieldAlert, Cpu, Sparkles,
  Database, CheckCircle2, Zap, Brain, Globe
} from "lucide-react";

const pillars = [
  {
    icon: Cpu,
    title: "Automation-First",
    desc: "Designing end-to-end pipelines that connect APIs, CRMs, and internal tools automatically — eliminating manual work at scale.",
    color: "#00f5ff",
    border: "rgba(0,245,255,0.18)",
    shadow: "rgba(0,245,255,0.08)",
  },
  {
    icon: Sparkles,
    title: "Agentic AI",
    desc: "Multi-agent systems with stateful routing, memory layers, RAG pipelines, and vector databases for intelligent autonomy.",
    color: "#a855f7",
    border: "rgba(168,85,247,0.18)",
    shadow: "rgba(168,85,247,0.08)",
  },
  {
    icon: ShieldAlert,
    title: "Secure-by-Design",
    desc: "Applying MCA cybersecurity principles to webhooks, APIs, CRM integrations, and database schemas from day one.",
    color: "#ec4899",
    border: "rgba(236,72,153,0.18)",
    shadow: "rgba(236,72,153,0.08)",
  },
  {
    icon: Database,
    title: "Full-Stack Laravel",
    desc: "Rapid API automation with robust Laravel & PHP backend architectures built for production-grade speed and reliability.",
    color: "#10b981",
    border: "rgba(16,185,129,0.18)",
    shadow: "rgba(16,185,129,0.08)",
  },
];

const highlights = [
  { icon: Zap,   text: "120+ AI Agents built & deployed" },
  { icon: Brain, text: "10K+ automated executions monthly" },
  { icon: Globe, text: "Laravel & n8n production expert"   },
  { icon: CheckCircle2, text: "Available for freelance & contracts" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function AboutSection() {
  return (
    <section id="about" className="relative py-section overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/[0.05] blur-[140px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          label="About Me"
          title="The Developer & Architect"
          subtitle="Specializing in generative AI, workflow automation, and cybersecurity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16 items-start">

          {/* ══════════════════════════════
              LEFT  —  Profile + Mission
          ══════════════════════════════ */}
          <motion.div {...fadeLeft(0)} className="lg:col-span-2 flex flex-col gap-6">

            {/* ── Profile card ── */}
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">

              {/* Rainbow top stripe */}
              <div className="h-[3px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

              {/* Card body */}
              <div className="p-8 flex flex-col gap-6">

                {/* Avatar + identity */}
                <div className="flex flex-col items-center text-center gap-3">
                  {/* Photo with double ring */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 opacity-40 blur-sm" />
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/10">
                      <Image
                        src="/images/profile-photo.jpeg"
                        alt="Nikhil Jesani"
                        fill
                        className="object-cover object-top"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                      Nikhil Jesani
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 leading-relaxed">
                      AI Automation Engineer &amp; Agentic AI Builder
                    </p>
                  </div>

                  {/* Status badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                      bg-white/[0.05] border border-white/[0.1]
                      text-xs text-slate-300 font-medium">
                      <MapPin className="w-3 h-3 text-pink-400 flex-shrink-0" />
                      Rajkot, Gujarat
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                      bg-emerald-500/10 border border-emerald-500/30
                      text-xs text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                      Available Now
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Bio */}
                <p className="text-sm text-slate-300 leading-[1.8] text-center">
                  I orchestrate digital transformation — linking LLMs with n8n, VAPI,
                  HubSpot, and Laravel to build autonomous setups that save human hours
                  and drive business growth.
                </p>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Highlights list */}
                <div className="flex flex-col gap-3">
                  {highlights.map(({ icon: Icon, text }, i) => (
                    <motion.div
                      key={text}
                      {...fadeUp(0.1 + i * 0.07)}
                      className="flex items-center gap-3 min-w-0"
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20
                        flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <span className="text-sm text-slate-300 leading-snug break-words min-w-0">
                        {text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Mission card ── */}
            <motion.div
              {...fadeUp(0.25)}
              className="relative rounded-3xl border border-purple-500/20
                bg-gradient-to-br from-purple-500/[0.08] to-purple-500/[0.02]
                backdrop-blur-xl overflow-hidden"
            >
              {/* Glow */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-purple-500/15 blur-2xl" />

              <div className="relative p-7 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/25
                    flex items-center justify-center flex-shrink-0">
                    <Terminal className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-[0.15em]">
                    Mission Statement
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-slate-300 italic leading-[1.85] pl-4
                  border-l-2 border-purple-500/40">
                  &ldquo;The future belongs to those who automate repetitive tasks
                  and focus on creating new value.&rdquo;
                </blockquote>

                <p className="text-xs text-cyan-400 font-mono text-right">
                  — Nikhil Jesani
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════
              RIGHT  —  Pillar cards
          ══════════════════════════════ */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                {...fadeRight(i * 0.12)}
                whileHover={{ x: 6, transition: { duration: 0.22, ease: "easeOut" } }}
                className="relative rounded-3xl overflow-hidden group"
                style={{
                  border: `1px solid ${pillar.border}`,
                  boxShadow: `0 4px 32px ${pillar.shadow}`,
                  background: "rgba(255,255,255,0.025)",
                }}
              >
                {/* Hover background fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(135deg, ${pillar.color}08 0%, transparent 60%)` }}
                />

                {/* Left accent bar */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-[3px] transition-opacity duration-300 opacity-50 group-hover:opacity-100"
                  style={{ background: `linear-gradient(180deg, transparent, ${pillar.color}, transparent)` }}
                />

                {/* Card content */}
                <div className="relative p-7 flex items-start gap-6">

                  {/* Icon box */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0
                      transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${pillar.color}12`,
                      border: `1px solid ${pillar.color}28`,
                      boxShadow: `0 0 20px ${pillar.color}10`,
                    }}
                  >
                    <pillar.icon className="w-7 h-7" style={{ color: pillar.color }} />
                  </div>

                  {/* Text block — min-w-0 is CRITICAL to prevent overflow */}
                  <div className="flex flex-col gap-2.5 min-w-0 flex-1 py-1">
                    <h4 className="text-[17px] font-bold text-white leading-tight tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-[1.8] break-words">
                      {pillar.desc}
                    </p>

                    {/* Colour tag */}
                    <span
                      className="self-start mt-1 text-[10px] font-mono font-semibold
                        px-2.5 py-1 rounded-full uppercase tracking-widest"
                      style={{
                        color: pillar.color,
                        background: `${pillar.color}12`,
                        border: `1px solid ${pillar.color}25`,
                      }}
                    >
                      Core Pillar
                    </span>
                  </div>
                </div>

                {/* Corner ambient glow */}
                <div
                  className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full blur-2xl
                    opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: pillar.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
