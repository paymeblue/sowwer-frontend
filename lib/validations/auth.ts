import * as z from "zod";

export const ForgotPassword = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
  password: z.string().min(3, { message: "Please enter a password" }),
});

export const ResetPassword = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password should be minimum 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
