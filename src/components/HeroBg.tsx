"use client";

import { ReactNode } from "react";
export default function HeroBg({ children }: { children: ReactNode }) {
  const highlighted: number[] = [35, 40, 26, 18, 63];

  return (
    <>
      <main className="relative mt-10 flex justify-center">
        <div className="grid-container">
          <div className="grid grid-cols-11">
            {Array.from({ length: 77 }).map((_, index) => (
              <div
                key={index}
                className={`border-dark-2 h-20 w-20 border-[1px] ${highlighted.includes(index) ? "bg-white opacity-10" : ""}`}
              ></div>
            ))}
          </div>
        </div>
        {children}
      </main>

      <style jsx>{`
        .grid-container {
          position: relative;
          width: fit-content;
          mask-image: radial-gradient(
            circle at center,
            black 20%,
            transparent 60%
          );
          -webkit-mask-image: radial-gradient(
            circle at center,
            black 20%,
            transparent 60%
          );
        }
      `}</style>
    </>
  );
}
