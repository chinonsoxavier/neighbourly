// ─── Trust Tier System ───
export type TrustTier =
  | "GUEST"
  | "VERIFIED_RESIDENT"
  | "TRUSTED_CONTRIBUTOR"
  | "VERIFIED_OFFICIAL"
  | "COMMUNITY_ADMIN"
  | "PLATFORM_MODERATOR";

// ─── Incident Types ───
export type IncidentCategory =
  | "FIRE"
  | "MEDICAL_EMERGENCY"
  | "ACCIDENT"
  | "FLOOD_WEATHER"
  | "MISSING_PERSON"
  | "INFRASTRUCTURE_HAZARD"
  | "CRIME_IN_PROGRESS"
  | "COMMUNITY_SAFETY_CONCERN";

export type IncidentStatus =
  | "PENDING_REVIEW"
  | "REPORTED"
  | "VERIFIED"
  | "RESPONDED"
  | "RESOLVED"
  | "DISPUTED"
  | "REMOVED";

export interface Incident {
  id: string;
  reporterId?: string;
  reporter?: UserSummary;
  isAnonymous: boolean;
  category: IncidentCategory;
  title: string;
  description: string;
  severity: 1 | 2 | 3 | 4 | 5;
  status: IncidentStatus;
  wardId: string;
  centerLat: number;
  centerLng: number;
  duplicateOfId?: string;
  mergedCount: number;
  media: IncidentMedia[];
  statusUpdates: IncidentStatusUpdate[];
  createdAt: string;
  updatedAt: string;
}

export interface IncidentMedia {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  order: number;
}

export interface IncidentStatusUpdate {
  id: string;
  status: IncidentStatus;
  note?: string;
  updatedById?: string;
  createdAt: string;
}

// ─── Community Types ───
export type CommunityType = "LOCAL" | "ONLINE";

export interface Community {
  id: string;
  type: CommunityType;
  name: string;
  slug: string;
  description?: string;
  bannerUrl?: string;
  memberCount: number;
  requiresApproval: boolean;
  isMember?: boolean;
  createdAt: string;
}

// ─── Post Types ───
export interface Post {
  id: string;
  communityId: string;
  community?: Community;
  author: UserSummary;
  body: string;
  media: PostMedia[];
  reactionCount: number;
  commentCount: number;
  isPinned: boolean;
  createdAt: string;
}

export interface PostMedia {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  order: number;
}

export interface Comment {
  id: string;
  author: UserSummary;
  parentId?: string;
  body: string;
  replies?: Comment[];
  createdAt: string;
}

// ─── User Types ───
export interface User {
  id: string;
  email?: string;
  phone?: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  trustTier: TrustTier;
  reputationPoints: number;
  primaryWardId?: string;
  isSuspended: boolean;
  createdAt: string;
  lastActiveAt?: string;
}

export type UserSummary = Pick<
  User,
  "id" | "displayName" | "avatarUrl" | "trustTier"
>;

// ─── Ward Types ───
export interface Ward {
  id: string;
  name: string;
  slug: string;
  centerLat: number;
  centerLng: number;
  memberCount: number;
  isActivated: boolean;
  activationThreshold: number;
}

// ─── Notification Types ───
export type NotificationType =
  | "INCIDENT_NEARBY"
  | "INCIDENT_UPDATED"
  | "POST_REPLY"
  | "POST_REACTION"
  | "COMMUNITY_INVITE"
  | "VERIFICATION_UPDATE"
  | "WARD_ACTIVATED"
  | "DISPUTE_MENTION";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

// ─── Broadcast Types ───
export interface EmergencyBroadcast {
  id: string;
  title: string;
  message: string;
  severity: 1 | 2 | 3 | 4 | 5;
  wardIds: string[];
  expiresAt?: string;
  createdAt: string;
}

// ─── Dispute Types ───
export interface Dispute {
  id: string;
  incidentId: string;
  filedById: string;
  reason: string;
  status: "PENDING" | "UPHELD" | "REJECTED";
  createdAt: string;
}

// ─── Onboarding ───
export interface OnboardingData {
  wardId?: string;
  interests: string[];
  displayName?: string;
  avatarUrl?: string;
  notificationPrefs: NotificationPrefs;
}

export interface NotificationPrefs {
  pushEnabled: boolean;
  emailEnabled: boolean;
  incidentAlerts: boolean;
  communityUpdates: boolean;
}
