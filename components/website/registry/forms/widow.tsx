import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormCheckbox from "@components/ui/formCheckbox";
import FormDate from "@components/ui/formDate";
import FormDuration from "@components/ui/formDuration";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import FormSelect from "@components/ui/formSelect";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { widowFormSchema, WidowFormValues } from "lib/validations/registry";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useWidowMutation } from "services/join-soower-registry";
import { WidowJoinSoowerRequest2 } from "services/typings";
import statesInNigeria from "@lib/NigeriaStates";

const countryCodes = [
  {
    label: "+234",
    value: "+234",
  },
];
const intervalOptions = [
  {
    label: "Years",
    value: "years",
  },
  {
    label: "Months",
    value: "months",
  },
];
const WidowForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { toast } = useToast();
  const [joinWidowRegistry, { isLoading, isSuccess }] = useWidowMutation();

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

  const form = useForm<WidowFormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      state: "",
      dur: {
        interval: "months",
        period: "",
      },
      dob: new Date(),
      email: "",
      phone: {
        phone_code: "+234",
        phone_number: "",
      },
      address: "",
      no_of_children: "",
      nok_name: "",
      nok: {
        phone_code: "+234",
        phone_number: "",
      },
      t_and_c: false,
    },
    resolver: zodResolver(widowFormSchema),
  });
  const {
    handleSubmit,
    reset,
    // formState: { isDirty, isValid },
  } = form;

  const onSubmit = async (values: WidowFormValues) => {
    const {
      name,
      state,
      dur,
      dob,
      email,
      phone,
      address,
      no_of_children,
      nok_name,
      nok,
      t_and_c,
    } = values;

    if (!t_and_c) {
      toast({
        variant: "destructive",
        title: "You must accept the declaration.",
        duration: 2000,
      });
      return;
    }

    try {
      // Calculate age from date of birth
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      // Map interval values to expected API format
      const timestampMap: Record<string, "year" | "month"> = {
        years: "year",
        months: "month",
      };

      const data = {
        address: address,
        age: age,
        christianity: true, // Assuming all are Christians or set default
        declaration: t_and_c,
        duration: Number(dur.period),
        timestamp: timestampMap[dur.interval],
        email: email,
        kids: no_of_children && Number(no_of_children) > 0,
        name: name,
        phone: phone.phone_code + phone.phone_number,
        registrar_name: name,
        registrar_email: email,
        registrar_phone: phone.phone_code + phone.phone_number,
        next_of_kin_name: nok_name,
        next_of_kin_phone: nok.phone_code + nok.phone_number,
        state_of_origin: state,
      } as WidowJoinSoowerRequest2;

      await joinWidowRegistry(data).unwrap();
      toast({
        title: "Widow registration successful",
        duration: 2500,
      });
      reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to complete registration.",
        description: `${
          err ||
          "There seems to be a problem with your registration, please try again later."
        }`,
        duration: 2500,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-12 w-full space-y-5"
      >
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <FormInput
            name="name"
            label="Name"
            inputProps={{
              placeholder: "Full name",
            }}
          />
          <FormSelect
            name="state"
            label="State of origin"
            options={statesInNigeria.map((state) => ({
              label: state,
              value: state,
            }))}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <FormDuration
            name={{
              interval: "dur.interval",
              period: "dur.period",
            }}
            label="How long have you been a widow?"
            options={intervalOptions}
          />
          <FormDate
            name="dob"
            label="Date of birth"
            mode="single"
            toYear={new Date().getFullYear() - 18}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <FormInput
            name="email"
            label="Email address"
            inputProps={{
              placeholder: "johndoe@gmail.com",
              type: "email",
            }}
          />
          <FormPhone
            name={{
              phone_code: "phone.phone_code",
              phone_number: "phone.phone_number",
            }}
            label="Phone number"
            options={countryCodes}
          />
        </div>
        <FormInput
          name="address"
          label="Address"
          inputProps={{
            placeholder: "Address",
          }}
        />
        <FormInput
          name="no_of_children"
          label="Number of children"
          inputProps={{
            placeholder: "Number of children",
          }}
        />
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <FormInput
            name="nok_name"
            label="Next of kin's name"
            inputProps={{
              placeholder: "NOK'S name",
            }}
          />
          <FormPhone
            name={{
              phone_code: "nok.phone_code",
              phone_number: "nok.phone_number",
            }}
            label="Next of kin's phone number"
            options={countryCodes}
          />
        </div>
        <FormCheckbox
          name="t_and_c"
          label="I declare that all information by me is true, and I can be held liable legally if it is found that I declared false information, and also that registration doesn't guarantee that I would benefit from Soower."
        />
        <div className="flex items-center justify-end pt-6">
          <FormButton
            text="Submit"
            loadingText="Submitting..."
            loading={isLoading}
            // disabled={!isDirty || !isValid}
          />
        </div>
      </form>
    </Form>
  );
};

export default WidowForm;
