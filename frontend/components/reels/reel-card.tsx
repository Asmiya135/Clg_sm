"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react"

interface ReelCardProps {
  id: number
  committee: string
  logo: string
  caption: string
  video: string
  likes: number
  comments: number
}

export default function ReelCard({ id, committee, logo, caption, video, likes, comments }: ReelCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden snap-center">
      {/* Video/Media */}
      <div className="w-full h-full bg-gradient-to-b from-muted via-muted to-muted flex items-center justify-center relative">
        <img src={video || "/placeholder.svg"} alt={`Reel by ${committee}`} className="w-full h-full object-cover" />

        {/* Play Button Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm">
            <div className="text-white text-3xl">▶</div>
          </div>
        </div>
      </div>

      {/* Right-side Actions */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-6 z-10">
        <button onClick={handleLike} className="flex flex-col items-center gap-1 instagram-link">
          {isLiked ? (
            <Heart className="w-8 h-8 fill-destructive text-destructive" />
          ) : (
            <Heart className="w-8 h-8 text-white" />
          )}
          <span className="text-white text-xs font-medium">{likeCount}</span>
        </button>

        <button className="flex flex-col items-center gap-1 instagram-link">
          <MessageCircle className="w-8 h-8 text-white" />
          <span className="text-white text-xs font-medium">{comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1 instagram-link">
          <Send className="w-8 h-8 text-white" />
          <span className="text-white text-xs font-medium">Share</span>
        </button>

        <button className="flex flex-col items-center gap-1 instagram-link">
          <Bookmark className="w-8 h-8 text-white" />
          <span className="text-white text-xs font-medium">Save</span>
        </button>
      </div>

      {/* Bottom-left: Committee Info & Caption */}
      <div className="absolute left-4 bottom-4 z-10 max-w-xs">
        <div className="flex items-center gap-2 mb-3">
          <img
            src={logo || "/placeholder.svg"}
            alt={committee}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <p className="text-white font-semibold text-sm">{committee}</p>
            <p className="text-white/70 text-xs">Follow</p>
          </div>
        </div>

        <p className="text-white text-sm line-clamp-3">{caption}</p>
      </div>

      {/* Audio/Music Indicator */}
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
        <p className="text-white text-xs font-medium">🎵 Original audio</p>
      </div>
    </div>
  )
}
