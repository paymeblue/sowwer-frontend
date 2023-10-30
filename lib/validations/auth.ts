import * as z from "zod";

// Custom password validation function
export const isValidPassword = (password: string) => {
  // Minimum length of 3 characters
  if (password.length < 3) {
    return false;
  }

  // At least one number
  if (!/\d/.test(password)) {
    return false;
  }

  // At least one special character (e.g., !@#$%^&*)
  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }

  return true;
};

export const ForgotPassword = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
});

export const ResetPassword = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password should be minimum 8 characters" })
      .refine(isValidPassword, {
        message:
          "Password must contain at least one number and one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const MinistrySignupMinistryDetailsValidation = z.object({
  name: z.string({
    required_error: "Please eneter the name of your organization",
  }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
  phoneNumber: z.string().min(10, { message: "Minimum 10 characters" }),
  address: z.string().min(3),
  state: z.string().nonempty(),
  websiteLink: z.string().optional(),
  cacDocument: z.string(),
  description: z.string(),
});

export const MinistrySignupPersonalInformationValidation = z.object({
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(3, { message: "Minimum 3 characters" })
    .max(30),
  phoneNumber: z.string().min(10, { message: "Minimum 10 characters" }),
  password: z
    .string()
    .min(8, { message: "Password should be minimum 8 characters" }),
});
