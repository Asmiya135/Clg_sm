"use client"

import { useState } from "react"
import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const allEvents = [
  {
    id: 1,
    name: "Web Development Workshop",
    date: "Nov 15, 2024",
    time: "2:00 PM",
    location: "Tech Hall - Room 101",
    image: "/college-tech-event.jpg",
    committee: "CSI",
    attendees: 245,
    registered: true,
    category: "Workshop",
  },
  {
    id: 2,
    name: "AI & Machine Learning Bootcamp",
    date: "Nov 22, 2024",
    time: "10:00 AM",
    location: "Auditorium",
    image: "/startup-pitching-event.jpg",
    committee: "IETE",
    attendees: 189,
    registered: false,
    category: "Workshop",
  },
  {
    id: 3,
    name: "Annual Cultural Fest",
    date: "Nov 30, 2024",
    time: "6:00 PM",
    location: "Main Campus Ground",
    image: "/stage-performance-event.jpg",
    committee: "Enacts",
    attendees: 1200,
    registered: true,
    category: "Event",
  },
  {
    id: 4,
    name: "Startup Pitch Competition",
    date: "Dec 1, 2024",
    time: "3:00 PM",
    location: "Innovation Hub",
    image: "/startup-pitching-event.jpg",
    committee: "E-Cell",
    attendees: 320,
    registered: false,
    category: "Competition",
  },
  {
    id: 5,
    name: "Hackathon 2024",
    date: "Dec 8-9, 2024",
    time: "9:00 AM",
    location: "Tech Arena",
    image: "/college-tech-event.jpg",
    committee: "CSI",
    attendees: 567,
    registered: false,
    category: "Competition",
  },
]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [events, setEvents] = useState(allEvents)

  const filteredEvents = events.filter(
    (event) =>
      (event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.committee.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "All" || event.category === selectedCategory),
  )

  const handleRegister = (eventId: number) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === eventId ? { ...event, registered: !event.registered } : event)),
    )
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 space-y-4">
          <h1 className="text-2xl md:text-3xl font-light">Upcoming Events</h1>

          {/* Search and Filter */}
          <div className="flex gap-2 flex-col md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search events, committees, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted border-muted rounded"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["All", "Workshop", "Event", "Competition"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground instagram-link hover:bg-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-card border border-border rounded overflow-hidden hover:shadow-sm transition-shadow"
            >
              {/* Event Image */}
              <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                  {event.category}
                </div>
              </div>

              {/* Event Info */}
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-base line-clamp-2">{event.name}</h3>

                <p className="text-xs text-muted-foreground font-medium">{event.committee}</p>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} going</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleRegister(event.id)}
                  className={`w-full h-9 text-sm rounded ${
                    event.registered
                      ? "bg-muted text-foreground border border-border"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {event.registered ? "Registered" : "Register"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No events found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
              className="text-accent font-semibold instagram-link text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
