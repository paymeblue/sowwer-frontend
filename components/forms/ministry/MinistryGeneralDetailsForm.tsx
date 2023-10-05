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
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useUpdateMinistryProfileMutation } from "services/ministry";

import { MinistryGeneralDetailsValidation } from "lib/validations/ministry";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";
import statesInNigeria from "@lib/NigeriaStates";
import { Button } from "@components/ui/button";
import { useEffect } from "react";
import { useToast } from "@components/ui/use-toast";

interface Props {
  defaultValues:
    | {
        name: string;
        addressLine: string;
        state: string;
        about: string;
      }
    | undefined;
  ministryId: string | undefined;
}

const MinistryGeneralDetailsForm = ({ defaultValues, ministryId }: Props) => {
  const form = useForm<z.infer<typeof MinistryGeneralDetailsValidation>>({
    resolver: zodResolver(MinistryGeneralDetailsValidation),
  });
  const { toast } = useToast();
  const [updateMinistry, { isLoading }] = useUpdateMinistryProfileMutation();

  useEffect(() => {
    if (defaultValues) {
      const { about, addressLine, name, state } = defaultValues;
      form.reset({
        name,
        state,
        addressLine,
        about,
      });
    }
  }, [defaultValues, form]);

  const onSubmit = async (
    values: z.infer<typeof MinistryGeneralDetailsValidation>
  ) => {
    const { about } = values;
    try {
      await updateMinistry({
        about,
        id: ministryId,
      }).unwrap();
      toast({
        title: "Ministry updated successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to update ministry",
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        <div className="grid grid-cols-1 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name of ministry"
                    type="text"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressLine"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Address line</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Address"
                    type="text"
                    {...field}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel required className="">
                  State
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled
                >
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
            name="about"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel required>About your ministry</FormLabel>
                <FormControl>
                  <Textarea
                    rows={8}
                    placeholder="Tell your story..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          loading={isLoading}
          disabled={!form.watch("about")}
          type="submit"
          variant="secondary"
          className="ml-auto mt-10"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default MinistryGeneralDetailsForm;
