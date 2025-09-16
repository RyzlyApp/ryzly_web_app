"use client";

import React, { useState } from "react";
import { BiBulb } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";

const Who = () => {
  const buttons: string[] = ["Talents", "Coaches", "Organizations"];
  const [currentBtn, setCurrentBtn] = useState("Talents");
  return (
    <section className="px-[5%] lg:px-[10%] py-20 lg:py-32 bg-[#1D1348] border-t border-gray-600">
      <div className="2xl:container mx-auto">
        <div className="relative">
          <img
            src="/landingPage/RainbowImage.png"
            alt=""
            className="left-0 lg:left-20 absolute w-[5rem] lg:w-[15rem] -top-3 lg:top-2"
          />
          <h1 className="text-3xl text-white lg:text-5xl font-bold text-center">
            Who&apos;s Rhyzly <br /> For
          </h1>
        </div>

        <div className="flex gap-3 justify-center mt-10">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`${
                btn === currentBtn
                  ? "bg-[#C2DE55] text-black"
                  : "bg-gray-700 text-white"
              } p-2 rounded-lg text-xs`}
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="rounded-lg mt-10 col-span-2 flex flex-col-reverse lg:flex-row relative bg-[#241275B2] shadow-2xl overflow-hidden max-h-[30rem]">
          <div className="lg:w-1/2 ms-auto px-10 py-5 lg:p-14 flex items-center">
            <div className="text-white">
              <BiBulb size={30} />
              <h3 className="font-bold text-xl mt-5">Coaches</h3>
              <p className="text-sm mt-3">
                Build proof-of-work through mentorship.{" "}
                <strong>Sharpen your skills with real challenges.</strong>{" "}
                Showcase projects that employers value.
              </p>
              <button className="text-xs flex gap-1 items-center bg-[#99A3FF] rounded-full py-3 px-4 border border-white/20 mt-8">
                Join a Challenge <FaArrowRight />
              </button>
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
