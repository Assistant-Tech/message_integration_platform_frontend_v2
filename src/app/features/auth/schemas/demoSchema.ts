import { z } from "zod";

export const demoSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Valid email required."),
  company: z.string().min(1, "Company name is required."),
  phone: z.string().min(1, "Phone number is required."),
  usage: z.string().min(1, "Enter range from 0 - 10"),
});

export type DemoFormData = z.infer<typeof demoSchema>; 
