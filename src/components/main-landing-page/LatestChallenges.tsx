"use client";

import { Challenge } from "@/types";
import React, { useState } from "react";
import { BiMobile } from "react-icons/bi";
import { FaCode, FaPaintBrush } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { GiSparkles } from "react-icons/gi";
import { TbWorld } from "react-icons/tb";

const LatestChallenges = () => {
  const [currentTab, setCurrentTab] = useState("All Challenges");
  const tabs: { name: string; icon: React.ReactNode }[] = [
    {
      name: "All Challenges",
      icon: <TbWorld size={16} />,
    },
    {
      name: "FrontEnd",
      icon: <FaCode size={16} />,
    },
    {
      name: "Design",
      icon: <FaPaintBrush size={16} />,
    },
    {
      name: "FullStack",
      icon: <BiMobile size={16} />,
    },
    {
      name: "AI/ML",
      icon: <GiSparkles size={16} />,
    },
  ];
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "FRNTD3922",
      duration: 3,
      image: "",
      skills: ["HTML", "CSS", "JavaScript"],
      title: "E-commerce Dashboard",
      description:
        "Build a comprehensive admin dashboard for an online store with analytics, inventory management, and order tracking.",
      winningPrice: 200,
      participatingPrice: 10,
    },
    {
      id: "FRNTD4821",
      duration: 2,
      image: "",
      skills: ["React", "Next.js", "Tailwind CSS"],
      title: "Portfolio Website",
      description:
        "Create a personal portfolio website to showcase your skills and projects. It should be responsive and visually appealing.",
      winningPrice: 150,
      participatingPrice: 5,
    },
    {
      id: "FRNTD9912",
      duration: 4,
      image: "",
      skills: ["React", "API Integration", "CSS"],
      title: "Weather Application",
      description:
        "Develop a weather application that fetches and displays weather data from a public API. Users should be able to search for cities.",
      winningPrice: 180,
      participatingPrice: 8,
    },
    {
      id: "BCKND5893",
      duration: 5,
      image: "",
      skills: ["Node.js", "Express", "MongoDB"],
      title: "RESTful API for a Blog",
      description:
        "Design and build a RESTful API for a blogging platform. It should include CRUD operations for posts and comments.",
      winningPrice: 250,
      participatingPrice: 15,
    },
    {
      id: "BCKND1234",
      duration: 6,
      image: "",
      skills: ["Python", "Django", "PostgreSQL"],
      title: "User Authentication System",
      description:
        "Implement a secure user authentication system with features like registration, login, password reset, and social logins.",
      winningPrice: 300,
      participatingPrice: 20,
    },
    {
      id: "DSGN7890",
      duration: 3,
      image: "",
      skills: ["Figma", "UI/UX Principles"],
      title: "Mobile Banking App UI",
      description:
        "Design a modern and user-friendly interface for a mobile banking application. Focus on usability and a clean aesthetic.",
      winningPrice: 220,
      participatingPrice: 12,
    },
  ]);
  return (
    <section className="px-[5%] lg:px-[10%] py-20 lg:py-32 bg-[#1D1348]">
      <div className="2xl:container mx-auto">
        <div className="text-white text-center relative">
          <img
            src="/landingPage/RainbowImage.png"
            alt=""
            className="left-0 lg:left-20 absolute w-[5rem] lg:w-[15rem] -top-5 lg:top-2"
          />
          <h1 className="text-3xl lg:text-4xl font-bold">Latest Challenges</h1>
        </div>

        <div className="hidden lg:block mt-10">
          <div className="bg-white rounded-full px-2 py-2 flex justify-between gap-1 w-fit mx-auto">
            {tabs.map((tab, index) => (
              <button
                onClick={() => setCurrentTab(tab.name)}
                key={index}
                className={`${
                  currentTab === tab.name ? "bg-[#5160E7] text-white" : ""
                } text-xs px-3 py-2 rounded-full cursor-pointer flex gap-2 items-center`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#596AFE] via-[#1D1348] to-[#596AFE] grid lg:grid-cols-3 p-5 lg:p-10 gap-5 rounded-3xl mt-10">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-white rounded-xl p-3 min-h-[10rem]">
              <img
                src="/landingPage/expertguidance.png"
                alt=""
                className="h-1/3 w-full object-cover rounded-xl"
              />
              <div className="flex gap-2 mt-3">
                {challenge.skills.map((skill, index) => {
                  const colors = [
                    "bg-[#FED5CA]",
                    "bg-[#B3BAFF8C]",
                    "bg-[#ECF5CA]",
                  ];
                  return (
                    <p
                      key={index}
                      className={`text-xs py-1 px-2 rounded-full ${colors[index]}`}
                    >
                      {skill}
                    </p>
                  );
                })}
              </div>
              <h3 className="text-xl font-semibold mt-5">{challenge.title}</h3>
              <p className="text-xs mt-1 text-gray-500">
                {challenge.description}
              </p>
              <div className="mt-5 flex gap-2 items-center">
                <FaMoneyBill color="#5160E7" />
                <p>
                  <span className="font-bold">
                    {" "}
                    {`$${challenge.winningPrice}`}
                  </span>{" "}
                  Winning Price
                </p>
              </div>
              <div className="mt-5">
                <h3 className="text-sm">{`$${challenge.participatingPrice}`}</h3>
                <p className="text-xs">Participating Price</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestChallenges;
