"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const TRAIL_LENGTH = 20;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTrail((prevTrail) => {
        const newTrail = [{ x: e.clientX, y: e.clientY }, ...prevTrail];
        return newTrail.slice(0, TRAIL_LENGTH);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Hide the default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail elements */}
      {trail.map((position, index) => (
        <motion.div
          key={index}
          className="fixed pointer-events-none z-40 mix-blend-difference"
          animate={{
            x: position.x - 3,
            y: position.y - 3,
          }}
          transition={{
            type: "spring",
            damping: 40,
            stiffness: 900,
            mass: 0.2,
          }}
        >
          <div
            className="w-1.5 h-1.5 bg-white"
            style={{
              opacity: 1 - (index / TRAIL_LENGTH) * 0.7,
              transform: `scale(${1 - (index / TRAIL_LENGTH) * 0.3})`,
            }}
          />
        </motion.div>
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 900,
          mass: 0.2,
        }}
      >
        <div className="w-1.5 h-1.5 bg-white" />
      </motion.div>
    </>
  );
}
