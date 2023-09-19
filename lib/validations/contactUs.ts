import * as z from "zod";

export const ContactUsValidation = z.object({
  fullName: z.string().min(3, { message: "Minimum 3 characters" }).max(30),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
  message: z.string().min(3, { message: "Minimum 3 characters" }).max(1000),
  phoneNumber: z.string().min(10, { message: "Minimum 10 characters" }),
});
