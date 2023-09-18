import HeroSection from "@components/sections/HeroSection";
import AboutsUsSection from "@components/sections/AboutUsSection";
import FeaturedProjectSection from "@components/sections/FeaturedProjectsSection";
import FAQsSection from "@components/sections/FAQsSection";

const Homepage = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <AboutsUsSection />
      <FeaturedProjectSection />
      <FAQsSection />
    </div>
  );
};

export default Homepage;
