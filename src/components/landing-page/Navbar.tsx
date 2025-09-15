import Link from "next/link";
import React from "react";
import { CustomImage } from "../custom";

const Navbar = () => {
  return (
    <nav className="px-[5%] absolute w-full lg:px-[10%] py-8 bg-transparent">
      <div className="flex justify-between items-center 2xl:container mx-auto">
        {/* <Link href="/">
          <Image src="/ryzlyLogo.png" alt="ryzlyLogo" width={150} className="w-[150px]" />
        </Link> */}
        <Link href="/">
          <div className="w-[150px] h-9 "  >
            <CustomImage
              src="/ryzlyLogo.png"
              alt="ryzlyLogo"
              fillContainer 
              className="rounded-full"
            />
          </div>
        </Link> 
        <div>
          <Link
            href=""
            className="bg-blue-500 text-xs lg:text-sm font-semibold text-white px-6 py-3 rounded-full"
          >
            Join the waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
