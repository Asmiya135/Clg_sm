"use client"

import { useState } from "react"
import ProfileHeader from "@/components/profile/profile-header"
import Tabs from "@/components/profile/tabs"
import EventCard from "@/components/profile/event-card"

// Mock data for demonstration
const committeeData = {
  name: "CSI - Computer Science Initiative",
  logo: "/csi-committee-logo.jpg",
  coverImage: "/college-tech-event.jpg",
  bio: "Your go-to hub for coding, tech talks, and innovation challenges. Building tomorrow's tech leaders today.",
  followers: 1240,
  following: 84,
  posts: 42,
  events: [
    {
      id: 1,
      name: "Web Development Workshop",
      date: "Nov 15, 2024",
      time: "2:00 PM",
      location: "Tech Hall - Room 101",
      image: "/college-tech-event.jpg",
      attendees: 245,
      registered: true,
    },
    {
      id: 2,
      name: "AI & Machine Learning Bootcamp",
      date: "Nov 22, 2024",
      time: "10:00 AM",
      location: "Auditorium",
      image: "/startup-pitching-event.jpg",
      attendees: 189,
      registered: false,
    },
    {
      id: 3,
      name: "Hackathon 2024",
      date: "Dec 1, 2024",
      time: "9:00 AM",
      location: "Tech Arena",
      image: "/college-tech-event.jpg",
      attendees: 567,
      registered: false,
    },
  ],
  postImages: [
    {
      id: 1,
      image: "/college-tech-event.jpg",
    },
    {
      id: 2,
      image: "/startup-pitching-event.jpg",
    },
    {
      id: 3,
      image: "/college-tech-event.jpg",
    },
    {
      id: 4,
      image: "/stage-performance-event.jpg",
    },
    {
      id: 5,
      image: "/startup-pitching-event.jpg",
    },
    {
      id: 6,
      image: "/college-tech-event.jpg",
    },
  ],
}

const tabs = [
  { label: "Posts", value: "posts" },
  { label: "Events", value: "events" },
  { label: "Tagged", value: "tagged" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts")
  const [events, setEvents] = useState(committeeData.events)

  const handleRegister = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              registered: !event.registered,
              attendees: event.registered ? event.attendees - 1 : event.attendees + 1,
            }
          : event,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Profile Header */}
      <ProfileHeader {...committeeData} />

      {/* Tabs */}
      <Tabs tabs={tabs} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {activeTab === "posts" && (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-1 md:gap-2">
            {committeeData.postImages.map((post) => (
              <div key={post.id} className="aspect-square bg-muted overflow-hidden cursor-pointer group instagram-link">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={`Post ${post.id}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "events" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} {...event} onRegister={() => handleRegister(event.id)} />
            ))}
          </div>
        )}

        {activeTab === "tagged" && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tagged posts yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
