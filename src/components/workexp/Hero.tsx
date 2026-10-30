"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

interface HeroProps {
  onOpenEnroll: () => void;
}

export default function Hero({ onOpenEnroll }: HeroProps) {
  return (
    <section className="relative pt-36 lg:pt-44 pb-20 lg:pb-32 px-[5%] lg:px-[10%] overflow-hidden bg-gradient-to-b from-[#170E3A] via-[#1D1348] to-[#140D33]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#5160E7]/20 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-[10%] w-[400px] h-[350px] bg-[#B1CA4D]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]"
        >
          Experience work before <br className="hidden sm:inline" />
          you <span className="text-[#C2DE55] inline-block relative drop-shadow-[0_0_25px_rgba(194,222,85,0.35)]">get hired.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Practice what it's really like to do the job. Work through realistic briefs, deadlines,
          feedback, changing requirements, and real-world decisions, and leave with
          proof of how you work.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onOpenEnroll}
            className="w-full sm:w-auto px-8 py-4 bg-[#5160E7] hover:bg-[#4352D9] text-white font-semibold text-base rounded-full shadow-[0_10px_30px_rgba(81,96,231,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>Build Work Experience</span>
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Hero Dashboard Preview with Floating Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="mt-14 lg:mt-20 relative mx-auto"
        >
          <div className="relative rounded-2xl lg:rounded-3xl p-2 sm:p-3  ">

            {/* Dashboard Image */}
            <div className="relative overflow-hidden">
              <Image
                src="/workexp/hero_dashboard.png"
                alt="Ryzly Workplace Simulator Dashboard"
                width={951}
                height={677}
                priority
                className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

