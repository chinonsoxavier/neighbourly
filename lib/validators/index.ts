import { z } from "zod";

// ─── Auth ───
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  displayName: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must have uppercase, lowercase, and a number"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const otpSchema = z.object({
  code: z.string().length(6, "OTP must be 6 digits"),
});

// ─── Incident Report ───
export const incidentReportSchema = z.object({
  category: z.enum([
    "FIRE",
    "MEDICAL_EMERGENCY",
    "ACCIDENT",
    "FLOOD_WEATHER",
    "MISSING_PERSON",
    "INFRASTRUCTURE_HAZARD",
    "CRIME_IN_PROGRESS",
    "COMMUNITY_SAFETY_CONCERN",
  ]),
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  description: z
    .string()
    .min(20, "Please provide more detail (at least 20 characters)")
    .max(2000),
  severity: z.number().min(1).max(5),
  isAnonymous: z.boolean().default(false),
  centerLat: z.number().min(-90).max(90),
  centerLng: z.number().min(-180).max(180),
  address: z.string().optional(),
  // For CRIME_IN_PROGRESS category — structured field
  crimeAction: z.string().optional(),
});

// ─── Post ───
export const postSchema = z.object({
  communityId: z.string().min(1, "Select a community"),
  body: z
    .string()
    .min(1, "Post cannot be empty")
    .max(5000, "Post is too long"),
});

export const commentSchema = z.object({
  body: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(2000, "Comment is too long"),
  parentId: z.string().optional(),
});

// ─── Community ───
export const createCommunitySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(60, "Name is too long"),
  description: z
    .string()
    .max(500, "Description is too long")
    .optional(),
  type: z.enum(["ONLINE"]),
});

// ─── Profile ───
export const profileSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50),
  bio: z.string().max(300, "Bio is too long").optional(),
});

// ─── Dispute ───
export const disputeSchema = z.object({
  reason: z.enum([
    "NOT_ME",
    "WRONG_LOCATION",
    "FALSE_REPORT",
    "HARASSMENT",
    "OTHER",
  ]),
  details: z.string().min(10, "Please explain (at least 10 characters)").max(1000),
});

// ─── Type exports ───
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type IncidentReportInput = z.infer<typeof incidentReportSchema>;
export type PostInput = z.infer<typeof postSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type DisputeInput = z.infer<typeof disputeSchema>;
