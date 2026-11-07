import React from "react";
import Image from "next/image";
import { Track } from "./types";
import { tracks } from "./data";

interface TracksSectionProps {
  onOpenEnroll: (track: Track) => void;
}

export default function TracksSection({ onOpenEnroll }: TracksSectionProps) {
  return (
    <section
      id="tracks"
      className="py-24 lg:py-32 px-[5%] lg:px-[10%] bg-white text-gray-900 relative font-figtree"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-4" data-aos="fade-right">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12]">
              <span className="text-[#1D1348] block">Choose your track</span>
              <span className="text-[#D9531E] block">Build real</span>
              <span className="text-[#D9531E] block">experiences.</span>
            </h2>
            <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed font-normal max-w-sm">
              Each track puts you in a real-world work environment with realistic
              briefs, stakeholders, and feedback.
            </p>
          </div>

          {/* Right Column: 2x2 Tracks Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {tracks.map((track, idx) => (
              <div
                key={track.id}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="flex flex-col"
              >
                {/* Track Image */}
                <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                  <Image
                    src={track.image}
                    alt={track.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Track Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1348] mt-5 mb-2">
                  {track.title}
                </h3>

                {/* Track Description */}
                <p className="text-sm text-gray-600 leading-relaxed font-normal mb-6 flex-1">
                  {track.description}
                </p>

                {/* CTA Button */}
                <div>
                  <button
                    onClick={() => onOpenEnroll(track)}
                    className="px-6 py-2.5 bg-[#5B6BF0] hover:bg-[#4857DF] text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
