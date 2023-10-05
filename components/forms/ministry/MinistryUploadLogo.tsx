"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useUpdateMinistryProfileMutation } from "services/ministry";

import { MinistryGeneralLogoValidation } from "lib/validations/ministry";
import FileUpload from "@components/ui/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";
import { useToast } from "@components/ui/use-toast";
import { convertBase64toFile } from "@lib/functions";
import { useState } from "react";

interface Props {
  ministryId: string | undefined;
  logo: string | null;
}

export const MinistryUploadLogo = ({ ministryId, logo }: Props) => {
  const [disabled, setDisabled] = useState(Boolean(logo));
  const form = useForm<z.infer<typeof MinistryGeneralLogoValidation>>({
    resolver: zodResolver(MinistryGeneralLogoValidation),
  });
  const { toast } = useToast();
  const [updateMinistry, { isLoading }] = useUpdateMinistryProfileMutation();

  const onSubmit = async (
    values: z.infer<typeof MinistryGeneralLogoValidation>
  ) => {
    const { logo: formLogoBase64 } = values;
    try {
      await updateMinistry({
        logo: convertBase64toFile(formLogoBase64, "logo"),
        id: ministryId,
      }).unwrap();
      toast({
        title: "Ministry logo updated successfully",
      });
      setDisabled(true);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to update ministry logo",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel required>Upload Logo</FormLabel>
              <FormControl>
                <FileUpload
                  onFileChange={(file: string) => {
                    field.onChange(file);
                  }}
                  title="Upload Logo"
                  desc="(.jpg, .jpeg or .png file format supported)"
                  containerClassname="w-[50%] aspect-square"
                  fileName="logo"
                  editMode={logo ? true : false}
                  fileUrl={logo || undefined}
                  onDelete={() => {
                    setDisabled(false);
                    form.resetField("logo");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          loading={isLoading}
          disabled={disabled}
          variant="secondary"
          className="ml-auto mt-10 w-fit"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default MinistryUploadLogo;
