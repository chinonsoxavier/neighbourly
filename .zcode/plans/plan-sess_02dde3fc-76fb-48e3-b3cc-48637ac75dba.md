# Neighborly — Full Frontend Implementation Plan

## Overview
Build the complete Neighborly frontend with a **warm, cozy, welcoming** UI across all screens. This covers **Phase 7 (folder structure), Phase 8 (design system), and Phase 9 (full frontend implementation)**.

---

## Step 1: Install Dependencies
Install all needed packages:
- `framer-motion` — animations & micro-interactions
- `zustand` — client state management
- `@tanstack/react-query` — data fetching/caching
- `zod` — schema validation
- `react-hook-form` + `@hookform/resolvers` — forms
- `next-themes` — dark mode
- Additional shadcn/ui components via CLI

---

## Step 2: Folder Structure (Phase 7)

```
app/
├── (public)/                    # Landing, auth, onboarding
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Public layout (no sidebar)
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── otp/page.tsx
│   │   └── layout.tsx
│   └── (onboarding)/
│       ├── page.tsx             # Multi-step wizard
│       └── layout.tsx
├── (app)/                       # Main app shell (authenticated)
│   ├── layout.tsx               # App shell (sidebar + nav + right panel)
│   ├── (home)/
│   │   └── page.tsx             # Dashboard/home feed
│   ├── (safety)/                # Safety Layer — distinct from community
│   │   ├── incidents/
│   │   │   ├── page.tsx         # Incident map + feed
│   │   │   └── [id]/page.tsx    # Incident detail + status stepper
│   │   ├── report/page.tsx      # 5-step incident report form
│   │   └── disputes/page.tsx    # Dispute form
│   ├── (community)/            # Community Layer — warm social feel
│   │   ├── feed/page.tsx        # Local community feed
│   │   ├── communities/
│   │   │   ├── page.tsx         # Online community directory
│   │   │   └── [id]/page.tsx    # Community detail
│   │   ├── posts/
│   │   │   └── [id]/page.tsx    # Post detail + comments
│   │   └── create/page.tsx      # Create post
│   ├── profile/
│   │   └── [id]/page.tsx
│   ├── notifications/page.tsx
│   ├── search/page.tsx
│   └── settings/page.tsx
├── admin/                       # Admin dashboard
│   └── page.tsx
├── not-found.tsx                # 404
├── error.tsx                    # 500
├── layout.tsx                   # Root layout (fonts, providers)
└── globals.css                  # Theme + design tokens

components/
├── ui/                          # shadcn/ui primitives (button, input, card, etc.)
├── shared/                      # App-wide shared components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── sidebar.tsx
│   ├── right-panel.tsx
│   ├── mobile-nav.tsx
│   └── offline-banner.tsx
├── layouts/
│   ├── main_layout.tsx
│   └── public_layout.tsx
├── landing/                     # Landing page sections
│   ├── hero.tsx
│   ├── features.tsx
│   ├── trust-signals.tsx
│   ├── testimonials.tsx
│   └── cta-section.tsx
├── safety/                      # Safety Layer components
│   ├── incident-card.tsx
│   ├── incident-map.tsx
│   ├── incident-feed.tsx
│   ├── status-stepper.tsx
│   ├── category-grid.tsx
│   ├── severity-slider.tsx
│   ├── emergency-badge.tsx
│   └── broadcast-banner.tsx
├── community/                   # Community Layer components
│   ├── post-card.tsx            # Hover-lift + scale (warm, social feel)
│   ├── post-form.tsx
│   ├── comment-thread.tsx
│   ├── community-card.tsx
│   ├── community-creation.tsx
│   └── feed-filter-bar.tsx
├── auth/                        # Auth components
│   ├── login-form.tsx
│   ├── register-form.tsx
│   └── otp-form.tsx
├── onboarding/                  # Onboarding wizard
│   ├── location-step.tsx
│   ├── interests-step.tsx
│   ├── profile-step.tsx
│   ├── notifications-step.tsx
│   └── invite-step.tsx
├── profile/
│   ├── profile-header.tsx
│   ├── reputation-card.tsx
│   └── verification-badges.tsx
├── common/                      # Cross-cutting
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── skeleton.tsx
│   ├── empty-state.tsx
│   ├── loading-state.tsx
│   ├── error-state.tsx
│   └── search-bar.tsx

hooks/
├── use-sidebar.ts
├── use-mobile.ts
├── use-theme.ts
└── use-online-status.ts

lib/
├── utils.ts
├── constants.ts
├── validators/                  # Zod schemas
└── types/                      # TypeScript types

providers/
├── theme-provider.tsx
├── query-provider.tsx
└── toast-provider.tsx
```

---

## Step 3: Design System & Theme (Phase 8)

### Warm Color Palette (oklch for CSS variables)
- **Primary:** Warm amber/honey — `oklch(0.75 0.18 75)` → golden, inviting
- **Secondary:** Soft teal — `oklch(0.72 0.12 185)` → calm, trustworthy
- **Accent:** Warm coral — `oklch(0.72 0.15 40)` → energetic, action-oriented
- **Safety/Emergency:** Warm red-orange — `oklch(0.65 0.22 25)` → urgent but not cold
- **Success:** Soft green — `oklch(0.72 0.17 145)`
- **Warning:** Golden yellow — `oklch(0.78 0.16 85)`
- **Background:** Warm white — `oklch(0.99 0.005 90)` — slightly warm, not sterile
- **Surface/Card:** Pure white with warm shadow
- **Text:** Warm dark — `oklch(0.18 0.02 60)`

Dark mode will mirror with warm undertones (no cold blue-greys).

### Typography
- **Primary font:** Inter (already installed via next/font)
- Warm, generous line-heights (1.6 for body text)
- Large, friendly headings

### Key Design Principles
1. **Cozy warmth:** Rounded corners (12px default), warm shadows with slight amber tint, soft gradients
2. **Safety vs. Community split:** Safety components (incident cards, emergency badges) use sharper edges, red/orange accents, no playful hover — serious and focused. Community components get hover-lift + scale 1.02, warm shadows, playful micro-interactions
3. **Micro-interactions:** Smooth framer-motion transitions, spring physics for cards, subtle pulse on emergency FAB
4. **Skeleton loaders** everywhere data loads
5. **Beautiful empty states** with illustrations (using Lucide icons composed into scenes)
6. **Responsive:** Mobile-first, bottom nav on mobile, sidebar on desktop

---

## Step 4: Core UI Components (shadcn/ui + custom)

Install via shadcn CLI:
- `card`, `input`, `textarea`, `select`, `badge`, `avatar`, `dialog`, `drawer`, `sheet`, `tabs`, `tooltip`, `dropdown-menu`, `separator`, `skeleton`, `progress`, `switch`, `slider`, `scroll-area`, `command`, `popover`

Custom components built on top:
- `EmptyState` — illustration + message + CTA
- `LoadingState` — skeleton patterns per content type
- `ErrorState` — friendly retry UI
- `StatusStepper` — for incident tracking
- `IncidentCard` — no hover-lift (safety principle)
- `PostCard` — hover-lift + scale 1.02 (community principle)

---

## Step 5: Full Page Implementation (Phase 9)

### Landing Page
- Animated hero with warm gradient background
- "Your Neighborhood. Stronger Together." headline
- Trust signal stats with count-up animation
- Feature cards with icons and warm hover effects
- Testimonials section
- CTA section with warm gradient

### Auth Pages
- Split layout: illustration left, form right
- Warm, welcoming copy ("Welcome to your community")
- Social login buttons (Google, Apple)
- Phone OTP flow

### Onboarding Wizard
- Step indicators with warm progress bar
- Location detection with friendly map
- Interest selection with visual cards
- Profile photo upload
- Notification preferences
- Invite friends with shareable link

### App Shell
- **Left sidebar:** Warm background, collapsible, icons with labels
- **Top nav:** Logo, search bar, create button, notifications bell, profile avatar
- **Right panel:** Trending, suggestions, quick stats
- **Mobile:** Bottom nav with 5 items + swipe-up drawer
- **Emergency bar:** Slim dismissible bar for active nearby incidents

### Safety Layer Pages
- **Incident Map + Feed:** Full-width map with toggleable feed panel
- **Report Incident:** 5-step form with category grid, map picker, severity slider, media upload, anonymity toggle
- **Incident Detail:** Status stepper, comments, dispute option
- **Dispute Form:** One-tap trigger, structured reason selection

### Community Layer Pages
- **Local Feed:** Card-based with warm hover effects, filters
- **Community Directory:** Grid of community cards with banners
- **Community Detail:** Banner, members, feed within community
- **Create Post:** Rich form with media upload
- **Post Detail:** Threaded comments, reactions

### Profile, Notifications, Search, Settings
- Profile with reputation card and verification badges
- Notification center with grouped notifications
- Global search with type-ahead
- Settings with organized sections

### Error & Edge Cases
- 404 page with warm illustration
- 500 page with retry option
- Offline banner component
- Loading skeletons per page type

---

## Implementation Order
1. Dependencies + folder structure
2. Theme/globals.css (warm palette)
3. Root layout + providers (theme, query)
4. Design system components (shadcn + custom)
5. Landing page
6. Auth pages (login, register, OTP)
7. Onboarding wizard
8. App shell (sidebar, nav, right panel, mobile nav)
9. Safety Layer pages (incidents, report, detail, disputes)
10. Community Layer pages (feed, communities, posts)
11. Profile, notifications, search, settings
12. Admin dashboard shell
13. 404, 500, offline states
14. Polish pass — animations, transitions, empty states, loading states

This will be a multi-session build. I'll work through each section methodically, ensuring every page is production-quality and cozy.
