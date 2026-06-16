"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapPin, Calendar, Terminal, ShieldAlert, Cpu, Sparkles, Database } from "lucide-react";

const pillars = [
  {
    icon: Cpu,
    title: "Automation-First",
    desc: "Designing end-to-end pipelines that connect APIs, CRMs, and internal tools automatically.",
    color: "#00f5ff",
  },
  {
    icon: Sparkles,
    title: "Agentic AI",
    desc: "Multi-agent systems with stateful routing, memory layers, RAG pipelines, and vector databases.",
    color: "#a855f7",
  },
  {
    icon: ShieldAlert,
    title: "Secure-by-Design",
    desc: "Applying MCA cybersecurity concepts to webhooks, APIs, CRM integrations, and database schemas.",
    color: "#ec4899",
  },
  {
    icon: Database,
    title: "Full-Stack Laravel",
    desc: "Rapid API automation with robust Laravel / PHP backend architectures for production-grade speed.",
    color: "#10b981",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-section">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="About Me"
          title="The Developer & Architect"
          subtitle="Specializing in generative AI, workflow automation, and cybersecurity."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 max-w-5xl mx-auto items-start">

          {/* LEFT: Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-4 flex flex-col gap-5 min-w-0"
          >
            {/* Profile card */}
            <div className="glass rounded-2xl p-6 text-center min-w-0">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10 mx-auto mb-4 flex-shrink-0">
                <Image
                  src="/images/profile-photo.jpeg"
                  alt="Nikhil Jesani"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Nikhil Jesani</h3>
              {/* Job title — two lines with a line break so it never overflows */}
              <p className="text-[11px] text-cyan-400 font-mono mb-3 leading-snug break-words">
                AI Automation Engineer<br />
                &amp; Agentic AI Builder
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <MapPin className="w-3 h-3 text-pink-400 flex-shrink-0" />Rajkot, Gujarat
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <Calendar className="w-3 h-3 text-cyan-400 flex-shrink-0" />Available Now
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                I orchestrate digital transformation — linking LLMs with n8n, VAPI, HubSpot, and Laravel to build autonomous setups that save human hours and drive business growth.
              </p>
            </div>

            {/* Philosophy */}
            <div className="glass rounded-2xl p-5 border border-purple-500/15 bg-purple-500/5 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">Mission</span>
              </div>
              <p className="text-sm text-slate-300 italic leading-relaxed">
                &ldquo;The future belongs to those who automate repetitive tasks and focus on creating new value.&rdquo;
              </p>
              <p className="text-[10px] text-cyan-400 font-mono text-right mt-2">— Nikhil Jesani</p>
            </div>
          </motion.div>

          {/* RIGHT: Core pillars */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-5 flex flex-col gap-3 min-w-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${pillar.color}18`, border: `1px solid ${pillar.color}35` }}
                  >
                    <pillar.icon className="w-5 h-5" style={{ color: pillar.color }} />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">{pillar.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
