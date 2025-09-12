import { LenisProvider } from "@/components/landing-page/LenisProvider";
import Hero from "@/components/main-landing-page/Hero";
import LatestChallenges from "@/components/main-landing-page/LatestChallenges";
import Marquee from "@/components/main-landing-page/Marquee";
import Navbar from "@/components/main-landing-page/Navbar";
import React from "react";

const page = () => {
  return (
    <LenisProvider>
      <Navbar />
      <Hero />
      <Marquee />
      <LatestChallenges />
    </LenisProvider>
  );
};

export default page;
