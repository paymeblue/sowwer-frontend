"use client";

import JoinCouncilForm from "@components/forms/council/JoinCouncilForm";
import SideLayoutWrapper from "@components/shared/Layouts/Side/SideLayoutWrapper";

const JoinCouncil = () => {
  return (
    <SideLayoutWrapper
      title="Join The SOOWER Council."
      shouldGoBack
      desc={
        <>
          <p>
            At SOOWER, accountability and representation are at the core of our
            mission. This council includes representatives from the very
            categories and demographics we aim to help—orphans, widows, and
            missionaries.
          </p>
          <p className="mt-4">
            Their firsthand insights and diverse perspectives ensure that our
            efforts are both impactful and truly aligned with the needs of those
            we serve. By holding us accountable and providing invaluable
            guidance, our council plays a crucial role in steering SOOWER toward
            meaningful and sustainable change.
          </p>
        </>
      }
    >
      <div className="mx-auto w-full lg:max-w-[500px]">
        <JoinCouncilForm />
      </div>
    </SideLayoutWrapper>
  );
};

export default JoinCouncil;
