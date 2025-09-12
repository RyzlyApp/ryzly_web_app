"use client";

import { Challenge } from "@/types";
import React, { useState } from "react";
import { BiMobile } from "react-icons/bi";
import { FaCode, FaPaintBrush } from "react-icons/fa";
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
            className="left-20 absolute w-[15rem] top-2"
          />
          <h1 className="text-4xl font-bold">Latest Challenges</h1>
        </div>

        <div className="mt-10">
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
      </div>
    </section>
  );
};

export default LatestChallenges;
