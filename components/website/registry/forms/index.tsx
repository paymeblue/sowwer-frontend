"use client";

import { useParams } from "next/navigation";
import RegistryTabLayout from "../registry-tab";
import MinistryForm from "./ministry";
import MissionForm from "./mission";
import OrphanageForm from "./orphanage";
import WidowForm from "./widow";

type Param = "widow" | "orphanage" | "mission" | "ministry";
const RegistryForms = () => {
  const params = useParams();
  const id = params.id as Param;
  const preffix = id === "ministry" ? "ministries" : `${id}s`;
  return (
    <RegistryTabLayout>
      <div className="flex flex-col items-center justify-center">
        <h5 className="m-0 p-0 font-aeonik text-[24px] font-medium tracking-[-0.12px] text-black">
          Join the registry for {preffix}
        </h5>
        <p className="text-[15px] text-body-2">
          Register below to become part of our network and we’ll be in touch.
        </p>
      </div>
      {id === "widow" ? (
        <WidowForm />
      ) : id === "orphanage" ? (
        <OrphanageForm />
      ) : id === "mission" ? (
        <MissionForm />
      ) : id === "ministry" ? (
        <MinistryForm />
      ) : null}
    </RegistryTabLayout>
  );
};

export default RegistryForms;
