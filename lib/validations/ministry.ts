import * as z from "zod";

export const MinistrySigninValidation = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
  password: z.string().min(3, { message: "Please enter a password" }),
});

export const MinistryCreateProjectValidation = z.object({
  amount: z.string().min(1),
  category: z.string(),
  cover_photo: z.string(),
  description: z.string(),
  title: z
    .string()
    .min(3, {
      message: "Please provide a project title more that 3 characters",
    })
    .max(50, {
      message: "Please provide a project title less than 50 characters",
    }),
});
