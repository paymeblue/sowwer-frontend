"use client";

import { DonorSigninValidation } from "lib/validations/donor";
import { useLoginMutation } from "services/auth";
import { useDispatch } from "react-redux";
import * as z from "zod";
import { setCredentials } from "redux/auth/reducer";
import { useToast } from "@components/ui/use-toast";

const useAdminSignin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const loginAdmin = async (values: z.infer<typeof DonorSigninValidation>) => {
    const { email, password } = values;
    try {
      const res = await login({
        identifier: email,
        password,
        type: "admin",
      }).unwrap();

      if (res.data.user && res?.data?.user?.type !== "admin") {
        toast({
          variant: "destructive",
          title: "Unauthorized credentials",
          description: "Please enter admin credentials only.",
        });
      } else {
        dispatch(
          setCredentials({
            user: res.data.user,
            token: res.data.token.accessToken,
            refreshToken: res.data.token.refreshToken,
            context: "admin",
          })
        );
      }

      // router.push("/donor");
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
    loginAdmin,
  };
};

export default useAdminSignin;
