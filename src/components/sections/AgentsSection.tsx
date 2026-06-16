"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Bot, Brain, Sparkles, UserCheck, Search, FileText, Calendar,
  Shield, Mic, BookOpen, Headphones, FlaskConical,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Agent {
  name: string;
  purpose: string;
  memory: string;
  tools: string[];
  integrations: string[];
  reasoning: string;
  icon: LucideIcon;
  color: string;
}

const agents: Agent[] = [
  { name: "Lead Generation",    purpose: "Discovers & qualifies potential leads autonomously",    memory: "Long-term prospect history",          tools: ["Web Scraping","Data Enrichment","CRM API"],   integrations: ["HubSpot","LinkedIn","n8n"],    reasoning: "Multi-step qualification",      icon: UserCheck,     color: "#00f5ff" },
  { name: "Sales Intelligence", purpose: "Real-time competitive insights & deal analysis",         memory: "Deal pipeline context",               tools: ["Market Research","Sentiment","Reporting"],    integrations: ["Salesforce","GPT-4","Slack"],  reasoning: "Strategic deal scoring",        icon: Search,        color: "#a855f7" },
  { name: "SEO Content Agent",  purpose: "Keyword research to auto-publishing pipeline",           memory: "Content calendar & history",          tools: ["Keyword Research","Content Gen","SEO"],       integrations: ["WordPress","Ahrefs","OpenAI"],  reasoning: "Content strategy optimiser",   icon: FileText,      color: "#10b981" },
  { name: "CRM Automation",     purpose: "Automates CRM data entry & pipeline management",         memory: "Full customer interaction history",   tools: ["Data Sync","Pipeline Mgmt","Email Parse"],    integrations: ["HubSpot","Gmail","n8n"],       reasoning: "Customer lifecycle analysis",   icon: Bot,           color: "#f97316" },
  { name: "Meeting Scheduler",  purpose: "Handles scheduling & meeting preparation",               memory: "Calendar context & preferences",      tools: ["Calendar API","Email Compose","Timezone"],    integrations: ["Google Cal","Zoom","Slack"],   reasoning: "Conflict resolution logic",     icon: Calendar,      color: "#ec4899" },
  { name: "Security Analyst",   purpose: "Monitors systems for threats & generates reports",       memory: "Threat pattern database",             tools: ["Log Analysis","Vuln Scan","Alert Triage"],    integrations: ["SIEM","Docker","Slack"],       reasoning: "Threat classification engine",  icon: Shield,        color: "#ef4444" },
  { name: "Voice Calling Agent",purpose: "AI-powered phone calls for businesses",                  memory: "Conversation context & scripts",       tools: ["Voice Synthesis","NLU","Call Recording"],     integrations: ["VAPI","Twilio","CRM"],         reasoning: "Dynamic conversation flow",     icon: Mic,           color: "#3b82f6" },
  { name: "Knowledge Assistant",purpose: "RAG-powered internal knowledge management",              memory: "Vector database of org knowledge",    tools: ["Doc Retrieval","Embedding","Summarization"],  integrations: ["Pinecone","OpenAI","Notion"],  reasoning: "Contextual retrieval chains",   icon: BookOpen,      color: "#06b6d4" },
  { name: "Support Agent",      purpose: "AI customer support with human escalation",              memory: "Ticket history & customer context",   tools: ["Ticket Mgmt","Knowledge Base","Escalation"],  integrations: ["Zendesk","Intercom","Slack"],  reasoning: "Issue classification & routing", icon: Headphones,   color: "#8b5cf6" },
  { name: "Research Agent",     purpose: "Deep research for market analysis & trend spotting",     memory: "Research archive & citations",        tools: ["Web Research","Data Analysis","Report Gen"],  integrations: ["Google","Claude","Notion"],    reasoning: "Multi-source synthesis",        icon: FlaskConical,  color: "#14b8a6" },
];

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group glass-card rounded-xl p-4 cursor-default relative overflow-hidden flex flex-col gap-3"
    >
      {/* Hover top accent */}
      <div
        className="absolute top-0 inset-x-0 h-0.5 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${agent.color}, transparent)` }}
      />

      {/* Subtle hover glow bg */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{ background: `radial-gradient(300px circle at 50% 0%, ${agent.color}08, transparent 70%)` }}
      />

        <div className="flex items-start gap-3 relative z-10 min-w-0">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            background: `${agent.color}18`,
            border: `1px solid ${agent.color}35`,
            boxShadow: hovered ? `0 0 14px ${agent.color}30` : "none",
          }}
        >
          <agent.icon className="w-4 h-4" style={{ color: agent.color }} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug mb-0.5 break-words">
            {agent.name}
          </h3>
          <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{agent.purpose}</p>
        </div>
      </div>

      {/* Memory + Reasoning — two key facts */}
      <div className="relative z-10 space-y-1.5">
        <div className="flex items-start gap-2">
          <Brain className="w-3 h-3 text-purple-400 flex-shrink-0 mt-0.5" />
          <span className="text-[10px] text-slate-500 leading-snug">{agent.memory}</span>
        </div>
        <div className="flex items-start gap-2">
          <Sparkles className="w-3 h-3 text-yellow-400 flex-shrink-0 mt-0.5" />
          <span className="text-[10px] text-slate-500 leading-snug">{agent.reasoning}</span>
        </div>
      </div>

      {/* Tool chips */}
      <div className="flex flex-wrap gap-1 relative z-10">
        {agent.tools.map((t) => (
          <span
            key={t}
            className="px-1.5 py-0.5 rounded text-[9px] font-medium"
            style={{ background: `${agent.color}12`, color: agent.color }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Integration chips */}
      <div className="flex flex-wrap gap-1 relative z-10">
        {agent.integrations.map((ig) => (
          <span key={ig} className="px-1.5 py-0.5 rounded text-[9px] glass text-slate-400">
            {ig}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-2 border-t border-white/5 flex items-center gap-1.5 relative z-10">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: agent.color, boxShadow: `0 0 5px ${agent.color}` }}
        />
        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Autonomous · Active</span>
      </div>
    </motion.div>
  );
}

export function AgentsSection() {
  return (
    <section id="agents" className="relative py-section">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />

      <div className="section-container">
        <SectionHeading
          label="Agentic AI Lab"
          title="Autonomous Agent Fleet"
          subtitle="10 specialised AI agents, each with persistent memory, reasoning, and full autonomy."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {agents.map((agent, i) => (
            <AgentCard key={agent.name} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
