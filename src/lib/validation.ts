import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email().max(160),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const createWebsiteSchema = z.object({
  name: z.string().min(1).max(80),
  templateId: z.string().min(1).max(64),
  siteType: z.string().max(40).optional().default("Portfolio"),
  ownerName: z.string().max(80).optional().default(""),
  tagline: z.string().max(160).optional().default(""),
});

export const updateWebsiteSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  status: z.enum(["draft", "published"]).optional(),
  customDomain: z.string().max(120).optional(),
  config: z
    .object({
      sections: z.array(z.any()).min(1, "Website must keep at least one section."),
    })
    .passthrough()
    .optional(),
});

export function safeError(e: unknown): string {
  if (e instanceof z.ZodError) return e.issues[0]?.message ?? "Invalid input.";
  return "Something went wrong.";
}
