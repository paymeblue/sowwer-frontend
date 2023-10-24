import SectionContainer from "@components/sections/SectionContainer";
import PartnersSection from "@components/sections/landing/PartnersSection";

// Import Swiper styles
import "swiper/css";
import AboutIntroSection from "@components/sections/landing/AboutIntroSection";
import AboutMissionVisionSection from "@components/sections/landing/AboutMissionVisionSection";
import AboutMidSection from "@components/sections/landing/AboutMidSection";

const Aboutpage = () => {
  return (
    <div className="safearea-top">
      <AboutIntroSection />
      <SectionContainer>
        <AboutMissionVisionSection />
        <AboutMidSection />
      </SectionContainer>

      <PartnersSection />
    </div>
  );
};

export default Aboutpage;
