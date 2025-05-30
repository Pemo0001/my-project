/* eslint-disable */

"use client";

import { useState, useEffect } from "react";

interface BackgroundImage {
  src: string;
  size: number;
  x: number;
  y: number;
  opacity: number;
}

interface BackgroundImagesProps {
  onExplore?: boolean;
}

export default function BackgroundImages({ onExplore }: BackgroundImagesProps) {
  const images = ["/spacedebris.png", "/seayou.png", "/girltalk.png", "/caveman.png", "/sydforsolen.png"];

  const [backgroundImages, setBackgroundImages] = useState<BackgroundImage[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const generateRandomImages = () => {
    const newImages: BackgroundImage[] = [];
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);

    // Define scattered positions that look natural
    const positions = [
      { x: 20, y: 25 }, // scattered positions
      { x: 75, y: 15 },
      { x: 35, y: 80 },
      { x: 85, y: 70 },
      { x: 60, y: 45 },
    ];

    shuffledImages.forEach((src, index) => {
      const position = positions[index % positions.length];
      newImages.push({
        src,
        size: Math.random() * 400 + 200, // Increased base size for better visibility
        x: position.x,
        y: position.y,
        opacity: Math.random() * 0.4 + 0.2,
      });
    });
    setBackgroundImages(newImages);
  };

  useEffect(() => {
    // Start with all images in center
    const initialImages = images.map((src) => ({
      src,
      size: Math.random() * 250 + 150,
      x: 50,
      y: 50,
      opacity: Math.random() * 0.4 + 0.2,
    }));
    setBackgroundImages(initialImages);

    // After a short delay, animate to scattered positions
    setTimeout(() => {
      setIsAnimating(true);
      generateRandomImages();
      setTimeout(() => {
        setIsAnimating(false);
        setIsInitialLoad(false);
      }, 1000);
    }, 500);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Add position swapping effect
  useEffect(() => {
    if (isInitialLoad) return;

    const swapInterval = setInterval(() => {
      setIsAnimating(true);
      generateRandomImages();
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }, 3000); // Swap positions every 3 seconds

    return () => clearInterval(swapInterval);
  }, [isInitialLoad]);

  useEffect(() => {
    if (onExplore && !isInitialLoad) {
      setIsAnimating(true);
      generateRandomImages();
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  }, [onExplore, isInitialLoad]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            maxWidth: `${img.size}px`,
            width: "auto",
            height: "auto",
            left: `${img.x}%`,
            top: `${img.y}%`,
            opacity: img.opacity,
            transform: `translate(calc(-50% + ${mousePosition.x * 20}px), calc(-50% + ${mousePosition.y * 20}px))`,
            filter: "blur(2px)",
            transition: isAnimating ? "all 1s cubic-bezier(0.4, 0, 0.2, 1)" : "transform 0.1s ease-out",
          }}
        >
          <img src={img.src} alt="" className="w-full h-auto object-contain rounded-lg" />
        </div>
      ))}
    </div>
  );
}
