import React from "react";
import Image from "next/image";

export default function WhyRyzlySection() {
  return (
    <section
      id="why-ryzly"
      className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#170E3A] relative overflow-hidden font-figtree"
    >
      {/* Subtle lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-[#5160E7]/15 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[350px] bg-[#5160E7]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with inline rainbow chevrons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-16"
          data-aos="fade-up"
        >
          <Image
            src="/landingPage/RainbowImage.png"
            alt=""
            width={160}
            height={32}
            className="w-28 sm:w-36 lg:w-44 h-auto object-contain shrink-0"
          />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-center">
            What makes Ryzly different
          </h2>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Experience real work */}
          <div
            data-aos="fade-right"
            className="bg-[#1C1243] border border-white/10 rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Experience real work
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                Work through realistic briefs, deadlines, feedback, and changing requirements.
              </p>
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] relative shadow-lg">
              <Image
                src="/workexp/different_real_work.png"
                alt="Experience real work"
                fill
                className="object-cover object-top-left group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 2: Turn work into proof */}
          <div
            data-aos="fade-left"
            className="bg-[#1C1243] border border-white/10 rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Turn work into proof
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                Leave with real work and evidence of how you approached the job.
              </p>
            </div>
            <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] relative shadow-lg">
              <Image
                src="/workexp/different_proof.png"
                alt="Turn work into proof"
                fill
                className="object-cover object-top-left group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card 3: Join Ryzly's A-List (Full Width / 2-column) */}
          <div
            data-aos="fade-up"
            className="md:col-span-2 bg-[#1C1243] border border-white/10 rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Screenshot */}
              <div className="md:col-span-7">
                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] relative shadow-lg">
                  <Image
                    src="/workexp/different_alist.png"
                    alt="Join Ryzly's A-List"
                    fill
                    className="object-cover object-top-left group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right Column: Copy */}
              <div className="md:col-span-5 md:pl-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
                  Join Ryzly&apos;s A-List
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                  Top graduates earn a place in Ryzly&apos;s curated talent pool, giving hiring
                  teams access to their profiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
