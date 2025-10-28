import { z } from 'zod';

export const citySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  country: z.string(),
  heroImage: z.string(),
  description: z.string()
});
export type City = z.infer<typeof citySchema>;

export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  icon: z.string(),
  color: z.string()
});
export type Category = z.infer<typeof categorySchema>;

export const partnerBusinessSchema = z.object({
  id: z.string(),
  name: z.string(),
  cityId: z.string(),
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
  description: z.string(),
  logo: z.string(),
  qrSecret: z.string()
});
export type PartnerBusiness = z.infer<typeof partnerBusinessSchema>;

export const missionSchema = z.object({
  id: z.string(),
  title: z.string(),
  cityId: z.string(),
  businessId: z.string().nullable().optional(),
  categories: z.array(z.string()),
  tier: z.enum(['easy', 'medium', 'hard']),
  points: z.number(),
  description: z.string(),
  howToComplete: z.string(),
  requiresPhotoProof: z.boolean(),
  startAt: z.coerce.date().optional(),
  endAt: z.coerce.date().optional(),
  seasonId: z.string().optional(),
  isDaily: z.boolean().default(false)
});
export type Mission = z.infer<typeof missionSchema>;

export const rewardSchema = z.object({
  id: z.string(),
  businessId: z.string(),
  title: z.string(),
  description: z.string(),
  costPoints: z.number(),
  stock: z.number()
});
export type Reward = z.infer<typeof rewardSchema>;

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string(),
  role: z.enum(['tourist', 'business', 'admin']),
  cityId: z.string().nullable().optional(),
  avatarUrl: z.string().nullable().optional(),
  totalPoints: z.number(),
  streakCount: z.number(),
  lastMissionAt: z.date().nullable().optional(),
  badges: z.array(z.string()),
  categoriesCompleted: z.array(z.string())
});
export type User = z.infer<typeof userSchema>;

export const submissionSchema = z.object({
  id: z.string(),
  missionId: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  status: z.enum(['pending', 'approved', 'rejected']),
  proofPhotoUrl: z.string().nullable().optional(),
  checkinType: z.enum(['gps', 'qr']),
  notes: z.string().nullable().optional()
});
export type Submission = z.infer<typeof submissionSchema>;

export const redemptionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  rewardId: z.string(),
  createdAt: z.date(),
  status: z.enum(['pending', 'approved', 'rejected']),
  code: z.string()
});
export type Redemption = z.infer<typeof redemptionSchema>;

export const badgeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  condition: z.string(),
  icon: z.string()
});
export type Badge = z.infer<typeof badgeSchema>;

export const seasonSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  startAt: z.date(),
  endAt: z.date(),
  description: z.string(),
  cityId: z.string().nullable().optional()
});
export type Season = z.infer<typeof seasonSchema>;

export const leaderboardEntrySchema = z.object({
  userId: z.string(),
  cityId: z.string(),
  period: z.enum(['weekly', 'monthly', 'all']),
  points: z.number()
});
export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;

export type Role = User['role'];
