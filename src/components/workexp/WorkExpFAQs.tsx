"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiChevronDown } from "react-icons/fi";
import { faqs } from "./data";

export default function WorkExpFAQs() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <section
      id="faqs"
      className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#170E3A] relative overflow-hidden"
    >
      {/* Subtle lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#5160E7]/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto mb-4 border border-white/15">
            <FiMessageSquare className="text-xl" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-gray-300">
            Everything you need to know about Ryzly workplace simulations.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 60}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-100"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-[#1D1348]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#5160E7] text-white" : ""
                    }`}
                  >
                    <FiChevronDown />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-7 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

