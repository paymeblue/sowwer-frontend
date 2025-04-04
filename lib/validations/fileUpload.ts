import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const ACCEPTED_FILE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/pdf": [".pdf"],
} as const;

// Create readable error messages
const FILE_ERROR_MESSAGES = {
  required: "Please select a file",
  size: `File size must be  ${MAX_FILE_SIZE / (1024 * 1024)}MB or less`,
  type: "Invalid file format. Only JPEG, PNG, or PDF files are allowed.",
} as const;

const fileUploadSchema = z
  .custom<File>((val) => val instanceof File, {
    message: FILE_ERROR_MESSAGES.required,
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: FILE_ERROR_MESSAGES.size,
  })
  .refine((file) => Object.keys(ACCEPTED_FILE_TYPES).includes(file.type), {
    message: FILE_ERROR_MESSAGES.type,
  });
export {
  ACCEPTED_FILE_TYPES,
  FILE_ERROR_MESSAGES,
  fileUploadSchema,
  MAX_FILE_SIZE,
};
