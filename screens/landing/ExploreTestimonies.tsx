"use client";
import SectionContainer from "@components/sections/SectionContainer";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import PageHero from "@components/shared/PageHero";
import ExploreTestimoniesSection from "@components/tabs/landing/ExploreTestimoniesSection";

const ExploreTestimonies = () => {
  return (
    <main>
      <PageHero
        eyebrow="Testimonies"
        title="Stories of"
        accent="hope,"
        titleEnd="told by the people who lived them"
        lede="Testimonies from recipients and donors, showing what the support given through SOOWER has made possible."
      />
      <section className="bg-white py-12 md:py-16">
        <SectionContainer>
          <NoSSRWrapper>
            <ExploreTestimoniesSection />
          </NoSSRWrapper>
        </SectionContainer>
      </section>
    </main>
  );
};

export default ExploreTestimonies;
