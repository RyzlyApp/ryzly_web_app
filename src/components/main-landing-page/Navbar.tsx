"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const links: { name: string; route: string }[] = [
    {
      name: "Challenges",
      route: "",
    },
    {
      name: "Portfolio",
      route: "",
    },
    {
      name: "Why Rhyzly",
      route: "",
    },
    {
      name: "For Coaches",
      route: "",
    },
    {
      name: "For Organisations",
      route: "",
    },
  ];
  return (
    <nav className="absolute top-0 px-[5%] lg:px-[10%] py-5 w-full z-50">
      <div
        className={`bg-white relative ${
          menuOpen && "rounded-b-none"
        } rounded-3xl py-4 px-5 flex items-center lg:justify-between`}
      >
        <div className="">
          <Image
            width={1000}
            height={1000}
            src="/MainBrandLogo.png"
            alt=""
            className="w-[100px]"
          />
        </div>

        <div
          className={`${
            menuOpen ? "top-[100%]" : "-top-[600%]"
          } flex flex-col lg:flex-row bg-white px-10 lg:px-0 py-8 lg:py-0 ms-auto rounded-b-3xl lg:rounded-none w-full left-0 lg:ms-auto lg:w-fit absolute lg:relative gap-10 translate-all duration-300`}
        >
          {links.map((lnk, index) => (
            <Link
              key={index}
              href={lnk.route}
              className="text-black text-xs px-2 py-1"
            >
              {lnk.name}
            </Link>
          ))}
          <Link href="/auth/signup" className="lg:hidden text-xs">
            login
          </Link>
        </div>

        <div className="text-xs flex gap-5 items-center ms-auto">
          <Link href="/auth" className="p-3 hidden lg:block">
            Login
          </Link>
          <Link
            href="/getstarted"
            className="px-5 py-3 bg-[#1D1348] rounded-full text-white"
          >
            Get Started
          </Link>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="cursor-pointer p-2 ms-5 lg:hidden bg-gray-300 rounded-full"
        >
          <FaBars />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
