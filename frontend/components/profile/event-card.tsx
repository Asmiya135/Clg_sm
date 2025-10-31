"use client"

import { MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EventCardProps {
  name: string
  date: string
  time: string
  location: string
  image: string
  attendees: number
  registered: boolean
  onRegister: () => void
}

export default function EventCard({
  name,
  date,
  time,
  location,
  image,
  attendees,
  registered,
  onRegister,
}: EventCardProps) {
  return (
    <div className="bg-card border border-border rounded overflow-hidden">
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-base line-clamp-2">{name}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {date} at {time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{attendees} going</span>
          </div>
        </div>

        <Button
          onClick={onRegister}
          className={`w-full h-9 text-sm rounded ${
            registered ? "bg-muted text-foreground border border-border" : "bg-primary text-primary-foreground"
          }`}
        >
          {registered ? "Registered" : "Register"}
        </Button>
      </div>
    </div>
  )
}
