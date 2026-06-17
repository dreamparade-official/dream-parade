"use client";

import { useEffect, useRef } from "react";

const DP_PATH =
  "M 1,1 L 13,1 C 56,1 56,59 13,59 L 1,59 Z " +
  "M 13,8 C 38,8 38,32 13,32 Z";

export default function DpSymbolBackground() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translateY(${window.scrollY * 0.06}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        ref={ref}
        viewBox="0 0 52 60"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[-8%] top-[-20%] w-[65%] text-red-500"
        style={{ opacity: 0.04, willChange: "transform" }}
      >
        <path fillRule="evenodd" d={DP_PATH} fill="currentColor" />
      </svg>
    </div>
  );
}
