"use client"

import { useState } from "react"
import ReelCard from "@/components/reels/reel-card"

// Mock reels data
const reels = [
  {
    id: 1,
    committee: "CSI",
    logo: "/csi-committee-logo.jpg",
    video: "/college-tech-event.jpg",
    caption:
      "Check out the highlights from our latest hackathon! Incredible innovation and energy from all participants 🚀",
    likes: 2340,
    comments: 156,
  },
  {
    id: 2,
    committee: "Enacts",
    logo: "/enacts-performance-logo.jpg",
    video: "/stage-performance-event.jpg",
    caption:
      "Our performers absolutely killed it on stage! Cultural fest was a massive success thanks to everyone's support 🎭",
    likes: 3120,
    comments: 289,
  },
  {
    id: 3,
    committee: "E-Cell",
    logo: "/e-cell-entrepreneurship-logo.jpg",
    video: "/startup-pitching-event.jpg",
    caption: "Watch as startups pitch their groundbreaking ideas to investors. The future of entrepreneurship! 💡",
    likes: 1890,
    comments: 124,
  },
  {
    id: 4,
    committee: "IETE",
    logo: "/iete-tech-logo.jpg",
    video: "/college-tech-event.jpg",
    caption:
      "Join us for our next tech workshop! Learn cutting-edge technologies and network with fellow tech enthusiasts 🔧",
    likes: 1240,
    comments: 87,
  },
]

export default function ReelsPage() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)

  const handleScroll = (direction: "up" | "down") => {
    if (direction === "down") {
      setCurrentReelIndex((prev) => (prev + 1) % reels.length)
    } else {
      setCurrentReelIndex((prev) => (prev - 1 + reels.length) % reels.length)
    }
  }

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Reels Container */}
      <div className="h-full snap-y snap-mandatory overflow-y-scroll scroll-smooth" id="reels-container">
        {reels.map((reel, index) => (
          <div key={reel.id} className="relative">
            <ReelCard {...reel} />
          </div>
        ))}
      </div>

      {/* Navigation Indicators (Mobile) */}
      <div className="md:hidden absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentReelIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentReelIndex ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Keyboard/Scroll Hint */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 gap-2 text-white/50 text-xs z-20">
        <span>Scroll</span>
        <span>↑</span>
        <span>↓</span>
        <span>for more</span>
      </div>
    </div>
  )
}
