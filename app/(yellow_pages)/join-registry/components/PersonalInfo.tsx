import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import MissionaryForm from "./MissionaryForm";
import WidowForm from "./WidowForm";
import RegistrationSuccess from "./RegistrationSuccess";

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
