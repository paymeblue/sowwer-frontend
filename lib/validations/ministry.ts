import * as z from "zod";
import { isValidPassword } from "./auth";

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
  cover_photo: z.string().min(1, "Please upload a cover photo"),
  description: z.string().min(100, {
    message: "Please provide more information about your project",
  }),
  title: z
    .string()
    .min(3, {
      message: "Please provide a project title more that 3 characters",
    })
    .max(50, {
      message: "Please provide a project title less than 50 characters",
    }),
});

export const MinistryGeneralDetailsValidation = z.object({
  name: z.string(),
  addressLine: z.string(),
  state: z.string(),
  about: z.string(),
});

export const MinistryGeneralLogoValidation = z.object({
  logo: z.string(),
});

export const MinistryContactDetailsValidation = z.object({
  email: z.string().email().toLowerCase(),
  phone: z.string(),
});

export const MinistrySocialAccountsValidation = z.object({
  website: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  linkedIn: z.string().optional(),
  youtube: z.string().optional(),
});

export const MinistryPersonalDetailsValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const MinistryPasswordSettingsValidation = z
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

export const MinistryCloseProjectValidation = z.object({
  password: z.string(),
});

export const MinistryConnectBankAccount = z.object({
  bank: z.string(),
  accountNumber: z
    .string()
    .min(10, { message: "Account number must be 10 characters" })
    .max(10, { message: "Account number must not exceed 10 characters" }),
});
