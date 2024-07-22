import * as z from "zod";

export const AdminUploadCacDocument = z.object({
  cacDocument: z.string().min(1),
});

export const AdminUploadUtilityBill = z.object({
  utilityBill: z.string().min(1),
});

export const AdminCreteTestimonyValidation = z.object({
  title: z.string().min(1, "Please provide a title"),
  amountRaised: z.string().min(1, "Required"),
  peopleImpacted: z.string().min(1, "Required"),
  cover_photo: z.string().min(1, "Please upload a cover photo"),
  story: z.string().min(1, "Required"),
  project: z.string().optional(),
});
