"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight, Bot, Shield, Workflow, Cpu, Sparkles } from "lucide-react";

const insights = [
  {
    title: "AI Automation Insights",
    desc: "Deep dives into building production-grade AI automation pipelines that scale.",
    icon: Bot,
    color: "#00f0ff",
    tags: ["n8n", "Automation", "AI"],
  },
  {
    title: "Agentic AI Architecture",
    desc: "Patterns and best practices for building autonomous multi-agent systems.",
    icon: Cpu,
    color: "#a855f7",
    tags: ["LangGraph", "Agents", "RAG"],
  },
  {
    title: "Cyber Security Perspectives",
    desc: "Exploring modern security challenges and AI-powered defense strategies.",
    icon: Shield,
    color: "#ef4444",
    tags: ["Security", "Ethics", "Defense"],
  },
  {
    title: "Workflow Engineering",
    desc: "The art and science of designing resilient, intelligent workflow systems.",
    icon: Workflow,
    color: "#10b981",
    tags: ["Workflows", "Integration", "DevOps"],
  },
  {
    title: "Future of Autonomous Systems",
    desc: "What comes next — from single agents to autonomous enterprise systems.",
    icon: Sparkles,
    color: "#f97316",
    tags: ["Future", "Enterprise", "Vision"],
  },
];

export function BlogSection() {
  return (
    <section className="relative py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Blog & Insights"
          title="Thoughts & Explorations"
          subtitle="Sharing knowledge about AI automation, agentic systems, and the future of autonomous technology."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group glass rounded-2xl p-5 hover:bg-white/[0.05] transition-all duration-500 cursor-pointer flex flex-col gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${insight.color}15`, border: `1px solid ${insight.color}33` }}
              >
                <insight.icon className="w-5 h-5" style={{ color: insight.color }} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-cyan-400 transition-colors leading-snug">
                  {insight.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{insight.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {insight.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium glass text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                Coming Soon <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
