import { create } from "zustand";

// ─── Sidebar Store ───
interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  setCollapsed: (collapsed: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  isCollapsed: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  setOpen: (isOpen) => set({ isOpen }),
  setCollapsed: (isCollapsed) => set({ isCollapsed }),
}));

// ─── Auth Store (mock for frontend) ───
interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    displayName: string;
    avatarUrl?: string;
    trustTier: string;
  } | null;
  setAuth: (
    user: { id: string; displayName: string; avatarUrl?: string; trustTier: string } | null
  ) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (user) =>
    set({ isAuthenticated: !!user, user }),
}));

// ─── Onboarding Store ───
interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  data: {
    wardId?: string;
    interests: string[];
    displayName?: string;
    avatarUrl?: string;
    notificationPrefs: {
      pushEnabled: boolean;
      emailEnabled: boolean;
      incidentAlerts: boolean;
      communityUpdates: boolean;
    };
  };
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (partial: Partial<OnboardingState["data"]>) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  currentStep: 0,
  totalSteps: 5,
  data: {
    interests: [],
    notificationPrefs: {
      pushEnabled: true,
      emailEnabled: true,
      incidentAlerts: true,
      communityUpdates: false,
    },
  },
  setStep: (currentStep) => set({ currentStep }),
  nextStep: () =>
    set((s) => ({ currentStep: Math.min(s.currentStep + 1, s.totalSteps - 1) })),
  prevStep: () =>
    set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),
  updateData: (partial) =>
    set((s) => ({ data: { ...s.data, ...partial } })),
}));
