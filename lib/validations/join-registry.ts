import * as z from "zod";

export const WidowRegisterationStart = z.object({
  isRegisteringForSomeone: z.string(),
});

export const WidowRegistrationForSomeone = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be more than three characters" }),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .min(3, { message: "Name must be more than three characters" }),
  widowName: z
    .string()
    .min(3, { message: "Name must be more than three characters" }),
  widowAge: z.number(),
  widowDuration: z.number(),
  widowEmail: z.string().email(),
  widowPhone: z.number(),
  widowAddress: z.string(),
  isWidowChristian: z.boolean(),
  doesWidowHaveKids: z.boolean(),
  acceptTerms: z.boolean(),
});
