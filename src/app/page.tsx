/* eslint-disable */

"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import BoxAnimation from "@/components/BoxAnimation";
import BackgroundImages from "@/components/BackgroundImages";
import TypewriterText from "@/components/typewritertext";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [exploreClicked, setExploreClicked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sentences = ["i love to do great work", "great work i love to do", "to love i do great work", "to love work i do great"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setCurrentSection(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only handle horizontal scrolling in section 0
      if (currentSection === 0) {
        e.preventDefault();
        if (e.deltaX > 0 || e.deltaY > 0) {
          setCurrentSection(1);
          setExploreClicked(true);
        }
      } else if (currentSection === 1) {
        // Check if the work section is fully in view
        const workSection = document.getElementById("work");
        if (workSection) {
          const rect = workSection.getBoundingClientRect();
          // Only handle horizontal scrolling when work section is fully in view and at the top
          if (rect.left === 0 && window.scrollY === 0) {
            if (e.deltaX < 0 || e.deltaY < 0) {
              e.preventDefault();
              setCurrentSection(0);
              setExploreClicked(true);
            }
          }
          // Prevent vertical scrolling if work section is not fully in view
          else if (rect.left !== 0) {
            e.preventDefault();
          }
        }
      }
    };

    const container = document.querySelector("main");
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentSection]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
        setIsVisible(true);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [sentences.length]);

  const scrollToSection = () => {
    setCurrentSection(1);
    setExploreClicked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden snap-y snap-mandatory [&:has(*:hover)]:cursor-none">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50" style={{ scaleX }} />

      {/* Background Images */}
      <BackgroundImages onExplore={exploreClicked} />

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-hidden">
        {/* Welcome Section */}
        <section className="z-10 h-dvh w-screen flex-shrink-0 flex items-end" style={{ transform: `translateX(-${currentSection * 100}%)`, transition: "transform 0.8s ease-in-out" }}>
          <div className="flex flex-col sm:flex-row items-center gap-8 px-4 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, x: 15 }}>
              <TypewriterText text="welcome to my portfolio" delay={50} onComplete={() => setShowButton(true)} />
            </motion.div>
            {showButton && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} className="self-start sm:self-auto pl-4">
                <InteractiveHoverButton onClick={() => scrollToSection()}>explore</InteractiveHoverButton>
              </motion.div>
            )}
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="relative z-10 h-dvh w-screen flex-shrink-0 flex flex-col items-center justify-center gap-12" style={{ transform: `translateX(-${currentSection * 100}%)`, transition: "transform 0.8s ease-in-out" }}>
          <div className="transition-opacity duration-1000 ease-in-out w-[80%] mx-auto">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
              {sentences[currentIndex].split(" ").map((word, index) => (
                <motion.h2 key={`${currentIndex}-${word}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="text-3xl sm:text-5xl font-bold text-center">
                  {word}
                </motion.h2>
              ))}
            </div>
          </div>
          <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}>
            <motion.p className="text-gray-400 text-sm" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              scroll down
            </motion.p>
          </motion.div>
        </section>
      </div>

      {/* Design & Tech Section with BoxAnimation */}
      <BoxAnimation />

      {/* Selected Works Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-12 bg-black snap-start pt-24 sm:pt-0">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-4xl font-semibold">
          selected work
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {[
            {
              title: "Syd for Solen",
              description: "Danish music festival",
              image: "/sydforsolen.png",
              link: "https://sydforsolen.vercel.app/",
            },
            {
              title: "Caveman",
              description: "Music producer Lucas Delacroix",
              image: "/caveman.png",
              link: "https://cavemanstudiogruppe6.netlify.app/",
            },
            {
              title: "Space Debris",
              description: "Internship project at AKQA Denmark",
              image: "/spacedebris.png",
              link: "https://akqa-dk-flight-orbit-2025.vercel.app/",
            },
          ].map((project, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                <h4 className="font-semibold font-[ClashGrotesk] text-white transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">{project.title}</h4>
                <p className="text-gray-300 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300 delay-100">{project.description}</p>
                <div className="mt-4 w-full">
                  <InteractiveHoverButton onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")} className="w-full flex items-center justify-center">
                    View Project
                  </InteractiveHoverButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center bg-black snap-start">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center space-y-6 px-4">
          <h2 className="text-4xl font-bold">i'm peter.</h2>
          <p className="text-xl">
            i've been coding and designing for a decade.
            <br />
            i do music as well.
            <br />i love to tell the story, whether it's a website or a song.
          </p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-8 bg-black snap-start">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-8">
          <a href="https://www.facebook.com/Peter8D" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <svg className="w-6 h-6 text-white hover:text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/peteramr/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-full hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <svg className="w-6 h-6 text-white hover:text-black" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold">
          get in touch
        </motion.h2>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.p className="text-gray-400 text-sm cursor-pointer" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            back to beginning
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}
