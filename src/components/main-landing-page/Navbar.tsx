"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  navLinks?: { name: string; route: string }[];
}

const Navbar = ({ navLinks }: NavbarProps = {}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const links: { name: string; route: string }[] = navLinks || [
    // {
    //   name: "Challenges",
    //   route: "",
    // },
    // {
    //   name: "Portfolio",
    //   route: "",
    // },
    // {
    //   name: "Why Ryzly",
    //   route: "",
    // },
    // {
    //   name: "For Coaches",
    //   route: "",
    // },
    // {
    //   name: "For Organisations",
    //   route: "",
    // },
  ];

  // Auto-close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="absolute font-figtree top-0 px-[4%] sm:px-[5%] lg:px-[10%] py-4 sm:py-5 w-full z-50">
        <div
          className={`bg-white relative ${
            menuOpen ? "rounded-t-3xl rounded-b-none shadow-2xl" : "rounded-full lg:rounded-3xl shadow-lg"
          } py-3 px-4 sm:py-4 sm:px-6 flex items-center justify-between transition-all duration-200 border border-gray-100/80`}
        >
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="shrink-0 flex items-center">
            <Image
              width={200}
              height={60}
              src="/MainBrandLogo.png"
              alt="Ryzly Logo"
              className="w-[85px] sm:w-[95px] lg:w-[105px] h-auto object-contain cursor-pointer"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9 mx-auto">
            {links.map((lnk, index) => (
              <Link
                key={index}
                href={lnk.route}
                className="text-gray-700 hover:text-[#5160E7] text-sm font-medium transition-colors duration-200 py-1"
              >
                {lnk.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4 text-sm shrink-0">
            <Link
              href="/auth"
              className="px-4 py-2 text-gray-700 hover:text-[#5160E7] font-semibold transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-5 py-2.5 bg-[#1D1348] hover:bg-[#2A1D6B] rounded-full text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Right Controls: Compact Get Started + Animated Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/auth/signup"
              onClick={() => setMenuOpen(false)}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#1D1348] text-white text-xs font-semibold rounded-full shadow-sm hover:bg-[#2A1D6B] transition-colors"
            >
              Get Started
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="p-2 sm:p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#1D1348] transition-colors flex items-center justify-center cursor-pointer"
            >
              {menuOpen ? <FaXmark className="text-base" /> : <FaBars className="text-base" />}
            </button>
          </div>

          {/* Mobile Dropdown Panel */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="lg:hidden absolute top-full left-0 w-full bg-white rounded-b-3xl shadow-2xl border-t border-gray-100 px-5 pt-4 pb-6 flex flex-col z-50 overflow-hidden"
              >
                {/* Mobile Links List */}
                {links.length > 0 && (
                  <div className="flex flex-col space-y-1 mb-5">
                    {links.map((lnk, index) => (
                      <Link
                        key={index}
                        href={lnk.route}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-800 hover:text-[#5160E7] hover:bg-[#EEF0FF]/60 text-sm font-semibold transition-colors"
                      >
                        <span>{lnk.name}</span>
                        <FiChevronRight className="text-gray-400 text-base" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Mobile Auth Actions */}
                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
                  <Link
                    href="/auth"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-2.5 text-center text-gray-800 hover:text-[#5160E7] text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMenuOpen(false)}
                    className="w-full py-2.5 text-center bg-[#5160E7] hover:bg-[#4352D9] text-white text-sm font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Create Account</span>
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Dimmed backdrop when mobile menu is open */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 lg:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
