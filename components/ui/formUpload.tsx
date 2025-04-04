import { FileIcon } from "@components/assets/icons";
import { cn } from "@lib/cn";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "lib/validations/fileUpload";
import { useCallback, useMemo, useRef } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Controller, useFormContext } from "react-hook-form";
import { Delete } from "react-iconly";
import { Button } from "./button";
import { FormItem, FormLabel } from "./form";

export interface UploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
}

const formatBytes = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  return `${Math.round(mb)}MB`;
};

const FormUpload = ({ name, label, placeholder }: UploadProps) => {
  const { control, setValue, watch, setError, clearErrors } = useFormContext();
  const file = watch(name) as File | undefined;
  const filename = file?.name || "";
  const filetype = file?.type || "";
  const filesize = file?.size || 0;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        // Fix: Access the first error message safely
        setError(name, {
          message: rejectedFiles[0]?.errors[1]?.message,
        });
      } else if (acceptedFiles.length > 0) {
        setValue(name, acceptedFiles[0], {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
        clearErrors(name); // Remove previous errors
      }
    },
    [setValue, setError, clearErrors, name]
  );

  const fileValidator = useCallback((file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      return {
        code: "file-too-large",
        message: `File is larger than ${formatBytes(MAX_FILE_SIZE)}`, // Formats size in MB
      };
    }
    return null;
  }, []);

  const dropzoneConfig = useMemo(
    () => ({
      onDrop,
      accept: ACCEPTED_FILE_TYPES,
      maxFiles: 1,
      maxSize: MAX_FILE_SIZE,
      validator: fileValidator,
    }),
    [onDrop, fileValidator]
  );

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Fix: Allows reselecting the same file
      inputRef.current.click();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => {
        /* eslint-disable react-hooks/rules-of-hooks */
        const { getRootProps, getInputProps, fileRejections } =
          useDropzone(dropzoneConfig);
        const errorMessage =
          error?.message || fileRejections[0]?.errors[0]?.message;

        return (
          <FormItem className="w-full flex-1 space-y-0">
            <FormLabel
              htmlFor={name}
              className="mb-0.5 ms-2 font-montreal text-sm font-medium"
            >
              {label}
            </FormLabel>
            {filename ? (
              <div
                className="flex w-full items-center
                    rounded-xl bg-white px-4 py-2 text-sm text-black shadow-[0px_4px_20px_0px_#0000000F]"
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF0FF] text-[#3466FF] ">
                      <FileIcon />
                    </div>
                    <p className="flex flex-col justify-center gap-1">
                      <span className="font-montreal text-[13px] font-medium text-body-1">
                        {filename.split(".")[0]}
                      </span>
                      <p className="m-0 p-0 font-montreal text-xs uppercase leading-[8px] text-[#75808A]">
                        <span>
                          {(filesize / (1024 * 1024)).toFixed(2)}MB •&nbsp;
                        </span>
                        <span>{filetype.split("/")[1]}</span>
                      </p>
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-[#F7F8FA]"
                    // onClick={removeFileHandler}
                  >
                    <Delete primaryColor="#E02424" size={18} />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className={cn(
                  "flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-[0.6px] border-dashed border-[#DADADA] px-[20px] py-5 text-black shadow-sm hover:border-primary",
                  "m-0 rounded-xl border border-input bg-white focus-within:border-primary focus-within:shadow-input focus-within:outline-none focus-within:ring-0 focus-within:ring-offset-0 hover:border-primary hover:shadow-input focus-visible:ring-0 focus-visible:ring-offset-0",
                  error &&
                    "focus-within:border-error focus-within:shadow-input-error"
                )}
                role="button"
                tabIndex={0}
                aria-label="File upload area"
                onClick={handleClick}
                {...getRootProps()}
              >
                <div className="mx-auto flex w-full max-w-[227px] flex-col items-center justify-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F8FA] text-[#75808A]">
                    <FileIcon />
                  </div>
                  <p className="font-montreal text-[13px] font-medium text-body-1">
                    {placeholder}
                  </p>
                  <span className="text-center font-montreal text-xs text-[#75808A]">
                    (.jpg, .jpeg, .png, or .pdf file format supported) Max file
                    size: 1MB
                  </span>
                </div>
              </div>
            )}
            <input
              id={name}
              type="file"
              className="hidden"
              ref={inputRef}
              {...getInputProps()}
            />
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </FormItem>
        );
      }}
    />
  );
};

FormUpload.displayName = "FormUpload";

export default FormUpload;
