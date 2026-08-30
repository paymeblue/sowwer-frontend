import * as z from "zod";

export const ContactUsValidation = z.object({
  fullName: z.string().min(2, { message: "Minimum 2 characters" }).max(60),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .max(254),
  message: z.string().min(3, { message: "Minimum 3 characters" }).max(1000),
  phoneNumber: z
    .string()
    .min(7, { message: "Minimum 7 characters" })
    .optional(),
  countryCode: z.string().optional(),
});
