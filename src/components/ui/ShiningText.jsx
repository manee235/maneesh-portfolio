import React from 'react';
import { motion } from 'framer-motion';

export function ShiningText({ text, className = "", duration = 2, style = {} }) {
  return (
    <motion.h1
      className={`shining-text ${className}`}
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{
        repeat: Infinity,
        duration: duration,
        ease: "linear",
      }}
      style={style}
    >
      {text}
    </motion.h1>
  );
}

export default ShiningText;
