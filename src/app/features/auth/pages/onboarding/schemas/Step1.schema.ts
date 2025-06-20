import { z } from "zod";

export const onboardingStep1Schema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  companyEmail: z
    .string()
    .trim()
    .min(1, "Company email is required")
    .email("Enter a valid email"),
  companyPhone: z.string().trim().min(1, "Company phone is required"),
  companyWebsite: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal(""))
    .optional(),
});

export type OnboardingStep1FormData = z.infer<typeof onboardingStep1Schema>;
