import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().trim().min(1, "Name is required").optional(),
  role: z.string().trim().min(1, "Role is required").optional(),
  email: z.string().trim().min(1, "Email is required").optional(),
});

export const onboardingStep5Schema = z.object({
  members: z.array(memberSchema),
});

export type MemberData = z.infer<typeof memberSchema>;
export type OnboardingStep5FormData = z.infer<typeof onboardingStep5Schema>;
