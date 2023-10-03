import { useDeleteMinistryProjectMutation } from "services/projects";

import EmptyState from "@components/shared/EmptyState";
import { Button } from "@components/ui/button";
import { DialogContent } from "@components/ui/dialog";
import { InfoCircle } from "react-iconly";
import { useToast } from "@components/ui/use-toast";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Props {
  id: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteProjectDialog = ({ id, setOpen }: Props) => {
  const [deleteMinistryProject, { isLoading: deleteLoading }] =
    useDeleteMinistryProjectMutation();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteMinistryProject(id).unwrap();
      toast({
        title: "Project deleted successfully",
      });
      setOpen(false);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unable to delete project",
      });
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.add("activate-cursor");
    };
  }, []);
  return (
    <DialogContent className="h-[40vh]">
      <div className="flex h-full w-full items-center justify-center px-10">
        <EmptyState
          image={<InfoCircle primaryColor="#EB5757" size={60} stroke="light" />}
          title="Delete this project?"
          desc="Are you sure you want to delete “The Widows Project”? Please note that this action cannot be undone."
          action={
            <Button
              loading={deleteLoading}
              onClick={handleDelete}
              className="w-fit bg-[#EB5757] text-white hover:bg-[#EB5757]"
            >
              Yes, delete project
            </Button>
          }
        />
      </div>
    </DialogContent>
  );
};

export default DeleteProjectDialog;
