import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@components/ui/dialog";
import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import useDonorSignin from "@hooks/auth/useDonorSignin";
import Link from "next/link";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useDonorRegisterMutation } from "services/auth";
import { z } from "zod";

const options = [
  {
    value: "+1",
    label: "+1",
  },
  {
    value: "+234",
    label: "+234",
  },
];

const schema = z
  .object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
    phone: z.object({
      phone_code: z.string().min(1, "Phone code is required"),
      phone_number: z.string().min(1, "Phone number is required"),
    }),
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
    c_password: z.string().trim(),
  })
  .refine((data) => data.password === data.c_password, {
    message: "Passwords do not match!",
    path: ["c_password"],
  });

type FormType = z.infer<typeof schema>;
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenLogin: Dispatch<SetStateAction<boolean>>;
  setSuccessModal: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDesc: Dispatch<SetStateAction<string | ReactNode>>;
};
const SignUp = ({
  open,
  setOpen,
  setTitle,
  setDesc,
  setOpenLogin,
  setSuccessModal,
}: Props) => {
  const [signupDonor, { isLoading }] = useDonorRegisterMutation();
  const { loginDonor, loading: loginLoading } = useDonorSignin();
  const { toast } = useToast();
  // const router = useRouter();

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: {
        phone_code: "+234",
        phone_number: "",
      },
      password: "",
      c_password: "",
    },
    resolver: zodResolver(schema),
  });

  const { handleSubmit, reset } = form;

  const onSubmit = async (values: FormType) => {
    try {
      await signupDonor({
        email: values.email,
        firstName: values.first_name,
        lastName: values.last_name,
        phone: values.phone.phone_number,
        password: values.password,
        confirm_password: values.c_password,
      }).unwrap();
      await loginDonor(
        {
          email: values.email,
          password: values.password,
        },
        { redirect: true }
      );
      setTitle("Sign Up Successful!");
      // setDesc(
      //   <Fragment>
      //     Your account has been successfully created. A verification link has
      //     been sent to&nbsp;
      //     <strong className="font-medium text-body-1">
      //       {values.email}&nbsp;
      //     </strong>
      //     Please check your inbox to activate your account.
      //   </Fragment>
      // );
      setSuccessModal(true);
      setOpen(false);
      reset();
    } catch (error) {
      // More specific error handling
      const errorMessage = error
        ? (error as Error)?.message
        : "An error occured while signing up.";
      // console.log(errorMessage);
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl">
        <div className="my-4">
          <DialogTitle className="m-0 p-0 text-center font-aeonik text-[22px] font-medium leading-[-0.12px] text-black">
            Sign Up
          </DialogTitle>
          <DialogDescription className="m-0 to-body-2 p-0 text-center font-montreal text-sm">
            Enter your details below to create a donor account on SOOWER.
          </DialogDescription>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex w-full items-center justify-center gap-4">
              <FormInput
                name="first_name"
                label="First name"
                inputProps={{
                  placeholder: "First name",
                }}
              />
              <FormInput
                name="last_name"
                label="Last name"
                inputProps={{
                  placeholder: "Last name",
                }}
              />
            </div>
            <FormInput
              name="email"
              label="Email address"
              inputProps={{
                placeholder: "Email address",
              }}
            />
            <FormPhone
              name={{
                phone_code: "phone.phone_code",
                phone_number: "phone.phone_number",
              }}
              label="Phone Number"
              options={options}
            />
            <div className="flex w-full items-center justify-center gap-4">
              <FormInput
                name="password"
                type="password"
                label="Password"
                inputProps={{
                  placeholder: "Create Password",
                }}
              />
              <FormInput
                name="c_password"
                type="password"
                label="Confirm Password"
                inputProps={{
                  placeholder: "Confirm Password",
                }}
              />
            </div>
            <div className="mx-auto w-full py-6 text-center">
              <small className="text-[13px]">
                By creating an account you agree to our&nbsp;
                <Link
                  href="/terms-of-use"
                  onClick={() => setOpen(false)}
                  className="text-primary underline"
                >
                  Terms of Use
                </Link>
                &nbsp; and&nbsp;
                <Link
                  href="/privacy-policy"
                  onClick={() => setOpen(false)}
                  className="text-primary underline"
                >
                  Privacy Policy
                </Link>
              </small>
            </div>
            <FormButton
              text="Sign up"
              loading={isLoading || loginLoading}
              loadingText="Submitting..."
              // disabled={!isValid}
              className="w-full"
            />
            <div className="mx-auto my-1 w-full text-center">
              <small className="text-[13px]">
                Already have an account?&nbsp;
                <span
                  className="cursor-pointer text-[13px] font-medium text-primary underline"
                  onClick={() => {
                    setOpenLogin(true);
                    setOpen(false);
                  }}
                >
                  Log in
                </span>
              </small>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignUp;
