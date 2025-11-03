"use client";

import React from "react";
import {
  FaGoogle,
  FaApple,
  FaAmazon,
  FaMicrosoft,
  FaFacebook,
} from "react-icons/fa";
import { SiNetflix } from "react-icons/si";

const logos: { icon: React.ReactNode; name: string }[] = [
  { icon: <FaGoogle size={30} />, name: "Google" },
  { icon: <FaFacebook size={30} />, name: "Facebook" },
  { icon: <FaAmazon size={30} />, name: "Amazon" },
  { icon: <FaMicrosoft size={30} />, name: "Microsoft" },
  { icon: <FaApple size={30} />, name: "Apple" },
  { icon: <SiNetflix size={30} />, name: "Netflix" },
];

const Places = () => {
  return (
    <section className="py-20 lg:py-32 bg-[#1D1348] text-white">
      <div className="2xl:container mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">
            Places Our <br />
            Students Work
          </h1>
          <p className="text-xs">From Ryzly to the world's best teams</p>
        </div>

        <div className="relative w-full overflow-hidden py-4 mt-20">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-[#1D1348] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-[#1D1348] to-transparent" />

          <div className="marquee-container space-y-20">
            <div className="marquee flex animate-marquee gap-20 lg:gap-32">
              {[...logos, ...logos, ...logos].map((logo, idx) => (
                <div
                  key={idx}
                  className="text-4xl flex items-center gap-2 text-white"
                  title={logo.name}
                >
                  <div>{logo.icon}</div>
                  <p className="text-sm">{logo.name}</p>
                </div>
              ))}
            </div>

            <div className="marquee flex animate-marquee-right gap-20 lg:gap-32">
              {[...logos, ...logos, ...logos].map((logo, idx) => (
                <div
                  key={idx}
                  className="text-4xl flex items-center gap-2 text-white"
                  title={logo.name}
                >
                  <div>{logo.icon}</div>
                  <p className="text-sm">{logo.name}</p>
                </div>
              ))}
            </div>
            <div className="marquee flex animate-marquee gap-20 lg:gap-32">
              {[...logos, ...logos, ...logos].map((logo, idx) => (
                <div
                  key={idx}
                  className="text-4xl flex items-center gap-2 text-white"
                  title={logo.name}
                >
                  <div>{logo.icon}</div>
                  <p className="text-sm">{logo.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 45s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
};

export default Places;
