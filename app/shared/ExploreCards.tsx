import { useExploreProjectsQuery } from "@store/services/projects";
import ReuseableCards from "./ReuseableCards";

const ExploreCards = ({ query }: { query: string | undefined }) => {
  return (
    <ReuseableCards
      rtkHook={useExploreProjectsQuery}
      prop={{ query }}
      emptyDesc="No Published Projects yet!"
      showSection
    />
  );
};

export default ExploreCards;
