"use client"

import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

interface ProfileHeaderProps {
  name: string
  logo: string
  coverImage: string
  bio: string
  followers: number
  following: number
  posts: number
}

export default function ProfileHeader({
  name,
  logo,
  coverImage,
  bio,
  followers,
  following,
  posts,
}: ProfileHeaderProps) {
  return (
    <div className="bg-card border-b border-border">
      {/* Cover Image */}
      <div className="relative w-full h-40 md:h-48 bg-muted overflow-hidden">
        <img src={coverImage || "/placeholder.svg"} alt={`${name} cover`} className="w-full h-full object-cover" />
      </div>

      {/* Profile Info */}
      <div className="px-4 md:px-6 pb-4">
        {/* Profile Pic and Header */}
        <div className="flex items-end gap-4 mb-4 -mt-12 relative z-10">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-card bg-muted overflow-hidden">
            <img src={logo || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 mb-2">
            <h1 className="text-2xl md:text-3xl font-light">{name}</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-2">
            <Button className="bg-primary text-primary-foreground h-9 px-6 rounded text-sm">Message</Button>
            <Button variant="outline" size="sm" className="h-9 px-3 rounded bg-transparent">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats and Bio */}
        <div className="space-y-4">
          <p className="text-foreground text-sm leading-relaxed">{bio}</p>

          {/* Stats */}
          <div className="flex gap-6 md:gap-8 text-sm">
            <div className="text-center md:text-left">
              <p className="font-semibold text-base">{posts}</p>
              <p className="text-muted-foreground text-xs">Posts</p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold text-base">{followers.toLocaleString()}</p>
              <p className="text-muted-foreground text-xs">Followers</p>
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold text-base">{following}</p>
              <p className="text-muted-foreground text-xs">Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
