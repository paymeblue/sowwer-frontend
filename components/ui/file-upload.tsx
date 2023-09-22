import FileUploadIcon from "@components/assets/svg/FileUpload";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

interface Props {
  onFileChange?: (file: string) => void;
}

const FileUpload = ({ onFileChange }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!onFileChange) return;
    if (imageBase64) {
      onFileChange(imageBase64);
    }
  }, [imageBase64, onFileChange]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        // File size exceeds the limit, you can display an error message or take appropriate action
        alert("File size exceeds the maximum limit of 5MB.");
      } else {
        setSelectedFile(file);
        // Read the file as a Base64 string
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          setImageBase64(base64String);
        };
        reader.readAsDataURL(file);
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
        alert("File size exceeds the maximum limit of 5MB.");
      } else {
        setSelectedFile(file);
        // Read the file as a Base64 string
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          setImageBase64(base64String);
        };
        reader.readAsDataURL(file);
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
      <div
        className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-primary py-10"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileInput}
      >
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <FileUploadIcon />
        <h4 className="font-body text-[.8rem] text-primary">
          Upload Cover Photo
        </h4>
        <p className="font-body text-[.7rem] text-[#848484]">
          (.jpg, .jpeg, or .png file format supported, max 5MB)
        </p>
      </div>
      {selectedFile && (
        <div className="flex w-full items-center justify-between rounded-lg border-[.5px] border-gray-300 p-4">
          <div className="flex items-center space-x-2">
            <div className="relative h-6 w-6 rounded-md border border-gray-300">
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Selected File"
                fill
                className="object-contain"
              />
            </div>
            <p className="text_regular_body_p text-[.75rem]">
              {selectedFile.name}
            </p>
          </div>

          <div
            onClick={() => setSelectedFile(null)}
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
