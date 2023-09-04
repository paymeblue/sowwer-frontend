interface ICustomer {
  email: string;
  phone_number: string;
  name: string;
}

interface ICustomizations {
  title: string;
  description: string;
  logo: string;
}

interface IProps {
  customer: ICustomer;
  amount: number;
  currency: string;
  desc: string;
  txnRef: string;
  paymentPlan?: string;
  recurring?: boolean;
}

interface IConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  payment_plan?: string;
  customer: ICustomer;
  customizations: ICustomizations;
}

const useFlutterConfig = ({
  customer,
  amount,
  currency,
  desc,
  txnRef,
  paymentPlan,
  recurring,
}: IProps): IConfig => {
  const config: IConfig = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!,
    tx_ref: txnRef,
    amount,
    currency,
    payment_options: recurring ? "card" : "card,mobilemoney,ussd",
    payment_plan: recurring ? paymentPlan : undefined,
    customer,
    customizations: {
      title: "Soower Donations",
      description: `Donation made for ${desc}`,
      logo: "",
    },
  };
  return config;
};

export default useFlutterConfig;
