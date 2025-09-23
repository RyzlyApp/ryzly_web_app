import Creators from "@/components/main-landing-page/Creators";
import FAQs from "@/components/main-landing-page/FAQs";
import Hero from "@/components/main-landing-page/Hero";
import Impact from "@/components/main-landing-page/Impact";
import LatestChallenges from "@/components/main-landing-page/LatestChallenges";
import Marquee from "@/components/main-landing-page/Marquee";
import Places from "@/components/main-landing-page/Places";
import Who from "@/components/main-landing-page/Who";
import WhyRhyzly from "@/components/main-landing-page/WhyRhyzly";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <LatestChallenges />
      <WhyRhyzly />
      <Places />
      <Who />
      <Creators />
      <Impact />
      <FAQs />
    </>
  );
};

export default page;
