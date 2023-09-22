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
import { zodResolver } from "@hookform/resolvers/zod";
import { MinistryCreateProjectValidation } from "lib/validations/ministry";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

const MinistryProjectCreateForm = () => {
  // const router = useRouter();
  const form = useForm<z.infer<typeof MinistryCreateProjectValidation>>({
    resolver: zodResolver(MinistryCreateProjectValidation),
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel required>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Give your project a title"
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required className="">
                    Category
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="--Select--" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="widows">Widows</SelectItem>
                      <SelectItem value="orphans">Orphans</SelectItem>
                      <SelectItem value="missionary">Missionary</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel required>Goal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="₦ 0.00"
                      type="text"
                      value={form.watch("amount")}
                      onChange={(event) => {
                        const rawValue = event?.target?.value.replace(
                          /[^0-9]/g,
                          ""
                        ); // Remove non-numeric characters
                        if (isNaN(+rawValue)) {
                          return form.setValue("amount", "");
                        }
                        const formattedValue = new Intl.NumberFormat(
                          "en-US"
                        ).format(parseInt(rawValue || "0", 10));

                        form.setValue(
                          "amount",
                          formattedValue !== "0" ? `₦ ${formattedValue}` : ""
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MinistryProjectCreateForm;
