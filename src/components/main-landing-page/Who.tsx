"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiBulb } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa6";
import { Coachbtn } from "../shared";

const Who = () => {
  const buttons: string[] = ["Talents", "Coaches", "Organizations"];
  // const currentBtn = "Talents"
  const router = useRouter();

  const [currentBtn, setCurrentBtn] = useState<string>("Talents");

  return (
    <section className="px-[5%] lg:px-[10%] py-20 lg:py-32 bg-[#1D1348] border-t border-gray-600">
      <div className="2xl:container mx-auto">
        <div data-aos="fade-up" className="relative">
          <img
            src="/landingPage/RainbowImage.png"
            alt=""
            className="left-0 lg:left-20 absolute w-[5rem] lg:w-[15rem] -top-3 lg:top-2"
          />
          <h1 className="text-3xl text-white lg:text-5xl font-bold text-center">
            Who&apos;s Ryzly <br /> For
          </h1>
        </div>

        <div data-aos="fade-up" className="flex gap-3 justify-center mt-10">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => setCurrentBtn(btn)}
              className={`${btn === currentBtn
                  ? "bg-[#C2DE55] text-black"
                  : "bg-gray-700 text-white"
                } p-2 rounded-lg text-xs`}
            >
              {btn}
            </button>
          ))}
        </div>

        <div
          data-aos="fade-up"
          className="rounded-lg mt-10 col-span-2 flex flex-col-reverse lg:flex-row relative bg-[#241275B2] shadow-2xl overflow-hidden max-h-[30rem]"
        >
          <div className="lg:w-1/2 ms-auto px-10 py-5 lg:p-14 flex items-center">
            <div className="text-white">
              <BiBulb size={30} />
              <h3 className="font-bold text-xl mt-5">{currentBtn}</h3>
              {/* <p className="text-sm mt-3">
                Build proof-of-work through mentorship.{" "}
                <strong>Sharpen your skills with real challenges.</strong>{" "}
                Showcase projects that employers value.
              </p> */}
              {currentBtn === "Talents" && (
                <ul className=" list-disc px-3 text-sm mt-3 " >
                  <li>Access real world challenge based porject guided by experts.</li>
                  <li>Generate a trackable and verifiable portfolio.</li>
                  <li>Earn rewards and real life opportunities.</li>
                  <li>Build your desired career path.</li>
                </ul>
              )}
              {currentBtn === "Coaches" && (
                <ul className=" list-disc px-3 text-sm mt-3 " >
                  <li>Guide talents through portfolio building.</li>
                  <li>Share your and monetise your expertise and earn rewards.</li>
                  <li>Grow your influences and build your brand.</li>
                </ul>
              )}
              {currentBtn === "Organizations" && (
                <ul className=" list-disc px-3 text-sm mt-3 " >
                  <li>Share real world problems and get top solutions.</li>
                  <li>Sustain and build your talent pipeline by hosting talent haunt programs such as internships, hackathons, apprenticeships,etc   and gain access to top digital and tech talents</li>
                  <li>Reach new audiences and gather insights that matter.</li>
                  <li>Train your internal team and grow your business.</li>
                </ul>
              )}
              {currentBtn !== "Coaches" && (
                <button onClick={() => router.push("/auth")} className="text-xs flex gap-1 items-center bg-[#99A3FF] rounded-full py-3 px-4 border border-white/20 mt-8">
                  Get Started <FaArrowRight />
                </button>
              )}
              {currentBtn === "Coaches" && (
                <Coachbtn type="first" />
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
