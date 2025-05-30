"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function BoxAnimation() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: section,
          scrub: 0.5,
          pin: true,
          start: "top top",
          end: "+=150%",
        },
      })
      .to(".box", {
        force3D: true,
        duration: 1,
        xPercent: 100,
        ease: "power1.inOut",
        stagger: { amount: 1 },
      })
      .to(
        ".box",
        {
          ease: "power1.out",
          duration: 1,
          rotation: "45deg",
        },
        0
      )
      .to(
        ".box",
        {
          ease: "power1.in",
          duration: 1,
          rotation: "0deg",
        },
        1
      );
  }, []);

  return (
    <section ref={sectionRef} className="w-screen h-screen overflow-hidden bg-black relative">
      <div className="absolute block text-center z-10 w-1/2 top-[calc(50vh-120px)] left-0">
        <div className="flex justify-center gap-8 mb-8 px-4 sm:px-0">
          <Image src="/figma.svg" alt="Figma" width={15} height={15} className="object-contain" />
          <Image src="/adobe.svg" alt="Adobe" width={20} height={20} className="object-contain" />
        </div>
        <h3 className="text-[#eee] font-[ClashGrotesk]">
          with <br />
          smooth
          <br />
          design
        </h3>
      </div>
      <div className="absolute block text-center z-10 w-1/2 top-[calc(50vh-120px)] right-0">
        <div className="flex justify-center gap-8 mb-8 px-4 sm:px-0">
          <Image src="/nextjs.svg" alt="Next.js" width={20} height={20} className="object-contain" />
          <Image src="/tailwind.svg" alt="Tailwind" width={20} height={20} className="object-contain" />
          <Image src="/typescript.svg" alt="TypeScript" width={20} height={20} className="object-contain" />
          <Image src="/supabase.svg" alt="Supabase" width={20} height={20} className="object-contain" />
        </div>
        <h3 className="text-[#eee] font-[ClashGrotesk]">
          and <br />
          solid
          <br />
          tech
        </h3>
      </div>

      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index} className="box h-[1.2vh] w-1/2 bg-[#0f1116] block -mb-[0.2vh]" />
      ))}
    </section>
  );
}
