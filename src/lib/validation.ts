import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().toLowerCase().email().max(160),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(128),
});

export const createWebsiteSchema = z.object({
  name: z.string().trim().min(1).max(80),
  templateId: z.string().trim().min(1).max(64),
  siteType: z.string().trim().max(40).optional().default("Portfolio"),
  ownerName: z.string().trim().max(80).optional().default(""),
  tagline: z.string().trim().max(160).optional().default(""),
});

export const updateWebsiteSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  status: z.enum(["draft", "published"]).optional(),
  customDomain: z
    .string()
    .trim()
    .toLowerCase()
    .max(120)
    .regex(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  config: z
    .object({
      sections: z.array(z.any()).min(1, "Website must keep at least one section.").max(100),
      pages: z
        .array(
          z.object({
            path: z.string(),
            sections: z.array(z.any()).max(100),
          }).passthrough(),
        )
        .max(20)
        .optional(),
    })
    .passthrough()
    .optional(),
});

export function safeError(e: unknown): string {
  if (e instanceof z.ZodError) return e.issues[0]?.message ?? "Invalid input.";
  return "Something went wrong.";
}
