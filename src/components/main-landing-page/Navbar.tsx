import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
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
      <div className="bg-white rounded-3xl py-5 px-5 flex items-center justify-between">
        <div className="">
          <Image
            width={1000}
            height={1000}
            src="/MainBrandLogo.png"
            alt=""
            className="w-[100px]"
          />
        </div>

        <div className="flex gap-10">
          {links.map((lnk, index) => (
            <Link key={index} href={lnk.route} className="text-black text-xs">
              {lnk.name}
            </Link>
          ))}
        </div>

        <Link href="/login" className="lg:hidden">
          login
        </Link>

        <div className="text-xs flex gap-5 items-center">
          <Link href="/login" className="p-3">
            Login
          </Link>
          <Link
            href="/getstarted"
            className="px-5 py-3 bg-[#1D1348] rounded-full text-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
