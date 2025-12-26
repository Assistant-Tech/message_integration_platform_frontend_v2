// ----------------------
// Regist Schema & Types
// ----------------------
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required."),
    email: z.string().email("Valid email is required."),
    password: z
      .string()
      .min(6, "At least 6 characters required.")
      .max(64, "No more than 64 characters.")
      .regex(/[A-Za-z]/, "Must include a letter.")
      .regex(/\d/, "Must include a number.")
      .regex(/[@$!%*?&]/, "Must include a special character."),
    confirmPassword: z.string(),
    rememberMe: z.boolean().optional(),
    invitationToken: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
