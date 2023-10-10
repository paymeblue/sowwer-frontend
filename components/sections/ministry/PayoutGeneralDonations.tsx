import Loader from "@components/shared/Loader";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { Button } from "@components/ui/button";
import { useToast } from "@components/ui/use-toast";
import useUserAuth from "@hooks/auth/useUserAuth";
import { formatCurrency } from "@lib/functions";
import { useGetBalanceQuery } from "services/ministry";
import { useRequestMinistryPayoutMutation } from "services/payouts";

const PayoutGeneralDonationsComp = () => {
  const { user } = useUserAuth();
  const { toast } = useToast();
  const [requestPayout, { isLoading: loadingPayout, isSuccess }] =
    useRequestMinistryPayoutMutation();
  const { data: balance, isLoading } = useGetBalanceQuery({
    ministryId: user?.ministry?.id || "",
  });

  const handleRequest = async () => {
    if (!user?.ministry?.id) return;
    try {
      await requestPayout(user?.ministry?.id).unwrap();
      toast({
        title: "Payout requested successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to request payout",
      });
    }
  };

  if (isLoading) {
    return <Loader className="h-[40vh]" />;
  }
  return (
    <div className="flex aspect-[1/0.5] w-[30%] flex-col items-center justify-between rounded-lg bg-white px-6 py-6">
      <div>
        <h4 className="text-boy-2 text-center font-body text-[0.6rem] uppercase">
          total general donations
        </h4>
        <p className="text-center font-body text-[1.3rem] font-[700] capitalize">
          ₦{formatCurrency(balance?.data.balance || "")}
        </p>
      </div>
      <Button
        onClick={handleRequest}
        loading={loadingPayout}
        disabled={isSuccess || !Number(balance?.data.balance || "0")}
        variant="outline"
        className=" border-accent text-accent"
      >
        Request payout
      </Button>
    </div>
  );
};

const PayoutGeneralDonations = () => {
  return (
    <NoSSRWrapper>
      <PayoutGeneralDonationsComp />
    </NoSSRWrapper>
  );
};

export default PayoutGeneralDonations;
