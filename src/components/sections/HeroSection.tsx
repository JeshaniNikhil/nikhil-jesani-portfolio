"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, ChevronDown, Cpu, Sparkles } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";

const NeuralNetworkBg = dynamic(
  () => import("@/components/three/NeuralNetworkBg").then((m) => ({ default: m.NeuralNetworkBg })),
  { ssr: false }
);

const titles = [
  "AI Automation Engineer",
  "Agentic AI Builder",
  "Workflow Architect",
  "Cybersecurity Enthusiast",
  "Laravel Developer",
  "AI Voice Agent Specialist",
  "Multi-Agent Systems Engineer",
];

const typingTexts = [
  "120+ AI Agents Built",
  "Multi-Agent Architect",
  "Workflow Automation Expert",
  "Cyber Security Explorer",
];

const stats = [
  { value: 120, suffix: "+",  label: "AI Agents" },
  { value: 10,  suffix: "K+", label: "Executions" },
  { value: 1,   suffix: "+",  label: "Yrs Exp." },
  { value: 24,  suffix: "/7", label: "AI Active" },
];

const techLogos = [
  { name: "n8n",         img: "/images/n8n.png" },
  { name: "Make",        img: "/images/make.png" },
  { name: "LangChain",   img: "/images/langchain.png" },
  { name: "LangGraph",   img: "/images/langgraph-color.png" },
  { name: "Docker",      img: "/images/docker.png" },
  { name: "Laravel",     img: "/images/laravel.png" },
  { name: "PHP",         img: "/images/php.png" },
  { name: "HubSpot",     img: "/images/hubspot.png" },
  { name: "VAPI",        img: "/images/vapi.png" },
  { name: "HuggingFace", img: "/images/hugging face.png" },
];

const integrations = ["Zapier","Slack","GHL","OpenAI","Claude","Gemini","Twilio","Supabase","Pinecone","Firebase"];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref   = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const dur = 1400, start = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - start) / dur, 1);
          setCount(Math.round((1 - (1 - p) ** 3) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-xl sm:text-2xl font-bold gradient-text leading-none">
      {count}{suffix}
    </div>
  );
}

export function HeroSection() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [typingText,   setTypingText]   = useState("");
  const [typingIdx,    setTypingIdx]    = useState(0);
  const [charIdx,      setCharIdx]      = useState(0);
  const [isDeleting,   setIsDeleting]   = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCurrentTitle((p) => (p + 1) % titles.length), 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const current = typingTexts[typingIdx];
    const speed = isDeleting ? 35 : 65;
    const t = setTimeout(() => {
      if (!isDeleting) {
        setTypingText(current.slice(0, charIdx + 1));
        setCharIdx((p) => p + 1);
        if (charIdx + 1 === current.length) setTimeout(() => setIsDeleting(true), 1800);
      } else {
        setTypingText(current.slice(0, charIdx - 1));
        setCharIdx((p) => p - 1);
        if (charIdx <= 1) {
          setIsDeleting(false);
          setTypingIdx((p) => (p + 1) % typingTexts.length);
          setCharIdx(0);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, isDeleting, typingIdx]);

  return (
    <section className="relative overflow-hidden">
      <NeuralNetworkBg />
      <div className="absolute inset-0 grid-pattern opacity-[0.18] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.05] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/[0.05] blur-[150px]" />
      </div>

      <div className="relative z-10 section-container pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT column ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 gap-5">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass self-center lg:self-start"
            >
              <span className="status-dot" />
              {/* <span className="text-xs text-slate-300 font-medium tracking-wide whitespace-nowrap">
                Available for AI Automation Projects
              </span> */}
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05]"
            >
              <span className="text-white">Nikhil</span>
              <br />
              <span className="gradient-text">Jesani</span>
            </motion.h1>

            {/* Rotating role */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="h-8 flex items-center justify-center lg:justify-start w-full"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitle}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{ y: -16,  opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm sm:text-base font-mono text-cyan-400 whitespace-nowrap"
                >
                  {"‹ "}{titles[currentTitle]}{" ›"}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              I build <span className="text-white font-semibold">Autonomous AI Systems</span> that work while humans sleep.
            </motion.p>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              className="h-7 flex items-center justify-center lg:justify-start w-full"
            >
              <span className="font-mono text-sm text-slate-500">
                ›&nbsp;<span className="text-purple-400">{typingText}</span>
                <span className="text-cyan-400 animate-pulse">|</span>
              </span>
            </motion.div>

            {/* ── CTA Buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-primary"
              >
                View Projects <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </button>
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost"
              >
                <Cpu className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>AI Journey</span>
              </button>
              <a href="/resume.pdf" download className="btn-ghost">
                <Download className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* ── Stats ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}
              className="grid grid-cols-4 gap-3 w-full"
            >
              {stats.map((s, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-tight truncate">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Profile photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 90 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 blur-3xl opacity-20 animate-pulse-glow" />
              {/* Rotating ring */}
              <div className="absolute inset-[-8px] rounded-full border border-dashed border-cyan-500/20 animate-rotate" />
              {/* Photo */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-cyan-500/10">
                <Image
                  src="/images/profile photo.jpeg"
                  alt="Nikhil Jesani — AI Automation Engineer"
                  fill
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating badges — anchored inside the photo wrapper */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                className="absolute top-4 right-0 translate-x-1/4 glass rounded-xl px-2.5 py-1 text-[10px] font-mono text-cyan-400 border border-cyan-500/25 shadow-lg whitespace-nowrap z-10"
              >
                🤖 AI Builder
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
                className="absolute bottom-4 left-0 -translate-x-1/4 glass rounded-xl px-2.5 py-1 text-[10px] font-mono text-purple-400 border border-purple-500/25 shadow-lg whitespace-nowrap z-10"
              >
                ⚡ 120+ Agents
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-4 right-8 w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg z-10"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Tech logos strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0 }}
          className="mt-16 pt-10 border-t border-white/[0.06]"
        >
          <p className="text-center text-[10px] text-slate-500 font-mono uppercase tracking-[0.18em] mb-6">
            Built with &amp; Integrated
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-5">
            {techLogos.map((logo) => (
              <motion.div
                key={logo.name}
                whileHover={{ scale: 1.12, y: -3 }}
                className="flex flex-col items-center gap-1.5 group cursor-default"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass p-2 flex items-center justify-center group-hover:border-cyan-500/25 transition-all duration-200">
                  <Image src={logo.img} alt={logo.name} width={32} height={32} className="object-contain w-full h-full" unoptimized />
                </div>
                <span className="text-[9px] text-slate-500 group-hover:text-slate-300 transition-colors">{logo.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {integrations.map((b) => (
              <span key={b} className="tech-pill">{b}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10"
      >
        <span className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown className="w-4 h-4 text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
