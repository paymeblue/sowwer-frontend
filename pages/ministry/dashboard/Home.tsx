import User from "@components/assets/svg/User";
import Bank from "@components/assets/svg/Bank";
import Speaker from "@components/assets/svg/Speaker";
import ActionItemCard from "@components/cards/ActionItemCard";

const MinistryHomepage = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[50%] rounded-[10px] bg-white">
        <div className="flex w-full flex-col border-b-[2px] border-accent p-4">
          <h2 className="text_large_header_b">Welcome, Victor!</h2>
          <p className="text_regular_body_p ">
            Let’s get you set up to start using Soower!
          </p>
        </div>

        <div className="flex w-full flex-col">
          <ActionItemCard
            icon={<User />}
            title="Set up your ministry's profile"
          />
          <ActionItemCard icon={<Bank />} title="Connect your payout method" />
          <ActionItemCard
            icon={<Speaker />}
            title="Create your first project"
            last
            right={
              <span className="text_tiny_body_r font-[500] text-[#EB5757]">
                Awaiting Verification
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MinistryHomepage;
