import { z } from "zod";

export const onboardingStep4Schema = z
  .object({
    panNumber: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")) // allow empty string
      .refine(
        (val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val.toUpperCase()),
        {
          message: "Please enter a valid PAN number (e.g., ABCDE1234F).",
        },
      ),
    panFile: z.instanceof(File).nullable().optional(),
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
  })
  .refine(
    (data) => {
      if (!data.panNumber && !data.uploadProgress?.length) return true; // skip allowed
      const hasCompletedUpload = data.uploadProgress?.some(
        (u) => u.status === "completed",
      );
      return !!data.panNumber && hasCompletedUpload;
    },
    {
      message:
        "To continue, please enter PAN and upload a completed document, or skip the step.",
      path: ["panNumber"],
    },
  );

export type OnboardingStep4FormData = z.infer<typeof onboardingStep4Schema>;
