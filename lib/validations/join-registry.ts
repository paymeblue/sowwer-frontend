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
  widowAge: z.string(),
  widowDuration: z.string(),
  range: z.enum(["month", "year"]),
  widowEmail: z.string().email(),
  widowPhone: z.string(),
  widowAddress: z.string(),
  isWidowChristian: z.enum(["Yes", "No"]),
  doesWidowHaveKids: z.enum(["Yes", "No"]),
  acceptTerms: z.boolean({
    required_error: "You must read and accept the declaration",
  }),
});

export const WidowRegistration = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be more than three characters" }),
  age: z.string(),
  duration: z.string(),
  range: z.enum(["month", "year"]),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  isWidowChristian: z.enum(["Yes", "No"]),
  doesWidowHaveKids: z.enum(["Yes", "No"]),
  acceptTerms: z.boolean({
    required_error: "You must read and accept the declaration",
  }),
});

export const MissionaryRegistrationStart = z.object({
  isNewMissionary: z.string(),
});

export const NewMissionaryRegistration = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be more than three characters" }),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .min(3, { message: "Name must be more than three characters" }),
  address: z.string().min(3),
  isChristian: z.boolean(),
  isBornAgain: z.boolean(),
  nameOfChurch: z.string(),
  occupation: z.string(),
  reason: z.string(),
  acceptTerms: z.boolean({
    required_error: "You must read and accept the declaration",
  }),
});

export const ExisitingMissionRegistration = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be more than three characters" }),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .min(3, { message: "Name must be more than three characters" }),
  address: z.string().min(3),
  duration: z.number(),
  serviceArea: z.string(),
  previousWork: z.string(),
  isAffiliatedWithChurch: z.boolean(),
  acceptTerms: z.boolean({
    required_error: "You must read and accept the declaration",
  }),
});
