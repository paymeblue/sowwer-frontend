import capitalizeFirstLetters from "@lib/capitalize";
import ReuseableCards from "@shared/ReuseableCards";
import { useGetMinistryProjectsQuery } from "@store/services/projects";

const MinistryProjects = ({
  id,
  createdBy,
}: {
  id: string;
  createdBy?: string;
}) => {
  return (
    <ReuseableCards
      rtkHook={useGetMinistryProjectsQuery}
      prop={{ id }}
      emptyDesc={`${capitalizeFirstLetters(
        createdBy
      )} has no published projects yet!`}
      showSection
    />
  );
};

export default MinistryProjects;
