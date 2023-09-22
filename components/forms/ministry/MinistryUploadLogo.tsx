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
import { MinistryGeneralLogoValidation } from "lib/validations/ministry";
import FileUpload from "@components/ui/file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/button";

export const MinistryUploadLogo = () => {
  const form = useForm<z.infer<typeof MinistryGeneralLogoValidation>>({
    resolver: zodResolver(MinistryGeneralLogoValidation),
  });

  const onSubmit = async (
    values: z.infer<typeof MinistryGeneralLogoValidation>
  ) => {
    console.log("Submitted", { values });
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
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
