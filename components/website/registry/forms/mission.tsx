import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormCheckbox from "@components/ui/formCheckbox";
import FormDuration from "@components/ui/formDuration";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import FormRadio from "@components/ui/formRadio";
import FormSelect from "@components/ui/formSelect";
import FormTextArea from "@components/ui/formTextArea";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { missionFormSchema, MissionFormValues } from "lib/validations/registry";
import { useForm } from "react-hook-form";

const missionaryType = [
  {
    label: "Serving missionary",
    value: "serving-missionary",
  },
  {
    label: "Aspiring missionary",
    value: "aspiring-missionary",
  },
];
const stateOptions = [
  {
    label: "Abia",
    value: "abia",
  },
  {
    label: "Adamawa",
    value: "adamawa",
  },
];
const countryCodes = [
  {
    label: "+234",
    value: "+234",
  },
  {
    label: "+1",
    value: "+1",
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
const MissionForm = () => {
  const { toast } = useToast();

  const form = useForm<MissionFormValues>({
    mode: "onBlur",
    defaultValues: {
      missionary_type: "serving-missionary", // for the radio button
      name: "",
      state: "",
      dur: {
        period: "",
        interval: "years",
      },
      service_area: "",
      email: "",
      phone: {
        phone_code: "+234",
        phone_number: "",
      },
      nok_name: "",
      nok: {
        phone_code: "+234",
        phone_number: "",
      },
      address: "",
      previous_exp: "",
      church_affliate: "",
      t_and_c: false,
    },
    resolver: zodResolver(missionFormSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: MissionFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(values);
      toast({
        title: "Thank you for joining our registry!",
        description: "Your submission was successful.",
      });
      reset();
    } catch (error) {
      // More specific error handling
      const errorMessage =
        error instanceof Error ? error.message : "Error submitting form";
      toast({
        title: "Submission Failed",
        description: errorMessage,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-12 w-full space-y-5"
      >
        <FormRadio
          name="missionary_type"
          label="Are you a serving missionary or an aspiring missionary?"
          options={missionaryType}
        />
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
            options={stateOptions}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <FormDuration
            name={{
              interval: "dur.interval",
              period: "dur.period",
            }}
            label="How long have you a missionary?"
            options={intervalOptions}
          />
          <FormInput
            name="service_area"
            label="Where are you serving as a missionary?"
            inputProps={{
              placeholder: "Service area",
            }}
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
        <FormInput
          name="address"
          label="Address"
          inputProps={{
            placeholder: "Address",
          }}
        />
        <FormTextArea
          name="previous_exp"
          label="Tell us about some of your previous missionary work?"
          rest={{
            placeholder:
              "Tell us about some of your previous missionary work...",
          }}
        />
        <FormInput
          name="church_affliate"
          label="Which church or mission body are you affiliated with?"
          inputProps={{
            placeholder: "Church or mission body affiliation",
          }}
        />
        <FormCheckbox
          name="t_and_c"
          label="I declare that all information by me is true, and I can be held liable legally if it is found that I declared false information, and also that registration doesn’t guarantee that I would benefit from Soower."
        />
        <div className="flex items-center justify-end pt-6">
          <FormButton
            text="Submit"
            loadingText="Submitting..."
            loading={isSubmitting}
            disabled={!isDirty || !isValid}
          />
        </div>
      </form>
    </Form>
  );
};

export default MissionForm;
