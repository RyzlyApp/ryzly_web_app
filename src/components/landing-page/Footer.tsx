import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaRegCopyright,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = ({ openModal }: { openModal: () => void }) => {
  // const otherLinks = [
  //   {
  //     heading: "You can",
  //     links: [
  //       {
  //         name: "Join a challenge",
  //         route: "",
  //       },
  //       {
  //         name: "Become a coach",
  //         route: "",
  //       },
  //       {
  //         name: "Create a challenge",
  //         route: "",
  //       },
  //     ],
  //   },
  //   {
  //     heading: "company",
  //     links: [
  //       {
  //         name: "Challenges",
  //         route: "",
  //       },
  //       {
  //         name: "Portfolio",
  //         route: "",
  //       },
  //       {
  //         name: "Why Rhyzly",
  //         route: "",
  //       },
  //     ],
  //   },
  // ];
  const socialLinks = [
    {
      link: "",
      icon: <FaXTwitter />,
    },
    {
      link: "",
      icon: <FaInstagram />,
    },
    {
      link: "",
      icon: <FaLinkedinIn />,
    },
    {
      link: "",
      icon: <FaFacebookF />,
    },
  ];
  return (
    <footer className="bg-[#1D1348] py-20 text-white px-[5%] lg:px-[10%]">
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-between items-center">
          <div>
            <img src="/LogoLight.svg" alt="" className="w-[22rem]" />
          </div>
          {/* <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:ms-auto">
            {otherLinks.map((col, index) => (
              <div key={index} className="">
                <h2 className="text-xl font-bold">{col.heading}</h2>
                <div className="flex flex-col gap-2 mt-3">
                  {col.links.map((link, index) => (
                    <Link key={index} href={link.route} className="text-sm">
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div> */}
          <div>
            <button
              onClick={openModal}
              className="bg-[#5160E7] cursor-pointer text-xs lg:text-sm font-semibold text-white px-6 py-3 rounded-full"
            >
              Join the waitlist
            </button>
          </div>
        </div>
        <div className="mt-20 flex flex-col lg:flex-row lg:justify-between">
          <p className="text-sm flex items-center gap-2">
            <FaRegCopyright />
            2025 Rhyzly, All rights reserved
          </p>
          <div className="flex gap-5 mt-10 lg:mt-0">
            {socialLinks.map((link, index) => (
              <Link key={index} href={link.link}>
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
