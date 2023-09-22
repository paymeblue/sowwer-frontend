import { Switch } from "@components/ui/switch";
import { TabWrapper } from "./TabContentWrapper";

interface Props {
  title: string;
  desc: string;
}
const NotificationItem = ({ title, desc }: Props) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col space-y-2">
        <h4 className="text_medium_body_p font-[700] leading-none">{title}</h4>
        <p className="text_regular_body_p leading-none">{desc}</p>
      </div>
      <Switch />
    </div>
  );
};

const Notifications = () => {
  return (
    <TabWrapper>
      <div className="flex w-full flex-col space-y-10">
        <NotificationItem
          title="New Project Donation"
          desc="Sent when a new donation is made to a project."
        />
        <NotificationItem
          title="Project Goal Achieved"
          desc="Sent when a project’s funding goal is achieved."
        />
        <NotificationItem
          title="General Donation"
          desc="Sent when new general donations are made (one-time or recurring)."
        />
        <NotificationItem
          title="Ongoing Recurring Donation"
          desc="Sent when a recurring donation is automatically processed after the initial charge."
        />
        <NotificationItem
          title="Recurring Donation Events"
          desc="Sent when a recurring donation is canceled, paused, resumed, updated, or fails to process."
        />
        <NotificationItem
          title="New Payout Transaction"
          desc="Sent when a payout request is approved and payment is processed."
        />
      </div>
    </TabWrapper>
  );
};

export default Notifications;
