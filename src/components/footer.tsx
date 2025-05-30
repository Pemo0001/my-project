"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
}

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!footerRef.current || !pathRef.current) return;

    const down = "M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z";
    const center = "M0-0.3C0-0.3,464,0,1139,0s1139-0.3,1139-0.3V683H0V-0.3z";

    const scrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top bottom",
      toggleActions: "play pause resume reverse",
      markers: true,
      onEnter: (self) => {
        const velocity = self.getVelocity();
        const variation = velocity / 10000;

        gsap.fromTo(
          pathRef.current,
          {
            morphSVG: down,
          },
          {
            duration: 2,
            morphSVG: center,
            ease: `elastic.out(${1 + variation}, ${1 - variation})`,
            overwrite: true,
          }
        );
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="relative w-full">
      <p className="absolute top-[40vh] text-center w-full text-[#fffce1]">scroll down</p>
      <div ref={footerRef} className="relative w-full after:content-[''] after:absolute after:top-0 after:w-full after:h-full after:bg-blend-color-dodge after:bg-[url('https://assets.codepen.io/16327/noise.png')]">
        <svg preserveAspectRatio="none" id="footer-img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2278 683" className="h-full w-full block overflow-visible">
          <defs>
            <linearGradient id="grad-1" x1="0" y1="0" x2="2278" y2="683" gradientUnits="userSpaceOnUse">
              <stop offset="0.2" stopColor="#000000" />
              <stop offset="0.8" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path ref={pathRef} className="footer-svg" id="bouncy-path" fill="url(#grad-1)" d="M0-0.3C0-0.3,464,156,1139,156S2278-0.3,2278-0.3V683H0V-0.3z" />
        </svg>
      </div>
    </div>
  );
};

export default Footer;
