import { z } from "zod";

// Onboarding Step - 1
// -------------------
export const onboardingStep1Schema = z.object({
  organizationName: z.string().trim().min(1, "Company name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Company email is required")
    .email("Enter a valid email"),
  contactNumber: z.string().trim().min(1, "Company phone is required"),
  website: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal(""))
    .optional(),
});

// Onboarding Step - 2
// -------------------
export const onboardingStep2Schema = z.object({
  country: z.string().trim().min(1, "Country is required"),
  state: z.string().trim().optional(),
  city: z.string().trim().min(1, "City is required"),
  address: z.string().trim().min(1, "Address is required"),
});

// Onboarding Step - 3
// -------------------
export const onboardingStep3Schema = z
  .object({
    industry: z.string().min(1, "Please select an industry"),
    isOther: z.boolean().optional(), // to handle UI logic
  })
  .superRefine((data, ctx) => {
    if (data.isOther && !data.industry.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["industry"],
        message: "Please specify your industry",
      });
    }
  });

// Onboarding Step - 4
// -------------------
export const onboardingStep4Schema = z.object({
  panNumber: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase()),
      {
        message: "Please enter a valid PAN number (e.g., ABCDE1234F).",
      },
    ),
  panCardImage: z.instanceof(File).nullable().optional(),
  uploadProgress: z
    .array(
      z.object({
        file: z.instanceof(File),
        progress: z.number(),
        status: z.enum(["uploading", "completed", "failed"]),
        timeLeft: z.string().optional(),
      }),
    )
    .optional(),
});

// Onboarding Step - 5
// -------------------
// Member Schema
// -------------
export const memberSchema = z.object({
  name: z.string().trim().optional(),
  role: z.string().trim().optional(),
  email: z.string().trim().optional(),
});

export const onboardingStep5Schema = z.object({
  members: z.array(memberSchema),
});

// Type Definitions
// ----------------
export type MemberData = z.infer<typeof memberSchema>;

export type OnboardingStep1FormData = z.infer<typeof onboardingStep1Schema>;
export type OnboardingStep2FormData = z.infer<typeof onboardingStep2Schema>;
export type OnboardingStep3FormData = z.infer<typeof onboardingStep3Schema>;
export type OnboardingStep4FormData = z.infer<typeof onboardingStep4Schema>;
export type OnboardingStep5FormData = z.infer<typeof onboardingStep5Schema>;
