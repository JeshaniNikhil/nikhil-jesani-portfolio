"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  color: string;
  img?: string;
  emoji?: string;
}

const skills: Skill[] = [
  /* AI & LLMs */
  { name: "OpenAI GPT",   category: "AI & LLMs",       proficiency: 96, color: "#10a37f", emoji: "🧠" },
  { name: "Claude",       category: "AI & LLMs",       proficiency: 92, color: "#d4a574", emoji: "🤖" },
  { name: "Gemini",       category: "AI & LLMs",       proficiency: 84, color: "#4285f4", emoji: "✨" },
  { name: "LangChain",    category: "AI & LLMs",       proficiency: 91, color: "#10b981", img: "/images/langchain.png" },
  { name: "LangGraph",    category: "AI & LLMs",       proficiency: 87, color: "#00f5ff", img: "/images/langgraph-color.png" },
  { name: "RAG Pipelines",category: "AI & LLMs",       proficiency: 89, color: "#f59e0b", emoji: "🔍" },
  { name: "Prompt Eng.",  category: "AI & LLMs",       proficiency: 96, color: "#ec4899", emoji: "💬" },
  { name: "Vector DBs",   category: "AI & LLMs",       proficiency: 83, color: "#14b8a6", emoji: "📦" },
  { name: "HuggingFace",  category: "AI & LLMs",       proficiency: 78, color: "#f59e0b", img: "/images/hugging-face.png" },
  { name: "Fine-tuning",  category: "AI & LLMs",       proficiency: 75, color: "#a855f7", emoji: "⚙️" },
  /* Automation */
  { name: "n8n",          category: "Automation",      proficiency: 96, color: "#ea4b71", img: "/images/n8n.png" },
  { name: "Make.com",     category: "Automation",      proficiency: 89, color: "#6366f1", img: "/images/make.png" },
  { name: "Zapier",       category: "Automation",      proficiency: 82, color: "#ff4a00", emoji: "⚡" },
  { name: "Activepieces", category: "Automation",      proficiency: 80, color: "#7c3aed", emoji: "🧩" },
  { name: "Webhooks",     category: "Automation",      proficiency: 94, color: "#06b6d4", emoji: "🔗" },
  { name: "REST APIs",    category: "Automation",      proficiency: 96, color: "#3b82f6", emoji: "🌐" },
  /* AI Integrations */
  { name: "VAPI",         category: "AI Integrations", proficiency: 89, color: "#7c3aed", img: "/images/vapi.png" },
  { name: "HubSpot",      category: "AI Integrations", proficiency: 86, color: "#ff7a59", img: "/images/hubspot.png" },
  { name: "Slack",        category: "AI Integrations", proficiency: 84, color: "#4a154b", emoji: "💬" },
  { name: "Twilio",       category: "AI Integrations", proficiency: 82, color: "#f22f46", emoji: "📞" },
  { name: "GHL",          category: "AI Integrations", proficiency: 80, color: "#16a34a", emoji: "📊" },
  { name: "Supabase",     category: "AI Integrations", proficiency: 83, color: "#3ecf8e", emoji: "🛢" },
  { name: "Pinecone",     category: "AI Integrations", proficiency: 80, color: "#1c86f2", emoji: "🌲" },
  { name: "Firebase",     category: "AI Integrations", proficiency: 79, color: "#ffca28", emoji: "🔥" },
  /* Web Dev */
  { name: "Laravel",      category: "Web Development", proficiency: 93, color: "#ff2d20", img: "/images/laravel.png" },
  { name: "PHP",          category: "Web Development", proficiency: 91, color: "#777bb4", img: "/images/php.png" },
  { name: "React",        category: "Web Development", proficiency: 85, color: "#61dafb", emoji: "⚛️" },
  { name: "Next.js",      category: "Web Development", proficiency: 82, color: "#ffffff", emoji: "▲" },
  { name: "JavaScript",   category: "Web Development", proficiency: 87, color: "#f7df1e", emoji: "JS" },
  { name: "TypeScript",   category: "Web Development", proficiency: 80, color: "#3178c6", emoji: "TS" },
  { name: "CSS3",         category: "Web Development", proficiency: 88, color: "#1572b6", emoji: "🎨" },
  { name: "Tailwind CSS", category: "Web Development", proficiency: 90, color: "#06b6d4", emoji: "🌊" },
  { name: "MySQL",        category: "Web Development", proficiency: 85, color: "#4479a1", emoji: "🗄" },
  /* DevOps */
  { name: "Docker",       category: "DevOps & Tools",  proficiency: 81, color: "#2496ed", img: "/images/docker.png" },
  { name: "Python",       category: "DevOps & Tools",  proficiency: 88, color: "#3776ab", emoji: "🐍" },
  { name: "Git",          category: "DevOps & Tools",  proficiency: 90, color: "#f05032", emoji: "🌿" },
  { name: "Linux",        category: "DevOps & Tools",  proficiency: 80, color: "#fcc624", emoji: "🐧" },
  { name: "FastAPI",      category: "DevOps & Tools",  proficiency: 79, color: "#009688", emoji: "⚡" },
  { name: "Vercel",       category: "DevOps & Tools",  proficiency: 84, color: "#ffffff", emoji: "▲" },
  /* Cybersecurity */
  { name: "Ethical Hacking",    category: "Cybersecurity", proficiency: 78, color: "#ef4444", emoji: "🔓" },
  { name: "Pen Testing",        category: "Cybersecurity", proficiency: 75, color: "#dc2626", emoji: "🔐" },
  { name: "OWASP Top 10",       category: "Cybersecurity", proficiency: 82, color: "#b91c1c", emoji: "🛡" },
  { name: "Network Security",   category: "Cybersecurity", proficiency: 78, color: "#c026d3", emoji: "🌐" },
];

const categories = ["All", "AI & LLMs", "Automation", "AI Integrations", "Web Development", "DevOps & Tools", "Cybersecurity"];

const categoryColors: Record<string, string> = {
  "AI & LLMs":       "#10b981",
  "Automation":      "#a855f7",
  "AI Integrations": "#f97316",
  "Web Development": "#3b82f6",
  "DevOps & Tools":  "#06b6d4",
  "Cybersecurity":   "#ef4444",
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="group glass-card rounded-xl p-3 text-center cursor-default flex flex-col items-center gap-2"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110"
        style={{ background: `${skill.color}18`, border: `1px solid ${skill.color}35` }}
      >
        {skill.img ? (
          <Image src={skill.img} alt={skill.name} width={28} height={28} className="object-contain w-7 h-7" unoptimized />
        ) : (
          <span
            className="text-lg leading-none"
            style={{ color: /^[A-Z]{2}$/.test(skill.emoji ?? "") ? skill.color : undefined }}
          >
            {skill.emoji}
          </span>
        )}
      </div>

      <p className="text-[10px] sm:text-xs font-semibold text-slate-200 group-hover:text-white transition-colors leading-tight text-center w-full truncate px-1">
        {skill.name}
      </p>

      <div className="w-full h-1 rounded-full bg-white/6 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.02 + 0.25, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})` }}
        />
      </div>

      <span className="text-[9px] text-slate-500 font-mono leading-none">{skill.proficiency}%</span>
    </motion.div>
  );
}

import { AnimatePresence } from "framer-motion";

function AnimateExist({ filtered }: { filtered: Skill[] }) {
  return (
    <AnimatePresence mode="popLayout">
      {filtered.map((skill, i) => (
        <motion.div
          key={skill.name}
          layout
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.22 }}
        >
          <SkillCard skill={skill} index={i} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export function SkillsSection() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);
  const catColor = categoryColors[active] ?? "#00f5ff";

  return (
    <section id="skills" className="relative py-section">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/3 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Tech Arsenal"
          title="Skills & Technologies"
          subtitle="A comprehensive toolkit spanning AI, automation, web development, DevOps, and cybersecurity."
        />

        {/* Category pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = active === cat;
            const color = cat === "All" ? "#00f5ff" : categoryColors[cat];
            return (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                style={isActive ? {
                  background: `linear-gradient(135deg, ${color}22, ${color}15)`,
                  border: `1px solid ${color}50`,
                  color: color,
                  boxShadow: `0 0 16px ${color}18`,
                } : {
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#94a3b8",
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Count badge */}
        {active !== "All" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mb-6"
          >
            <span
              className="text-xs font-mono px-3 py-1 rounded-full border text-slate-400"
              style={{ borderColor: `${catColor}25`, background: `${catColor}08` }}
            >
              {filtered.length} skills in {active}
            </span>
          </motion.div>
        )}

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-2.5 max-w-6xl mx-auto"
        >
          <AnimateExist filtered={filtered} />
        </motion.div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto"
        >
          {categories.filter((c) => c !== "All").map((cat) => {
            const count = skills.filter((s) => s.category === cat).length;
            const color = categoryColors[cat];
            const avg = Math.round(skills.filter((s) => s.category === cat).reduce((a, s) => a + s.proficiency, 0) / count);
            return (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.04 }}
                className="glass-card rounded-xl p-3 text-center cursor-pointer"
                style={{ borderColor: active === cat ? `${color}35` : undefined }}
              >
                <div className="text-lg font-bold mb-0.5" style={{ color }}>{count}</div>
                <div className="text-[9px] text-slate-400 leading-tight font-medium">{cat}</div>
                <div className="text-[9px] text-slate-600 font-mono mt-0.5">avg {avg}%</div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
