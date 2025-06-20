// ----------------------
// Register Schema & Types
// ----------------------
import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  message: z.string().optional().or(z.literal("")),
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;
