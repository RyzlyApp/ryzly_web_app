import React from "react";
import { pillars } from "./data";

export default function WorkplacePillars() {
  return (
    <section
      id="pillars"
      className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#EBE6E8] text-gray-900 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1348] tracking-tight leading-tight">
            A simulated workplace with <br className="hidden sm:inline" />
            <span className="text-[#5160E7]">real expectations.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Experience the 6 essential workplace phases of top technology organizations.
          </p>
        </div>

        {/* 6 Themed Tiles matching the mockup */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              className={`${pillar.bg} p-8 rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[220px]`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest opacity-75">
                  Pillar {pillar.number}
                </span>
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
              </div>

              <div className="my-4">
                <h3 className="text-2xl font-bold tracking-tight">{pillar.name}</h3>
                <p className="mt-2 text-sm opacity-90 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="text-xs opacity-75 font-medium border-t border-current/15 pt-3">
                {pillar.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

