import * as z from "zod";

export const step1Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone is too short"),
});

export type Step1Data = z.infer<typeof step1Schema>;
