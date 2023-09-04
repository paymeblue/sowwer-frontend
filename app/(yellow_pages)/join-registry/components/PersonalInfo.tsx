import { usePathname, useSearchParams } from "next/navigation";
import { Dispatch, Fragment } from "react";
import MissionaryForm from "./MissionaryForm";
import RegistrationSuccess from "./RegistrationSuccess";
import WidowForm from "./WidowForm";

const PersonalInfo = ({
  setCurrent,
  current,
}: {
  setCurrent: Dispatch<React.SetStateAction<number>>;
  current: number;
}) => {
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const path = `${pathname}?${searchparams}`;

  const prevHandler = () => {
    setCurrent((prev) => prev - 1);
  };

  let component;
  if (path === "/join-registry?category=widow") {
    component = <WidowForm prev={prevHandler} />;
  } else if (path === "/join-registry?category=missionary") {
    component = <MissionaryForm prev={prevHandler} />;
  } else if (path === "/join-registry?status=registration-success") {
    component = <RegistrationSuccess />;
  }

  return <Fragment>{component}</Fragment>;
};

export default PersonalInfo;
