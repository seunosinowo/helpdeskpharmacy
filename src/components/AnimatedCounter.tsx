"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
  delay?: number;
}

const AnimatedCounter = ({ value, label, delay = 0 }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.15 }}
        className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-text mb-2"
      >
        {value}
      </motion.div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
};

export default AnimatedCounter;
