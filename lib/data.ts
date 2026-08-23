// Dummy data for Neighborly. Realistic neighbor names, neighborhoods, copy.

export type Severity = "info" | "low" | "medium" | "high" | "critical";

export type Neighbor = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  neighborhood: string;
  reputation: number;
  badges: string[];
  joinedAt: string;
  bio?: string;
};

export const neighbors: Neighbor[] = [
  {
    id: "u_maria",
    name: "Maria Alvarez",
    handle: "@maria",
    avatar: "https://i.pravatar.cc/120?img=47",
    neighborhood: "Riverside",
    reputation: 1280,
    badges: ["Founding Neighbor", "First Responder"],
    joinedAt: "2023-04-12",
    bio: "Two kids, one rescue dog, lots of opinions about the farmers market.",
  },
  {
    id: "u_devon",
    name: "Devon Park",
    handle: "@devon",
    avatar: "https://i.pravatar.cc/120?img=12",
    neighborhood: "Oak Hill",
    reputation: 902,
    badges: ["Volunteer x12"],
    joinedAt: "2023-06-01",
  },
  {
    id: "u_okafor",
    name: "Amaka Okafor",
    handle: "@amaka",
    avatar: "https://i.pravatar.cc/120?img=32",
    neighborhood: "Maple Heights",
    reputation: 1740,
    badges: ["Top Organizer", "Fundraiser Hero"],
    joinedAt: "2022-11-20",
  },
  {
    id: "u_jonas",
    name: "Jonas Weber",
    handle: "@jonas",
    avatar: "https://i.pravatar.cc/120?img=14",
    neighborhood: "Riverside",
    reputation: 540,
    badges: [],
    joinedAt: "2024-02-08",
  },
  {
    id: "u_priya",
    name: "Priya Subramanian",
    handle: "@priya",
    avatar: "https://i.pravatar.cc/120?img=45",
    neighborhood: "Cedar Park",
    reputation: 2210,
    badges: ["Council Liaison", "Verified Local"],
    joinedAt: "2022-08-15",
  },
  {
    id: "u_tomas",
    name: "Tomás Reyes",
    handle: "@tomas",
    avatar: "https://i.pravatar.cc/120?img=8",
    neighborhood: "Oak Hill",
    reputation: 680,
    badges: ["Medic"],
    joinedAt: "2023-09-30",
  },
  {
    id: "u_hana",
    name: "Hana Sato",
    handle: "@hana",
    avatar: "https://i.pravatar.cc/120?img=24",
    neighborhood: "Maple Heights",
    reputation: 1110,
    badges: ["Storyteller"],
    joinedAt: "2023-01-05",
  },
  {
    id: "u_ben",
    name: "Ben Olsson",
    handle: "@ben",
    avatar: "https://i.pravatar.cc/120?img=33",
    neighborhood: "Riverside",
    reputation: 410,
    badges: [],
    joinedAt: "2024-05-12",
  },
];

export const me = neighbors[0];

export type Community = {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  members: number;
  cover: string;
  emoji: string;
  category: "Neighborhood" | "Interest" | "Cause" | "Hobby";
  verified?: boolean;
};

export const communities: Community[] = [
  {
    id: "c_riverside",
    slug: "riverside",
    name: "Riverside Neighbors",
    blurb: "Everything Riverside — porch chats, lost cats, block parties.",
    members: 2840,
    cover: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    emoji: "🌳",
    category: "Neighborhood",
    verified: true,
  },
  {
    id: "c_oakhill",
    slug: "oak-hill",
    name: "Oak Hill Together",
    blurb: "A friendly hill community. Watch out for the deer.",
    members: 1620,
    cover: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
    emoji: "🍂",
    category: "Neighborhood",
    verified: true,
  },
  {
    id: "c_maple",
    slug: "maple-heights",
    name: "Maple Heights",
    blurb: "Tree-lined streets, weekend potlucks, a very active book club.",
    members: 980,
    cover: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
    emoji: "🍁",
    category: "Neighborhood",
  },
  {
    id: "c_cyclists",
    slug: "cyclists",
    name: "Saturday Cyclists",
    blurb: "8AM rides from the bakery. All paces welcome.",
    members: 312,
    cover: "https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?w=800",
    emoji: "🚴",
    category: "Hobby",
  },
  {
    id: "c_pantry",
    slug: "free-pantry",
    name: "Free Pantry Network",
    blurb: "Stocking and tending neighborhood pantries.",
    members: 540,
    cover: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    emoji: "🥖",
    category: "Cause",
    verified: true,
  },
  {
    id: "c_parents",
    slug: "new-parents",
    name: "New Parents Circle",
    blurb: "Stroller meetups, hand-me-downs, sleep tips.",
    members: 720,
    cover: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800",
    emoji: "👶",
    category: "Interest",
  },
  {
    id: "c_garden",
    slug: "community-garden",
    name: "Community Garden Co-op",
    blurb: "Plots, seeds, and a very enthusiastic compost team.",
    members: 198,
    cover: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
    emoji: "🌱",
    category: "Hobby",
  },
  {
    id: "c_seniors",
    slug: "senior-circle",
    name: "Senior Neighbors Circle",
    blurb: "Rides, coffee, and check-ins for our elders.",
    members: 260,
    cover: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800",
    emoji: "☕",
    category: "Cause",
  },
];

export type Incident = {
  id: string;
  title: string;
  type:
    | "Fire"
    | "Robbery"
    | "Accident"
    | "Flood"
    | "Missing Person"
    | "Medical"
    | "Infrastructure"
    | "Other";
  severity: Severity;
  location: string;
  reporterId: string;
  createdAt: string;
  status: "active" | "responding" | "resolved";
  summary: string;
  cover?: string;
  responders: number;
  comments: number;
  timeline: { time: string; label: string }[];
};

export const incidents: Incident[] = [
  {
    id: "i_1",
    title: "Tree down on Elm & 4th, blocking eastbound lane",
    type: "Infrastructure",
    severity: "medium",
    location: "Elm St & 4th Ave, Riverside",
    reporterId: "u_devon",
    createdAt: "2025-06-29T08:12:00Z",
    status: "responding",
    summary:
      "Old oak came down overnight. No injuries, but the road is closed eastbound. City crew on the way.",
    cover: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=900",
    responders: 4,
    comments: 18,
    timeline: [
      { time: "08:12", label: "Reported by Devon" },
      { time: "08:31", label: "City crew dispatched" },
      { time: "09:05", label: "Lane partially cleared" },
    ],
  },
  {
    id: "i_2",
    title: "Kitchen fire on Cherry Lane — family safe",
    type: "Fire",
    severity: "high",
    location: "412 Cherry Lane, Maple Heights",
    reporterId: "u_okafor",
    createdAt: "2025-06-28T22:40:00Z",
    status: "resolved",
    summary:
      "Small kitchen fire contained by fire department. Nguyen family is staying with neighbors. A fundraiser is open to help with damages.",
    responders: 9,
    comments: 64,
    timeline: [
      { time: "22:40", label: "911 called" },
      { time: "22:51", label: "Fire contained" },
      { time: "23:20", label: "Family relocated for the night" },
    ],
  },
  {
    id: "i_3",
    title: "Missing dog: Biscuit, golden retriever near Maple Park",
    type: "Other",
    severity: "low",
    location: "Maple Park, Maple Heights",
    reporterId: "u_hana",
    createdAt: "2025-06-29T07:01:00Z",
    status: "active",
    summary:
      "Slipped his leash this morning. Friendly, wearing a blue collar. Please DM Hana if seen.",
    cover: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900",
    responders: 2,
    comments: 11,
    timeline: [
      { time: "07:01", label: "Reported" },
      { time: "07:45", label: "Sighting near the duck pond" },
    ],
  },
  {
    id: "i_4",
    title: "Flash flooding near the underpass at 12th",
    type: "Flood",
    severity: "high",
    location: "12th St underpass, Cedar Park",
    reporterId: "u_priya",
    createdAt: "2025-06-29T06:30:00Z",
    status: "active",
    summary:
      "Standing water ~1ft deep. Avoid driving through. Public works notified.",
    responders: 6,
    comments: 22,
    timeline: [
      { time: "06:30", label: "Reported" },
      { time: "06:55", label: "Barricades requested" },
    ],
  },
  {
    id: "i_5",
    title: "Power out on Birch Block",
    type: "Infrastructure",
    severity: "low",
    location: "Birch St 200-400",
    reporterId: "u_jonas",
    createdAt: "2025-06-29T05:10:00Z",
    status: "resolved",
    summary: "Utility confirmed transformer issue, restored by 6:40am.",
    responders: 1,
    comments: 7,
    timeline: [
      { time: "05:10", label: "Reported" },
      { time: "06:40", label: "Power restored" },
    ],
  },
  {
    id: "i_6",
    title: "Fender-bender at Pine & Main, no injuries",
    type: "Accident",
    severity: "low",
    location: "Pine & Main, Oak Hill",
    reporterId: "u_tomas",
    createdAt: "2025-06-29T09:22:00Z",
    status: "responding",
    summary: "Two cars, minor damage. Traffic backed up north of Main.",
    responders: 2,
    comments: 4,
    timeline: [{ time: "09:22", label: "Reported" }],
  },
];

export type Fundraiser = {
  id: string;
  title: string;
  story: string;
  organizerId: string;
  cover: string;
  goal: number;
  raised: number;
  donors: number;
  daysLeft: number;
  category: "Emergency" | "Family" | "Community" | "Health";
  updates: { date: string; text: string }[];
};

export const fundraisers: Fundraiser[] = [
  {
    id: "f_nguyen",
    title: "Help the Nguyen family rebuild after the kitchen fire",
    story:
      "The Nguyens lost their kitchen and most of their dining room to a fire on Cherry Lane. They're safe — but they need help getting back home.",
    organizerId: "u_okafor",
    cover: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
    goal: 8000,
    raised: 4820,
    donors: 142,
    daysLeft: 18,
    category: "Emergency",
    updates: [
      {
        date: "Jun 28",
        text: "We crossed $4k overnight — thank you, neighbors.",
      },
      { date: "Jun 27", text: "Fundraiser opened with family's permission." },
    ],
  },
  {
    id: "f_pantry",
    title: "Stock the Riverside free pantry through July",
    story:
      "Our little blue pantry has been emptying within hours. Help us keep it full this summer.",
    organizerId: "u_maria",
    cover: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900",
    goal: 1500,
    raised: 1180,
    donors: 88,
    daysLeft: 9,
    category: "Community",
    updates: [{ date: "Jun 26", text: "150 bags donated this week." }],
  },
  {
    id: "f_park",
    title: "New benches for Maple Park",
    story:
      "The park needs four new benches. We're matching every dollar up to $1,000.",
    organizerId: "u_hana",
    cover: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900",
    goal: 2500,
    raised: 640,
    donors: 24,
    daysLeft: 32,
    category: "Community",
    updates: [],
  },
  {
    id: "f_school",
    title: "After-school art supplies for Cedar Elementary",
    story:
      "Mr. Patel's art club ran out of supplies in May. Let's get them through the year.",
    organizerId: "u_priya",
    cover: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900",
    goal: 1200,
    raised: 1200,
    donors: 67,
    daysLeft: 0,
    category: "Community",
    updates: [
      { date: "Jun 20", text: "Fully funded! Supplies arrive next week." },
    ],
  },
];

export type Poll = {
  id: string;
  question: string;
  description?: string;
  authorId: string;
  category: "Civic" | "Community" | "Event";
  endsAt: string;
  totalVotes: number;
  options: { id: string; label: string; votes: number }[];
  status: "open" | "closed";
};

export const polls: Poll[] = [
  {
    id: "p_market",
    question: "Should we extend the Riverside farmers market to Sundays?",
    description:
      "Vendors have asked. Council is open to it if there's neighborhood support.",
    authorId: "u_priya",
    category: "Civic",
    endsAt: "2025-07-10",
    totalVotes: 412,
    status: "open",
    options: [
      { id: "yes", label: "Yes — extend to Sundays", votes: 281 },
      { id: "no", label: "No — keep Saturday only", votes: 96 },
      { id: "biweekly", label: "Bi-weekly Sundays", votes: 35 },
    ],
  },
  {
    id: "p_speedbump",
    question: "Add speed bumps on Birch between 2nd and 4th?",
    authorId: "u_maria",
    category: "Civic",
    endsAt: "2025-07-05",
    totalVotes: 188,
    status: "open",
    options: [
      { id: "yes", label: "Yes", votes: 121 },
      { id: "no", label: "No", votes: 67 },
    ],
  },
  {
    id: "p_movie",
    question: "Which movie for the next park night?",
    authorId: "u_hana",
    category: "Event",
    endsAt: "2025-07-01",
    totalVotes: 234,
    status: "open",
    options: [
      { id: "a", label: "Paddington 2", votes: 110 },
      { id: "b", label: "The Princess Bride", votes: 80 },
      { id: "c", label: "Spider-Verse", votes: 44 },
    ],
  },
];

export type AidRequest = {
  id: string;
  title: string;
  type: "Food" | "Medical" | "Shelter" | "Transport" | "Financial" | "Blood";
  urgency: "low" | "medium" | "high";
  neighbor: string;
  requesterId: string;
  postedAt: string;
  summary: string;
};

export const aidRequests: AidRequest[] = [
  {
    id: "a_1",
    title: "Ride to dialysis on Tuesday mornings",
    type: "Transport",
    urgency: "medium",
    neighbor: "Oak Hill",
    requesterId: "u_tomas",
    postedAt: "2 hours ago",
    summary:
      "My mom needs a ride to dialysis at 7am on Tuesdays. We can pay gas.",
  },
  {
    id: "a_2",
    title: "Type O- blood needed for surgery this week",
    type: "Blood",
    urgency: "high",
    neighbor: "Cedar Park",
    requesterId: "u_priya",
    postedAt: "Yesterday",
    summary:
      "St. Anne's hospital is short on O-. Walk-ins welcome at the blood center on Pine.",
  },
  {
    id: "a_3",
    title: "Bag of groceries for a family of four",
    type: "Food",
    urgency: "medium",
    neighbor: "Riverside",
    requesterId: "u_jonas",
    postedAt: "3 hours ago",
    summary:
      "Between paychecks. Anything helps, especially kid-friendly snacks.",
  },
  {
    id: "a_4",
    title: "Spare room for two weeks after the fire",
    type: "Shelter",
    urgency: "high",
    neighbor: "Maple Heights",
    requesterId: "u_okafor",
    postedAt: "Yesterday",
    summary:
      "The Nguyens need housing through mid-July. Pet-friendly preferred.",
  },
];

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  organizer: string;
  emoji: string;
};

export const events: EventItem[] = [
  {
    id: "e_1",
    title: "Block party on Elm",
    date: "Sat, Jul 5",
    time: "4:00 PM",
    location: "Elm St (closed)",
    attendees: 84,
    organizer: "Riverside Neighbors",
    emoji: "🎉",
  },
  {
    id: "e_2",
    title: "Volunteer cleanup at Maple Park",
    date: "Sun, Jul 6",
    time: "9:00 AM",
    location: "Maple Park",
    attendees: 32,
    organizer: "Maple Heights",
    emoji: "🧹",
  },
  {
    id: "e_3",
    title: "Town hall: speed bumps & traffic calming",
    date: "Wed, Jul 9",
    time: "7:00 PM",
    location: "Cedar Library",
    attendees: 56,
    organizer: "City Council",
    emoji: "🏛️",
  },
  {
    id: "e_4",
    title: "Park movie night — Paddington 2",
    date: "Fri, Jul 11",
    time: "8:30 PM",
    location: "Maple Park lawn",
    attendees: 142,
    organizer: "Hana Sato",
    emoji: "🎬",
  },
];

export type Message = {
  id: string;
  from: string;
  preview: string;
  time: string;
  unread: boolean;
  channel: "dm" | "group" | "community" | "emergency";
};

export const messages: Message[] = [
  {
    id: "m_1",
    from: "Amaka Okafor",
    preview: "Thanks for sharing the fundraiser link! ❤️",
    time: "9:14 AM",
    unread: true,
    channel: "dm",
  },
  {
    id: "m_2",
    from: "Riverside Neighbors",
    preview: "Devon: anyone with a chainsaw nearby?",
    time: "8:20 AM",
    unread: true,
    channel: "community",
  },
  {
    id: "m_3",
    from: "Block 4 Captains",
    preview: "Priya: town hall agenda attached",
    time: "Yesterday",
    unread: false,
    channel: "group",
  },
  {
    id: "m_4",
    from: "Emergency · Cedar Park",
    preview: "Flood alert: 12th St underpass closed",
    time: "6:32 AM",
    unread: true,
    channel: "emergency",
  },
  {
    id: "m_5",
    from: "Tomás Reyes",
    preview: "I can do Tuesdays — call you tonight",
    time: "Yesterday",
    unread: false,
    channel: "dm",
  },
];

export type Notification = {
  id: string;
  kind: "incident" | "message" | "poll" | "fundraiser" | "volunteer" | "gov";
  title: string;
  body: string;
  time: string;
  read: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n_1",
    kind: "incident",
    title: "Flash flood near you",
    body: "12th St underpass — avoid the area.",
    time: "12m",
    read: false,
  },
  {
    id: "n_2",
    kind: "fundraiser",
    title: "Nguyen family fundraiser hit $4k",
    body: "142 neighbors have donated.",
    time: "1h",
    read: false,
  },
  {
    id: "n_3",
    kind: "poll",
    title: "Farmers market poll ends soon",
    body: "Your vote is one of 412 so far.",
    time: "3h",
    read: true,
  },
  {
    id: "n_4",
    kind: "message",
    title: "Amaka sent you a message",
    body: "Thanks for sharing the fundraiser link! ❤️",
    time: "5h",
    read: true,
  },
  {
    id: "n_5",
    kind: "gov",
    title: "Town hall added to your calendar",
    body: "Wed Jul 9 · 7:00 PM at Cedar Library",
    time: "1d",
    read: true,
  },
];

export type FeedItem =
  | {
      kind: "post";
      id: string;
      authorId: string;
      createdAt: string;
      text: string;
      image?: string;
      likes: number;
      comments: number;
      shares: number;
    }
  | { kind: "incident"; id: string; incidentId: string }
  | { kind: "fundraiser"; id: string; fundraiserId: string }
  | { kind: "poll"; id: string; pollId: string }
  | { kind: "event"; id: string; eventId: string }
  | {
      kind: "announcement";
      id: string;
      from: string;
      title: string;
      body: string;
      createdAt: string;
    };

export const feed: FeedItem[] = [
  { kind: "incident", id: "fi_1", incidentId: "i_4" },
  {
    kind: "post",
    id: "fi_2",
    authorId: "u_hana",
    createdAt: "1h",
    text: "The duck pond at Maple Park this morning. Felt like a postcard. ☀️",
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=900",
    likes: 48,
    comments: 6,
    shares: 1,
  },
  { kind: "fundraiser", id: "fi_3", fundraiserId: "f_nguyen" },
  { kind: "poll", id: "fi_4", pollId: "p_market" },
  {
    kind: "post",
    id: "fi_5",
    authorId: "u_devon",
    createdAt: "3h",
    text: "If anyone has a working chainsaw and an hour to spare, the tree on Elm could use the help. Coffee and donuts on me.",
    likes: 22,
    comments: 9,
    shares: 3,
  },
  { kind: "event", id: "fi_6", eventId: "e_1" },
  {
    kind: "announcement",
    id: "fi_7",
    from: "City Council",
    title: "Pothole repair on Riverside Drive starts Monday",
    body: "Crews will be working between 9am–3pm. Expect lane closures.",
    createdAt: "Yesterday",
  },
];

export const trendingIncidents = ["i_2", "i_4", "i_1", "i_3"];
export const suggestedCommunities = ["c_cyclists", "c_pantry", "c_garden"];

export function neighborById(id: string) {
  return neighbors.find((n) => n.id === id) ?? me;
}
export function communityBySlug(slug: string) {
  return communities.find((c) => c.slug === slug);
}
export function incidentById(id: string) {
  return incidents.find((i) => i.id === id);
}
export function fundraiserById(id: string) {
  return fundraisers.find((f) => f.id === id);
}
export function pollById(id: string) {
  return polls.find((p) => p.id === id);
}
export function eventById(id: string) {
  return events.find((e) => e.id === id);
}

export const severityToken: Record<
  Severity,
  { label: string; color: string; bg: string }
> = {
  info: { label: "Info", color: "text-foreground", bg: "bg-muted" },
  low: { label: "Low", color: "text-teal", bg: "bg-teal/10" },
  medium: { label: "Heads up", color: "text-warning", bg: "bg-warning/10" },
  high: { label: "Urgent", color: "text-ember", bg: "bg-ember/10" },
  critical: {
    label: "Critical",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
};
