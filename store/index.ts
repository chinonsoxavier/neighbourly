import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  neighbors,
  communities as initialCommunities,
  incidents as initialIncidents,
  fundraisers as initialFundraisers,
  polls as initialPolls,
  aidRequests as initialAidRequests,
  events as initialEvents,
  messages as initialMessages,
  notifications as initialNotifications,
  feed as initialFeed,
  type Neighbor,
  type Community,
  type Incident,
  type Fundraiser,
  type Poll,
  type AidRequest,
  type EventItem,
  type Message,
  type Notification,
  type FeedItem,
} from "@/lib/data";

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

// ─── Auth Store ───
interface AuthState {
  isAuthenticated: boolean;
  user: Neighbor;
  setUser: (user: Neighbor) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true,
  user: neighbors[0], // Default logged-in user: Maria Alvarez
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));

// ─── Modal Store ───
export type CreateModalTab =
  | "post"
  | "incident"
  | "fundraiser"
  | "event"
  | "poll"
  | "aid";

interface ModalState {
  createModalOpen: boolean;
  createModalTab: CreateModalTab;
  openCreateModal: (tab?: CreateModalTab) => void;
  closeCreateModal: () => void;

  donateModalOpen: boolean;
  donateFundraiserId: string | null;
  openDonateModal: (fundraiserId: string) => void;
  closeDonateModal: () => void;

  searchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  toggleSearchModal: () => void;

  reportModalOpen: boolean;
  openReportModal: () => void;
  closeReportModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  createModalOpen: false,
  createModalTab: "post",
  openCreateModal: (tab = "post") =>
    set({ createModalOpen: true, createModalTab: tab }),
  closeCreateModal: () => set({ createModalOpen: false }),

  donateModalOpen: false,
  donateFundraiserId: null,
  openDonateModal: (fundraiserId: string) =>
    set({ donateModalOpen: true, donateFundraiserId: fundraiserId }),
  closeDonateModal: () =>
    set({ donateModalOpen: false, donateFundraiserId: null }),

  searchModalOpen: false,
  openSearchModal: () => set({ searchModalOpen: true }),
  closeSearchModal: () => set({ searchModalOpen: false }),
  toggleSearchModal: () =>
    set((state) => ({ searchModalOpen: !state.searchModalOpen })),

  reportModalOpen: false,
  openReportModal: () => set({ reportModalOpen: true }),
  closeReportModal: () => set({ reportModalOpen: false }),
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
    set((s) => ({
      currentStep: Math.min(s.currentStep + 1, s.totalSteps - 1),
    })),
  prevStep: () =>
    set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) })),
  updateData: (partial) =>
    set((s) => ({ data: { ...s.data, ...partial } })),
}));

// ─── App Interactive Data Store ───
export interface CustomPost {
  id: string;
  authorId: string;
  createdAt: string;
  text: string;
  image?: string;
  communitySlug?: string;
  likes: number;
  liked?: boolean;
  comments: {
    id: string;
    authorId: string;
    text: string;
    createdAt: string;
  }[];
  shares: number;
  bookmarked?: boolean;
  location?: string;
}

interface AppState {
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  communityScore: number;

  feed: FeedItem[];
  posts: CustomPost[];
  incidents: Incident[];
  fundraisers: Fundraiser[];
  polls: Poll[];
  aidRequests: AidRequest[];
  events: EventItem[];
  communities: (Community & { isJoined?: boolean })[];
  messages: Message[];
  notifications: Notification[];
  savedIds: string[];
  userVotedPolls: Record<string, string>; // pollId -> optionId
  userRsvpEvents: Record<string, "going" | "interested" | "declined">;
  userDonations: { fundraiserId: string; amount: number; date: string }[];

  // Actions
  addPost: (post: Omit<CustomPost, "id" | "likes" | "comments" | "shares" | "createdAt">) => void;
  toggleLikePost: (postId: string) => void;
  addCommentToPost: (postId: string, text: string) => void;
  toggleBookmarkPost: (postId: string) => void;

  addIncident: (incident: Omit<Incident, "id" | "createdAt" | "responders" | "comments" | "timeline">) => void;
  respondToIncident: (incidentId: string) => void;

  addFundraiser: (fundraiser: Omit<Fundraiser, "id" | "raised" | "donors" | "updates">) => void;
  donateToFundraiser: (fundraiserId: string, amount: number) => void;

  addPoll: (poll: Omit<Poll, "id" | "totalVotes">) => void;
  votePoll: (pollId: string, optionId: string) => void;

  addEvent: (event: Omit<EventItem, "id" | "attendees">) => void;
  rsvpEvent: (eventId: string, status: "going" | "interested" | "declined") => void;

  addAidRequest: (aid: Omit<AidRequest, "id" | "postedAt">) => void;

  toggleJoinCommunity: (communityId: string) => void;
  addCommunity: (community: Omit<Community, "id" | "members">) => void;

  sendMessage: (to: string, text: string, channel?: Message["channel"]) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
}

const initialCustomPosts: CustomPost[] = [
  {
    id: "fi_2",
    authorId: "u_hana",
    createdAt: "1h ago",
    text: "The duck pond at Maple Park this morning. Felt like a postcard. ☀️ Bring your kids and some oats if you are visiting today!",
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=900",
    likes: 48,
    liked: false,
    comments: [
      {
        id: "c_1",
        authorId: "u_maria",
        text: "So lovely! Taking the dog out there around noon.",
        createdAt: "45m ago",
      },
      {
        id: "c_2",
        authorId: "u_devon",
        text: "The morning light on the water is unmatched.",
        createdAt: "20m ago",
      },
    ],
    shares: 1,
    bookmarked: false,
    location: "Maple Park, Maple Heights",
    communitySlug: "maple-heights",
  },
  {
    id: "fi_5",
    authorId: "u_devon",
    createdAt: "3h ago",
    text: "If anyone has a working chainsaw and an hour to spare, the tree on Elm could use the help. Coffee and donuts on me ☕🍩",
    likes: 22,
    liked: false,
    comments: [
      {
        id: "c_3",
        authorId: "u_tomas",
        text: "Heading over with my gear in 15 mins!",
        createdAt: "2h ago",
      },
    ],
    shares: 3,
    bookmarked: false,
    location: "Elm St & 4th Ave",
    communitySlug: "riverside",
  },
  {
    id: "fi_8",
    authorId: "u_priya",
    createdAt: "5h ago",
    text: "Reminder for Cedar Park residents: The solar co-op signup closes this Friday. We are already at 35 households joining for the group discount! ☀️🔋",
    likes: 34,
    liked: true,
    comments: [
      {
        id: "c_4",
        authorId: "u_okafor",
        text: "Signed up yesterday, thanks for organizing!",
        createdAt: "3h ago",
      },
    ],
    shares: 8,
    bookmarked: true,
    location: "Cedar Park Community Hall",
    communitySlug: "riverside",
  },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentLocation: "Riverside",
      setCurrentLocation: (loc) => set({ currentLocation: loc }),
      communityScore: 86,

      feed: initialFeed,
      posts: initialCustomPosts,
      incidents: initialIncidents,
      fundraisers: initialFundraisers,
      polls: initialPolls,
      aidRequests: initialAidRequests,
      events: initialEvents,
      communities: initialCommunities.map((c, i) => ({
        ...c,
        isJoined: i < 3,
      })),
      messages: initialMessages,
      notifications: initialNotifications,
      savedIds: ["fi_8", "i_4"],
      userVotedPolls: {},
      userRsvpEvents: { e_1: "going" },
      userDonations: [],

      // ── Post Actions ──
      addPost: (postData) => {
        const newPost: CustomPost = {
          ...postData,
          id: `p_${Date.now()}`,
          likes: 0,
          liked: false,
          comments: [],
          shares: 0,
          bookmarked: false,
          createdAt: "Just now",
        };
        set((state) => ({
          posts: [newPost, ...state.posts],
          feed: [{ kind: "post", id: newPost.id, authorId: newPost.authorId, createdAt: "Just now", text: newPost.text, image: newPost.image, likes: 0, comments: 0, shares: 0 }, ...state.feed],
        }));
      },

      toggleLikePost: (postId) => {
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  liked: !p.liked,
                  likes: p.liked ? p.likes - 1 : p.likes + 1,
                }
              : p
          ),
        }));
      },

      addCommentToPost: (postId, text) => {
        const comment = {
          id: `c_${Date.now()}`,
          authorId: "u_maria",
          text,
          createdAt: "Just now",
        };
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId
              ? { ...p, comments: [...p.comments, comment] }
              : p
          ),
        }));
      },

      toggleBookmarkPost: (postId) => {
        set((state) => {
          const isSaved = state.savedIds.includes(postId);
          return {
            savedIds: isSaved
              ? state.savedIds.filter((id) => id !== postId)
              : [...state.savedIds, postId],
            posts: state.posts.map((p) =>
              p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p
            ),
          };
        });
      },

      // ── Incident Actions ──
      addIncident: (incidentData) => {
        const newIncident: Incident = {
          ...incidentData,
          id: `i_${Date.now()}`,
          createdAt: new Date().toISOString(),
          responders: 1,
          comments: 0,
          timeline: [{ time: "Just now", label: "Reported by You" }],
        };
        set((state) => ({
          incidents: [newIncident, ...state.incidents],
          feed: [{ kind: "incident", id: `fi_${Date.now()}`, incidentId: newIncident.id }, ...state.feed],
        }));
      },

      respondToIncident: (incidentId) => {
        set((state) => ({
          incidents: state.incidents.map((inc) =>
            inc.id === incidentId
              ? { ...inc, responders: inc.responders + 1 }
              : inc
          ),
        }));
      },

      // ── Fundraiser Actions ──
      addFundraiser: (data) => {
        const newFundraiser: Fundraiser = {
          ...data,
          id: `f_${Date.now()}`,
          raised: 0,
          donors: 0,
          updates: [{ date: "Today", text: "Campaign launched" }],
        };
        set((state) => ({
          fundraisers: [newFundraiser, ...state.fundraisers],
          feed: [{ kind: "fundraiser", id: `fi_${Date.now()}`, fundraiserId: newFundraiser.id }, ...state.feed],
        }));
      },

      donateToFundraiser: (fundraiserId, amount) => {
        set((state) => ({
          fundraisers: state.fundraisers.map((f) =>
            f.id === fundraiserId
              ? {
                  ...f,
                  raised: f.raised + amount,
                  donors: f.donors + 1,
                }
              : f
          ),
          userDonations: [
            ...state.userDonations,
            { fundraiserId, amount, date: new Date().toISOString() },
          ],
        }));
      },

      // ── Poll Actions ──
      addPoll: (pollData) => {
        const newPoll: Poll = {
          ...pollData,
          id: `p_${Date.now()}`,
          totalVotes: 0,
        };
        set((state) => ({
          polls: [newPoll, ...state.polls],
          feed: [{ kind: "poll", id: `fi_${Date.now()}`, pollId: newPoll.id }, ...state.feed],
        }));
      },

      votePoll: (pollId, optionId) => {
        const currentVote = get().userVotedPolls[pollId];
        if (currentVote === optionId) return;

        set((state) => ({
          userVotedPolls: { ...state.userVotedPolls, [pollId]: optionId },
          polls: state.polls.map((p) => {
            if (p.id !== pollId) return p;
            return {
              ...p,
              totalVotes: currentVote ? p.totalVotes : p.totalVotes + 1,
              options: p.options.map((opt) => {
                if (opt.id === optionId) {
                  return { ...opt, votes: opt.votes + 1 };
                }
                if (currentVote && opt.id === currentVote) {
                  return { ...opt, votes: Math.max(0, opt.votes - 1) };
                }
                return opt;
              }),
            };
          }),
        }));
      },

      // ── Event Actions ──
      addEvent: (eventData) => {
        const newEvent: EventItem = {
          ...eventData,
          id: `e_${Date.now()}`,
          attendees: 1,
        };
        set((state) => ({
          events: [newEvent, ...state.events],
          feed: [{ kind: "event", id: `fi_${Date.now()}`, eventId: newEvent.id }, ...state.feed],
        }));
      },

      rsvpEvent: (eventId, status) => {
        set((state) => {
          const prevStatus = state.userRsvpEvents[eventId];
          let diff = 0;
          if (status === "going" && prevStatus !== "going") diff = 1;
          if (status !== "going" && prevStatus === "going") diff = -1;

          return {
            userRsvpEvents: { ...state.userRsvpEvents, [eventId]: status },
            events: state.events.map((e) =>
              e.id === eventId ? { ...e, attendees: Math.max(0, e.attendees + diff) } : e
            ),
          };
        });
      },

      // ── Aid Request Actions ──
      addAidRequest: (aidData) => {
        const newAid: AidRequest = {
          ...aidData,
          id: `a_${Date.now()}`,
          postedAt: "Just now",
        };
        set((state) => ({
          aidRequests: [newAid, ...state.aidRequests],
        }));
      },

      // ── Community Actions ──
      toggleJoinCommunity: (communityId) => {
        set((state) => ({
          communities: state.communities.map((c) =>
            c.id === communityId
              ? {
                  ...c,
                  isJoined: !c.isJoined,
                  members: c.isJoined ? c.members - 1 : c.members + 1,
                }
              : c
          ),
        }));
      },

      addCommunity: (communityData) => {
        const newComm: Community & { isJoined: boolean } = {
          ...communityData,
          id: `c_${Date.now()}`,
          members: 1,
          isJoined: true,
        };
        set((state) => ({
          communities: [newComm, ...state.communities],
        }));
      },

      // ── Message Actions ──
      sendMessage: (to, text, channel = "dm") => {
        const newMsg: Message = {
          id: `m_${Date.now()}`,
          from: "Maria Alvarez",
          preview: text,
          time: "Just now",
          unread: false,
          channel,
        };
        set((state) => ({
          messages: [newMsg, ...state.messages],
        }));
      },

      // ── Notification Actions ──
      markNotificationRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        }));
      },

      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },
    }),
    {
      name: "neighborly-app-state-v1",
      partialize: (state) => ({
        currentLocation: state.currentLocation,
        posts: state.posts,
        incidents: state.incidents,
        fundraisers: state.fundraisers,
        polls: state.polls,
        events: state.events,
        communities: state.communities,
        aidRequests: state.aidRequests,
        messages: state.messages,
        notifications: state.notifications,
        savedIds: state.savedIds,
        userVotedPolls: state.userVotedPolls,
        userRsvpEvents: state.userRsvpEvents,
        userDonations: state.userDonations,
      }),
    }
  )
);
