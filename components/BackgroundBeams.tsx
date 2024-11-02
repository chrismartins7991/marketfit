"use client";

import React from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "linear-gradient(to right, rgba(255, 0, 0, 0.1), rgba(0, 0, 255, 0.1))",
        }}
        animate={{
          x: ["0%", "100%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 10,
          ease: "linear",
        }}
      />
    </div>
  );
};
