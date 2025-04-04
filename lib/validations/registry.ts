import { z } from "zod";
import { fileUploadSchema } from "./fileUpload";

const nameSchema = (text: string) =>
  z
    .string()
    .min(2, `${text} must be at least 2 characters`)
    .max(50, `${text} must not exceed 50 characters`);

const addressSchema = z
  .string()
  .min(5, "Address must be at least 5 characters")
  .max(200, "Address must not exceed 200 characters");
const termSchema = z
  .boolean()
  .refine((val) => val === true, "You must agree to the terms and conditions");

// Base schema with common fields
const baseFormSchema = z.object({
  name: nameSchema("Name"),
  state: z.string().min(1, "Please select a state"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  phone: z.object({
    phone_code: z.string().min(1, "Country code is required"),
    phone_number: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits"),
  }),
  address: addressSchema,
  t_and_c: termSchema,
});

// Mission-specific schema
const missionFormSchema = baseFormSchema.extend({
  missionary_type: z.enum(["serving-missionary", "aspiring-missionary"], {
    message: "Please select a missionary type",
  }),
  dur: z.object({
    interval: z.enum(["years", "months"], {
      message: "Please select an interval",
    }),
    period: z.string().min(1, "Period is required"),
  }),
  service_area: z
    .string()
    .min(2, "Service area must be at least 2 characters")
    .max(100, "Service area must not exceed 100 characters"),
  previous_exp: z
    .string()
    .min(20, "Please provide more details about your previous experience")
    .max(1000, "Experience details must not exceed 1000 characters"),
  church_affliate: z
    .string()
    .min(2, "Church affiliation must be at least 2 characters")
    .max(100, "Church affiliation must not exceed 100 characters"),
  nok_name: z
    .string()
    .min(2, "Next of kin name must be at least 2 characters")
    .max(50, "Next of kin name must not exceed 50 characters"),
  nok: z.object({
    phone_code: z.string().min(1, "Country code is required"),
    phone_number: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits"),
  }),
});

// Widow-specific schema
const widowFormSchema = baseFormSchema.extend({
  dob: z.date({
    required_error: "Date of birth is required",
    invalid_type_error: "Invalid date format",
  }),
  dur: z.object({
    interval: z.enum(["years", "months"], {
      message: "Please select an interval",
    }),
    period: z.string().min(1, "Period is required"),
  }),
  no_of_children: z
    .string()
    .min(1, "Number of children is required")
    .regex(/^\d+$/, "Must be a number"),

  nok_name: z
    .string()
    .min(2, "Next of kin name must be at least 2 characters")
    .max(50, "Next of kin name must not exceed 50 characters"),
  nok: z.object({
    phone_code: z.string().min(1, "Country code is required"),
    phone_number: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits"),
  }),
});

// Orphan-specific schema
const orphanFormSchema = baseFormSchema.extend({
  admin_name: nameSchema("Administarator's Name"),
  cac_doc: fileUploadSchema,
  no_of_orphans: z
    .string()
    .min(1, "Number of orphans is required")
    .regex(/^\d+$/, "Must be a number"),
});
// Ministry-specific schema
const ministryFormSchema = baseFormSchema.extend({
  ministry_type: z.enum(["serving-ministry", "aspiring-ministry"], {
    message: "Please select a ministry type",
  }),
  admin_name: nameSchema("Administarator's Name"),
  website: z.string().url(),
  project_type: z.enum(["widows", "orphans", "missionaries"], {
    message: "Please select a project type",
  }),
  cac_doc: fileUploadSchema,
  scuml_cert: fileUploadSchema,
});

// Infer the types from the schemas
type OrphanFormValues = z.infer<typeof orphanFormSchema>;
type MinistryFormValues = z.infer<typeof ministryFormSchema>;
type WidowFormValues = z.infer<typeof widowFormSchema>;
type MissionFormValues = z.infer<typeof missionFormSchema>;

export {
  ministryFormSchema,
  missionFormSchema,
  orphanFormSchema,
  widowFormSchema,
};
export type {
  MinistryFormValues,
  MissionFormValues,
  OrphanFormValues,
  WidowFormValues,
};
