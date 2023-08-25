import { usePathname, useSearchParams } from "next/navigation";
import MissionaryForm from "./MissionaryForm";
import RegistrationSuccess from "./RegistrationSuccess";
import WidowForm from "./WidowForm";

const PersonalInfo = () => {
  const pathname = usePathname();
  const searchparams = useSearchParams();

  switch (`${pathname}?${searchparams}`) {
    case "/join-registry?category=widow":
      return <WidowForm />;
    case "/join-registry?category=missionary":
      return <MissionaryForm />;
    case "/join-registry?category=registration-success":
      return <RegistrationSuccess />;
    default:
      return <RegistrationSuccess />;
  }
};

export default PersonalInfo;
