import FileUploadIcon from "@components/assets/svg/FileUpload";
import { cn } from "@lib/cn";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useToast } from "./use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

interface Props {
  onFileChange?: (file: string) => void;
  file?: string;
  containerClassname?: HTMLAttributes<HTMLDivElement>["className"];
  uploadIcon?: ReactNode;
  title: string | ReactNode;
  desc: string;
  fileName: string;
  fileUrl?: string;
  editMode?: boolean;
  onDelete?: () => void;
  acceptedFiles?: string;
}

const FileUpload = ({
  onFileChange,
  file,
  containerClassname,
  title,
  desc,
  fileName,
  fileUrl,
  editMode = false,
  onDelete,
  acceptedFiles = ".jpg, .jpeg, .png",
  uploadIcon,
}: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [editModeState, setEditModeState] = useState(editMode);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!onFileChange) return;
    if (imageBase64) {
      onFileChange(imageBase64);
    }
  }, [imageBase64, onFileChange]);

  useEffect(() => {
    if (file && !imageBase64) {
      // Remove the data URL prefix (e.g., "data:image/png;base64,")
      const base64StringWithoutPrefix = file.replace(
        /^data:(image|application)\/[a-z]+;base64,/,
        ""
      );

      // Convert the base64 string to a Uint8Array
      const byteCharacters = atob(base64StringWithoutPrefix);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });
      const newFile = new File([blob], fileName); // You can set the desired file name
      setSelectedFile(newFile);
    }
  }, [file, imageBase64, fileName]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // File size exceeds the limit, you can display an error message or take appropriate action
        toast({
          variant: "destructive",
          title: "Please upload a smaller file size.",
          description: "File size exceeds the maximum limit of 5MB.",
        });
        return;
      } else {
        // Create a new File object with the desired name "CAC_Document"
        const newFileName = fileName;
        const newFile = new File([file], newFileName, { type: file.type });

        setSelectedFile(newFile);
        // Read the file as a Base64 string
        const reader = new FileReader();
        // reader.onload = () => {
        //   const base64String = reader.result as string;
        //   setImageBase64(base64String);
        // };

        reader.onloadend = (e) => {
          const base64String = e.target?.result as string;
          setImageBase64(base64String);
        };
        reader.readAsDataURL(newFile);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files && event.dataTransfer.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // File size exceeds the limit, you can display an error message or take appropriate action
        toast({
          variant: "destructive",
          title: "Please upload a smaller file size.",
          description: "File size exceeds the maximum limit of 5MB.",
        });
        return;
      } else {
        // Create a new File object with the desired name "CAC_Document"
        const newFileName = fileName;
        const newFile = new File([file], newFileName, { type: file.type });

        setSelectedFile(newFile);
        // Read the file as a Base64 string
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;

          setImageBase64(base64String);
        };
        reader.readAsDataURL(newFile);
      }
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-0">
      {!editModeState && (
        <div
          className={cn(
            "mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-primary py-10",
            containerClassname
          )}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileInput}
        >
          <input
            type="file"
            accept={acceptedFiles}
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {uploadIcon ? uploadIcon : <FileUploadIcon />}
          <h4 className="font-body text-[.8rem] text-primary">{title}</h4>
          <p className="text-center font-body text-[.7rem] text-[#848484]">
            {desc}
          </p>
        </div>
      )}
      {selectedFile && !editModeState && (
        <div className="flex w-full items-center justify-between rounded-lg border-[.5px] border-gray-300 p-4">
          <div className="flex items-center space-x-2">
            {selectedFile?.type !== "application/pdf" && (
              <div className="relative h-6 w-6 rounded-md border border-gray-300">
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected File"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <p className="text_regular_body_p text-[.75rem]">
              {selectedFile.name}
            </p>
          </div>

          <div
            onClick={() => {
              setSelectedFile(null);
              setImageBase64(null);
              if (onDelete) {
                onDelete();
              }
            }}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-grey"
          >
            <Trash size={14} />
          </div>
        </div>
      )}
      {editModeState && (
        <div className="flex w-full items-center justify-between rounded-lg border-[.5px] border-gray-300 p-4">
          <div className="flex items-center space-x-2">
            <div className="relative h-6 w-6 rounded-md border border-gray-300">
              <Image
                src={fileUrl || ""}
                alt="Selected File"
                fill
                className="object-contain"
              />
            </div>
            <p className="text_regular_body_p text-[.75rem]">{fileName}</p>
          </div>

          <div
            onClick={() => {
              setImageBase64(null);
              setSelectedFile(null);
              setEditModeState(false);
              if (onDelete) {
                onDelete();
              }
            }}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:bg-grey"
          >
            <Trash size={14} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
