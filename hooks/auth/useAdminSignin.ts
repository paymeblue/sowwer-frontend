"use client";

import { useToast } from "@components/ui/use-toast";
import { DonorSigninValidation } from "lib/validations/donor";
// import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "redux/auth/reducer";
import { useLoginAdminMutation } from "services/auth";
import * as z from "zod";

const useAdminSignin = () => {
  const [login, { isLoading }] = useLoginAdminMutation();
  const dispatch = useDispatch();
  const { toast } = useToast();
  // const router = useRouter();

  const loginAdmin = async (values: z.infer<typeof DonorSigninValidation>) => {
    const { email, password } = values;
    try {
      const res = await login({
        identifier: email,
        password,
      }).unwrap();

      console.log({ res });

      if (!res.data) {
        toast({
          variant: "destructive",
          title: "Unauthorized credentials",
          description: "Please enter admin credentials only.",
        });
      } else {
        const { token, ...user } = res.data;
        const { created_at, email, firstname, id, lastname, phone } = user;
        dispatch(
          setCredentials({
            user: {
              firstName: firstname,
              lastName: lastname,
              createdAt: created_at,
              email,
              id,
              phone,
              type: "admin",
              role: "",
              verificationStatus: false,
            },
            token: token.access_token,
            refreshToken: token.refresh_token,
            context: "admin",
          })
        );
        // router.push("/admin/ministries");
      }

      // router.push("/donor");
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
    loginAdmin,
  };
};

export default useAdminSignin;
