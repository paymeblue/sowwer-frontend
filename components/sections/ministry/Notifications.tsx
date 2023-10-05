"use client";
import {
  useGetNotificationQuery,
  useUpdateNotificationMutation,
} from "services/notifications";
import { Switch } from "@components/ui/switch";
import { TabWrapper } from "./TabContentWrapper";
import Loader from "@components/shared/Loader";
import EmptyState from "@components/shared/EmptyState";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import { useToast } from "@components/ui/use-toast";

interface Props {
  title: string;
  desc: string;
  checked: boolean;
  label: string;
}
const NotificationItem = ({ title, desc, checked, label }: Props) => {
  const [updateNotification, { isLoading }] = useUpdateNotificationMutation();
  const { toast } = useToast();

  const toggleNotifaction = async () => {
    try {
      await updateNotification({
        [label]: !checked,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to update notification",
      });
    }
  };
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col space-y-2">
        <h4 className="text_medium_body_p font-[700] leading-none">{title}</h4>
        <p className="text_regular_body_p leading-none">{desc}</p>
      </div>
      <Switch
        loading={isLoading}
        checked={checked}
        onClick={toggleNotifaction}
      />
    </div>
  );
};

const Notifications = () => {
  const { data: notifications, isLoading, isError } = useGetNotificationQuery();
  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }
  if (isError) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="Unable to load notifications"
        desc="Please ensure you have an active network connection"
        className="my-20"
      />
    );
  }

  if (!notifications?.data) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="Nothing to see here yet"
        desc="Notifications you can configure on your account will appear here."
        className="my-20"
      />
    );
  }

  const {
    generalDonation,
    ongoingRecuringDonation,
    payout,
    projectDonation,
    projectTarget,
    recuringDonation,
  } = notifications.data;

  return (
    <TabWrapper>
      <div className="flex w-full flex-col space-y-10">
        <NotificationItem
          title="New Project Donation"
          desc="Sent when a new donation is made to a project."
          checked={projectDonation}
          label="projectDonation"
        />
        <NotificationItem
          title="Project Goal Achieved"
          desc="Sent when a project’s funding goal is achieved."
          checked={projectTarget}
          label="projectTarget"
        />
        <NotificationItem
          title="General Donation"
          desc="Sent when new general donations are made (one-time or recurring)."
          checked={generalDonation}
          label="generalDonation"
        />
        <NotificationItem
          title="Ongoing Recurring Donation"
          desc="Sent when a recurring donation is automatically processed after the initial charge."
          checked={ongoingRecuringDonation}
          label="ongoingRecuringDonation"
        />
        <NotificationItem
          title="Recurring Donation Events"
          desc="Sent when a recurring donation is canceled, paused, resumed, updated, or fails to process."
          checked={recuringDonation}
          label="recuringDonation"
        />
        <NotificationItem
          title="New Payout Transaction"
          desc="Sent when a payout request is approved and payment is processed."
          checked={payout}
          label="payout"
        />
      </div>
    </TabWrapper>
  );
};

export default Notifications;
