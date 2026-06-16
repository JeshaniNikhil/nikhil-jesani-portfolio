"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap, Code2, Cpu, Bot, Mic2, Trophy, Shield, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Milestone {
  year: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  isFuture?: boolean;
}

const milestones: Milestone[] = [
  { year: "2022",   title: "Started BCA",                icon: GraduationCap, color: "#3b82f6", desc: "Began computer science journey. Gained strong foundation in algorithms, data structures, and software engineering." },
  { year: "2024",   title: "Laravel Development",        icon: Code2,         color: "#06b6d4", desc: "Mastered full-stack development and built production-grade applications and secure APIs." },
  { year: "2025",   title: "AI Automation Engineering",  icon: Cpu,           color: "#8b5cf6", desc: "Transitioned to AI workflow automation using n8n, Activepieces, and LangChain." },
  { year: "2025",   title: "120+ AI Agents Deployed",    icon: Bot,           color: "#00f5ff", desc: "Built and integrated autonomous agents for lead qualification, CRM entry, and voice calls." },
  { year: "2025",   title: "Community Speaker",          icon: Mic2,          color: "#ec4899", desc: "Presented at Rajkot Tech Community on 'Advanced Security Practices for Laravel Applications'." },
  { year: "2025",   title: "Smart India Hackathon",      icon: Trophy,        color: "#f97316", desc: "Finalist with IndusTrack AI — building real-time scheduling & traffic control." },
  { year: "2025",   title: "MCA Cyber Security",         icon: Shield,        color: "#10b981", desc: "Pursuing advanced cybersecurity specialization, penetration testing, and secure design." },
  { year: "Future", title: "Enterprise Agentic Systems", icon: Rocket,        color: "#a855f7", desc: "Designing next-generation multi-agent systems to solve complex business problems.", isFuture: true },
];

/* Card component */
function TimelineCard({ node, i }: { node: Milestone; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      whileHover={{ y: -3 }}
      className="glass-card rounded-2xl p-5 w-full min-w-0 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap"
          style={{ color: node.color, background: `${node.color}15` }}
        >
          {node.year}
        </span>
        {node.isFuture && (
          <span className="text-[10px] text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded-full whitespace-nowrap">
            Goal
          </span>
        )}
      </div>
      <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 leading-snug">{node.title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{node.desc}</p>
    </motion.div>
  );
}

export function JourneySection() {
  return (
    <section id="journey" className="relative py-section">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="AI Journey"
          title="The Path to AI Mastery"
          subtitle="An interactive roadmap of key career and academic milestones."
        />

        {/* ── Desktop alternating timeline ── */}
        <div className="hidden lg:block relative mt-16">
          {/* Vertical centre line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-pink-500/40 pointer-events-none" />

          <div className="space-y-10 max-w-5xl mx-auto">
            {milestones.map((node, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className="grid grid-cols-[1fr_56px_1fr] items-center gap-0">
                  {/* LEFT slot */}
                  <div className={`pr-6 min-w-0 ${isLeft ? "block" : "invisible"}`}>
                    {isLeft && <TimelineCard node={node} i={i} />}
                  </div>

                  {/* Centre icon */}
                  <div className="flex items-center justify-center relative z-10">
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.06 }}
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#030014] border-2 flex-shrink-0"
                      style={{ borderColor: node.color, boxShadow: `0 0 18px ${node.color}30` }}
                    >
                      <node.icon className="w-5 h-5" style={{ color: node.color }} />
                    </motion.div>
                  </div>

                  {/* RIGHT slot */}
                  <div className={`pl-6 min-w-0 ${!isLeft ? "block" : "invisible"}`}>
                    {!isLeft && <TimelineCard node={node} i={i} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile vertical list ── */}
        <div className="lg:hidden relative max-w-2xl mx-auto mt-10">
          {/* Left vertical line */}
          <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-pink-500/40 pointer-events-none" />

          <div className="space-y-5">
            {milestones.map((node, i) => (
              <div key={i} className="flex items-start gap-4 min-w-0">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.05 }}
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-[#030014] border-2 relative z-10"
                  style={{ borderColor: node.color, boxShadow: `0 0 14px ${node.color}25` }}
                >
                  <node.icon className="w-4 h-4" style={{ color: node.color }} />
                </motion.div>

                {/* Card */}
                <div className="flex-1 min-w-0">
                  <TimelineCard node={node} i={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
