"use client"

import { Heart, MessageCircle, UserPlus, Calendar, Share2 } from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "like",
    user: "CSI",
    action: "liked your post",
    timestamp: "2 hours ago",
    icon: Heart,
  },
  {
    id: 2,
    type: "comment",
    user: "Enacts",
    action: "commented on your post",
    timestamp: "5 hours ago",
    icon: MessageCircle,
  },
  {
    id: 3,
    type: "follow",
    user: "E-Cell",
    action: "started following you",
    timestamp: "1 day ago",
    icon: UserPlus,
  },
  {
    id: 4,
    type: "event",
    user: "IETE",
    action: "invited you to Web Dev Workshop",
    timestamp: "2 days ago",
    icon: Calendar,
  },
  {
    id: 5,
    type: "share",
    user: "RC",
    action: "shared your event",
    timestamp: "3 days ago",
    icon: Share2,
  },
]

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-light">Notifications</h1>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-2xl mx-auto">
        {notifications.map((notification) => {
          const Icon = notification.icon
          return (
            <div
              key={notification.id}
              className="border-b border-border p-4 md:px-6 md:py-4 hover:bg-muted/50 transition-colors instagram-link"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{notification.user}</span> {notification.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                </div>

                {/* Action */}
                <button className="text-accent font-semibold text-sm whitespace-nowrap ml-4 instagram-link">
                  Follow
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
