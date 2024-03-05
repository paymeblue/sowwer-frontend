type PaymentChannels =
  | "bank"
  | "card"
  | "qr"
  | "ussd"
  | "mobile_money"
  | "eft"
  | "bank_transfer"
  | "payattitude";

export interface IProps {
  amount: number;
  email: string;
  reference: string;
  channels?: PaymentChannels[];
}

export interface IPaystackConfig extends IProps {
  publicKey: string;
}

// trigger deploy

const PAYSTACK_PB_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PB_LIVE_KEY!;

const usePaystackConfig = () => {
  const getConfig = ({ amount, email, reference, channels }: IProps) => {
    const config: IPaystackConfig = {
      amount,
      email,
      reference,
      publicKey: PAYSTACK_PB_KEY,
    };

    if (channels) {
      config.channels = channels;
    }
    return config;
  };
  return { getConfig };
};

export default usePaystackConfig;
