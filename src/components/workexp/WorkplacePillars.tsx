import React from "react";
import { pillars } from "./data";

export default function WorkplacePillars() {
  return (
    <section
      id="pillars"
      className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#F0EDF6] text-gray-900 relative font-figtree"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1348] tracking-tight leading-[1.15]">
            A simulated workplace with{" "}
            <span className="text-[#6472F5]">real</span>
            <br />
            <span className="text-[#6472F5]">expectations.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Work through a realistic project from the first brief to final delivery, while
            responding to the exact situations you would encounter on the job.
          </p>
        </div>

        {/* 6 Themed Tiles */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 70}
              className={`${pillar.bg} ${pillar.textColor || "text-white"} p-7 sm:p-8 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 flex flex-col justify-start min-h-[200px]`}
            >
              {/* Circular Number Badge */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-6 ${
                  pillar.badgeBg || "bg-white/20 text-white"
                }`}
              >
                {pillar.number}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold tracking-tight mb-2.5">
                {pillar.name}
              </h3>

              {/* Description */}
              <p className="text-sm opacity-90 leading-relaxed font-normal">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
