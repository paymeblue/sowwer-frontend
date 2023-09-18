import HeroSection from "@components/sections/HeroSection";
import AboutsUsSection from "@components/sections/AboutUsSection";
import FeaturedProjectSection from "@components/sections/FeaturedProjectsSection";

const Homepage = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutsUsSection />
      <FeaturedProjectSection />
    </div>
  );
};

export default Homepage;
