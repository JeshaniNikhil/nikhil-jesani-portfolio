"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mail, ExternalLink, Code2, MapPin, Download, Send, ArrowRight, CheckCircle } from "lucide-react";

const links = [
  { icon: Mail,         label: "Email",    value: "nikhiljeshani9@gmail.com",       href: "mailto:nikhiljeshani9@gmail.com",        color: "#00f5ff" },
  { icon: ExternalLink, label: "LinkedIn", value: "linkedin.com/in/nikhil-jeshani/", href: "https://www.linkedin.com/in/nikhil-jeshani/", color: "#0a66c2" },
  { icon: Code2,        label: "GitHub",   value: "https://github.com/JeshaniNikhil/",      href: "https://github.com/JeshaniNikhil/",      color: "#e2e8f0" },
  { icon: MapPin,       label: "Location", value: "Rajkot, Gujarat, India",       href: "#",                                    color: "#10b981" },
];

const terminalLines = [
  { text: "$ nikhil --connect --mode secure",       cls: "text-green-400" },
  { text: "Initializing secure connection...",      cls: "text-slate-500" },
  { text: "✓ Connection established. Node: Rajkot", cls: "text-cyan-400"  },
  { text: "✓ AI Lab online. Ready to receive.",     cls: "text-slate-400" },
  { text: "",                                        cls: "" },
  { text: "$ _",                                     cls: "text-green-400" },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [lines, setLines] = useState(terminalLines);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLines([
      ...terminalLines.slice(0, -1),
      { text: `$ send --to nikhil --msg "${form.message.slice(0, 28)}..."`, cls: "text-green-400" },
      { text: "Encrypting payload...",             cls: "text-slate-500" },
      { text: "✓ Message delivered successfully!", cls: "text-cyan-400"  },
      { text: "Response ETA: < 24 hours.",          cls: "text-purple-400"},
      { text: "$ _",                                cls: "text-green-400" },
    ]);
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
      setLines(terminalLines);
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-section">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />

      <div className="section-container">
        <SectionHeading
          label="Contact"
          title="Let's Build Together"
          subtitle="Have an AI automation project? Let's create something extraordinary."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* ── LEFT: terminal + links ── */}
          <div className="flex flex-col gap-4">
            {/* Terminal */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-[11px] text-slate-500 font-mono ml-2">nikhil@ai-lab:~ — zsh</span>
              </div>
              <div className="p-4 font-mono text-xs space-y-1.5 min-h-[140px]">
                {lines.map((l, i) => (
                  <div key={i} className={l.cls}>{l.text || "\u00A0"}</div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              {links.map((lk) => (
                <a
                  key={lk.label}
                  href={lk.href}
                  target={lk.href.startsWith("http") ? "_blank" : undefined}
                  rel={lk.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 p-3.5 rounded-xl glass hover:bg-white/[0.06] transition-all duration-200 group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${lk.color}15`, border: `1px solid ${lk.color}30` }}
                  >
                    <lk.icon className="w-4 h-4" style={{ color: lk.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">{lk.label}</p>
                    <p className="text-xs text-slate-300 group-hover:text-cyan-400 transition-colors truncate">{lk.value}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </a>
              ))}

              {/* Resume */}
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-3 p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-cyan-500/15 border border-cyan-500/30">
                  <Download className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Resume</p>
                  <p className="text-xs text-cyan-400 font-medium">Download Resume (PDF)</p>
                </div>
              </a>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 flex flex-col gap-5">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
                <p className="text-xs text-slate-400">I&apos;ll respond within 24 hours.</p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.06] transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.06] transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.06] transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
              >
                {sent
                  ? <><CheckCircle className="w-4 h-4" /> Sent!</>
                  : <><Send className="w-4 h-4" /> Send Message</>
                }
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
