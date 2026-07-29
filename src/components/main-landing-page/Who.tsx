"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiBulb } from "react-icons/bi";
import { FaArrowRight, FaRegHandshake } from "react-icons/fa6";
import { RiComputerLine, RiFolderDownloadLine, RiFolderOpenLine, RiHandHeartLine, RiMoneyDollarCircleLine, RiPlantLine } from "react-icons/ri"
import { PiUsersThreeBold } from "react-icons/pi";

type WhoType = {
  title: string;
  description: string;
  items: {
    icon: React.ReactNode;
    text: string;
  }[];
  cta: "default" | "coach" | "host" | "talents";
};


const whoList: Record<string, WhoType> = {
  Host: {
    title: "Host",
    description: "For Organizations, Recruiters, Founders, You turn real business problems into opportunities. Post challenges, discover exceptional talent, and reward the solutions that move your business forward.",
    cta: "host",
    items: [
      {
        icon: <PiUsersThreeBold size={24} />,
        text: "Discover Top Talents",
      },
      {
        icon: <RiFolderDownloadLine size={24} />,
        text: "Get Fresh Ideas & Solutions",
      },
      {
        icon: <RiHandHeartLine size={24} />,
        text: "Reward Outstanding Work",
      },
    ],
  },
  Talents: {
    title: "Talents",
    description: "Build proof-of-work through hands-on projects. Sharpen your skills with real challenges. Showcase projects that employers value.",
    cta: "talents",
    items: [
      {
        icon: <RiMoneyDollarCircleLine size={24} />,
        text: "Earn Real Money",
      },
      {
        icon: <RiFolderOpenLine size={24} />,
        text: "Build Your Portfolio",
      },
      {
        icon: <FaRegHandshake size={24} />,
        text: "Get Discovered by Companies",
      },
    ],
  },
  Coaches: {
    title: "Coaches",
    description: "Create hands-on learning experiences, launch paid learning challenges, mentor participants, and build a thriving community around your expertise.",
    cta: "coach",
    items: [
      {
        icon: <RiComputerLine size={24} />,
        text: "Teach Through Practice",
      },
      {
        icon: <RiMoneyDollarCircleLine size={24} />,
        text: "Earn From Your Expertise",
      },
      {
        icon: <RiPlantLine size={24} />,
        text: "Grow Your Community",
      },
    ],
  },
};

const Who = () => {
  const buttons = Object.keys(whoList);
  const router = useRouter();

  const [currentBtn, setCurrentBtn] = useState<string>("Talents");

  const current = whoList[currentBtn];

  return (
    <section className="px-[5%] font-figtree lg:px-[10%] py-20 lg:py-32 bg-[#1D1348] border-t border-gray-600">
      <div className="2xl:container mx-auto">
        <div data-aos="fade-up" className="relative">
          <img
            src="/landingPage/RainbowImage.png"
            alt=""
            className="left-0 lg:left-20 absolute w-[5rem] lg:w-[15rem] -top-3 lg:top-2"
          />
          <h1 className="text-3xl lg:text-5xl text-white font-bold text-center">
            Who&apos;s Ryzly <br /> For
          </h1>
        </div>

        <div data-aos="fade-up" className="flex gap-6 justify-center mt-10">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => setCurrentBtn(btn)}
              className={`${btn === currentBtn
                ? "bg-[#C2DE55] text-black"
                : "bg-gray-700 text-white"
                } p-2 rounded-lg border-1 border-[#C2DE55] text-xs`}
            >
              {btn}
            </button>
          ))}
        </div>

        <div
          data-aos="fade-up"
          className="rounded-3xl mt-10 col-span-2 flex flex-col-reverse lg:flex-row relative bg-[#241275B2] shadow-2xl overflow-hidden max-h-[30rem]"
        >
          <div className="lg:w-1/2 ms-auto px-10 py-5 lg:p-14 flex items-center">
            <div className="text-white">
              <BiBulb size={30} />
              <h3 className="font-bold text-xl my-5">{currentBtn}</h3>
              <p>{current.description}</p>
              <ul className="text space-y-2 mt-4">
                {current?.items.map((item, index) => (
                  <li key={index} className="flex gap-3.5 items-center">
                    <span className="mt-0.5 shrink-0 text-[#C2DE55]">
                      {item?.icon}
                    </span>
                    <span>{item?.text}</span>
                  </li>
                ))}
              </ul>

              {current?.cta === "host" && (
                <button
                  onClick={() => router.push("/auth")}
                  className="text-sm flex gap-1 items-center bg-[#6370E7] rounded-full py-3 px-4 border border-white/10 shadow-xs mt-8"
                >
                  Create a Challenge <FaArrowRight />
                </button>
              )}
              {current?.cta === "talents" && (
                <button
                  onClick={() => router.push("/auth")}
                  className="text-sm flex gap-1 items-center bg-[#6370E7] rounded-full py-3 px-4 border border-white/10 shadow-xs mt-8"
                >
                  Join a Challenge <FaArrowRight />
                </button>
              )}
              {current?.cta === "coach" && (
                <button
                  onClick={() => router.push("/auth")}
                  className="text-sm flex gap-1 items-center bg-[#6370E7] rounded-full py-3 px-4 border border-white/10 shadow-xs mt-8"
                >
                  Become a Coach <FaArrowRight />
                </button>
              )}
            </div>
          </div>
          <div className="lg:w-1/2 mt-auto pt-10 lg:pt-20">
            <img
              src="/landingPage/learnbydoing.png"
              alt=""
              className="w-[600px] rounded-tl-3xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Who;