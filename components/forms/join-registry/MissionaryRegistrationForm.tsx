"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MissionaryRegistrationStart } from "lib/validations/join-registry";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import NewMissionaryForm from "./NewMissionaryForm";
import ExistingMissionaryForm from "./ExistingMissionaryForm";

const MissionaryRegistrationForm = () => {
  const form = useForm<z.infer<typeof MissionaryRegistrationStart>>({
    resolver: zodResolver(MissionaryRegistrationStart),
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="isNewMissionary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text_regular_body_b">
                  Do you want to be a missionary or are you already serving as a
                  missionary?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Yes">
                      Yes, I want to be a Missionary
                    </SelectItem>
                    <SelectItem value="No">
                      Already serving as a Missionary
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-8">
        {form.watch("isNewMissionary") === "Yes" && <NewMissionaryForm />}
        {form.watch("isNewMissionary") === "No" && <ExistingMissionaryForm />}
      </div>
    </div>
  );
};

export default MissionaryRegistrationForm;
