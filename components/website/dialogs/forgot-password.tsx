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
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormType = z.infer<typeof schema>;
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSuccessModal: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDesc: Dispatch<SetStateAction<string | ReactNode>>;
};
const ForgotPassword = ({
  open,
  setOpen,
  setTitle,
  setDesc,
  setSuccessModal,
}: Props) => {
  const { toast } = useToast();

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: FormType) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      setTitle("Password reset link sent");
      setDesc(
        "A password reset link has been sent to your email. Please check your inbox and use the link to reset your password."
      );
      setSuccessModal(true);
      setOpen(false);
      reset();
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-3xl">
        <div className="my-4">
          <DialogTitle className="m-0 p-0 text-center font-aeonik text-[22px] font-medium leading-[-0.12px] text-black">
            Forgot Password
          </DialogTitle>
          <DialogDescription className="m-0 to-body-2 p-0 text-center font-montreal text-sm">
            Enter your email address below and a password reset link will be
            sent to you.
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
            <div className="pt-6">
              <FormButton
                text="Send Email"
                loading={isSubmitting}
                loadingText="Sending..."
                disabled={!isDirty || !isValid}
                className="w-full"
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
