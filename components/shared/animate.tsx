"use client";
import React, {  useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Animate = ({
  children,
  className,
  axis,
  direction,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  axis?: "x" | "y";
  direction?: "right" | "left";
}>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const isXAxis = axis === "x";
    const offset = direction === "right" ? 150 : -150;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, x: isXAxis ? offset : 0, y: isXAxis ? 0 : offset },
      { opacity: 1, duration: 1,x:0,y:0, yoyo: true, ease: "power2.out" },
    //   scrollTrigger:{
    //     trigger:containerRef.current
    //   }
    );

   
  }, [axis, direction]);

  return (
    <div
      ref={containerRef}
      className={`${className ?? ""} animated-container`.trim()}
    >
      {children}
    </div>
  );
};

export default Animate;
