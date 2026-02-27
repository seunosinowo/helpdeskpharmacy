"use client";

import { motion } from "framer-motion";

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const StaggerText = ({ text, className = "", delay = 0 }: StaggerTextProps) => {
  const words = text.split(" ");

  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default StaggerText;
