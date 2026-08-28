"use client";

import JoinUs from "@shared/JoinUs";
import { aboutPhotos } from "@lib/soowerContent";
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
      {/* Real footage lands third — it is the strongest proof on the page, so
          it runs before the explanatory sections rather than after them. */}
      <VideoGallery />
      <HelpingHand />
      <ProgramsGrid />
      <Moments />
      <RippleTestimonials />
      <FAQs />
      <JoinUs
        img={aboutPhotos.teamHq}
        alt="The SOOWER team at the foundation's Abuja office"
      />
    </main>
  );
};

export default HomePage;
