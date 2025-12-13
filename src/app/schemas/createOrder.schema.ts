import { z } from "zod";

export const orderFormSchema = z.object({
  customer: z.string().optional(),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name should only contain letters and spaces"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  location: z
    .string()
    .min(5, "Location must be at least 5 characters")
    .max(200, "Location must not exceed 200 characters"),
  expectedDelivery: z.string().min(1, "Expected delivery date is required"),
  paymentMethod: z.string().optional(),
  orderNotes: z
    .string()
    .max(500, "Order notes must not exceed 500 characters")
    .optional(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;