import * as z from "zod";

export const AdminUploadCacDocument = z.object({
  cacDocument: z.string().min(1),
});

export const AdminUploadUtilityBill = z.object({
  utilityBill: z.string().min(1),
});
