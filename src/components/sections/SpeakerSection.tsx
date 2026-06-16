"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mic2, MapPin, Shield, Users, Calendar } from "lucide-react";

const meta = [
  { icon: MapPin,   text: "Rajkot, Gujarat",   color: "#00f5ff" },
  { icon: Shield,   text: "Security & Laravel", color: "#10b981" },
  { icon: Users,    text: "Tech Community",     color: "#a855f7" },
  { icon: Calendar, text: "2025",               color: "#ec4899" },
];

export function SpeakerSection() {
  return (
    <section id="speaker" className="relative py-section">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />

      <div className="section-container relative z-10">
        <SectionHeading
          label="Community"
          title="Speaker & Community Impact"
          subtitle="Sharing knowledge and inspiring the next generation of developers and security professionals."
        />

        {/* Card — centered using flex on its parent */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg"
          >
            <div className="glass rounded-2xl p-8 relative overflow-hidden text-center">
              {/* Stage light blobs */}
              <div className="absolute top-0 left-1/4 w-28 h-40 bg-gradient-to-b from-purple-500/12 to-transparent blur-2xl pointer-events-none" />
              <div className="absolute top-0 right-1/4 w-28 h-40 bg-gradient-to-b from-cyan-500/12 to-transparent blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center gap-5">
                {/* Mic icon — centered inside the card */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25"
                >
                  <Mic2 className="w-8 h-8 text-white" />
                </motion.div>

                {/* Invited Speaker badge */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[10px] font-mono text-pink-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400 flex-shrink-0" />
                  Invited Speaker
                </span>

                {/* Event details */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Rajkot Tech Community</h3>
                  <p className="text-base text-slate-300 leading-relaxed max-w-xs mx-auto">
                    &ldquo;Advanced Security Practices for Laravel Applications&rdquo;
                  </p>
                </div>

                {/* Meta tags */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  {meta.map((m) => (
                    <span key={m.text} className="flex items-center gap-1.5 text-xs text-slate-400 whitespace-nowrap">
                      <m.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: m.color }} />
                      {m.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
