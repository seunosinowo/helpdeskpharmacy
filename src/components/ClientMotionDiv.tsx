"use client";

import { motion, HTMLMotionProps } from "framer-motion";

export const ClientMotionDiv = (props: HTMLMotionProps<"div">) => {
  return <motion.div {...props} />;
};
