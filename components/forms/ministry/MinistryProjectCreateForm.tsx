"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import * as z from "zod";
import { UseFormReturn } from "react-hook-form";
import { MinistryCreateProjectValidation } from "lib/validations/ministry";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";
import FileUpload from "@components/ui/file-upload";

interface Props {
  form: UseFormReturn<z.infer<typeof MinistryCreateProjectValidation>>;
}

const MinistryProjectCreateForm = ({ form }: Props) => {
  return (
    <div className="w-full">
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
    </div>
  );
};

export const ProjectDescription = ({ form }: Props) => {
  return (
    <form>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel required>What is this project about?</FormLabel>
            <FormControl>
              <Textarea rows={20} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};

export const UploadCoverPhoto = ({ form }: Props) => {
  return (
    <form>
      <FormField
        control={form.control}
        name="cover_photo"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel required>Upload Cover Photo</FormLabel>
            <FormControl>
              <FileUpload
                onFileChange={(file: string) => {
                  field.onChange(file);
                }}
                title="Upload Cover Photo"
                desc="(.jpg, .jpeg or .png file format supported)"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};

export default MinistryProjectCreateForm;
