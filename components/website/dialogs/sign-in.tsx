import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormInput from "@components/ui/formInput";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import useDonorSignin from "@hooks/auth/useDonorSignin";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .refine((value) => value && value.length > 0, "Your password is required")
    .refine(
      (value) => {
        return (
          value &&
          value.length >= 8 &&
          /\d/.test(value) &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
        );
      },
      {
        message:
          "Password must have at least one lowercase character, one uppercase character, one digit, one special character, and be at least 8 characters long",
      }
    ),
});

type FormType = z.infer<typeof schema>;
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenSignUp: Dispatch<SetStateAction<boolean>>;
  setForgotPasswordModal: Dispatch<SetStateAction<boolean>>;
  redirect?: boolean;
};
const SignIn = ({
  open,
  setOpen,
  setOpenSignUp,
  setForgotPasswordModal,
  redirect = true,
}: Props) => {
  const { toast } = useToast();
  const { loginDonor, loading } = useDonorSignin();

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: FormType) => {
    try {
      await loginDonor(values, { redirect });
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // console.log(values);
      // toast({
      //   title: "Thank you for signing up!",
      //   description: "Your message has been sent successfully.",
      // });
      setOpen(false);
      reset();
      // router.push("/website?isAuth=true");
    } catch (error) {
      // More specific error handling
      const errorMessage =
        error instanceof Error ? error.message : "Error submitting form";
      console.log(errorMessage);
      toast({
        variant: "destructive",
        title: "Error!",
        description: "An error occured while signing up.",
      });
    }
  };

  const query = useSearchParams();
  const router = useRouter();
  const login = query.get("login") === "true";
  const onOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      if (login) {
        router.replace("?");
      }
    },
    [login, router, setOpen]
  );
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl">
        <div className="my-4">
          <DialogTitle className="m-0 p-0 text-center font-aeonik text-[22px] font-medium leading-[-0.12px] text-black">
            Log In
          </DialogTitle>
          <DialogDescription className="m-0 to-body-2 p-0 text-center font-montreal text-sm">
            Enter your details below to sign in to your donor account on SOOWER.
          </DialogDescription>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              name="email"
              label="Email address"
              inputProps={{
                placeholder: "Email address",
              }}
            />
            <div className="flex flex-col items-end justify-center">
              <FormInput
                name="password"
                label="Password"
                inputProps={{
                  placeholder: "Password",
                }}
              />
              <span
                onClick={() => {
                  setForgotPasswordModal(true);
                  setOpen(false);
                }}
                className="mt-2 cursor-pointer text-[13px] text-primary underline"
              >
                Forgot Password?
              </span>
            </div>
            <div className="pt-6">
              <FormButton
                text="Log in"
                loading={isSubmitting || loading}
                loadingText="Submitting..."
                // disabled={!isDirty || !isValid}
                className="w-full"
              />
            </div>
            <div className="mx-auto my-1 w-full text-center">
              <small className="text-[13px]">
                Don't have an account?&nbsp;
                <span
                  className="cursor-pointer text-[13px] font-medium text-primary underline"
                  onClick={() => {
                    setOpenSignUp(true);
                    setOpen(false);
                  }}
                >
                  Sign up
                </span>
              </small>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
