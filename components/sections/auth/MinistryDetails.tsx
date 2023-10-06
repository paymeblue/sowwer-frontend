import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

import { CardSelector } from "@components/ui/card-selector";
import { MinistrySignupMinistryDetailsValidation } from "lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Button } from "@components/ui/button";
import statesInNigeria from "@lib/NigeriaStates";
import FileUpload from "@components/ui/file-upload";
import { Textarea } from "@components/ui/textarea";
import Church from "@components/assets/svg/Church";
import Christian from "@components/assets/svg/Christian";
import { ArrowRight } from "react-iconly";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
  form: UseFormReturn<z.infer<typeof MinistrySignupMinistryDetailsValidation>>;
  selectedCategory: null | "church" | "christian organization";
  setSelectedCategory: Dispatch<
    SetStateAction<"church" | "christian organization" | null>
  >;
}

const MinistryDetails = ({
  form,
  selectedCategory,
  setSelectedCategory,
  setActiveStep,
}: Props) => {
  const onSubmit = () => {
    setActiveStep((step) => step + 1);
  };
  return (
    <section className="p-8">
      {!selectedCategory ? (
        <div>
          <h3 className="text_variant_h3 text-center">
            What type of ministry are you?
          </h3>

          <div className="mt-8 flex flex-col space-y-4">
            <CardSelector
              onClick={() => setSelectedCategory("church")}
              title="Church"
              left={<Church />}
              desc="A church registered with the Christian Association of Nigeria (CAN)."
            />
            <CardSelector
              title="Christian Organization"
              left={<Christian />}
              onClick={() => setSelectedCategory("christian organization")}
              desc="A registered Christian institution or organization in Nigeria."
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <CardSelector
            title={selectedCategory || ""}
            left={selectedCategory === "church" ? <Church /> : <Christian />}
            containerClassname="cursor-default"
            right={
              <span
                className="cursor-pointer font-body text-[.8rem] text-body-1"
                onClick={() => setSelectedCategory(null)}
              >
                Edit
              </span>
            }
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col"
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel required>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the name of your organization"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email address"
                          type="text"
                          inputMode="email"
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
                    <FormItem>
                      <FormLabel required>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone number"
                          type="number"
                          min={0}
                          inputMode="tel"
                          {...field}
                        />
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
                      <FormLabel required>Address line</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your organization’s address"
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
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>State</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
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
                  name="websiteLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website or Social link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Website or Social link"
                          type="text"
                          {...field}
                        />
                      </FormControl>
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel required>
                        What projects would you be receiving donations for on
                        Soower?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter some text...."
                          rows={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                className="ml-auto mt-8 space-x-2"
              >
                <span>Continue</span>
                <ArrowRight size={18} />
              </Button>
            </form>
          </Form>
        </div>
      )}
    </section>
  );
};

export default MinistryDetails;
