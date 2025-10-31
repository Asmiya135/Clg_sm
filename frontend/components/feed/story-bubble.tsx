"use client"

interface StoryBubbleProps {
  name: string
  avatarUrl: string
  hasStory: boolean
  onClick: () => void
}

export default function StoryBubble({ name, avatarUrl, hasStory, onClick }: StoryBubbleProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 instagram-link group`}
    >
      <div
        className={`w-16 h-16 rounded-full border flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 border-border`}
      >
        <img src={avatarUrl || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <span className="text-xs text-center max-w-16 truncate">{name}</span>
    </button>
  )
}
