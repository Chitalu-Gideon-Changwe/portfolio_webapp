"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const sections = [
  { text: "Knock Knock.", color: "zambia-green" },
  { text: "Who's there?", color: "zambia-red" },
  { text: "An: A Fool.", color: "zambia-orange" },
  { text: "A fool who?", color: "zambia-copper" },
  { text: "A Fullstack Developer.", color: "zambia-green" },
  { text: "Chitalu Gideon Changwe", color: "zambia-red" },
  { text: "Senior Fullstack Engineer", color: "zambia-orange" },
  {
    text: "I build scalable systems & clean user experiences.",
    color: "zambia-copper",
  },
];

export default function Home() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden bg-white relative">
      {/* ===== Background Orbs & Parallax Lines ===== */}
      <Background />

      {/* ===== Sections ===== */}
      {sections.map((section, index) => (
        <Section
          key={index}
          section={section}
          index={index}
          total={sections.length}
        />
      ))}

      {/* ===== Scroll Progress ===== */}
      <ScrollProgress />
    </main>
  );
}

// ---------------- Background Component ----------------
function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Moving Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[#198a3a]/20 blur-3xl"
        animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[#ce2028]/20 blur-3xl"
        style={{ top: "20%", left: "70%" }}
        animate={{ x: [0, -100, 0], y: [0, 40, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[#f7931e]/20 blur-3xl"
        style={{ top: "50%", left: "50%" }}
        animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// ---------------- Section Component ----------------
function Section({
  section,
  index,
  total,
}: {
  section: { text: string; color: string };
  index: number;
  total: number;
}) {
  return (
    <section className="snap-start h-screen flex items-center justify-center relative px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center max-w-4xl relative"
      >
        <h1
          className={`text-5xl md:text-8xl font-bold leading-tight tracking-tight ${getGradientClass(section.color)}`}
        >
          {section.text.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                x: Math.random() * 120 - 60,
                y: Math.random() * 120 - 60,
                scale: 0.8,
              }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.03 }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <div className="h-1 bg-black/20 mt-8 mx-auto w-24" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-600">
          {index + 1} / {total}
        </div>
      </motion.div>

      {/* ===== Optional: Connecting lines between letters ===== */}
      <LetterLines text={section.text} />
    </section>
  );
}

// ---------------- Connecting Lines Component ----------------
function LetterLines({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const letters = text.length;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // randomly position points around center for each letter
    const points = Array.from({ length: letters }, () => ({
      x: width / 2 + Math.random() * 300 - 150,
      y: height / 2 + Math.random() * 100 - 50,
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(0,0,0,0.05)";
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[i + 1].x, points[i + 1].y);
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [text]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
}

// ---------------- Gradient Helper ----------------
function getGradientClass(color: string) {
  switch (color) {
    case "zambia-green":
      return "gradient-zambia-green";
    case "zambia-red":
      return "gradient-zambia-red";
    case "zambia-orange":
      return "gradient-zambia-orange";
    case "zambia-copper":
      return "gradient-zambia-copper";
    default:
      return "gradient-zambia-green";
  }
}

// ---------------- Scroll Progress ----------------
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#198a3a] via-[#ce2028] to-[#f7931e] origin-left z-50"
      style={{ scaleX }}
    />
  );
}
