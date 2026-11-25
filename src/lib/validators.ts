import { z } from "zod";

const phone = z.string().trim().regex(/^[+\d][\d\s\-()]{7,19}$/, "Enter a valid phone number");
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address").max(160),
  phone,
  product: z.string().trim().max(160).optional().or(z.literal("")),
  location: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  source: z.string().trim().max(60).optional(),
  website: z.string().max(200).optional(), // honeypot: real users leave it empty (checked in the route)
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const loginSchema = z.object({ email: z.string().trim().email(), password: z.string().min(1).max(200) });
