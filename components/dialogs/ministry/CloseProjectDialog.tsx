import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MinistryCloseProjectValidation } from "lib/validations/ministry";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCloseMinistryProjectMutation } from "services/projects";

import { Button } from "@components/ui/button";
import { DialogContent, DialogHeader } from "@components/ui/dialog";
import { useToast } from "@components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input-with-icon";

interface Props {
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
}

const CloseProjectDialog = ({ id, setOpen, title }: Props) => {
  const [closeMinistryProject, { isLoading: closingProject }] =
    useCloseMinistryProjectMutation();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof MinistryCloseProjectValidation>>({
    resolver: zodResolver(MinistryCloseProjectValidation),
  });

  const handleCloseProject = async (
    values: z.infer<typeof MinistryCloseProjectValidation>
  ) => {
    const { password } = values;
    try {
      await closeMinistryProject({ id, password }).unwrap();
      toast({
        title: "Project closed successfully",
      });
      setOpen(false);
    } catch (err: any) {
      console.log({ err });
      toast({
        variant: "destructive",
        title: "Unable to close project",
        description: err || "Failed to close project. Please try again later",
      });
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.add("activate-cursor");
    };
  }, []);

  return (
    <DialogContent>
      <DialogHeader className="font-body font-[600] capitalize">
        Close Project
      </DialogHeader>
      <div>
        <p className="text-center font-body text-[0.875rem]">
          Are you sure you want to close your project “
          <span className="font-[600]">{title}</span>”? Note that you haven’t
          reached your project goal and this action cannot be undone.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCloseProject)}
            className="w-full"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="flex w-full items-center justify-center text-center">
                    <span className="text-center">
                      To close the project, enter your password below:
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              loading={closingProject}
              className="mt-6 w-full bg-[#DD3636] text-white hover:bg-[#DD3636]"
            >
              Close project
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default CloseProjectDialog;
