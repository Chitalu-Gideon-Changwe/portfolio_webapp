"use client";

import { motion } from "framer-motion";

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
      {/* ===== Background Orbs ===== */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-20" />

        {/* Animated Zambian orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#198a3a]/20 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
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
          animate={{ x: [0, -80, 0], y: [0, 30, 0] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#f7931e]/20 blur-3xl"
          style={{ top: "50%", left: "50%" }}
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </div>

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
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
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
    </section>
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
import { useScroll, useSpring } from "framer-motion";

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
