"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* ─────────────────────────────────────────────
   DATA — all logos from CDN
───────────────────────────────────────────── */
interface Skill {
  name: string;
  logo: string;
  color: string;
}

interface SkillCategory {
  id: string;
  label: string;
  accent: string;
  emoji: string;
  skills: Skill[];
}

const categories: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    accent: "#f7df1e",
    emoji: "👨‍💻",
    skills: [
      { name: "Python",     color: "#3776ab", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", color: "#f7df1e", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", color: "#3178c6", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "PHP",        color: "#777bb4", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "HTML5",      color: "#e34f26", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3",       color: "#1572b6", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    accent: "#61dafb",
    emoji: "⚙️",
    skills: [
      { name: "React",    color: "#61dafb", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js",  color: "#ffffff", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Laravel",  color: "#ff2d20", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
      { name: "FastAPI",  color: "#009688", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Tailwind", color: "#06b6d4", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "LangChain",color: "#10b981", logo: "https://avatars.githubusercontent.com/u/126733545?s=64&v=4" },
    ],
  },
  {
    id: "ai",
    label: "AI & LLMs",
    accent: "#10b981",
    emoji: "🤖",
    skills: [
      { name: "OpenAI",      color: "#10a37f", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
      { name: "Claude",      color: "#d4a574", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/1200px-Claude_AI_logo.svg.png" },
      { name: "Gemini",      color: "#4285f4", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/2560px-Google_Gemini_logo.svg.png" },
      { name: "HuggingFace", color: "#f59e0b", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
      { name: "VAPI",        color: "#7c3aed", logo: "https://pbs.twimg.com/profile_images/1837246724817793025/YQRPE5hq_400x400.jpg" },
      { name: "LangGraph",   color: "#00f5ff", logo: "https://avatars.githubusercontent.com/u/126733545?s=64&v=4" },
    ],
  },
  {
    id: "automation",
    label: "Automation Tools",
    accent: "#ea4b71",
    emoji: "⚡",
    skills: [
      { name: "n8n",    color: "#ea4b71", logo: "https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png" },
      { name: "Make",   color: "#6366f1", logo: "https://www.make.com/en/help/image/uuid-b451c099-0eba-fe55-2a82-53b26dcf9c42.png" },
      { name: "Zapier", color: "#ff4a00", logo: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg" },
      { name: "Docker", color: "#2496ed", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Git",    color: "#f05032", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Linux",  color: "#fcc624", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    accent: "#3ecf8e",
    emoji: "🗄️",
    skills: [
      { name: "Supabase",   color: "#3ecf8e", logo: "https://cdn.worldvectorlogo.com/logos/supabase.svg" },
      { name: "MySQL",      color: "#4479a1", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", color: "#336791", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Firebase",   color: "#ffca28", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Pinecone",   color: "#1c86f2", logo: "https://avatars.githubusercontent.com/u/54333248?s=64&v=4" },
      { name: "MongoDB",    color: "#47a248", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    ],
  },
  {
    id: "security",
    label: "Cybersecurity",
    accent: "#ef4444",
    emoji: "🔐",
    skills: [
      { name: "Kali Linux",  color: "#367bf0", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg" },
      { name: "Wireshark",   color: "#1679a7", logo: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Wireshark_Icon.png" },
      { name: "Burp Suite",  color: "#ff6633", logo: "https://avatars.githubusercontent.com/u/13749115?s=64&v=4" },
      { name: "OWASP Top 10",color: "#a3b0c9", logo: "https://owasp.org/assets/images/logo.png" },
      { name: "Metasploit",  color: "#2596be", logo: "https://cdn.worldvectorlogo.com/logos/metasploit.svg" },
      { name: "Pen Testing", color: "#c026d3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    ],
  },
];

/* ─────────────────────────────────────────────
   SKILL CARD — clean, properly sized
───────────────────────────────────────────── */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [err, setErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.06 }}
      className="group flex flex-col items-center justify-center gap-3 p-4
        rounded-2xl border border-white/[0.08] bg-white/[0.03]
        hover:bg-white/[0.07] hover:border-white/[0.18]
        cursor-default transition-all duration-250 relative overflow-hidden"
      style={{
        boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}15, transparent 70%)` }}
      />

      {/* Logo */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center
          overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-115"
        style={{
          background: `${skill.color}14`,
          border: `1.5px solid ${skill.color}30`,
          boxShadow: `0 0 0 0 ${skill.color}00`,
        }}
      >
        {!err ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={skill.logo}
            alt={skill.name}
            className="w-7 h-7 object-contain"
            loading="lazy"
            onError={() => setErr(true)}
          />
        ) : (
          <span className="text-sm font-bold" style={{ color: skill.color }}>
            {skill.name.slice(0, 2)}
          </span>
        )}
      </div>

      {/* Name */}
      <span
        className="text-[11px] font-semibold text-center leading-tight text-slate-400
          group-hover:text-white transition-colors w-full px-1 break-words"
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY PANEL — header + 3-per-row grid
───────────────────────────────────────────── */
function CategoryPanel({ category, visible }: { category: SkillCategory; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Panel header */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border"
        style={{
          borderColor: `${category.accent}28`,
          background: `${category.accent}0a`,
        }}
      >
        <span className="text-xl leading-none flex-shrink-0">{category.emoji}</span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider leading-none" style={{ color: category.accent }}>
            {category.label}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{category.skills.length} technologies</p>
        </div>
        {/* accent dot */}
        <div
          className="ml-auto w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
          style={{ background: category.accent }}
        />
      </div>

      {/* 3-column grid — always 3 per row */}
      <div className="grid grid-cols-3 gap-3 flex-1">
        {category.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */
export function SkillsSection() {
  const [active, setActive] = useState("all");

  const visibleCategories = active === "all"
    ? categories
    : categories.filter((c) => c.id === active);

  return (
    <section id="skills" className="relative py-section overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.04] blur-[130px]" />
        <div className="absolute bottom-1/3 -right-20 w-[400px] h-[400px] rounded-full bg-purple-500/[0.04] blur-[130px]" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          label="Tech Arsenal"
          title="Skills & Technologies"
          subtitle="Organised by domain — languages, frameworks, AI tools, databases, and security."
        />

        {/* ── Filter tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <motion.button
            key="all"
            onClick={() => setActive("all")}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
            style={active === "all" ? {
              background: "linear-gradient(135deg,rgba(0,245,255,.15),rgba(0,245,255,.08))",
              border: "1px solid rgba(0,245,255,.4)", color: "#00f5ff",
              boxShadow: "0 0 16px rgba(0,245,255,.15)",
            } : {
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "#94a3b8",
            }}
          >
            ✦ All Skills
          </motion.button>

          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
              style={active === cat.id ? {
                background: `linear-gradient(135deg,${cat.accent}20,${cat.accent}0c)`,
                border: `1px solid ${cat.accent}45`, color: cat.accent,
                boxShadow: `0 0 16px ${cat.accent}18`,
              } : {
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "#94a3b8",
              }}
            >
              {cat.emoji} {cat.label}
            </motion.button>
          ))}
        </div>

        {/* ── Category grid — 2 panels per row ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {active === "all" ? (
              /* 2-column layout — pairs of categories side by side */
              <div className="flex flex-col gap-8">
                {Array.from({ length: Math.ceil(categories.length / 2) }).map((_, rowIdx) => {
                  const left  = categories[rowIdx * 2];
                  const right = categories[rowIdx * 2 + 1];
                  return (
                    <div key={rowIdx} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {left  && (
                        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
                          <CategoryPanel category={left} visible />
                        </div>
                      )}
                      {right && (
                        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6">
                          <CategoryPanel category={right} visible />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Single category — full width, still 3 per row */
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
                {visibleCategories.map((cat) => (
                  <CategoryPanel key={cat.id} category={cat} visible />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Summary stat cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-10 grid grid-cols-3 sm:grid-cols-6 gap-3"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              whileHover={{ scale: 1.05, y: -3 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center
                cursor-pointer hover:bg-white/[0.06] transition-all duration-250"
              style={active === cat.id ? { borderColor: `${cat.accent}40`, background: `${cat.accent}0d` } : {}}
            >
              <div className="text-xl mb-1.5">{cat.emoji}</div>
              <div className="text-xl font-bold" style={{ color: cat.accent }}>{cat.skills.length}</div>
              <div className="text-[9px] text-slate-500 font-medium leading-tight mt-1">{cat.label}</div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
