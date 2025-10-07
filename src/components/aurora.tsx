"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute -inset-40"
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background:
            "conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.25) 0deg, rgba(168,85,247,0.25) 120deg, rgba(56,189,248,0.2) 240deg, rgba(99,102,241,0.25) 360deg)" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background:
            "radial-gradient(closest-side, rgba(147,51,234,0.25), transparent 60%)" }}
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
}


