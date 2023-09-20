import HeroSection from "@components/sections/landing/HeroSection";
import AboutsUsSection from "@components/sections/landing/AboutUsSection";
import FeaturedProjectSection from "@components/sections/landing/FeaturedProjectsSection";
import FAQsSection from "@components/sections/landing/FAQsSection";

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
