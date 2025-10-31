"use client"

import { useEffect, useState } from "react"
import StoryBubble from "@/components/feed/story-bubble"
import PostCard from "@/components/feed/post-card"
import { Skeleton } from "@/components/ui/skeleton"
import StoryViewer from "@/components/feed/story-viewer"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

export default function FeedPage() {
  const [selectedStory, setSelectedStory] = useState<number | null>(null)
  const [committees, setCommittees] = useState<{ id: number; name: string; logo: string }[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const isLoading = posts.length === 0 && committees.length === 0

  useEffect(() => {
    let mounted = true
    fetch(`${API}/api/feed`)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return
        setCommittees(data.committees || [])
        setPosts(data.posts || [])
      })
      .catch(() => {})
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="mx-auto p-4 w-full max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Center Column: Stories + Feed */}
        <div className="max-w-2xl w-full mx-auto">
          {/* Stories Section */}
          <div className="bg-card border border-border rounded p-4 mb-6 overflow-x-auto">
            <div className="flex gap-4">
              {committees.map((committee) => (
                <StoryBubble
                  key={committee.id}
                  name={committee.name}
                  avatarUrl={committee.logo}
                  hasStory={Math.random() > 0.4}
                  onClick={() => setSelectedStory(committee.id)}
                />
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {isLoading ? (
              <>
                {[1,2,3].map((i)=> (
                  <div key={i} className="bg-card border border-border rounded p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <Skeleton className="w-full aspect-square" />
                    <div className="mt-3 space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              posts.map((post) => <PostCard key={post.id} {...post} />)
            )}
          </div>

          {/* Load More */}
          <div className="text-center py-8">
            <button className="text-muted-foreground text-sm instagram-link hover:text-foreground">Load more posts</button>
          </div>
        </div>

        {/* Right Sidebar: Profile + Suggestions */}
        <aside className="hidden lg:block sticky self-start top-4">
          <div className="space-y-4">
            {/* Current user row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/placeholder-user.jpg" alt="You" className="w-12 h-12 rounded-full object-cover" />
                <div className="leading-tight">
                  <p className="text-sm font-semibold">you</p>
                  <p className="text-xs text-muted-foreground">Student • Committees</p>
                </div>
              </div>
              <a href="/profile" className="text-xs font-semibold text-accent instagram-link">Switch</a>
            </div>

            {/* Suggestions header */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">Suggestions for you</p>
              <a href="/explore" className="text-xs font-semibold instagram-link">See All</a>
            </div>

            {/* Suggestions list */}
            <div className="space-y-4">
              {committees.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={c.logo} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className="leading-tight">
                      <p className="text-sm font-semibold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">Suggested for you</p>
                    </div>
                  </div>
                  <a href={`/profile`} className="text-xs font-semibold text-accent instagram-link">Follow</a>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-xs text-muted-foreground mt-6">
              <p>About • Help • API • Jobs • Privacy • Terms</p>
              <p className="mt-2">© 2025 comiteex</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Story Viewer */}
      <StoryViewer
        open={selectedStory !== null}
        onOpenChange={(o) => !o && setSelectedStory(null)}
        media={(selectedStory ? posts.slice(0, 3) : []).map((p) => ({ src: p.image }))}
      />
    </div>
  )
}
