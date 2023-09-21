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

export const WidowRegistration = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be more than three characters" }),
  age: z.number(),
  duration: z.number(),
  email: z.string().email(),
  phoneNumber: z.number(),
  address: z.string(),
  isWidowChristian: z.boolean(),
  doesWidowHaveKids: z.boolean(),
  acceptTerms: z.boolean(),
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
  acceptTerms: z.boolean(),
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
  acceptTerms: z.boolean(),
});
