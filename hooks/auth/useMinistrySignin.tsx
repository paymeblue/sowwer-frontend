"use client";

import { useLoginMutation } from "services/auth";
import { useDispatch } from "react-redux";
import * as z from "zod";
import { setCredentials } from "redux/auth/reducer";
import { useRouter } from "next/navigation";
import { useToast } from "@components/ui/use-toast";
import { MinistrySigninValidation } from "lib/validations/ministry";

const useMinistrySignin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const loginMinistry = async (
    values: z.infer<typeof MinistrySigninValidation>
  ) => {
    const { email, password } = values;
    try {
      const res = await login({
        identifier: email,
        password,
        type: "ministry",
      }).unwrap();
      await dispatch(
        setCredentials({
          user: res.data.user,
          token: res.data.token.accessToken,
          refreshToken: res.data.token.refreshToken,
          context: "ministry",
        })
      );
      router.push("/ministry");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please check your email and password and try again",
      });
    }
  };

  return {
    loading: isLoading,
    loginMinistry,
  };
};

export default useMinistrySignin;
