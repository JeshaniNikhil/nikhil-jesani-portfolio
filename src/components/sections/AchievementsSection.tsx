"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GraduationCap, Bot, Cpu, Trophy, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const items: {
  icon: LucideIcon;
  value: number;
  suffix: string;
  display: string;
  title: string;
  desc: string;
  color: string;
  animated: boolean;
}[] = [
  { icon: GraduationCap, value: 0,     suffix: "",   display: "1st",  title: "College Topper",       desc: "BCA with distinction",         color: "#3b82f6", animated: false },
  { icon: Bot,           value: 120,   suffix: "+",  display: "120+", title: "AI Agents Built",       desc: "Autonomous agents deployed",   color: "#00f5ff", animated: true  },
  { icon: Cpu,           value: 10000, suffix: "+",  display: "10K+", title: "Workflow Executions",   desc: "Automation runs processed",    color: "#a855f7", animated: true  },
  { icon: Trophy,        value: 0,     suffix: "",   display: "SIH",  title: "Smart India Hackathon", desc: "National hackathon finalist",  color: "#f97316", animated: false },
  { icon: Shield,        value: 0,     suffix: "",   display: "MCA",  title: "Cyber Security",        desc: "MCA specialisation ongoing",   color: "#10b981", animated: false },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [c, setC] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        const dur = 1600, s = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - s) / dur, 1);
          setC(Math.round((1 - (1 - p) ** 3) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.6 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return <div ref={ref} className="text-2xl sm:text-3xl font-bold gradient-text">{c}{suffix}</div>;
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-section">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/15 to-transparent" />

      <div className="section-container">
        <SectionHeading
          label="Achievements"
          title="Milestones & Recognition"
          subtitle="Key accomplishments marking the journey from student to AI automation engineer."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {items.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className={`glass-card rounded-2xl p-5 text-center cursor-default ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: `${a.color}15`, border: `1px solid ${a.color}30` }}
              >
                <a.icon className="w-5 h-5" style={{ color: a.color }} />
              </div>
              {a.animated
                ? <Counter target={a.value} suffix={a.suffix} />
                : <div className="text-2xl sm:text-3xl font-bold" style={{ color: a.color }}>{a.display}</div>
              }
              <h3 className="text-xs sm:text-sm font-semibold text-white mt-2 mb-1 leading-tight">{a.title}</h3>
              <p className="text-[10px] sm:text-xs text-slate-500 leading-tight">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
