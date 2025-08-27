// ----------------------
// Login Schema & Types
// ----------------------

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Valid email required."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .max(64, "Password must be at most 64 characters.")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        "Password must include at least one letter, one number, and one special character (@$!%*?&).",
    }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
