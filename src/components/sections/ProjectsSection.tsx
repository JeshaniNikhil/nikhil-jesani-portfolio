"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  X, Mic, FileText, Shield, Train, ArrowRight, Zap,
  ChevronRight, ExternalLink, Lock, EyeOff, GitBranch,
  User, Briefcase, ArrowUpRight, Play,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
  images: string[];
  features: string[];
  problem: string;
  architecture: string;
  tools: string[];
  impact: string;
  nodes: { label: string; color: string }[];
  isNDA?: boolean;
  type: "personal" | "work";
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const personalProjects: Project[] = [
  {
    id: 1,
    title: "AI Security Checker",
    tagline: "AI-powered vulnerability assessment & security analysis",
    description:
      "A fully autonomous security monitoring platform that detects, classifies, and reports threats in real-time using AI-driven triage and LangChain agents.",
    icon: Shield,
    color: "#10b981",
    gradient: "from-emerald-400 to-green-600",
    liveUrl: "https://ai-powered-vulnerability-assement.vercel.app/",
    githubUrl: "https://github.com/JeshaniNikhil/ai-powered-vulnerability-assement.git",
    images: ["/images/security-tool-project-1.png", "/images/security-project-2.png"],
    features: ["Threat Detection", "Vulnerability Analysis", "AI Reporting", "Security Automation", "Live Dashboard"],
    problem: "Security teams are overwhelmed by alert fatigue and manual threat analysis processes.",
    architecture:
      "Autonomous security monitoring with AI-driven triage, real-time threat classification, and intelligent reporting dashboard. Built with LangChain + Supabase backend.",
    tools: ["Python", "LangChain", "OpenAI", "Supabase", "React", "Vercel"],
    impact: "90% reduction in alert triage time. Automated threat classification with real-time dashboards.",
    nodes: [
      { label: "Monitor",   color: "#10b981" },
      { label: "Detect",    color: "#ef4444" },
      { label: "Analyze",   color: "#a855f7" },
      { label: "Report",    color: "#3b82f6" },
      { label: "Dashboard", color: "#f97316" },
    ],
    type: "personal",
  },
  {
    id: 2,
    title: "IndusTrack — Train Traffic AI",
    tagline: "Smart India Hackathon — Intelligent scheduling & routing",
    description:
      "Hackathon-winning project replacing static train schedules with AI-powered real-time conflict detection, dynamic rerouting, and predictive scheduling.",
    icon: Train,
    color: "#f97316",
    gradient: "from-orange-400 to-red-600",
    liveUrl: "https://indus-track-ai-dashboard.vercel.app/",
    githubUrl: "https://github.com/JeshaniNikhil/indus-track-ai.git",
    images: ["/images/train-traffic-project-1.png", "/images/train-traffic-project-2.png"],
    features: ["Smart Scheduling", "Conflict Detection", "Dynamic Routing", "Live Track Map", "Alert System"],
    problem: "Traditional traffic control relies on static schedules, leading to delays and dangerous conflicts.",
    architecture:
      "AI-powered traffic management with real-time conflict detection, dynamic rerouting, predictive scheduling and live station dashboard.",
    tools: ["Python", "FastAPI", "React", "TensorFlow", "PostgreSQL", "Vercel"],
    impact: "40% reduction in scheduling conflicts. Real-time AI optimization with live track visualization.",
    nodes: [
      { label: "Input",    color: "#f97316" },
      { label: "Schedule", color: "#3b82f6" },
      { label: "Detect",   color: "#ef4444" },
      { label: "Route",    color: "#10b981" },
      { label: "Optimize", color: "#a855f7" },
    ],
    type: "personal",
  },
];

const workProjects: Project[] = [
  {
    id: 3,
    title: "AI Voice Agent",
    tagline: "Enterprise lead-conversion voice automation",
    description:
      "Enterprise-grade AI voice calling system that handles outbound lead qualification, real-time CRM sync, and automated follow-up workflows — built during a 1-year professional tenure.",
    icon: Mic,
    color: "#00f5ff",
    gradient: "from-cyan-400 to-blue-600",
    images: [],
    features: ["AI Voice Calling", "CRM Integration", "HubSpot Automation", "Lead Qualification", "Data Enrichment"],
    problem: "Businesses lose 60% of leads due to slow response times and manual follow-ups.",
    architecture:
      "AI-driven voice agent pipeline with real-time CRM sync, lead scoring engine, and automated qualification workflows using VAPI + n8n.",
    tools: ["n8n", "VAPI", "OpenAI", "HubSpot", "Twilio", "Python"],
    impact: "Reduced lead response time from hours to seconds. 3× improvement in conversion rates.",
    nodes: [
      { label: "Trigger",  color: "#00f5ff" },
      { label: "Voice AI", color: "#a855f7" },
      { label: "Qualify",  color: "#10b981" },
      { label: "CRM Sync", color: "#f97316" },
      { label: "Enrich",   color: "#ec4899" },
    ],
    isNDA: true,
    type: "work",
  },
  {
    id: 4,
    title: "SEO & Blog Automation",
    tagline: "End-to-end AI content pipeline",
    description:
      "Multi-agent pipeline that automates the entire content lifecycle — from keyword research to SEO-optimised publishing — built during a 1-year professional tenure.",
    icon: FileText,
    color: "#a855f7",
    gradient: "from-purple-400 to-pink-600",
    images: [],
    features: ["AI Content Generation", "Keyword Analysis", "Auto Publishing", "SEO Optimization", "Scheduling"],
    problem: "Content teams spend 80% of time on repetitive SEO tasks instead of creative strategy.",
    architecture:
      "Multi-agent content pipeline: keyword research → outline → write → SEO optimize → publish — fully automated via n8n.",
    tools: ["n8n", "OpenAI", "Claude", "WordPress API", "Ahrefs", "Python"],
    impact: "10× content output with consistent quality. Publishing time reduced from days to minutes.",
    nodes: [
      { label: "Keywords", color: "#a855f7" },
      { label: "Research", color: "#3b82f6" },
      { label: "Generate", color: "#00f5ff" },
      { label: "Optimize", color: "#10b981" },
      { label: "Publish",  color: "#f97316" },
    ],
    isNDA: true,
    type: "work",
  },
];

/* ─────────────────────────────────────────────
   WORKFLOW PIPELINE
───────────────────────────────────────────── */
function Pipeline({ nodes }: { nodes: Project["nodes"] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center">
          <span
            className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold border"
            style={{ borderColor: `${node.color}35`, color: node.color, background: `${node.color}12` }}
          >
            {node.label}
          </span>
          {i < nodes.length - 1 && (
            <ChevronRight className="w-3 h-3 mx-0.5 opacity-25 flex-shrink-0" style={{ color: node.color }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   IMAGE CAROUSEL
───────────────────────────────────────────── */
function ImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return null;
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-slate-900">
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
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-cyan-400 scale-125" : "bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-start justify-center py-8 px-4 overflow-y-auto"
        onClick={onClose}
      >
        <div className="fixed inset-0 bg-black/85 backdrop-blur-lg pointer-events-none" />

        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden border border-white/[0.1]
            bg-[#060618]/96 backdrop-blur-2xl my-auto"
        >
          <div className={`h-[3px] w-full bg-gradient-to-r ${project.gradient}`} />

          <div className="p-7 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-start gap-4 min-w-0">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient}
                flex items-center justify-center flex-shrink-0 shadow-xl`}>
                <project.icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full
                    text-[10px] font-semibold border flex-shrink-0 ${
                    project.type === "personal"
                      ? "bg-cyan-500/10 border-cyan-500/25 text-cyan-400"
                      : "bg-amber-500/10 border-amber-500/25 text-amber-400"
                  }`}>
                    {project.type === "personal"
                      ? <><User className="w-2.5 h-2.5" /> Personal Project</>
                      : <><Briefcase className="w-2.5 h-2.5" /> Work Project</>}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed break-words">{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center
                  justify-center hover:bg-white/[0.1] transition-colors flex-shrink-0 ml-2"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Big action buttons */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full
                    bg-gradient-to-r ${project.gradient}
                    text-white text-sm font-bold shadow-xl hover:opacity-90
                    transition-all hover:-translate-y-0.5 hover:shadow-2xl`}
                >
                  <Play className="w-4 h-4" /> Live Demo
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full
                    border border-white/20 bg-white/[0.06]
                    text-white text-sm font-bold hover:bg-white/[0.12] hover:border-white/30
                    transition-all hover:-translate-y-0.5"
                >
                  <GitBranch className="w-4 h-4" /> View on GitHub
                </a>
              )}
              {project.isNDA && (
                <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full
                  border border-slate-700 bg-white/[0.03] text-sm text-slate-500">
                  <Lock className="w-3.5 h-3.5" /> Source code is confidential
                </div>
              )}
            </div>

            {/* Screenshots */}
            {project.images.length > 0 && (
              <div>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">Preview</p>
                <ImageCarousel images={project.images} />
              </div>
            )}

            {/* Pipeline */}
            <div>
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">Workflow Pipeline</p>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                <Pipeline nodes={project.nodes} />
              </div>
            </div>

            {/* Problem + Architecture */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">Problem Solved</p>
                <p className="text-sm text-slate-300 leading-relaxed">{project.problem}</p>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <p className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-3">Architecture</p>
                <p className="text-sm text-slate-300 leading-relaxed">{project.architecture}</p>
              </div>
            </div>

            {/* Impact */}
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.07] p-5">
              <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">Business Impact</p>
              <p className="text-sm text-emerald-300 leading-relaxed flex items-start gap-2.5">
                <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" />{project.impact}
              </p>
            </div>

            {/* Features + Tools */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">Key Features</p>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <span key={f} className="px-3 py-1 rounded-lg text-xs border border-white/[0.08]
                      bg-white/[0.04] text-slate-300">{f}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg text-xs border border-purple-500/25
                      bg-purple-500/[0.08] text-purple-300 font-mono">{t}</span>
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

/* ─────────────────────────────────────────────
   PERSONAL PROJECT CARD
───────────────────────────────────────────── */
function PersonalCard({ project, delay, onOpen }: { project: Project; delay: number; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden border border-white/[0.08]
        bg-white/[0.025] backdrop-blur-xl flex flex-col min-w-0"
    >
      {/* Colour top strip */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${project.gradient}`} />

      {/* Screenshot */}
      {project.images.length > 0 && (
        <div className="relative w-full aspect-video overflow-hidden bg-slate-900/60 border-b border-white/[0.06]">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/70 via-transparent to-transparent" />
          {/* Live pill */}
          {project.liveUrl && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full
              bg-black/60 backdrop-blur-md border border-emerald-500/40 text-xs text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          )}
          {/* Personal badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full
            bg-black/60 backdrop-blur-md border border-cyan-500/30 text-xs text-cyan-400 font-mono">
            <User className="w-3 h-3" /> Personal
          </div>
        </div>
      )}

      {/* Body */}
      <div className="p-7 flex flex-col gap-5 flex-1 min-w-0">
        {/* Title */}
        <div className="flex items-start gap-4 min-w-0">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.gradient}
              flex items-center justify-center flex-shrink-0 shadow-lg`}
            style={{ boxShadow: `0 8px 24px ${project.color}30` }}
          >
            <project.icon className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="text-lg font-bold text-white leading-snug mb-1 group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 break-words leading-relaxed">{project.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-[1.75] break-words">{project.description}</p>

        {/* Pipeline */}
        <Pipeline nodes={project.nodes} />

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2">
          {project.features.slice(0, 4).map((f) => (
            <span key={f} className="px-2.5 py-1 rounded-lg text-xs border border-white/[0.08]
              bg-white/[0.04] text-slate-400 whitespace-nowrap">{f}</span>
          ))}
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md text-[11px] border border-purple-500/20
              bg-purple-500/[0.07] text-purple-300 font-mono whitespace-nowrap">{t}</span>
          ))}
        </div>

        {/* ── ACTION ROW ── */}
        <div className="mt-auto pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
          {/* Live Demo — primary button */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-gradient-to-r ${project.gradient}
                text-white text-sm font-bold shadow-lg
                hover:opacity-90 hover:-translate-y-0.5 transition-all whitespace-nowrap`}
            >
              <ExternalLink className="w-3.5 h-3.5" /> Live Demo
            </a>
          )}
          {/* GitHub */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-white/15 bg-white/[0.05]
                text-white text-sm font-bold
                hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-0.5
                transition-all whitespace-nowrap"
            >
              <GitBranch className="w-3.5 h-3.5" /> GitHub
            </a>
          )}
          {/* View Details */}
          <button
            onClick={onOpen}
            className="ml-auto inline-flex items-center gap-1.5 text-sm text-slate-400
              hover:text-white transition-colors whitespace-nowrap"
          >
            Details <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   WORK PROJECT CARD
───────────────────────────────────────────── */
function WorkCard({ project, delay, onOpen }: { project: Project; delay: number; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl overflow-hidden border border-white/[0.08]
        bg-white/[0.025] backdrop-blur-xl flex flex-col min-w-0 cursor-pointer"
      onClick={onOpen}
    >
      {/* Colour top strip */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${project.gradient}`} />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(500px circle at 50% 0%, ${project.color}06, transparent 70%)` }}
      />

      <div className="p-7 flex flex-col gap-5 min-w-0 relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 min-w-0">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient}
              flex items-center justify-center flex-shrink-0 shadow-xl`}
            style={{ boxShadow: `0 8px 28px ${project.color}25` }}
          >
            <project.icon className="w-7 h-7 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {project.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                text-[10px] font-semibold border border-amber-500/25 bg-amber-500/10 text-amber-400 flex-shrink-0">
                <Briefcase className="w-2.5 h-2.5" /> Work Project
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed break-words">{project.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-[1.75] break-words">{project.description}</p>

        {/* Pipeline */}
        <div>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2.5">Pipeline</p>
          <Pipeline nodes={project.nodes} />
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2">
          {project.features.slice(0, 4).map((f) => (
            <span key={f} className="px-2.5 py-1 rounded-lg text-xs border border-white/[0.08]
              bg-white/[0.04] text-slate-400 whitespace-nowrap">{f}</span>
          ))}
        </div>

        {/* Tools */}
        <div className="flex flex-wrap gap-1.5">
          {project.tools.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-md text-[11px] border border-white/[0.08]
              bg-white/[0.03] text-slate-500 font-mono whitespace-nowrap">{t}</span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Lock className="w-3 h-3" />
            <span>Confidential — architecture documented</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm text-cyan-400 font-medium
            group-hover:gap-2.5 transition-all">
            View Details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION DIVIDER
───────────────────────────────────────────── */
function SectionDivider({ icon: Icon, label, color }: {
  icon: LucideIcon; label: string; color: string;
}) {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}30)` }} />
      <div
        className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border flex-shrink-0"
        style={{ borderColor: `${color}30`, background: `${color}08` }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color }} />
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{label}</span>
      </div>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${color}30)` }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-section overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-purple-500/[0.05] blur-[140px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          label="Projects"
          title="Projects & Automations"
          subtitle="Personal builds and professional work — from hackathons to enterprise production systems."
        />

        {/* ── PERSONAL PROJECTS ── */}
        <SectionDivider icon={User} label="Personal Projects — Open Source" color="#00f5ff" />

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          {personalProjects.map((p, i) => (
            <PersonalCard key={p.id} project={p} delay={i * 0.12} onOpen={() => setSelected(p)} />
          ))}
        </div>

        {/* ── WORK PROJECTS ── */}
        <div className="mt-16">
          <SectionDivider icon={Briefcase} label="Professional Work — 1 Year Tenure" color="#f59e0b" />
          <p className="text-center text-sm text-slate-500 mt-4 mb-8">
            Built for real clients in a professional setting. Source code is confidential — click any card to see architecture & impact.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {workProjects.map((p, i) => (
              <WorkCard key={p.id} project={p} delay={i * 0.12} onOpen={() => setSelected(p)} />
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
