"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  X, Mic, FileText, Shield, Train, ArrowRight, Zap,
  ChevronRight, ExternalLink, Lock, EyeOff,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Project {
  id: number;
  title: string;
  tagline: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  liveUrl?: string;
  images: string[];
  features: string[];
  problem: string;
  architecture: string;
  tools: string[];
  impact: string;
  nodes: { label: string; color: string }[];
  isNDA?: boolean;
}

const publicProjects: Project[] = [
  {
    id: 2,
    title: "AI Security Checker",
    tagline: "AI-powered vulnerability assessment & security analysis platform",
    icon: Shield,
    color: "#10b981",
    gradient: "from-green-500 to-emerald-600",
    liveUrl: "https://ai-powered-vulnerability-assement.vercel.app/",
    features: ["Threat Detection", "Vulnerability Analysis", "AI Reporting", "Security Automation", "Live Dashboard"],
    problem: "Security teams are overwhelmed by alert fatigue and manual threat analysis processes.",
    architecture: "Autonomous security monitoring with AI-driven triage, real-time threat classification, and intelligent reporting dashboard. Built with LangChain + Supabase backend.",
    tools: ["Python", "LangChain", "OpenAI", "Supabase", "React", "Vercel"],
    impact: "90% reduction in alert triage time. Automated threat classification with real-time dashboards.",
    images: ["/images/security tool project 1.png", "/images/security project 2.png"],
    nodes: [
      { label: "Monitor",   color: "#10b981" },
      { label: "Detect",    color: "#ef4444" },
      { label: "Analyze",   color: "#a855f7" },
      { label: "Report",    color: "#3b82f6" },
      { label: "Dashboard", color: "#f97316" },
    ],
  },
  {
    id: 3,
    title: "IndusTrack — Train Traffic AI",
    tagline: "Smart India Hackathon — Intelligent scheduling & real-time routing",
    icon: Train,
    color: "#f97316",
    gradient: "from-orange-500 to-red-600",
    liveUrl: "https://indus-track-ai-dashboard.vercel.app/",
    features: ["Smart Scheduling", "Conflict Detection", "Dynamic Routing", "Live Track Map", "Alert System"],
    problem: "Traditional traffic control relies on static schedules, leading to delays and dangerous conflicts.",
    architecture: "AI-powered traffic management with real-time conflict detection, dynamic rerouting, predictive scheduling and live station dashboard.",
    tools: ["Python", "FastAPI", "React", "TensorFlow", "PostgreSQL", "Vercel"],
    impact: "40% reduction in scheduling conflicts. Real-time AI optimization with live track visualization.",
    images: ["/images/train traffic project 1.png", "/images/train traffic project 2.png"],
    nodes: [
      { label: "Input",    color: "#f97316" },
      { label: "Schedule", color: "#3b82f6" },
      { label: "Detect",   color: "#ef4444" },
      { label: "Route",    color: "#10b981" },
      { label: "Optimize", color: "#a855f7" },
    ],
  },
];

const ndaProjects: Project[] = [
  {
    id: 1,
    title: "AI Voice Agent",
    tagline: "Enterprise lead-conversion voice automation (1-year tenure)",
    icon: Mic,
    color: "#00f5ff",
    gradient: "from-cyan-500 to-blue-600",
    features: ["AI Voice Calling", "CRM Integration", "HubSpot Automation", "Lead Qualification", "Data Enrichment"],
    problem: "Businesses lose 60% of leads due to slow response times and manual follow-ups.",
    architecture: "AI-driven voice agent pipeline with real-time CRM sync, lead scoring engine, and automated qualification workflows using VAPI + n8n.",
    tools: ["n8n", "VAPI", "OpenAI", "HubSpot", "Twilio", "Python"],
    impact: "Reduced lead response time from hours to seconds. 3× improvement in conversion rates.",
    images: [],
    nodes: [
      { label: "Trigger",  color: "#00f5ff" },
      { label: "Voice AI", color: "#a855f7" },
      { label: "Qualify",  color: "#10b981" },
      { label: "CRM Sync", color: "#f97316" },
      { label: "Enrich",   color: "#ec4899" },
    ],
    isNDA: true,
  },
  {
    id: 4,
    title: "SEO & Blog Automation",
    tagline: "End-to-end AI content pipeline (1-year professional tenure)",
    icon: FileText,
    color: "#a855f7",
    gradient: "from-purple-500 to-pink-600",
    features: ["AI Content Generation", "Keyword Analysis", "Auto Publishing", "SEO Optimization", "Scheduling"],
    problem: "Content teams spend 80% of time on repetitive SEO tasks instead of creative strategy.",
    architecture: "Multi-agent content pipeline: keyword research → outline → write → SEO optimize → publish — fully automated via n8n.",
    tools: ["n8n", "OpenAI", "Claude", "WordPress API", "Ahrefs", "Python"],
    impact: "10× content output with consistent quality. Publishing time reduced from days to minutes.",
    images: [],
    nodes: [
      { label: "Keywords", color: "#a855f7" },
      { label: "Research", color: "#3b82f6" },
      { label: "Generate", color: "#00f5ff" },
      { label: "Optimize", color: "#10b981" },
      { label: "Publish",  color: "#f97316" },
    ],
    isNDA: true,
  },
];

/* ── Workflow nodes ─────────────────────────────────────────────────── */
function WorkflowNodes({ nodes }: { nodes: Project["nodes"] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center">
          <span
            className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-mono font-semibold border whitespace-nowrap"
            style={{
              borderColor: `${node.color}40`,
              color: node.color,
              background: `${node.color}10`,
            }}
          >
            {node.label}
          </span>
          {i < nodes.length - 1 && (
            <ChevronRight className="w-2.5 h-2.5 mx-0.5 opacity-30 flex-shrink-0" style={{ color: node.color }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Image carousel ─────────────────────────────────────────────────── */
function ImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return null;
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/8">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image src={images[idx]} alt={`Screenshot ${idx + 1}`} fill className="object-cover" unoptimized />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-cyan-400 scale-125" : "bg-white/30"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Modal ──────────────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-start justify-center pt-16 pb-8 px-4 overflow-y-auto"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md pointer-events-none" />

        {/* Panel */}
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-2xl glass-strong rounded-2xl my-auto"
        >
          {/* Gradient top bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${project.gradient} rounded-t-2xl`} />

          <div className="p-5 md:p-7 space-y-5">
            {/* Header */}
            <div className="flex items-start gap-3 min-w-0">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <project.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
                  {project.isNDA && (
                    <span className="nda-badge flex-shrink-0"><Lock className="w-2.5 h-2.5" /> NDA</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{project.tagline}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-semibold whitespace-nowrap hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    <ExternalLink className="w-3 h-3" /> Live Demo
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* NDA notice */}
            {project.isNDA && (
              <div className="p-3.5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-start gap-3">
                <EyeOff className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-300/80 leading-relaxed">
                  Built during my professional tenure. Screenshots &amp; live demos are unavailable due to NDA. Architecture details below are generalised.
                </p>
              </div>
            )}

            {/* Screenshots */}
            {project.images.length > 0 && (
              <div>
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2">Preview</p>
                <ImageCarousel images={project.images} />
              </div>
            )}

            {/* Workflow */}
            <div>
              <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2">Workflow Architecture</p>
              <div className="glass rounded-xl p-3">
                <WorkflowNodes nodes={project.nodes} />
              </div>
            </div>

            {/* Problem + Architecture */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="glass rounded-xl p-4">
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2">Problem Solved</p>
                <p className="text-xs text-slate-300 leading-relaxed">{project.problem}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2">Architecture</p>
                <p className="text-xs text-slate-300 leading-relaxed">{project.architecture}</p>
              </div>
            </div>

            {/* Impact */}
            <div className="glass rounded-xl p-4 border border-green-500/15">
              <p className="text-[10px] font-mono text-green-400 uppercase tracking-wider mb-1.5">Business Impact</p>
              <p className="text-xs text-green-300 flex items-start gap-2">
                <Zap className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />{project.impact}
              </p>
            </div>

            {/* Features + Tools */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2">Key Features</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.features.map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-lg text-[10px] glass text-slate-300 whitespace-nowrap">{f}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-lg text-[10px] border border-purple-500/25 text-purple-300 bg-purple-500/8 whitespace-nowrap">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Public project card ─────────────────────────────────────────────── */
function PublicProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col min-w-0"
    >
      <div className={`h-0.5 w-full bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {project.images.length > 0 && (
        <div className="relative w-full aspect-video overflow-hidden bg-slate-900 border-b border-white/5">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/50 via-transparent to-transparent" />
          {project.liveUrl && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[10px] text-green-400 font-mono border border-green-500/20 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              Live
            </div>
          )}
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1 min-w-0">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center flex-shrink-0`}
            style={{ boxShadow: hovered ? `0 0 20px ${project.color}30` : undefined }}
          >
            <project.icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">{project.title}</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{project.tagline}</p>
          </div>
        </div>

        <WorkflowNodes nodes={project.nodes} />

        <div className="flex flex-wrap gap-1.5">
          {project.features.slice(0, 3).map((f) => (
            <span key={f} className="px-2 py-0.5 rounded-md text-[10px] glass text-slate-400 whitespace-nowrap">{f}</span>
          ))}
          {project.features.length > 3 && (
            <span className="text-[10px] text-slate-500 self-center">+{project.features.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="flex items-center gap-1 text-[11px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            View Details <ArrowRight className="w-3 h-3" />
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap"
            >
              <ExternalLink className="w-3 h-3" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── NDA project card ────────────────────────────────────────────────── */
function NDAProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      className="group glass-card rounded-2xl p-5 cursor-pointer relative overflow-hidden flex flex-col gap-4 min-w-0"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(400px circle at 50% 0%, ${project.color}06, transparent 70%)` }}
      />

      <div className="flex items-start gap-3 relative z-10 min-w-0">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center flex-shrink-0`}
          style={{ boxShadow: hovered ? `0 0 16px ${project.color}30` : undefined }}
        >
          <project.icon className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">{project.title}</h3>
            <span className="nda-badge flex-shrink-0"><Lock className="w-2.5 h-2.5" /> NDA</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">{project.tagline}</p>
        </div>
      </div>

      <div className="relative z-10">
        <WorkflowNodes nodes={project.nodes} />
      </div>

      <div className="relative z-10 rounded-xl border border-yellow-500/15 bg-yellow-500/5 p-3 flex items-start gap-2.5">
        <EyeOff className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <p className="text-[10px] text-yellow-300/70 leading-relaxed">
          Screenshots &amp; demos unavailable — NDA protected. Click to view architecture.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 relative z-10">
        {project.tools.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-md text-[10px] border border-white/8 text-slate-500 whitespace-nowrap">{t}</span>
        ))}
      </div>

      <div className="flex items-center gap-1 text-[11px] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity relative z-10 mt-auto whitespace-nowrap">
        View Architecture <ArrowRight className="w-3 h-3" />
      </div>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────────────────── */
export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-section">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Open Projects"
          title="Projects & Automations"
          subtitle="Personal and open-source projects with live demos you can explore right now."
        />

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-14">
          {publicProjects.map((p) => (
            <PublicProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
          ))}
        </div>

        {/* NDA divider */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            {/* Fixed: smaller text + padding so it never overflows */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass text-[10px] font-mono text-yellow-400 border border-yellow-500/20 whitespace-nowrap flex-shrink-0">
              <Lock className="w-3 h-3 flex-shrink-0" />
              Professional Work — NDA Protected
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <p className="text-center text-xs text-slate-500 mb-6 max-w-md mx-auto px-4">
            Built during my professional tenure. Visual assets are NDA-protected, but architecture is documented.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {ndaProjects.map((p, i) => (
              <NDAProjectCard key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
