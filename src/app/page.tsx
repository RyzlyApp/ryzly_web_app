"use client";

import Footer from "@/components/landing-page/Footer";
import { LenisProvider } from "@/components/landing-page/LenisProvider";
import Navbar from "@/components/landing-page/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { LiaLightbulb } from "react-icons/lia";
import { RiNodeTree, RiTeamLine } from "react-icons/ri";

export default function Home() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 40);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const whys = [
    {
      heading: "Learn by doing",
      color: "bg-blue-500",
      desc: "Get access to real-world briefs not theory. Rhyzly helps you build a trackable project record that speaks louder than words.",
    },
    {
      heading: "Expert guidance",
      color: "bg-lime-300",
      desc: "Get access to real-world briefs not theory. Rhyzly helps you build a trackable project record that speaks louder than words.",
    },
    {
      heading: "Real Impact",
      color: "bg-blue-950",
      desc: "Get access to real-world briefs not theory. Rhyzly helps you build a trackable project record that speaks louder than words.",
    },
  ];

  const who = [
    {
      heading: "Creators",
      desc: "Build real proof-of-work with mentorship",
      icon: <LiaLightbulb size={25} />,
    },
    {
      heading: "Coaches",
      desc: "Share expertise, develop students, grow your reputation",
      icon: <RiTeamLine size={25} />,
    },
    {
      heading: "organizations",
      desc: "Engage new talent on meaningful projects",
      icon: <RiNodeTree size={25} />,
    },
  ];

  return (
    <LenisProvider>
      <div>
        <Navbar />
        <section className="bg-gradient-to-b from-[#1D1348] to-blue-500 via-[#1D1348] py-32 px-[5%] lg:px-[10%]">
          <div className="flex flex-col lg:flex-row 2xl:container mx-auto gap-20">
            <div className="lg:w-3/5 flex flex-col justify-center">
              <h1 className="text-2xl mt-10 lg:text-4xl font-semibold text-white my-auto">
                Real challenges for human potential Rhyzly is a challenge-based
                learning platform trusted by creators, coaches, and companies to
                turn real problems into real impact.
              </h1>
            </div>
            <div className="lg:w-2/5">
              <div className="bg-white rounded-lg p-5">
                <h1 className="text-3xl font-semibold">Join the waitlist</h1>
                <form action="" className="w-full mt-5">
                  <p className="text-gray-500 text-sm font-semibold">
                    What&apos;s your name?
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="px-4 py-4 border rounded-lg w-full text-sm font-semibold mt-1"
                  />

                  <p className="text-gray-500 text-sm font-semibold mt-3">
                    Email
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your email address"
                    className="px-4 py-4 border rounded-lg w-full text-sm font-semibold mt-1"
                  />
                  <button className="cursor-pointer w-full bg-blue-600 text-white font-semibold text-sm py-3 rounded-full mt-5">
                    Join the waitlist
                  </button>
                </form>
                <div className="flex items-center justify-around mt-5">
                  <div className="flex flex-col items-center">
                    <h4 className="text-xl font-semibold">{timeLeft.days}</h4>
                    <p className="text-sm">Days</p>
                  </div>

                  <h1 className="text-2xl font-bold">:</h1>

                  <div className="flex flex-col items-center">
                    <h4 className="text-xl font-semibold">{timeLeft.hours}</h4>
                    <p className="text-sm">Hours</p>
                  </div>

                  <h1 className="text-2xl font-bold">:</h1>

                  <div className="flex flex-col items-center">
                    <h4 className="text-xl font-semibold">
                      {timeLeft.minutes}
                    </h4>
                    <p className="text-sm">Minutes</p>
                  </div>

                  <h1 className="text-2xl font-bold">:</h1>

                  <div className="flex flex-col items-center">
                    <h4 className="text-xl font-semibold">
                      {timeLeft.seconds}
                    </h4>
                    <p className="text-sm">Seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="p">
          <div className="2xl:container mx-auto flex">
            <div
              className="w-[300px] lg:w-[400px]"
              style={{
                backgroundImage: "url(/bannerImage.png)",
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="w-full h-full bg-gradient-to-l from-lime-200 via-transparent to-transparent"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center bg-gradient-to-l py-10 from-lime-600 to-lime-200 px-5 lg:px-10 w-full">
              <h3 className="font-semibold text-xs lg:text-base w-3/4 text-center">
                Where creators grow, coaches lead, <br /> and companies solve
                real problems.
              </h3>
              <button className="bg-white text-xs lg:text-base font-semibold rounded-full px-5 py-3 text-blue-500 mt-3 lg:mt-0 lg:ms-auto">
                Join the waitlist
              </button>
            </div>
          </div>
        </div>

        <section className="px-[5%] lg:px-[10%] py-32 bg-gray-100">
          <div className="flex flex-col lg:flex-row items-center">
            <div
              style={{
                backgroundImage: "url(/staredImage.png",
                backgroundSize: "cover",
              }}
              className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] translate-y-10 lg:translate-x-10 z-10"
            />
            <div className="-tanslate-y-10 lg:-translate-x-10 rounded-full w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] text-xl lg:text-3xl font-bold bg-blue-500 text-white grid place-content-center p-10 lg:p-14 text-center">
              We’re Changing How People Learn and Grow Through Real Challenges
            </div>
          </div>
        </section>

        <section className="px-[5%] lg:px-[10%] py-32">
          <div>
            <h1 className="text-5xl lg:text-8xl text-blue-500 font-bold text-center">
              <span className="text-blue-950">Why</span> rhyzly
            </h1>

            <div className="flex flex-col lg:flex-row items-center gap-5 justify-center mt-20">
              {whys.map((why, index) => (
                <div
                  key={index}
                  className={`${why.color} ${
                    index % 2 !== 0 ? "text-gray-950" : "text-white"
                  } w-[300px] h-[300px] rounded-full p-10 grid place-content-center text-center`}
                >
                  <h3 className="text-2xl font-bold">{why.heading}</h3>
                  <p className="text-xs mt-4">{why.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-[5%] lg:px-[10%] py-32 bg-gray-300">
          <div>
            <h1 className="text-4xl lg:text-6xl text-[#1D1348] font-bold text-center">
              Who&apos;s Rhyzly <br /> For?{" "}
            </h1>
            <div className="flex flex-col lg:flex-row gap-5 justify-center mt-20">
              {who.map((w, index) => (
                <div
                  key={index}
                  className={`${
                    index % 2 !== 0 ? "bg-[#FC7753]" : "bg-white"
                  } py-14 lg:py-20 flex flex-col relative lg:w-1/3 items-center px-8 rounded-xl overflow-hidden
                `}
                >
                  {index % 2 !== 0 && (
                    <div className="absolute -top-[200px]  -bottom-0 z-30 bg-white w-[200px] h-[300px] blur-3xl"></div>
                  )}
                  <span>{w.icon}</span>
                  <h3 className="text-2xl font-extrabold mt-3">{w.heading}</h3>
                  <p className="text-center text-sm mt-4 w-2/3 mx-auto">
                    {w.desc}
                  </p>
                  <Link
                    href=""
                    className="font-semibold flex gap-2 items-center text-xs mt-10"
                  >
                    Join the waitlist <FaArrowRightLong />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </LenisProvider>
  );
}
