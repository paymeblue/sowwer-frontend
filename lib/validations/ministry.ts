import * as z from "zod";

export const MinistrySigninValidation = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
  password: z.string().min(3, { message: "Please enter a password" }),
});
