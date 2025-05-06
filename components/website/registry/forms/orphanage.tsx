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
import { useEffect } from "react";
import { useOrphanageMutation } from "services/join-soower-registry";
import { OrphanageRegistrationRequest } from "services/join-soower-registry/typings";
import statesInNigeria from "@lib/NigeriaStates";

const countryCodes = [
  {
    label: "+234",
    value: "+234",
  },
];

const OrphanageForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { toast } = useToast();
  const [joinOrphanageRequest, { isLoading, isSuccess }] =
    useOrphanageMutation();

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess, onSuccess]);

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

  const { handleSubmit, reset } = form;

  const onSubmit = async (values: OrphanFormValues) => {
    const {
      name,
      admin_name,
      state,
      email,
      phone,
      address,
      no_of_orphans,
      cac_doc,
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

    if (!cac_doc) {
      toast({
        variant: "destructive",
        title: "CAC document is required.",
        duration: 2000,
      });
      return;
    }

    try {
      const data: OrphanageRegistrationRequest = {
        address,
        cac_document: cac_doc,
        declaration: t_and_c,
        email,
        name,
        number_of_orphans: no_of_orphans,
        phone: phone.phone_code + phone.phone_number,
        location: state,
        administrator_name: admin_name,
      };

      await joinOrphanageRequest(data).unwrap();

      toast({
        title: "Orphanage registration successful, we will be in touch.",
        duration: 2500,
      });
      reset();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Unable to complete registration.",
        description:
          typeof err === "string"
            ? err
            : err?.data?.message ||
              "There seems to be a problem with your registration, please try again later.",
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
          <FormSelect
            name="state"
            label="State"
            options={statesInNigeria.map((state) => ({
              label: state,
              value: state,
            }))}
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
          label="I declare that all information by me is true, and I can be held liable legally if it is found that I declared false information, and also that registration doesn't guarantee that I would benefit from Soower."
        />
        <div className="flex items-center justify-end pt-6">
          <FormButton
            text="Submit"
            loadingText="Submitting..."
            loading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default OrphanageForm;
