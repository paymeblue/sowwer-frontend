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
import { MinistrySocialAccountsValidation } from "lib/validations/ministry";
import { Input } from "@components/ui/input-with-icon";
import { Button } from "@components/ui/button";
import { Globe } from "lucide-react";
import Facebook from "@components/assets/svg/Facebook";
import InstaColor from "@components/assets/svg/instaColor";
import Twitter from "@components/assets/svg/twitter";
import LinkedInColor from "@components/assets/svg/linkedInColor";
import YoutubeColor from "@components/assets/svg/youtubeColor";

const SocialAccountsForm = () => {
  const form = useForm<z.infer<typeof MinistrySocialAccountsValidation>>({
    resolver: zodResolver(MinistrySocialAccountsValidation),
    defaultValues: {
      website: "fwcabuja.org",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof MinistrySocialAccountsValidation>
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
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    icon={<Globe size={18} className="text-black" />}
                    iconPosition="left"
                    placeholder="Website"
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
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input
                    icon={
                      <div className="text-[#1877F2]">
                        <Facebook />
                      </div>
                    }
                    iconPosition="left"
                    placeholder="Enter Facebook URL"
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
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input
                    icon={
                      <div className="text-[#1877F2]">
                        <InstaColor />
                      </div>
                    }
                    iconPosition="left"
                    placeholder="Enter Instagram URL"
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
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input
                    icon={
                      <div className="text-[#1DA1F2]">
                        <Twitter />
                      </div>
                    }
                    iconPosition="left"
                    placeholder="Enter Twitter URL"
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
            name="linkedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    icon={<LinkedInColor />}
                    iconPosition="left"
                    placeholder="Enter LinkedIn URL"
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
            name="linkedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>YouTube</FormLabel>
                <FormControl>
                  <Input
                    icon={
                      <div className="text-[#FF0000]">
                        <YoutubeColor playColor="white" />
                      </div>
                    }
                    iconPosition="left"
                    placeholder="Enter YouTube URL"
                    type="text"
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
          className="ml-auto mt-10 w-fit"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default SocialAccountsForm;
