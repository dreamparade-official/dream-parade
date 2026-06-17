"use client";

import { useEffect, useState } from "react";

const DP_PATH =
  "M 1,1 L 13,1 C 56,1 56,59 13,59 L 1,59 Z " +
  "M 13,8 C 38,8 38,32 13,32 Z";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"visible" | "fadeout" | "hidden">("visible");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fadeout"), 1800);
    const t2 = setTimeout(() => setPhase("hidden"), 2350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center transition-opacity duration-[550ms] ease-in-out ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* DP シンボルマーク */}
      <svg
        viewBox="0 0 52 60"
        xmlns="http://www.w3.org/2000/svg"
        width={88}
        height={102}
        aria-hidden="true"
        style={{ animation: "loadingRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both" }}
      >
        <path fillRule="evenodd" d={DP_PATH} fill="#CC0000" />
      </svg>

      {/* DREAM / PARADE テキスト */}
      <div className="mt-7 flex flex-col items-center">
        <span
          className="font-heading font-black text-white text-[13px]"
          style={{ animation: "loadingTextRise 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.65s both" }}
        >
          DREAM
        </span>
        <span
          className="font-heading font-black text-red-500 text-[17px] mt-[3px]"
          style={{ animation: "loadingTextRise 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both" }}
        >
          PARADE
        </span>
      </div>
    </div>
  );
}
