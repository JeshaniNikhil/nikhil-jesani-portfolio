"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldCheck, Award, Brain, Lock } from "lucide-react";

const certifications = [
  {
    title: "Certified Network Defender",
    org: "EC-Council",
    icon: ShieldCheck,
    color: "#00f0ff",
    desc: "Advanced network defense and security operations certification.",
  },
  {
    title: "CEH — Certified Ethical Hacker",
    org: "EC-Council",
    icon: Lock,
    color: "#ef4444",
    desc: "Ethical hacking and penetration testing methodologies.",
  },
  {
    title: "Microsoft Semantic Kernel",
    org: "Microsoft",
    icon: Brain,
    color: "#a855f7",
    desc: "AI orchestration and semantic AI integration with enterprise systems.",
  },
  {
    title: "Cyber Security",
    org: "Various",
    icon: Award,
    color: "#10b981",
    desc: "Multiple certifications in cybersecurity fundamentals and advanced practices.",
  },
];

export function CertificationsSection() {
  return (
    <section className="relative py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Certifications"
          title="Professional Credentials"
          subtitle="Industry-recognized certifications in cybersecurity, AI, and cloud technologies."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group glass-card rounded-xl p-5 text-center holo-card cursor-default"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}
              >
                <cert.icon className="w-6 h-6" style={{ color: cert.color }} />
              </div>
              <h3 className="text-xs font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors leading-snug">
                {cert.title}
              </h3>
              <p className="text-[10px] text-slate-500 mb-1.5 font-mono">{cert.org}</p>
              <p className="text-[10px] text-slate-400 leading-relaxed">{cert.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
