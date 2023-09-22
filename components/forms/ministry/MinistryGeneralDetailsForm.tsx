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

const MinistryGeneralDetailsForm = () => {
  const form = useForm<z.infer<typeof MinistryGeneralDetailsValidation>>({
    resolver: zodResolver(MinistryGeneralDetailsValidation),
    defaultValues: {
      name: "Family Worship Center",
      addressLine: "648 Idris Gidado St, Wuye",
      state: "Federal Capital Territory",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof MinistryGeneralDetailsValidation>
  ) => {
    console.log("Submitted", { values });
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
                    disabled
                    placeholder="Name of ministry"
                    type="text"
                    //   {...field}
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
                    disabled
                    placeholder="Address"
                    type="text"
                    //   {...field}
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
                  defaultValue={field.value}
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
        <Button type="submit" variant="secondary" className="ml-auto mt-10">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default MinistryGeneralDetailsForm;
