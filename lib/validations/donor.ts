import * as z from "zod";

export const DonorSignupValidation = z
  .object({
    firstName: z.string().min(3, { message: "Minimum 3 characters" }).max(30),
    lastName: z.string().min(3, { message: "Minimum 3 characters" }).max(30),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(3, { message: "Minimum 3 characters" })
      .max(30),
    phoneNumber: z.string().min(10, { message: "Minimum 10 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
