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
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewMissionaryRegistration } from "lib/validations/join-registry";
import { ArrowRight } from "react-iconly";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@components/ui/textarea";

const NewMissionaryForm = () => {
  const form = useForm<z.infer<typeof NewMissionaryRegistration>>({
    resolver: zodResolver(NewMissionaryRegistration),
  });

  const onSubmit = async (
    values: z.infer<typeof NewMissionaryRegistration>
  ) => {
    console.log("Submitted", { values });
    alert("Your message has been sent successfully");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col"
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" type="text" {...field} />
                </FormControl>
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
                  <Input placeholder="Phone number" type="number" {...field} />
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
            name="isChristian"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required className="!text_regular_body_b font-[600]">
                  Are you a Christian?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex items-center space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="No" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isBornAgain"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required className="!text_regular_body_b font-[600]">
                  Are you a born again?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex items-center space-x-2"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="No" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nameOfChurch"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>What church do you attend?</FormLabel>
                <FormControl>
                  <Input placeholder="Name of Church" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>What are you doing presently?</FormLabel>
                <FormControl>
                  <Input placeholder="Occupation" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel required>
                  Why do you want to be a missionary?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter some text..."
                    className="resize-none"
                    {...field}
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
          type="submit"
          className="ml-auto mt-10 w-fit space-x-2 bg-accent text-white"
        >
          <span>Submit</span>
          <ArrowRight set="light" size={18} />
        </Button>
      </form>
    </Form>
  );
};
export default NewMissionaryForm;
