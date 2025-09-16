import Link from "next/link";
import React from "react";

const Navbar = ({ openModal }: { openModal: () => void }) => {
  return (
    <nav className="px-[5%] absolute w-full lg:px-[10%] py-8 bg-transparent">
      <div className="flex justify-between items-center 2xl:container mx-auto">
        <Link href="/">
          <img src="/LogoLight.svg" alt="ryzlyLogo" className="w-[150px]" />
        </Link>
         
        <div>
          <button
            onClick={openModal}
            className="bg-[#5160E7] text-xs lg:text-sm font-semibold text-white px-6 py-3 rounded-full"
          >
            Join the waitlist
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
