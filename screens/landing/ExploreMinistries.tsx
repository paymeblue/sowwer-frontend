"use client";
import SectionContainer from "@components/sections/SectionContainer";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import PageHero from "@components/shared/PageHero";
import ExploreMinistriesTab from "@components/tabs/landing/ExploreMinistriesTab";

const ExploreMinistries = () => {
  return (
    <main>
      <PageHero
        eyebrow="Explore ministries"
        title="The ministries we"
        accent="stand"
        titleEnd="beside"
        lede="Churches and Christian organisations on SOOWER. Make a kingdom investment by giving to ministries across Nigeria and supporting their projects."
      />
      <section className="bg-white py-12 md:py-16">
        <SectionContainer>
          <NoSSRWrapper>
            <ExploreMinistriesTab />
          </NoSSRWrapper>
        </SectionContainer>
      </section>
    </main>
  );
};

export default ExploreMinistries;
