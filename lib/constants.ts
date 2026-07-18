// ─── Navigation Items ───
export const SIDEBAR_ITEMS = [
  { label: "Home", href: "/", icon: "Home" as const },
  { label: "My Local Community", href: "/feed", icon: "MapPin" as const },
  { label: "Communities", href: "/communities", icon: "Users" as const },
  { label: "Incidents", href: "/incidents", icon: "AlertTriangle" as const },
  { label: "Report", href: "/report", icon: "PlusCircle" as const },
  { label: "Notifications", href: "/notifications", icon: "Bell" as const },
  { label: "Settings", href: "/settings", icon: "Settings" as const },
] as const;

export const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/", icon: "Home" as const },
  { label: "Local", href: "/feed", icon: "MapPin" as const },
  { label: "Incidents", href: "/incidents", icon: "AlertTriangle" as const },
  { label: "Create", href: "/create", icon: "Plus" as const },
  { label: "Profile", href: "/profile", icon: "User" as const },
] as const;

// ─── Incident Categories ───
export const INCIDENT_CATEGORIES = [
  { id: "fire", label: "Fire", icon: "Flame", color: "coral" },
  { id: "medical_emergency", label: "Medical", icon: "Heart", color: "coral" },
  { id: "accident", label: "Accident", icon: "Car", color: "warm" },
  { id: "flood_weather", label: "Flood / Weather", icon: "CloudRain", color: "teal" },
  { id: "missing_person", label: "Missing Person", icon: "UserSearch", color: "warm" },
  { id: "infrastructure", label: "Infrastructure", icon: "Construction", color: "warm" },
  { id: "crime", label: "Crime in Progress", icon: "ShieldAlert", color: "coral" },
  {
    id: "safety_concern",
    label: "Safety Concern",
    icon: "MessageCircleWarning",
    color: "warm",
    reviewed: true,
  },
] as const;

// ─── Severity Levels ───
export const SEVERITY_LEVELS = [
  { value: 1, label: "Minor", description: "Low impact" },
  { value: 2, label: "Moderate", description: "Notable concern" },
  { value: 3, label: "Significant", description: "Needs attention" },
  { value: 4, label: "Severe", description: "Immediate concern" },
  { value: 5, label: "Life-threatening", description: "Emergency" },
] as const;

// ─── Incident Statuses ───
export const INCIDENT_STATUSES = [
  { value: "PENDING_REVIEW", label: "Under Review", color: "warm" },
  { value: "REPORTED", label: "Reported", color: "warm" },
  { value: "VERIFIED", label: "Verified", color: "teal" },
  { value: "RESPONDED", label: "Responded", color: "teal" },
  { value: "RESOLVED", label: "Resolved", color: "teal" },
  { value: "DISPUTED", label: "Disputed", color: "coral" },
  { value: "REMOVED", label: "Removed", color: "coral" },
] as const;

// ─── Trust Tiers ───
export const TRUST_TIERS = [
  { value: "GUEST", label: "Guest", color: "muted" },
  { value: "VERIFIED_RESIDENT", label: "Verified Resident", color: "teal" },
  { value: "TRUSTED_CONTRIBUTOR", label: "Trusted", color: "primary" },
  { value: "VERIFIED_OFFICIAL", label: "Official", color: "coral" },
  { value: "COMMUNITY_ADMIN", label: "Admin", color: "primary" },
  { value: "PLATFORM_MODERATOR", label: "Moderator", color: "coral" },
] as const;

// ─── Community Interests ───
export const COMMUNITY_INTERESTS = [
  { id: "security", label: "Security", icon: "Shield" },
  { id: "buy_sell", label: "Buy & Sell", icon: "ShoppingBag" },
  { id: "events", label: "Events", icon: "Calendar" },
  { id: "food", label: "Food & Dining", icon: "Utensils" },
  { id: "parenting", label: "Parenting", icon: "Baby" },
  { id: "sports", label: "Sports", icon: "Trophy" },
  { id: "tech", label: "Technology", icon: "Laptop" },
  { id: "health", label: "Health", icon: "HeartPulse" },
  { id: "education", label: "Education", icon: "GraduationCap" },
  { id: "business", label: "Business", icon: "Briefcase" },
  { id: "gaming", label: "Gaming", icon: "Gamepad2" },
  { id: "nature", label: "Nature", icon: "Trees" },
] as const;

// ─── UI Constants ───
export const AVATAR_SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 64,
  xl: 120,
} as const;

export const WARD_ACTIVATION_THRESHOLD = 25;

export const MAX_MEDIA_UPLOADS = 5;
