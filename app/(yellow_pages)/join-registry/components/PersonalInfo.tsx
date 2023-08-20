import { usePathname, useSearchParams } from "next/navigation";
import MissionaryForm from "./MissionaryForm";
import RegistrationSuccess from "./RegistrationSuccess";
import WidowForm from "./WidowForm";

const PersonalInfo = () => {
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const path = `${pathname}?${searchparams}`;
  console.log(path, "path");
  return (
    <div className="text-start">
      {path === "/join-registry?category=widow" && <WidowForm />}
      {path === "/join-registry?category=missionary" && <MissionaryForm />}
      {path === "/join-registry?status=registration-success" && (
        <RegistrationSuccess />
      )}
    </div>
  );
};

export default PersonalInfo;
