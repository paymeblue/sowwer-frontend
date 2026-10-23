"use client";
import SectionContainer from "@components/sections/SectionContainer";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import PageHero from "@components/shared/PageHero";
import ExploreProjectsTab from "@components/tabs/landing/ExploreProjectsTab";

const ExploreProjects = () => {
  return (
    <main>
      <PageHero
        eyebrow="Explore projects"
        title="Projects that put"
        accent="faith"
        titleEnd="to work"
        lede="Projects organised by churches and Christian organisations on SOOWER. Make a kingdom investment by giving to widows, orphans and missionaries across Nigeria."
      />
      <section className="bg-white py-12 md:py-16">
        <SectionContainer>
          <NoSSRWrapper>
            <ExploreProjectsTab />
          </NoSSRWrapper>
        </SectionContainer>
      </section>
    </main>
  );
};

export default ExploreProjects;
