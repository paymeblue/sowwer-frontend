export interface IProps {
  amount: number;
  email: string;
  reference: string;
}

export interface IPaystackConfig extends IProps {
  publicKey: string;
}

const PAYSTACK_PB_KEY = "pk_test_f5807ad37ee9fcc97b16ac7c5d87e65b9455bebe";

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
