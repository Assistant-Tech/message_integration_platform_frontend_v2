import { z } from "zod";

export const onboardingStep3Schema = z
  .object({
    selectedIndustry: z.string().min(1, "Please select an industry"),
    customIndustry: z
      .string()
      .trim()
      .optional()
      .refine((val) => val && val.length > 0, {
        message: "Please specify your industry",
        path: ["customIndustry"],
      })
      .or(z.literal("").optional()),
  })
  .superRefine((data, ctx) => {
    if (data.selectedIndustry === "Others" && !data.customIndustry?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["customIndustry"],
        message: "Please specify your industry",
      });
    }
  });

export type OnboardingStep3FormData = z.infer<typeof onboardingStep3Schema>;
