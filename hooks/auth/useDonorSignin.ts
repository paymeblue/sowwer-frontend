"use client";

import { useToast } from "@components/ui/use-toast";
import { DonorSigninValidation } from "lib/validations/donor";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "redux/auth/reducer";
import { useLoginMutation } from "services/auth";
import * as z from "zod";

const useDonorSignin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const loginDonor = async (values: z.infer<typeof DonorSigninValidation>) => {
    const { email, password } = values;
    try {
      const res = await login({
        identifier: email,
        password,
        type: "donor",
      }).unwrap();
      dispatch(
        setCredentials({
          user: res.data.user,
          token: res.data.token.accessToken,
          refreshToken: res.data.token.refreshToken,
          context: "donor",
        })
      );
      router.push("/donor");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          `${error.message}` ||
          "Please check your email and password and try again",
        duration: 2500,
      });
    }
  };

  return {
    loading: isLoading,
    loginDonor,
  };
};

export default useDonorSignin;
