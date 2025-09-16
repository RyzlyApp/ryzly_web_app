import { LenisProvider } from "@/components/landing-page/LenisProvider";
import Creators from "@/components/main-landing-page/Creators";
import FAQs from "@/components/main-landing-page/FAQs";
import Footer from "@/components/main-landing-page/Footer";
import Hero from "@/components/main-landing-page/Hero";
import Impact from "@/components/main-landing-page/Impact";
import LatestChallenges from "@/components/main-landing-page/LatestChallenges";
import Marquee from "@/components/main-landing-page/Marquee";
import Navbar from "@/components/main-landing-page/Navbar";
import Places from "@/components/main-landing-page/Places";
import Who from "@/components/main-landing-page/Who";
import WhyRhyzly from "@/components/main-landing-page/WhyRhyzly";
import React from "react";

const page = () => {
  return (
    <LenisProvider>
      <Navbar />
      <Hero />
      <Marquee />
      <LatestChallenges />
      <WhyRhyzly />
      <Places />
      <Who />
      <Creators />
      <Impact />
      <FAQs />
      <Footer />
    </LenisProvider>
  );
};

export default page;
