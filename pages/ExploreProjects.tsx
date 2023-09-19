"use client";
import ProjectCard, { IProject } from "@components/cards/ProjectCard";
import SectionContainer from "@components/sections/SectionContainer";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";

const exploreProjects: IProject[] = [
  {
    image: "/assets/images/happy_wom.png",
    category: "widows",
    tagColor: "#9B51E0",
    bgColor: "#9747FF24",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    raised: "2 million",
    impacted: "52,000",
  },
  {
    image: "/assets/images/children_running.png",
    category: "orphans",
    tagColor: "#F2994A",
    bgColor: "#F2994A24",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    raised: "2 million",
    impacted: "52,000",
  },
  {
    image: "/assets/images/wom_busy.png",
    category: "missions",
    tagColor: "#2F80ED",
    bgColor: "#2F80ED24",
    title: "Name of project",
    subTitle: "BY FAMILY WORSHIP CENTER",
    desc: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitid dignissim ipsum arcu imperdiet pellentesque.",
    raised: "2 million",
    impacted: "52,000",
  },
];

const ExploreProjects = () => {
  return (
    <SectionContainer>
      <section className="safearea-top mb-20 w-full">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text_variant_h2 text-center">Explore Projects</h2>
          <p className="text_large_body_p w-[70%] text-center">
            Explore different projects being organized by Churches and other
            Christian Organizations on Soower. Make a kingdom investment by
            donating to widows, orphans and missionaries across Nigeria.
          </p>
        </div>
        <div className="mt-8 flex w-full flex-col items-center  justify-center">
          <h3 className="text_regular_body_sb text-center">
            Browse by category
          </h3>
          <Tabs defaultValue="all-projects" className="mt-4">
            <TabsList className="flex items-center space-x-2">
              <TabsTrigger value="all-projects">All Projects</TabsTrigger>
              <TabsTrigger value="widows">Widows</TabsTrigger>
              <TabsTrigger value="orphans">Orphans</TabsTrigger>
              <TabsTrigger value="missions">Missions</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="mt-10 grid w-full grid-cols-3 gap-12">
            {exploreProjects.map((project, i) => {
              return (
                <ProjectCard
                  {...project}
                  variant="default"
                  key={project.title + i}
                />
              );
            })}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
};

export default ExploreProjects;
