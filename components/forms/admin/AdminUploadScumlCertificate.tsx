"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminUploadScumlCertificateType } from "lib/validations/admin";
import { Button } from "@components/ui/button";
import FileUpload from "@components/ui/file-upload";
import UploadIconAdmin from "@components/assets/svg/UploadIcon";
import { useUploadMinistryDocumentsMutation } from "services/admin";
import { useToast } from "@components/ui/use-toast";
import { convertBase64toFile } from "@lib/functions";

const AdminUploadScumlCertificate = ({
  id,
  onClose,
}: {
  id: string;
  onClose?: () => void;
}) => {
  const form = useForm<z.infer<typeof AdminUploadScumlCertificateType>>({
    resolver: zodResolver(AdminUploadScumlCertificateType),
  });
  const { toast } = useToast();
  const [uploadDocuments, { isLoading }] = useUploadMinistryDocumentsMutation();

  const onSubmit = async (
    values: z.infer<typeof AdminUploadScumlCertificateType>
  ) => {
    // Upload
    const { scumlCcertificate } = values;
    try {
      await uploadDocuments({
        id,
        scumlCertificate: convertBase64toFile(scumlCcertificate, "scuml"),
      }).unwrap();
      toast({
        title: "Ministry CAC document updated successfully",
      });
      if (onClose) {
        onClose();
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to update ministry cac document",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col"
      >
        <FormField
          control={form.control}
          name="scumlCcertificate"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <FileUpload
                  onFileChange={(file: string) => {
                    field.onChange(file);
                  }}
                  title={
                    <span className="text-[#333333]">Upload your file</span>
                  }
                  desc="(.jpg, .png, or pdf file format supported)"
                  containerClassname="w-full aspect-[1/.3] border-black"
                  fileName="cac_document"
                  editMode={false}
                  onDelete={() => {
                    form.resetField("scumlCcertificate");
                  }}
                  uploadIcon={<UploadIconAdmin />}
                  acceptedFiles=".jpg, .jpeg, .png, .pdf"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="secondary"
          loading={isLoading}
          className="mt-10 w-full"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AdminUploadScumlCertificate;
