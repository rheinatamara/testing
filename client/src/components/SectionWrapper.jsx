import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const SectionWrapper = ({ children }) => {
  return (
    <motion.div
      className={twMerge("w-full max-w-md mx-auto")}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.8 }}
    >
      <div className="h-screen overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

export default SectionWrapper;
