import React from "react";

export default function WhatYouGet() {
  const cards = [
    {
      title: "Communication &\nStakeholder Oversight",
      points: [
        'Saying "no" gracefully without burning any bridges',
        "Structuring executive asynchronous memos",
        "Navigating multi-stakeholder misalignment",
      ],
      output: "Executive Memo Rubric",
    },
    {
      title: "Personal Branding &\nPortfolio Storytelling",
      points: [
        "Translating sprints into compelling CVs and case studies",
        "Auditable proof-of-work",
        "Optimizing LinkedIn headline",
      ],
      output: "High-Impact CV Artifact",
    },
    {
      title: "Passing Your Probation:\nThe First 90 Days",
      points: [
        "Aligning with your management's expectations.",
        "Decoding team politics and unspoken norms",
        "The 30-60-90 day self-audit checklist",
      ],
      output: "90-Day Probation Playbook",
    },
  ];

  return (
    <section
      id="what-you-get"
      className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-[#1D1348] relative overflow-hidden font-figtree"
    >
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5160E7]/15 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What you actually get <br />
            beyond technical execution.
          </h2>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Many struggle at work not from a lack of skill, but from weak communication,
            workplace navigation, and difficulty showing their value. We train and assess
            these essential skills.
          </p>
        </div>

        {/* 3 Value Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {cards.map((card, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="bg-[#F8F9FE] text-gray-900 rounded-[28px] p-7 sm:p-9 flex flex-col justify-between shadow-xl border border-white/60 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1348] leading-tight whitespace-pre-line min-h-[58px]">
                  {card.title}
                </h3>
                <ul className="mt-6 space-y-4">
                  {card.points.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-3 text-sm sm:text-[15px] text-gray-700 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6B7BF7] mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200/90 flex items-center justify-between text-xs sm:text-[13px]">
                <span className="text-gray-500 font-normal">Output:</span>
                <span className="font-bold text-[#1D1348]">{card.output}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
