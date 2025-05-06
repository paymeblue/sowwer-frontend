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
import { useEffect } from "react";
import { useMissionaryMutation } from "services/join-soower-registry";
import {
  MissionaryJoinSoowerRequest1,
  MissionaryJoinSoowerRequest2,
} from "services/typings";
import statesInNigeria from "@lib/NigeriaStates";

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
const MissionForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { toast } = useToast();
  const [joinMissionaryRegistry, { isLoading, isSuccess }] =
    useMissionaryMutation();

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

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
  const { handleSubmit, reset } = form;

  const onSubmit = async (values: MissionFormValues) => {
    const {
      missionary_type,
      name,
      state,
      dur,
      service_area,
      email,
      phone,
      nok_name,
      nok,
      address,
      previous_exp,
      church_affliate,
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
      // Convert interval values to expected API format
      const timestampMap: Record<string, "year" | "month"> = {
        years: "year",
        months: "month",
      };

      if (missionary_type === "aspiring-missionary") {
        // For new/aspiring missionaries (similar to NewMissionaryForm.tsx)
        const data = {
          address,
          born_again: true, // Assuming born again since it's not in the form
          christianity: true, // Assuming Christian since it's not in the form
          church: church_affliate,
          declaration: t_and_c,
          email,
          name,
          occupation: "", // Not in the form but required by API
          phone: phone.phone_code + phone.phone_number,
          reason_about: previous_exp,
          status: "new",
          next_of_kin_name: nok_name,
          next_of_kin_phone: nok.phone_code + nok.phone_number,
          state_of_origin: state,
        } as MissionaryJoinSoowerRequest1;

        await joinMissionaryRegistry(data).unwrap();
      } else {
        // For existing/serving missionaries (similar to ExistingMissionaryForm.tsx)
        const data = {
          address,
          affiliated_to_church: church_affliate ? true : false,
          email,
          phone: phone.phone_code + phone.phone_number,
          service_area,
          declaration: t_and_c,
          status: "existing",
          name,
          duration: Number(dur.period),
          timestamp: timestampMap[dur.interval],
          reason_about: previous_exp,
          affiliated_church_name: church_affliate,
          next_of_kin_name: nok_name,
          next_of_kin_phone: nok.phone_code + nok.phone_number,
          state_of_origin: state,
        } as MissionaryJoinSoowerRequest2;

        await joinMissionaryRegistry(data).unwrap();
      }

      toast({
        title: "Missionary registration successful",
        description: "We will be in touch soon.",
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

export default MissionForm;
