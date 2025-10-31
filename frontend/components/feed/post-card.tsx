"use client"

import { useRef, useState } from "react"
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react"

interface PostCardProps {
  committee: string
  logo: string
  image: string
  caption: string
  likes: number
  comments: number
  timestamp: string
}

export default function PostCard({ committee, logo, image, caption, likes, comments, timestamp }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const commentInputRef = useRef<HTMLInputElement | null>(null)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  return (
    <div className="bg-card border border-border rounded max-w-2xl mx-auto mb-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img
            src={logo || "/placeholder.svg"}
            alt={committee}
            className="w-10 h-10 rounded-full border border-border object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{committee}</span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
        </div>
        <button className="text-muted-foreground instagram-link text-xl">•••</button>
      </div>

      {/* Post Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-muted">
        <img
          src={image || "/placeholder.svg"}
          alt={`${committee} post`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        {/* Like, Comment, Share, Save */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={handleLike} className="instagram-link">
              {isLiked ? (
                <Heart className="w-6 h-6 fill-destructive text-destructive" />
              ) : (
                <Heart className="w-6 h-6 text-foreground" />
              )}
            </button>
            <button
              className="instagram-link"
              onClick={() => {
                commentInputRef.current?.focus()
              }}
              aria-label="Comment"
            >
              <MessageCircle className="w-6 h-6 text-foreground" />
            </button>
            <button
              className="instagram-link"
              onClick={async () => {
                const shareData = {
                  title: `${committee} on comiteex`,
                  text: caption,
                  url: typeof window !== "undefined" ? window.location.href : "",
                }
                try {
                  if (navigator.share) {
                    await navigator.share(shareData)
                  } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(shareData.url)
                    // no toast util imported; keep silent fallback
                  }
                } catch {}
              }}
              aria-label="Share"
            >
              <Send className="w-6 h-6 text-foreground" />
            </button>
          </div>
          <button onClick={() => setIsSaved(!isSaved)} className="instagram-link">
            {isSaved ? (
              <Bookmark className="w-6 h-6 fill-foreground text-foreground" />
            ) : (
              <Bookmark className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Likes Count */}
        <p className="text-sm font-semibold">{likeCount.toLocaleString()} likes</p>

        {/* Caption */}
        <p className="text-sm">
          <span className="font-semibold mr-2">{committee}</span>
          {caption}
        </p>

        {/* Comments Preview */}
        {comments > 0 && (
          <button className="text-sm text-muted-foreground instagram-link">View all {comments} comments</button>
        )}

        {/* Add Comment */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            ref={commentInputRef}
          />
          <button className="text-accent text-sm font-semibold instagram-link">Post</button>
        </div>
      </div>
    </div>
  )
}
