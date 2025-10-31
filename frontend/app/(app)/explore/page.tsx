"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock explore posts grid
const explorePosts = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  image:
    i % 4 === 0
      ? "/college-tech-event.jpg"
      : i % 4 === 1
        ? "/stage-performance-event.jpg"
        : i % 4 === 2
          ? "/startup-pitching-event.jpg"
          : "/college-tech-event.jpg",
  likes: Math.floor(Math.random() * 1000) + 100,
  committee: ["CSI", "Enacts", "E-Cell", "IETE"][i % 4],
}))

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<(typeof explorePosts)[0] | null>(null)

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Search Bar */}
      <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search committees, events, posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 bg-muted border-muted rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Explore Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {explorePosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="aspect-square cursor-pointer group overflow-hidden rounded bg-muted instagram-link relative"
            >
              <img
                src={post.image || "/placeholder.svg"}
                alt={`Explore post ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-6 text-white text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <span>❤️</span>
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💬</span>
                    <span>{Math.floor(Math.random() * 100) + 10}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-card rounded max-w-2xl w-full max-h-screen overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row h-full max-h-screen">
              <div className="w-full md:w-2/3 bg-muted">
                <img
                  src={selectedPost.image || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/3 flex flex-col p-4 border-l border-border">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="font-semibold text-sm">{selectedPost.committee}</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <p className="text-sm mb-4 flex-1">Amazing moment captured! Great turn out at our recent event.</p>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-2">View Comments (12)</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 text-xs bg-muted rounded px-2 py-1"
                    />
                    <button className="text-accent font-semibold text-xs">Post</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
