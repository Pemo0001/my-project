/* eslint-disable */

"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, memo } from "react";

interface ExpandingImageProps {
  className?: string;
}

const ExpandingImage = memo(({ className = "" }: ExpandingImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setShowText(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ clipPath: "inset(0 50% 0 50%)" }}
        animate={{ clipPath: isLoaded ? "inset(0 0% 0 0%)" : "inset(0 50% 0 50%)" }}
        transition={{
          duration: 1.5,
          ease: [0.4, 0, 0.2, 1],
        }}
        onAnimationComplete={handleAnimationComplete}
        style={{
          willChange: "clip-path",
          transform: "translateZ(0)",
        }}
      />

      <div className="absolute bottom-12 left-12 z-10"></div>
    </div>
  );
});

ExpandingImage.displayName = "ExpandingImage";

export default ExpandingImage;
