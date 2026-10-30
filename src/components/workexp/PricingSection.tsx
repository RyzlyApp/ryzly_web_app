import React from "react";

interface PricingSectionProps {
  onOpenEnroll: () => void;
}

export default function PricingSection({ onOpenEnroll }: PricingSectionProps) {
  const inclusions = [
    "6 Weeks of Live Simulated Sprints with authentic briefs and changing constraints",
    "Bona Fide Internship Positioning: Cite Ryzly on your CV & LinkedIn profile",
    "Senior Operator Audits: Direct line-by-line feedback on your decision logs",
    "Soft Skills & Probation Mastery: Stakeholder politics & 90-day survival playbook",
    "A-List Talent Base Placement: Direct dispatch to hiring partners upon top completion",
  ];

  return (
    <section
      id="pricing"
      className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-white text-gray-900 relative font-figtree"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1348] tracking-tight leading-tight">
            6 Weeks of Real Work <br />
            Experience
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Accessible pricing designed for serious operators looking to bridge the gap
            between learning a skill and holding down the job.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: What's included */}
          <div className="lg:col-span-7" data-aos="fade-right">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1348] mb-6">
              Everything Included in your Enrolment
            </h3>

            <div className="space-y-4">
              {inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5160E7] mt-2 shrink-0" />
                  <span className="text-sm sm:text-[15px] text-gray-700 font-normal leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Certificate of Completion Box */}
            <div className="mt-8 p-6 sm:p-7 rounded-2xl border border-[#7C88FF]/50 bg-white shadow-sm">
              <h4 className="text-base sm:text-lg font-bold text-[#1D1348] mb-2">
                Official Verifiable Certificate of Completion
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Available after successful evaluation and project approval. A small processing
                fee applies for issuing secure digital certification.
              </p>
            </div>
          </div>

          {/* Right Column: Pricing Card */}
          <div className="lg:col-span-5" data-aos="fade-left">
            <div className="bg-[#170E38] text-white rounded-[28px] p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#7C88FF] leading-tight">
                  6-week intensive work <br />
                  experience
                </h3>

                <div className="flex items-center gap-3 my-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    ₦20,000
                  </span>
                  <span className="text-xs text-gray-300 leading-tight font-normal">
                    one-time<br />flat fee
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mb-8">
                  No hidden fees. Full access to all 6 weeks of live sprint simulations.
                </p>
              </div>

              <div>
                <button
                  // onClick={onOpenEnroll}
                  className="w-full py-4 bg-[#5160E7] hover:bg-[#4352D9] text-white font-semibold text-base rounded-full shadow-[0_10px_30px_rgba(81,96,231,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Build Work Experience</span>
                  <span className="text-lg">→</span>
                </button>
                <p className="mt-4 text-center text-xs text-gray-400 font-normal">
                  Limited slots available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
