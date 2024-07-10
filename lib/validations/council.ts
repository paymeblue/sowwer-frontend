import * as z from "zod";

export const JoinSoowerCouncil = z.object({
  name: z.string().min(1, { message: "Please enter a name" }),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number must 11 characters" })
    .max(11, { message: "Phone number must 11 characters" }),
  state: z.string().min(1, { message: "Please enter a state" }),
  address: z.string().min(1, { message: "Please enter an address" }),
  nameOfChurch: z.string().min(1, { message: "Required" }),
  reason: z.string().min(1, { message: "Required" }),
  acceptTerms: z.boolean({
    required_error: "You must read and accept the declaration",
  }),
});
