"use client";

import { motion } from "framer-motion";
import StaggerText from "./StaggerText";
import Image, { StaticImageData } from "next/image";

interface PageHeroProps {
  image: string | StaticImageData;
  badge: string;
  title: string;
  subtitle: string;
}

const PageHero = ({ image, badge, title, subtitle }: PageHeroProps) => {
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 gradient-hero-bg opacity-85" />
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-8 py-24 md:py-32 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block text-sm font-semibold text-accent uppercase tracking-widest mb-4"
        >
          {badge}
        </motion.span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-[1.1] mb-6">
          <StaggerText text={title} delay={0.15} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default PageHero;
