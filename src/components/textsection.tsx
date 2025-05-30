/* eslint-disable */

"use client";

import { useState, useEffect } from "react";

interface TextSectionProps {
  className?: string;
}

export default function TextSection({ className = "" }: TextSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const sentences = ["i love to do great work", "great work i love to do", "to love i do great work", "to love work i do great"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [sentences.length]);

  const words = sentences[currentIndex].split(" ");

  return (
    <div className={`w-screen h-screen flex items-center justify-center bg-black relative ${className}`}>
      <div className="max-w-4xl px-8 text-center relative z-10">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="transition-opacity duration-500 ease-in-out" style={{ opacity: isVisible ? 1 : 0 }}>
              <div className="flex justify-center gap-8">
                {words.map((word, index) => (
                  <span key={`${currentIndex}-${word}`} className="text-3xl text-white font-clash">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
