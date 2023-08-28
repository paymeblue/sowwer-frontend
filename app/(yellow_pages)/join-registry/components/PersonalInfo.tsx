import { usePathname, useSearchParams } from "next/navigation";
import MissionaryForm from "./MissionaryForm";
import SelectCategory from "./SelectCategory";
import WidowForm from "./WidowForm";

const PersonalInfo = () => {
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const path = `${pathname}${searchparams}`;

  if (path === "/join-registry?category=widow") {
    return <WidowForm />;
  } else if (path === "/join-registry?category=missionary") {
    return <MissionaryForm />;
  }
  // You might want to provide a default behavior here
  // if the path doesn't match any of the conditions.
  // For example:
  return <SelectCategory />;
};

export default PersonalInfo;
