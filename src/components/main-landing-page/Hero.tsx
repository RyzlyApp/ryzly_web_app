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
    <section className="bg-[#D7D3E8] pt-26 lg:pt-32 pb-20 px-[5%] lg:px-[10%] relative overflow-hidden">
      <div className="2xl:container mx-auto flex flex-col lg:flex-row pb-[15rem] lg:pb-0">
        <div className="lg:w-1/2" data-aos="fade-right">
          <h1 className="text-[#1D1348] font-bold text-6xl text-center lg:text-start lg:text-8xl mt-10">
            Showcase Your <span className="text-[#5160E7]">Skills</span>
          </h1>
          <p className="text-xs lg:text-sm my-5 lg:my-10 text-center lg:text-start">
            Join challenges, get mentored, and build an impressive <br />{" "}
            portfolio that stands out to employers and clients.
          </p>
          <div className="flex flex-col lg:flex-row gap-3 px-5 lg:px-0">
            <Link
              href="/challenges"
              className="flex gap-4 bg-[#5160E7] justify-center text-center rounded-full px-5 py-3 items-center text-sm text-white"
            >
              Explore Challenges <FaArrowRight className="hidden lg:block" />
            </Link>
            <Link
              href="/portfolio"
              className="text-sm text-center bg-white rounded-full px-4 py-3"
            >
              View Portfolio
            </Link>
          </div>
          <div className="flex gap-10 lg:gap-20 mt-10">
            {stats.map((stat, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <h3 className="text-xl lg:text-3xl font-bold">{stat.number}</h3>
                <p className="text-xs mt-1s">{stat.heading}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <img
            alt=""
            src="/landingPage/BackDesign.png"
            className="h-[350px] w-[350px] lg:w-[500px] lg:h-[500px] rounded-l-2xl absolute -bottom-20 lg:top-40 lg:right-48"
          ></img>
          <img
            src="/landingPage/HeroImage.png"
            alt=""
            className="hidden lg:block w-[55rem] bottom-0 right-20 absolute"
          />
          <img
            src="/landingPage/mobileHeroImage.png"
            alt=""
            className="block lg:hidden w-[55rem] bottom-0 left-0 lg:right-20  absolute"
          />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Hero;
