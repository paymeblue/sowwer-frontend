import { Form } from "@components/ui/form";
import FormButton from "@components/ui/formButton";
import FormCheckbox from "@components/ui/formCheckbox";
import FormInput from "@components/ui/formInput";
import FormPhone from "@components/ui/formPhone";
import FormSelect from "@components/ui/formSelect";
import FormUpload from "@components/ui/formUpload";
import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { orphanFormSchema, OrphanFormValues } from "lib/validations/registry";
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

const OrphanageForm = () => {
  const { toast } = useToast();

  const form = useForm<OrphanFormValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      admin_name: "",
      state: "",
      email: "",
      phone: {
        phone_code: "+234",
        phone_number: "",
      },
      address: "",
      no_of_orphans: "",
      cac_doc: undefined,
      t_and_c: false,
    },
    resolver: zodResolver(orphanFormSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid, isSubmitting },
  } = form;

  const onSubmit = async (values: OrphanFormValues) => {
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
        <FormInput
          name="name"
          label="Name of orphanage"
          inputProps={{
            placeholder: "Name of orphanage",
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
        <FormInput
          name="address"
          label="Address"
          inputProps={{
            placeholder: "Address",
          }}
        />
        <FormInput
          name="no_of_orphans"
          label="How many orphans are in your care?"
          inputProps={{
            placeholder: "No. of orphans",
          }}
        />
        <FormUpload
          label="CAC document"
          name="cac_doc"
          placeholder="Upload CAC Document"
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

export default OrphanageForm;
