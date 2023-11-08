export interface IProps {
  amount: number;
  email: string;
  reference: string;
}

export interface IPaystackConfig extends IProps {
  publicKey: string;
}

const PAYSTACK_PB_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PB_LIVE_KEY!;

const usePaystackConfig = () => {
  const getConfig = ({ amount, email, reference }: IProps) => {
    const config: IPaystackConfig = {
      amount,
      email,
      reference,
      publicKey: PAYSTACK_PB_KEY,
    };
    return config;
  };
  return { getConfig };
};

export default usePaystackConfig;
