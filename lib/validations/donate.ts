import * as z from "zod";

export const DonateToProjectValidation = z
  .object({
    amount: z.string(),
    currency: z.enum(["USD", "NGN"]),
    shouldSignup: z.boolean(),
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address")
      .min(3, { message: "Minimum 3 characters" })
      .max(30),
    phoneNumber: z.string().min(10, { message: "Minimum 10 characters" }),
    isAnonymous: z.boolean(),
    password: z
      .string()
      .min(8, { message: "Password should be minimum 8 characters" })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => !data.shouldSignup || data.password, {
    message: "Password is required when signing up",
    path: ["password"],
  })
  .refine((data) => !data.shouldSignup || data.confirmPassword, {
    message: "Confirm Password is required when signing up",
    path: ["confirmPassword"],
  });

export const DonateToProjectAuthValidation = z.object({
  amount: z.string(),
  currency: z.enum(["USD", "NGN"]),
  isAnonymous: z.boolean(),
});

export const DonateToMinistryValidation = z
  .object({
    amount: z.string(),
    currency: z.enum(["USD", "NGN"]),
    shouldSignup: z.boolean(),
    firstName: z.string(),
    lastName: z.string(),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address")
      .min(3, { message: "Minimum 3 characters" })
      .max(30),
    phoneNumber: z.string().min(10, { message: "Minimum 10 characters" }),
    isAnonymous: z.boolean(),
    donationType: z.enum(["one-time", "recurring"]),
    frequency: z.enum(["monthly", "quarterly", "yearly"]).optional(),
    password: z
      .string()
      .min(8, { message: "Password should be minimum 8 characters" })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => !data.shouldSignup || data.password, {
    message: "Password is required when signing up",
    path: ["password"],
  })
  .refine((data) => !data.shouldSignup || data.confirmPassword, {
    message: "Confirm Password is required when signing up",
    path: ["confirmPassword"],
  })
  .refine((data) => data.donationType !== "recurring" || data.frequency, {
    message: "Frequency is required for recurring donations",
    path: ["frequency"],
  });

export const DonateToMinistryAuthValidation = z
  .object({
    amount: z.string(),
    currency: z.enum(["USD", "NGN"]),
    isAnonymous: z.boolean(),
    donationType: z.enum(["one-time", "recurring"]),
    frequency: z.enum(["monthly", "quarterly", "yearly"]).optional(),
  })
  .refine((data) => data.donationType !== "recurring" || data.frequency, {
    message: "Frequency is required for recurring donations",
    path: ["frequency"],
  });
