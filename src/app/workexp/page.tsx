"use client";

import React, { useState } from "react";
import AOSProvider from "@/components/AOSProvider";
import UnauthorisedLayout from "@/components/shared/unauthorisedLayout";
import Footer from "@/components/main-landing-page/Footer";
import {
  Hero,
  PracticeJob,
  WhatYouGet,
  TracksSection,
  WhyRyzlySection,
  WorkplacePillars,
  PricingSection,
  WorkExpFAQs,
  EnrollModal,
} from "@/components/workexp";
import { Track } from "@/components/workexp/types";

export default function WorkExp() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenEnroll = (track?: Track) => {
    if (track) {
      setSelectedTrack(track);
    }
    setIsModalOpen(true);
  };

  return (
    <AOSProvider>
      <UnauthorisedLayout main={true}>
        <div className="w-full min-h-screen bg-[#1D1348] text-white font-figtree selection:bg-[#5160E7] selection:text-white relative overflow-x-hidden">
          <Hero onOpenEnroll={() => handleOpenEnroll()} />
          <PracticeJob />
          <WhatYouGet />
          <TracksSection onOpenEnroll={handleOpenEnroll} />
          <WhyRyzlySection />
          <WorkplacePillars />
          <PricingSection onOpenEnroll={() => handleOpenEnroll()} />
          <WorkExpFAQs />
          <Footer />

          <EnrollModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedTrack={selectedTrack}
          />
        </div>
      </UnauthorisedLayout>
    </AOSProvider>
  );
}
