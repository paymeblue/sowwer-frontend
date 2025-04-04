import { z } from "zod";

const termSchema = z
  .boolean()
  .refine((val) => val === true, "You must agree to the terms and conditions");

const authDonationSchema = z.object({
  frequency: z.enum(["one-time", "monthly"], {
    message: "Please select a donation frequency",
  }),
  form_amount: z.object({
    currency: z.string().min(1, "Please select a currency"),
    amount: z.string().min(1, "Please enter an amount"),
  }),
});
const unAuthDonationSchema = authDonationSchema.merge(
  z.object({
    f_name: z.string().min(1, "Please enter a first name"),
    l_name: z.string().min(1, "Please enter a last name"),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.object({
      phone_code: z.string().min(1, "Please select a country code"),
      phone_number: z
        .string()
        .min(5, "Phone number is too short")
        .max(15, "Phone number is too long")
        .regex(/^\d+$/, "Phone number must contain only numbers"),
    }),
    t_and_c: termSchema,
  })
);

const dadProjectSchema = z.object({
  sponsorship_type: z.enum(["full-sponsorship", "partial-sponsorship"], {
    message: "Please select a sponship type",
  }),
  payment_frequency: z.enum(["per-term", "per-session"], {
    message: "Please select a payment frequency",
  }),
  geo_location: z.enum(["south-south", "south-east"], {
    message: "Please select a geo location",
  }),
  form_amount: z.object({
    currency: z.string().min(1, "Please select a currency"),
    amount: z.string().min(1, "Please enter an amount"),
  }),
  f_name: z.string().min(1, "Please enter a first name"),
  l_name: z.string().min(1, "Please enter a last name"),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.object({
    phone_code: z.string().min(1, "Please select a country code"),
    phone_number: z
      .string()
      .min(5, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\d+$/, "Phone number must contain only numbers"),
  }),
  t_and_c: termSchema,
});

type dadProjectType = z.infer<typeof dadProjectSchema>;
type unAuthDonationType = z.infer<typeof unAuthDonationSchema>;
type authDonationType = z.infer<typeof authDonationSchema>;

export { authDonationSchema, dadProjectSchema, unAuthDonationSchema };
export type { authDonationType, dadProjectType, unAuthDonationType };
