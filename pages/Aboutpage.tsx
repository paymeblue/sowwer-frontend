import SectionContainer from "@components/sections/SectionContainer";
import PartnersSection from "@components/sections/PartnersSection";

// Import Swiper styles
import "swiper/css";
import AboutIntroSection from "@components/sections/AboutIntroSection";
import AboutMissionVisionSection from "@components/sections/AboutMissionVisionSection";
import AboutMidSection from "@components/sections/AboutMidSection";

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
