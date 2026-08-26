"use client";

import JoinUs from "@shared/JoinUs";
import { josMedia } from "@lib/soowerContent";
import FAQs from "./FAQs";
import Hero from "./Hero";
import ImpactStats from "./ImpactStats";
import HelpingHand from "./HelpingHand";
import ProgramsGrid from "./ProgramsGrid";
import Moments from "./Moments";
import VideoGallery from "./VideoGallery";
import RippleTestimonials from "./RippleTestimonials";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <ImpactStats />
      <HelpingHand />
      <ProgramsGrid />
      <Moments />
      <VideoGallery />
      <RippleTestimonials />
      <FAQs />
      <JoinUs
        img={josMedia.widowPortraitBlue}
        alt="A widow supported through SOOWER's welfare programme in Jos"
      />
    </main>
  );
};

export default HomePage;
