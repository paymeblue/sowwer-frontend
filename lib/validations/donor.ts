import * as z from "zod";
import { isValidPassword } from "./auth";

export const DonorSignupValidation = z
  .object({
    firstName: z.string().min(3, { message: "Minimum 3 characters" }).max(30),
    lastName: z.string().min(3, { message: "Minimum 3 characters" }).max(30),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address")
      .min(3, { message: "Minimum 3 characters" })
      .max(30),
    phoneNumber: z.string().min(10, { message: "Minimum 10 characters" }),
    password: z
      .string()
      .refine((value) => value && value.length > 0, "Your password is required")
      .refine(
        (value) => {
          return (
            value &&
            value.length >= 8 &&
            /\d/.test(value) &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
          );
        },
        {
          message:
            "Password must have at least one lowercase character, one uppercase character, one digit, one special character, and be at least 8 characters long",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const DonorSigninValidation = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
  password: z.string().min(3, { message: "Please enter a password" }),
});

export const AdminSigninValidation = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
  password: z.string().min(3, { message: "Please enter a password" }),
});

export const DonorPersonalDetailsValidation = z.object({
  firstName: z.string().min(3, { message: "Minimum 3 characters" }).max(30),
  lastName: z.string().min(3, { message: "Minimum 3 characters" }).max(30),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
  phoneNumber: z.string(),
});

export const DonorPasswordSettingsValidation = z
  .object({
    currentPassword: z.string(),
    newPassword: z
      .string()
      .min(3, { message: "Minimum 3 characters" })
      .refine(isValidPassword, {
        message:
          "Password must contain at least one number and one special character",
      }),
    confirmNewPassword: z.string().min(3, { message: "Minimum 3 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
