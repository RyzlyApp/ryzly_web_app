import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const Hero = () => {
  const stats = [
    { heading: "Active Challenges", number: "2,500+" },
    { heading: "Pro Coaches", number: "15k+" },
    { heading: "Success Rate", number: "95%" },
  ];
  return (
    <section className="bg-[#D7D3E8] pt-32 pb-20 px-[5%] lg:px-[10%] relative overflow-hidden">
      <div className="2xl:container mx-auto flex">
        <div className="w-1/2">
          <h1 className="text-[#1D1348] font-bold text-8xl mt-10">
            Showcase Your <span className="text-[#5160E7]">Skills</span>
          </h1>
          <p className="text-sm my-10">
            Join challenges, get mentored, and build an impressive <br />{" "}
            portfolio that stands out to employers and clients.
          </p>
          <div className="flex gap-3">
            <Link
              href="/challenges"
              className="flex gap-4 bg-[#5160E7] rounded-full px-5 py-3 items-center text-sm text-white"
            >
              Explore Challenges <FaArrowRight />
            </Link>
            <Link
              href="/portfolio"
              className="text-sm bg-white rounded-full px-4 py-3"
            >
              View Portfolio
            </Link>
          </div>
          <div className="flex gap-20 mt-10">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-3xl font-bold">{stat.number}</h3>
                <p className="text-xs mt-1s">{stat.heading}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <img
            alt=""
            src="/landingPage/BackDesign.png"
            className="w-[500px] h-[500px] rounded-l-2xl absolute top-40 right-48"
          ></img>
          <Image
            src="/landingPage/HeroImage.png"
            alt=""
            width={1000}
            height={1000}
            className="w-[55rem] bottom-0 right-20 border absolute"
          />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Hero;
