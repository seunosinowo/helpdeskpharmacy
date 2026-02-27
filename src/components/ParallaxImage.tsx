"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface ParallaxImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
}

const ParallaxImage = ({ src, alt, className = "" }: ParallaxImageProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden rounded-2xl relative ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
