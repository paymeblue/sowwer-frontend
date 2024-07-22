"use client";

import * as z from "zod";
import TabSectionWrapper, {
  TabWrapper,
} from "@components/sections/ministry/TabContentWrapper";
import MainContentWrapper from "@components/shared/Layouts/Ministry/MainContentWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { Button } from "@components/ui/button";
import { useToast } from "@components/ui/use-toast";
import useCopyToClipboard from "@hooks/general/useCopyToClipboard";
import { Copy, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "react-iconly";
import { AdminCreteTestimonyValidation } from "lib/validations/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import FileUpload from "@components/ui/file-upload";
import { Textarea } from "@components/ui/textarea";

interface Props {
  projectId?: string;
}

const RightContent = ({
  id,
  status,
}: {
  id?: string;
  status: "drafted" | "active" | string;
}) => {
  const { toast } = useToast();
  const { copyToClipboard } = useCopyToClipboard({
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Project link copied successfully",
        description: "You can now share this link with the public.",
      });
    },
    onFailure: () => {
      toast({
        variant: "destructive",
        title: "Error occured copying link",
        description:
          "There seems to be an error copying project link, please try again later",
      });
    },
  });
  const openLinkInNewTab = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className="flex w-fit items-center rounded-full bg-[#EBEFFF] p-1 lg:max-w-[50%] lg:space-x-3">
      <span className="text_small_body_sb ml-4 truncate text-[.8rem] text-accent max-lg:hidden">
        {id && status === "active"
          ? `${window.location.origin}/projects/${id}`
          : "Publish to get shareable link"}
      </span>
      <div className="flex items-center">
        <Button
          size="sm"
          disabled={!id || status !== "active"}
          onClick={() =>
            copyToClipboard(`${window.location.origin}/projects/${id}`)
          }
          className="space-x-2 rounded-br-none rounded-tr-none border-r-[.3px] border-[#C4C4C4] bg-white px-3 text-accent hover:bg-white/80"
        >
          <span className="whitespace-nowrap font-body text-[.75rem] font-[600]">
            Copy Link
          </span>{" "}
          <Copy size={16} />{" "}
        </Button>
        <Button
          size="sm"
          disabled={!id || status !== "active"}
          onClick={() => openLinkInNewTab(`/projects/${id}`)}
          className="space-x-2 rounded-bl-none rounded-tl-none bg-white px-3 text-accent hover:bg-white/80"
        >
          <span className="font-body text-[.75rem] font-[600]">Preview</span>{" "}
          <Eye fill="#3466FF" size={23} className="text-white" />{" "}
        </Button>
      </div>
    </div>
  );
};

const TestimonyEditorComp = ({ projectId }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof AdminCreteTestimonyValidation>>({
    resolver: zodResolver(AdminCreteTestimonyValidation),
  });

  const publishTestimony = (
    values: z.infer<typeof AdminCreteTestimonyValidation>
  ) => {};

  return (
    <Form {...form}>
      <MainContentWrapper
        right={<RightContent id="123" status="sdadas" />}
        responsive={true}
        top={
          <Button
            variant="link"
            onClick={() => router.back()}
            className="w-fit space-x-2 px-0 text-[.8rem] font-[400] text-accent"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Button>
        }
        title="New Testimony Name"
      >
        <TabWrapper className="mt-8">
          <TabSectionWrapper
            title="General Details"
            desc="Choose a title and enter the other relevant information."
          >
            <div className="w-full">
              <div className="grid grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Project</FormLabel>
                      <FormControl>
                        <Input disabled value="A great prpoject" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  name="amountRaised"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel required>Amount raised</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="₦ 0.00"
                          // disabled={!!(id && status === "active")}
                          type="text"
                          value={field.value}
                          onChange={(event) => {
                            const rawValue = event?.target?.value.replace(
                              /[^0-9]/g,
                              ""
                            ); // Remove non-numeric characters
                            if (isNaN(+rawValue)) {
                              return field.onChange("");
                            }
                            const formattedValue = new Intl.NumberFormat(
                              "en-US"
                            ).format(parseInt(rawValue || "0", 10));

                            field.onChange(
                              formattedValue !== "0"
                                ? `₦ ${formattedValue}`
                                : ""
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="peopleImpacted"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel required>No. of people impacted</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          // disabled={!!(id && status === "active")}
                          type="text"
                          value={field.value}
                          onChange={(event) => {
                            const rawValue = event?.target?.value.replace(
                              /[^0-9]/g,
                              ""
                            ); // Remove non-numeric characters
                            if (isNaN(+rawValue)) {
                              return field.onChange("");
                            }

                            const formattedValue = new Intl.NumberFormat(
                              "en-US"
                            ).format(parseInt(rawValue || "0", 10));

                            field.onChange(
                              formattedValue !== "0" ? `${formattedValue}` : ""
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabSectionWrapper>

          <TabSectionWrapper
            title="Cover Photo"
            desc="Add a cover photo for your testimony"
            spaceTop
          >
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
                      fileName="cover_photo"
                      //   editMode={id ? true : false}
                      //   fileUrl={fileUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabSectionWrapper>

          <TabSectionWrapper
            spaceTop
            orientation="vertical"
            title="Story"
            desc="Tell your audience more about your testimony."
          >
            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>What is this project about?</FormLabel>
                  <FormControl>
                    <Textarea rows={16} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabSectionWrapper>

          <div className="ml-auto flex w-fit space-x-4">
            <Button
              variant="outline"
              className="w-fit whitespace-nowrap border-accent text-accent"
            >
              Save as draft
            </Button>
            <Button
              variant="secondary"
              onClick={form.handleSubmit(publishTestimony)}
            >
              Publish
            </Button>
          </div>
        </TabWrapper>
      </MainContentWrapper>
    </Form>
  );
};

const TestimonyEditor = ({ projectId }: Props) => {
  return (
    <NoSSRWrapper>
      <TestimonyEditorComp projectId={projectId} />
    </NoSSRWrapper>
  );
};
export default TestimonyEditor;
