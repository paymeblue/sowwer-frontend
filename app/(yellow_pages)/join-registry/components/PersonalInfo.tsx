import { usePathname, useSearchParams } from "next/navigation";
import MissionaryForm from "./MissionaryForm";
import SelectCategory from "./SelectCategory";
import WidowForm from "./WidowForm";

const PersonalInfo = () => {
  const pathname = usePathname();
  const searchparams = useSearchParams();

  switch (`${pathname}?${searchparams}`) {
    case "/join-registry?category=widow":
      return <WidowForm />;
    case "/join-registry?category=missionary":
      return <MissionaryForm />;
    default:
      return <SelectCategory />;
  }
};

export default PersonalInfo;
