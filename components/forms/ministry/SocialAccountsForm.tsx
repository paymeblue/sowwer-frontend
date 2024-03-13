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
import * as z from "zod";

import { useForm } from "react-hook-form";
import {
  useGetSocialLinksQuery,
  useUpdateSocialLinksMutation,
} from "services/ministry";

import Facebook from "@components/assets/svg/Facebook";
import InstaColor from "@components/assets/svg/instaColor";
import LinkedInColor from "@components/assets/svg/linkedInColor";
import Twitter from "@components/assets/svg/twitter";
import YoutubeColor from "@components/assets/svg/youtubeColor";
import Loader from "@components/shared/Loader";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input-with-icon";
import { useToast } from "@components/ui/use-toast";
import useUserAuth from "@hooks/auth/useUserAuth";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { MinistrySocialAccountsValidation } from "lib/validations/ministry";
import { Globe } from "lucide-react";
import { useEffect } from "react";

const SocialAccountsForm = () => {
  const { user } = useUserAuth();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof MinistrySocialAccountsValidation>>({
    resolver: zodResolver(MinistrySocialAccountsValidation),
  });
  const { data: socialLinks, isLoading } = useGetSocialLinksQuery(
    user?.ministry?.id ?? skipToken
  );
  const [updateSocialLinks, { isLoading: saving }] =
    useUpdateSocialLinksMutation();

  useEffect(() => {
    if (socialLinks?.data) {
      const { facebook, instagram, linkedin, twitter, website, youtube } =
        socialLinks.data;
      form.reset({
        facebook: facebook || undefined,
        instagram: instagram || undefined,
        linkedIn: linkedin || undefined,
        twitter: twitter || undefined,
        website: website || undefined,
        youtube: youtube || undefined,
      });
    }
  }, [socialLinks, form]);

  const onSubmit = async (
    values: z.infer<typeof MinistrySocialAccountsValidation>
  ) => {
    const { facebook, instagram, linkedIn, twitter, website, youtube } = values;
    try {
      await updateSocialLinks({
        facebook,
        instagram,
        linkedin: linkedIn,
        twitter,
        website,
        youtube,
      }).unwrap();
      toast({
        title: "Social links updated successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to save social links",
      });
    }
  };

  if (isLoading) {
    return <Loader className="h-[30vh]" />;
  }

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
            name="youtube"
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
          loading={saving}
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default SocialAccountsForm;
