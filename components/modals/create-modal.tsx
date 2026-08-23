"use client";

import { useState } from "react";
import { useModalStore, useAppStore, useAuthStore, type CreateModalTab } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MessageSquarePlus,
  AlertTriangle,
  Heart,
  Calendar,
  Vote,
  HandHeart,
  Image as ImageIcon,
  MapPin,
  X,
  Sparkles,
  CheckCircle2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs: { id: CreateModalTab; label: string; icon: React.ElementType; color: string }[] = [
  { id: "post", label: "Post", icon: MessageSquarePlus, color: "text-purple-600 dark:text-purple-400" },
  { id: "incident", label: "Incident", icon: AlertTriangle, color: "text-rose-600 dark:text-rose-400" },
  { id: "fundraiser", label: "Fundraiser", icon: Heart, color: "text-pink-600 dark:text-pink-400" },
  { id: "event", label: "Event", icon: Calendar, color: "text-blue-600 dark:text-blue-400" },
  { id: "poll", label: "Poll", icon: Vote, color: "text-amber-600 dark:text-amber-400" },
  { id: "aid", label: "Aid Request", icon: HandHeart, color: "text-teal-600 dark:text-teal-400" },
];

export function CreateModal() {
  const { createModalOpen, createModalTab, openCreateModal, closeCreateModal } = useModalStore();
  const {
    addPost,
    addIncident,
    addFundraiser,
    addEvent,
    addPoll,
    addAidRequest,
    currentLocation,
    communities,
  } = useAppStore();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState<CreateModalTab>(createModalTab);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync tab with store when modal opens
  if (createModalTab !== activeTab && createModalOpen) {
    setActiveTab(createModalTab);
  }

  // ── Post Form State ──
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postCommunity, setPostCommunity] = useState("riverside");

  // ── Incident Form State ──
  const [incTitle, setIncTitle] = useState("");
  const [incSummary, setIncSummary] = useState("");
  const [incType, setIncType] = useState<"Fire" | "Flood" | "Accident" | "Infrastructure" | "Other">("Infrastructure");
  const [incSeverity, setIncSeverity] = useState<"low" | "medium" | "high" | "critical">("medium");
  const [incLocation, setIncLocation] = useState(currentLocation);

  // ── Fundraiser Form State ──
  const [fundTitle, setFundTitle] = useState("");
  const [fundStory, setFundStory] = useState("");
  const [fundGoal, setFundGoal] = useState("2000");
  const [fundCategory, setFundCategory] = useState<"Emergency" | "Family" | "Community" | "Health">("Community");
  const [fundCover, setFundCover] = useState("");

  // ── Event Form State ──
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("Sat, Aug 2");
  const [eventTime, setEventTime] = useState("4:00 PM");
  const [eventLocation, setEventLocation] = useState("Maple Park Lawn");
  const [eventEmoji, setEventEmoji] = useState("🎉");

  // ── Poll Form State ──
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["Yes", "No", "Needs more info"]);
  const [pollCategory, setPollCategory] = useState<"Civic" | "Community" | "Event">("Community");

  // ── Aid Request State ──
  const [aidTitle, setAidTitle] = useState("");
  const [aidSummary, setAidSummary] = useState("");
  const [aidType, setAidType] = useState<"Food" | "Medical" | "Shelter" | "Transport" | "Financial" | "Blood">("Food");
  const [aidUrgency, setAidUrgency] = useState<"low" | "medium" | "high">("medium");

  const resetForms = () => {
    setPostText("");
    setPostImage("");
    setIncTitle("");
    setIncSummary("");
    setFundTitle("");
    setFundStory("");
    setEventTitle("");
    setPollQuestion("");
    setAidTitle("");
    setAidSummary("");
    setSuccessMessage(null);
  };

  const showSuccessAndClose = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      resetForms();
      closeCreateModal();
    }, 1200);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    addPost({
      authorId: user.id,
      text: postText.trim(),
      image: postImage.trim() || undefined,
      communitySlug: postCommunity,
      location: `${currentLocation}, Block 3`,
    });
    showSuccessAndClose("Post published to neighborhood!");
  };

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incTitle.trim() || !incSummary.trim()) return;

    addIncident({
      title: incTitle.trim(),
      summary: incSummary.trim(),
      type: incType,
      severity: incSeverity,
      location: incLocation.trim() || currentLocation,
      reporterId: user.id,
      status: "active",
      cover: postImage || undefined,
    });
    showSuccessAndClose("Incident alert broadcasted!");
  };

  const handleCreateFundraiser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fundTitle.trim() || !fundStory.trim()) return;

    addFundraiser({
      title: fundTitle.trim(),
      story: fundStory.trim(),
      goal: parseFloat(fundGoal) || 1000,
      daysLeft: 30,
      category: fundCategory,
      cover: fundCover.trim() || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900",
      organizerId: user.id,
    });
    showSuccessAndClose("Fundraiser launched!");
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    addEvent({
      title: eventTitle.trim(),
      date: eventDate.trim(),
      time: eventTime.trim(),
      location: eventLocation.trim(),
      organizer: `${user.name} (${currentLocation})`,
      emoji: eventEmoji,
    });
    showSuccessAndClose("Event created!");
  };

  const handleCreatePoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pollQuestion.trim()) return;

    addPoll({
      question: pollQuestion.trim(),
      authorId: user.id,
      category: pollCategory,
      endsAt: "In 7 days",
      status: "open",
      options: pollOptions.filter(Boolean).map((label, idx) => ({
        id: `opt_${idx}`,
        label,
        votes: 0,
      })),
    });
    showSuccessAndClose("Poll opened for votes!");
  };

  const handleCreateAid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aidTitle.trim() || !aidSummary.trim()) return;

    addAidRequest({
      title: aidTitle.trim(),
      summary: aidSummary.trim(),
      type: aidType,
      urgency: aidUrgency,
      neighbor: currentLocation,
      requesterId: user.id,
    });
    showSuccessAndClose("Aid request posted!");
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={(open) => !open && closeCreateModal()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-3xl border border-purple-100 dark:border-purple-900/40 bg-card shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/60 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                <Sparkles className="size-5" />
              </span>
              <div>
                <DialogTitle className="text-xl font-bold tracking-tight">Create for your community</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Posting to <span className="font-semibold text-foreground">{currentLocation}</span>
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-4 pb-1 scrollbar-none">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    openCreateModal(tab.id);
                  }}
                  type="button"
                  className={cn(
                    "flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm shadow-purple-500/25"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("size-3.5", !active && tab.color)} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </DialogHeader>

        <div className="p-6">
          {successMessage ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="text-lg font-bold">{successMessage}</h3>
              <p className="text-xs text-muted-foreground">Updating community feed...</p>
            </div>
          ) : (
            <>
              {/* POST TAB */}
              {activeTab === "post" && (
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-content">What's on your mind?</Label>
                    <Textarea
                      id="post-content"
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      placeholder="Share a neighborhood update, recommendation, thought, or story..."
                      rows={4}
                      className="rounded-2xl resize-none border-border/80 focus:ring-primary/20 text-sm"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="post-img" className="text-xs">Image URL (Optional)</Label>
                      <Input
                        id="post-img"
                        value={postImage}
                        onChange={(e) => setPostImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="post-comm" className="text-xs">Post To Community</Label>
                      <select
                        id="post-comm"
                        value={postCommunity}
                        onChange={(e) => setPostCommunity(e.target.value)}
                        className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {communities.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.emoji} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {postImage && (
                    <div className="relative rounded-2xl overflow-hidden max-h-48 border border-border">
                      <img src={postImage} alt="Preview" className="w-full h-48 object-cover" />
                      <button
                        type="button"
                        onClick={() => setPostImage("")}
                        className="absolute top-2 right-2 size-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={closeCreateModal} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl bg-primary text-primary-foreground px-6">
                      Publish Post
                    </Button>
                  </div>
                </form>
              )}

              {/* INCIDENT TAB */}
              {activeTab === "incident" && (
                <form onSubmit={handleCreateIncident} className="space-y-4">
                  <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 p-3.5 flex items-start gap-3 text-rose-900 dark:text-rose-200">
                    <AlertTriangle className="size-5 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
                    <div className="text-xs">
                      <b className="block">Emergency & Safety Alert</b>
                      Reports are instantly notified to verified neighbors and first responders in your area.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inc-title">Incident Title</Label>
                    <Input
                      id="inc-title"
                      value={incTitle}
                      onChange={(e) => setIncTitle(e.target.value)}
                      placeholder="e.g. Flash flooding near 12th St underpass"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="inc-type" className="text-xs">Category</Label>
                      <select
                        id="inc-type"
                        value={incType}
                        onChange={(e) => setIncType(e.target.value as any)}
                        className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none"
                      >
                        <option value="Infrastructure">Infrastructure Hazard</option>
                        <option value="Flood">Flood & Weather</option>
                        <option value="Fire">Fire Incident</option>
                        <option value="Accident">Traffic / Accident</option>
                        <option value="Other">Other Concern / Lost Pet</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="inc-severity" className="text-xs">Urgency Severity</Label>
                      <select
                        id="inc-severity"
                        value={incSeverity}
                        onChange={(e) => setIncSeverity(e.target.value as any)}
                        className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none"
                      >
                        <option value="low">Low (Information)</option>
                        <option value="medium">Medium (Heads up)</option>
                        <option value="high">High (Urgent)</option>
                        <option value="critical">Critical (Immediate danger)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inc-summary">Details & Instructions</Label>
                    <Textarea
                      id="inc-summary"
                      value={incSummary}
                      onChange={(e) => setIncSummary(e.target.value)}
                      placeholder="Describe what happened, exact location details, road blocks, or required actions..."
                      rows={3}
                      className="rounded-2xl text-sm resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inc-loc" className="text-xs">Exact Location / Address</Label>
                    <Input
                      id="inc-loc"
                      value={incLocation}
                      onChange={(e) => setIncLocation(e.target.value)}
                      placeholder="e.g. 12th St underpass, Cedar Park"
                      className="rounded-xl text-xs"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={closeCreateModal} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white px-6">
                      Broadcast Alert
                    </Button>
                  </div>
                </form>
              )}

              {/* FUNDRAISER TAB */}
              {activeTab === "fundraiser" && (
                <form onSubmit={handleCreateFundraiser} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fund-title">Fundraiser Title</Label>
                    <Input
                      id="fund-title"
                      value={fundTitle}
                      onChange={(e) => setFundTitle(e.target.value)}
                      placeholder="e.g. Help the Nguyen family rebuild after kitchen fire"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="fund-goal" className="text-xs">Target Goal ($ USD)</Label>
                      <Input
                        id="fund-goal"
                        type="number"
                        min="50"
                        value={fundGoal}
                        onChange={(e) => setFundGoal(e.target.value)}
                        placeholder="5000"
                        className="rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="fund-cat" className="text-xs">Cause Category</Label>
                      <select
                        id="fund-cat"
                        value={fundCategory}
                        onChange={(e) => setFundCategory(e.target.value as any)}
                        className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none"
                      >
                        <option value="Emergency">Emergency Relief</option>
                        <option value="Community">Community Project</option>
                        <option value="Family">Family Support</option>
                        <option value="Health">Medical / Health</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fund-story">The Story & How Funds Will Be Used</Label>
                    <Textarea
                      id="fund-story"
                      value={fundStory}
                      onChange={(e) => setFundStory(e.target.value)}
                      placeholder="Explain why this support is needed, beneficiary details, and how funds will directly help..."
                      rows={4}
                      className="rounded-2xl text-sm resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fund-cover" className="text-xs">Cover Photo URL (Optional)</Label>
                    <Input
                      id="fund-cover"
                      value={fundCover}
                      onChange={(e) => setFundCover(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="rounded-xl text-xs"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={closeCreateModal} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-6">
                      Launch Fundraiser
                    </Button>
                  </div>
                </form>
              )}

              {/* EVENT TAB */}
              {activeTab === "event" && (
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-title">Event Title</Label>
                    <Input
                      id="event-title"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="e.g. Block party on Elm & Barbecue"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="event-emoji" className="text-xs">Emoji</Label>
                      <Input
                        id="event-emoji"
                        value={eventEmoji}
                        onChange={(e) => setEventEmoji(e.target.value)}
                        className="rounded-xl text-center text-lg"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="event-date" className="text-xs">Date</Label>
                      <Input
                        id="event-date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        placeholder="Sat, Aug 2"
                        className="rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="event-time" className="text-xs">Time</Label>
                      <Input
                        id="event-time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        placeholder="4:00 PM"
                        className="rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-loc">Location</Label>
                    <Input
                      id="event-loc"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Elm St (closed to traffic)"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={closeCreateModal} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6">
                      Publish Event
                    </Button>
                  </div>
                </form>
              )}

              {/* POLL TAB */}
              {activeTab === "poll" && (
                <form onSubmit={handleCreatePoll} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="poll-q">Poll Question</Label>
                    <Input
                      id="poll-q"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                      placeholder="e.g. Should we extend the farmers market to Sundays?"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Options</Label>
                    {pollOptions.map((opt, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={opt}
                          onChange={(e) => {
                            const updated = [...pollOptions];
                            updated[index] = e.target.value;
                            setPollOptions(updated);
                          }}
                          placeholder={`Option ${index + 1}`}
                          className="rounded-xl text-xs"
                          required
                        />
                        {pollOptions.length > 2 && (
                          <button
                            type="button"
                            onClick={() =>
                              setPollOptions(pollOptions.filter((_, i) => i !== index))
                            }
                            className="size-8 rounded-lg hover:bg-muted text-muted-foreground flex items-center justify-center"
                          >
                            <X className="size-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {pollOptions.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPollOptions([...pollOptions, ""])}
                        className="rounded-xl text-xs mt-1"
                      >
                        + Add another option
                      </Button>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="poll-cat" className="text-xs">Category</Label>
                    <select
                      id="poll-cat"
                      value={pollCategory}
                      onChange={(e) => setPollCategory(e.target.value as any)}
                      className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none"
                    >
                      <option value="Civic">Civic / Local Government</option>
                      <option value="Community">Community Decision</option>
                      <option value="Event">Event Planning</option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={closeCreateModal} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-6">
                      Launch Poll
                    </Button>
                  </div>
                </form>
              )}

              {/* AID TAB */}
              {activeTab === "aid" && (
                <form onSubmit={handleCreateAid} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aid-title">What do you or a neighbor need?</Label>
                    <Input
                      id="aid-title"
                      value={aidTitle}
                      onChange={(e) => setAidTitle(e.target.value)}
                      placeholder="e.g. Ride to dialysis on Tuesday mornings"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="aid-type" className="text-xs">Type of Aid</Label>
                      <select
                        id="aid-type"
                        value={aidType}
                        onChange={(e) => setAidType(e.target.value as any)}
                        className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none"
                      >
                        <option value="Food">Food / Groceries</option>
                        <option value="Transport">Transport / Rides</option>
                        <option value="Medical">Medical / Prescriptions</option>
                        <option value="Shelter">Shelter / Temporary Room</option>
                        <option value="Blood">Blood Donation</option>
                        <option value="Financial">Emergency Financial Aid</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="aid-urgency" className="text-xs">Urgency</Label>
                      <select
                        id="aid-urgency"
                        value={aidUrgency}
                        onChange={(e) => setAidUrgency(e.target.value as any)}
                        className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs focus:outline-none"
                      >
                        <option value="low">Low (Flexible timing)</option>
                        <option value="medium">Medium (Needed this week)</option>
                        <option value="high">High (Immediate / Urgent)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aid-sum">Summary & Contact Information</Label>
                    <Textarea
                      id="aid-sum"
                      value={aidSummary}
                      onChange={(e) => setAidSummary(e.target.value)}
                      placeholder="Explain the request, dates/times needed, or how neighbors can help..."
                      rows={3}
                      className="rounded-2xl text-sm resize-none"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <Button type="button" variant="ghost" onClick={closeCreateModal} className="rounded-xl">
                      Cancel
                    </Button>
                    <Button type="submit" className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white px-6">
                      Post Aid Request
                    </Button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
