"use client"

import { useState } from "react"
import StoryBubble from "@/components/feed/story-bubble"
import PostCard from "@/components/feed/post-card"

// Mock data
const committees = [
  { id: 1, name: "CSI", logo: "/csi-committee-logo.jpg" },
  { id: 2, name: "Oculus", logo: "/oculus-event-design.jpg" },
  { id: 3, name: "IETE", logo: "/iete-tech-logo.jpg" },
  { id: 4, name: "Enacts", logo: "/enacts-performance-logo.jpg" },
  { id: 5, name: "E-Cell", logo: "/e-cell-entrepreneurship-logo.jpg" },
  { id: 6, name: "RC", logo: "/rotaract-logo.jpg" },
]

const posts = [
  {
    id: 1,
    committee: "CSI",
    logo: "/csi-committee-logo.jpg",
    image: "/college-tech-event.jpg",
    caption: "Amazing turnout at our latest hackathon! Great to see so much innovation from our community.",
    likes: 342,
    comments: 28,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    committee: "Enacts",
    logo: "/enacts-performance-logo.jpg",
    image: "/stage-performance-event.jpg",
    caption: "Our annual cultural fest was absolutely incredible! Thank you all for making it special.",
    likes: 518,
    comments: 45,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    committee: "E-Cell",
    logo: "/e-cell-entrepreneurship-logo.jpg",
    image: "/startup-pitching-event.jpg",
    caption: "Pitch your idea at next week's startup challenge. Winners get mentorship and funding opportunities!",
    likes: 287,
    comments: 62,
    timestamp: "1 day ago",
  },
]

export default function FeedPage() {
  const [selectedStory, setSelectedStory] = useState<number | null>(null)

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Stories Section */}
      <div className="bg-card border border-border rounded p-4 mb-6 overflow-x-auto">
        <div className="flex gap-4">
          {committees.map((committee) => (
            <StoryBubble
              key={committee.id}
              name={committee.name}
              avatarUrl={committee.logo}
              hasStory={Math.random() > 0.4}
              onClick={() => setSelectedStory(committee.id)}
            />
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <button className="text-muted-foreground text-sm instagram-link hover:text-foreground">Load more posts</button>
      </div>
    </div>
  )
}
