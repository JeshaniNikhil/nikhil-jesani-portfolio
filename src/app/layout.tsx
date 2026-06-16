import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Nikhil Jesani | AI Automation Engineer & Agentic AI Builder",
  description:
    "Portfolio of Nikhil Jesani — AI Automation Engineer, Agentic AI Builder, Multi-Agent Systems Architect, Cybersecurity Enthusiast, and Full-Stack Developer. Building autonomous AI systems that work while humans sleep.",
  keywords: [
    "AI Automation",
    "Agentic AI",
    "Multi-Agent Systems",
    "n8n",
    "LangChain",
    "LangGraph",
    "Cybersecurity",
    "Laravel",
    "Full-Stack Developer",
    "Nikhil Jesani",
  ],
  authors: [{ name: "Nikhil Jesani" }],
  openGraph: {
    title: "Nikhil Jesani | AI Automation Engineer",
    description:
      "Building autonomous AI systems that work while humans sleep.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#030014] text-slate-200 antialiased">
        <CustomCursor />
        <Navbar />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
