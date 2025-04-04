import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormCheckbox from "@components/ui/formCheckbox";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import FormRadio from "@components/ui/formRadio";
import FormSelect from "@components/ui/formSelect";
import FormUpload from "@components/ui/formUpload";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ministryFormSchema,
  MinistryFormValues,
} from "lib/validations/registry";
import { useForm } from "react-hook-form";

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
const projectTypeOptions = [
  {
    label: "Widows",
    value: "widows",
  },
  {
    label: "Orphans",
    value: "orphans",
  },
  {
    label: "Missionaries",
    value: "missionaries",
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
const ministryType = [
  {
    label: "Serving ministry",
    value: "serving-ministry",
  },
  {
    label: "Aspiring ministry",
    value: "aspiring-ministry",
  },
];
const MinistryForm = () => {
  const { toast } = useToast();
  const form = useForm<MinistryFormValues>({
    mode: "onBlur",
    defaultValues: {
      ministry_type: "serving-ministry",
      name: "",
      admin_name: "",
      state: "",
      email: "",
      phone: {
        phone_code: "+234",
        phone_number: "",
      },
      website: "",
      project_type: "widows",
      address: "",
      cac_doc: undefined,
      scuml_cert: undefined,
      t_and_c: false,
    },
    resolver: zodResolver(ministryFormSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: MinistryFormValues) => {
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
          name="ministry_type"
          label="Are you a church or a christian organization?"
          options={ministryType}
        />
        <FormInput
          name="name"
          label="Name of ministry"
          inputProps={{
            placeholder: "Name of ministry",
          }}
        />
        <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
          <FormInput
            name="admin_name"
            label="Administrator's name"
            inputProps={{
              placeholder: "Administrator's name",
            }}
          />
          <FormSelect name="state" label="State" options={stateOptions} />
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
            name="website"
            label="Website or social media link"
            inputProps={{
              placeholder: "Website or social media link",
              type: "url",
            }}
          />
          <FormSelect
            name="project_type"
            label="What kind of projects are you involved in?"
            options={projectTypeOptions}
          />
        </div>
        <FormInput
          name="address"
          label="Address"
          inputProps={{
            placeholder: "Address",
          }}
        />
        <FormUpload
          label="CAC document"
          name="cac_doc"
          placeholder="Upload CAC Document"
        />
        <FormUpload
          label="SCUML certificate"
          name="scuml_cert"
          placeholder="Upload SCUML Document"
        />
        <FormCheckbox
          name="t_and_c"
          label="I declare that all information by me is true, and I can be held liable legally if it is found that I declared false information, and also that registration doesn't guarantee that I would benefit from Soower."
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

export default MinistryForm;
