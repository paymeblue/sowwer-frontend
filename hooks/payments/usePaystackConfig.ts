export interface IProps {
  amount: number;
  email: string;
  reference: string;
}

export interface IPaystackConfig extends IProps {
  publicKey: string;
}

const PAYSTACK_PB_KEY = "pk_test_32512b19e1b42d0c2b1b88faec024f5e8293e53c";

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
