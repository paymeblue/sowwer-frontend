"use client";

import { useToast } from "@components/ui/use-toast";
import { MinistrySigninValidation } from "lib/validations/ministry";
import { useDispatch } from "react-redux";
import { setCredentials } from "redux/auth/reducer";
import { useLoginMutation } from "services/auth";
import * as z from "zod";

const useMinistrySignin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
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
      // router.push("/ministry");
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
    loginMinistry,
  };
};

export default useMinistrySignin;
