import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  company: z.string().trim().min(1).max(160),
  challenge: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(4000).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
