"use client";
import User from "@components/assets/svg/User";
import Bank from "@components/assets/svg/Bank";
import Speaker from "@components/assets/svg/Speaker";
import ActionItemCard from "@components/cards/ActionItemCard";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import useUserAuth from "@hooks/auth/useUserAuth";

const MinistryHomepageComp = () => {
  const { user } = useUserAuth();
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full rounded-[10px] bg-white md:w-[70%] lg:w-[50%]">
        <div className="flex w-full flex-col border-b-[2px] border-accent p-4">
          <h2 className="text_large_header_b capitalize">
            Welcome, {user?.firstName}!
          </h2>
          <p className="text_regular_body_p ">
            Let’s get you set up to start using Soower!
          </p>
        </div>

        <div className="flex w-full flex-col">
          <ActionItemCard
            icon={<User />}
            title="Set up your ministry's profile"
            route="/ministry/settings"
          />
          <ActionItemCard
            icon={<Bank />}
            title="Connect your payout method"
            route="/ministry/payouts"
          />
          <ActionItemCard
            icon={<Speaker />}
            title="Create your first project"
            last
            route="/ministry/projects"
            right={
              <>
                {user?.ministry?.verificationStatus ? (
                  <span className="text_tiny_body_r font-[500] text-[#219653]">
                    Verified
                  </span>
                ) : (
                  <span className="text_tiny_body_r font-[500] text-[#EB5757]">
                    Awaiting Verification
                  </span>
                )}
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

const MinistryHomepage = () => {
  return (
    <NoSSRWrapper>
      <MinistryHomepageComp />
    </NoSSRWrapper>
  );
};

export default MinistryHomepage;
