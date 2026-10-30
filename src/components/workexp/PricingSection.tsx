import React from "react";
import { FiCheck, FiArrowRight, FiShield } from "react-icons/fi";

interface PricingSectionProps {
  onOpenEnroll: () => void;
}

export default function PricingSection({ onOpenEnroll }: PricingSectionProps) {
  return (
    <section
      id="pricing"
      className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-white text-gray-900 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1348] tracking-tight">
            6 Weeks of Real Work <br />
            Experience
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Everything you need to break into tech with genuine confidence and verifiable proof of competence.
          </p>
        </div>

        {/* Two-Column Card Container */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="mt-16 bg-[#FAFAFD] border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left Column: What's included */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1348]">
              Everything included in your 6-week cohort:
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Comprehensive, hands-on simulated sprints backed by senior feedback.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "6 weeks of structured, mentor-led simulated sprints",
                "Real-world enterprise briefs mirroring production environments",
                "Weekly 1-on-1 feedback and live office hours with seniors",
                "Verifiable Ryzly Experience Credential with project evidence links",
                "Direct access to Ryzly alumni hiring partner network",
                "ATS-proof portfolio pieces showcasing genuine problem-solving",
              ].map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#EEF0FF] text-[#5160E7] flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">
                    <FiCheck />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pricing Box */}
          <div className="lg:col-span-5">
            <div className="bg-[#1D1348] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#5160E7]/40 relative overflow-hidden flex flex-col justify-between">
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#5160E7]/30 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="px-3.5 py-1 bg-[#C2DE55] text-[#1D1348] rounded-full text-xs font-bold uppercase tracking-wider">
                  Cohort 4 Starting Soon
                </span>

                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wider text-gray-300 font-medium">
                    One-Time Enrollment Fee
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      ₦20,000
                    </span>
                    <span className="text-sm text-gray-400">/ 6-week cohort</span>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Complete access to the simulation engine, enterprise briefs, weekly reviews,
                  and verified credential.
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={onOpenEnroll}
                  className="w-full py-4 bg-[#5160E7] hover:bg-[#4352D9] text-white font-semibold text-base rounded-full shadow-[0_10px_30px_rgba(81,96,231,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Enroll in Cohort</span>
                  <FiArrowRight />
                </button>
                <p className="mt-3 text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                  <FiShield className="text-emerald-400" />
                  <span>30-Day Money-Back Guarantee • No Hidden Fees</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

