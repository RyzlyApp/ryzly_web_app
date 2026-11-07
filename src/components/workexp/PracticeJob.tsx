import React from "react";
import Image from "next/image";

export default function PracticeJob() {
  const learningPoints = [
    "Linear tutorials with pristine briefs and predictable constraints",
    "Step-by-step guides with zero stakeholder ambiguity",
    "Self-paced with zero business consequences for delay",
    "Evaluated purely on visual sheen without commercial trade-offs",
  ];

  const jobPoints = [
    "Messy briefs with conflicting constraints and existing legacy dependencies",
    "Unannounced mid-sprint stakeholder pivots requiring instant re-scoping",
    "Tight deadlines requiring deliberate trade-offs and technical triage",
    "Auditable decision logs evaluating your reasoning, velocity, and communication",
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-white text-gray-900 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="relative max-w-4xl mx-auto text-center" data-aos="fade-up">
          <div className="relative inline-block w-full">
            {/* Rainbow chevron decoration */}
            <div className="sm:absolute sm:left-0 sm:-top-5 mb-4 sm:mb-0 flex justify-center sm:justify-start">
              <Image
                src="/landingPage/RainbowImage.png"
                alt=""
                width={150}
                height={30}
                className="w-24 sm:w-32 lg:w-40 h-auto object-contain"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1348] tracking-tight leading-tight">
              You learned the skill. But <br className="hidden sm:inline" />
              have you practiced the job?
            </h2>
          </div>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Learning teaches you the fundamentals. Real work tests how you apply them
            when requirements change, deadlines tighten, and decisions get harder.
          </p>
        </div>

        {/* Split Comparison Content */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Authentic Photo */}
          <div className="lg:col-span-5 flex" data-aos="fade-right">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-lg min-h-[420px] sm:min-h-[500px] lg:min-h-full">
              <Image
                src="/workexp/practicing_job.jpg"
                alt="Professional practicing real job challenges"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right Column: Comparative Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6 justify-between" data-aos="fade-left">
            {/* Card 1: Learning a Skill */}
            <div className="bg-white p-7 sm:p-9 rounded-3xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
              <span className="px-3 py-1 bg-[#F1F3F7] text-[#64748B] text-xs font-semibold rounded-md inline-block">
                Learning Mindset
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D1348] mt-3.5 mb-5">
                Learning a Skill
              </h3>
              <ul className="space-y-3.5">
                {learningPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-gray-600 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Practicing the Job */}
            <div className="bg-white p-7 sm:p-9 rounded-3xl border border-[#7C88FF]/60 shadow-sm transition-all hover:shadow-md">
              <span className="px-3 py-1 bg-[#5B6BF0] text-white text-xs font-semibold rounded-md inline-block shadow-sm">
                Work Mindset
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D1348] mt-3.5 mb-5">
                Practicing the Job
              </h3>
              <ul className="space-y-3.5">
                {jobPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-gray-700 font-medium leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5160E7] mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
