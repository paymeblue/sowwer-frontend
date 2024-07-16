"use client";

import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

import { useToast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrphanageRegistration } from "lib/validations/join-registry";
import { useForm } from "react-hook-form";
import { ArrowRight } from "react-iconly";
import * as z from "zod";
import { RegistryRegistrationFormProps } from "./WidowRegistrationForm";
import FileUpload from "@components/ui/file-upload";
import { OrphanageRegistrationRequest } from "services/join-soower-registry/typings";
import { useOrphanageMutation } from "services/join-soower-registry";
import { convertBase64toFile } from "@lib/functions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import statesInNigeria from "@lib/NigeriaStates";

const OrphanageRegistrationForm = ({
  onSuccess,
}: RegistryRegistrationFormProps) => {
  const { toast } = useToast();
  const [joinOrphanageRequest, { isLoading }] = useOrphanageMutation();
  const form = useForm<z.infer<typeof OrphanageRegistration>>({
    resolver: zodResolver(OrphanageRegistration),
  });
  const onSubmit = async (values: z.infer<typeof OrphanageRegistration>) => {
    const {
      acceptTerms,
      address,
      cacDocument,
      email,
      name,
      numberOfOrphans,
      phoneNumber,
      location,
    } = values;

    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "You must accept the declaration.",
        duration: 2000,
      });
      return;
    }

    try {
      const data: OrphanageRegistrationRequest = {
        address,
        cac_document: convertBase64toFile(cacDocument, "cac"),
        declaration: acceptTerms,
        email,
        name,
        number_of_orphans: numberOfOrphans,
        phone: phoneNumber,
        location,
      };
      await joinOrphanageRequest(data).unwrap();
      toast({
        title: "Orphanage registration successful, we will be in touch.",
        duration: 2500,
      });
      onSuccess();
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col"
      >
        <div className="flex flex-col gap-x-4 gap-y-5 lg:grid lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>Name of orphanage</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required className="">
                  State
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger defaultValue={field.value}>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[30vh]">
                    {statesInNigeria.map((state, i) => {
                      return (
                        <SelectItem value={state} key={state + i}>
                          {state}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Email address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johnsmith@gmail.com"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>Address Line</FormLabel>
                <FormControl>
                  <Input placeholder="Address Line" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfOrphans"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>
                  How many orphans are in your care?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter number"
                    type="text"
                    {...field}
                    inputMode="numeric"
                    onChange={(e) => {
                      const sanitizedValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      field.onChange(sanitizedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cacDocument"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>Upload CAC Document</FormLabel>
                <FormControl>
                  <FileUpload
                    onFileChange={(file: string) => {
                      field.onChange(file);
                    }}
                    title="Upload CAC Document"
                    desc="(.jpg, .png or .pdf file format supported)"
                    file={field.value}
                    fileName="CAC_Document"
                    acceptedFiles=".jpg, .jpeg, .png, .pdf"
                    onDelete={() => {
                      field.onChange(null);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-[#BDBDBD]"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormMessage />
                  <FormLabel>
                    I declare that all information by me is true, and I can be
                    held liable legally if it is found that I declared false
                    information, and also that registration doesn’t guarantee
                    that I would benefit from Soower.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button
          variant="secondary"
          loading={isLoading}
          type="submit"
          className="ml-auto mt-10 w-fit space-x-2"
        >
          <span>Submit</span>
          <ArrowRight set="light" size={18} />
        </Button>
      </form>
    </Form>
  );
};
export default OrphanageRegistrationForm;
