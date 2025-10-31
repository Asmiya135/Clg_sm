"use client"

import Link from "next/link"
import { Search, MessageCircle, SquarePlus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TopNav() {
  const router = useRouter()
  return (
    <div className="md:hidden sticky top-0 z-30 bg-card/80 backdrop-blur border-b border-border">
      <div className="px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-xl font-semibold tracking-tight">comiteex</Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 bg-muted rounded px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Search"
              className="bg-transparent outline-none text-sm w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") router.push("/explore")
              }}
            />
          </div>
        </div>
        <Link href="/messages" aria-label="Messages" className="p-2 instagram-link"><MessageCircle className="w-6 h-6" /></Link>
        <Link href="/create" aria-label="Create" className="p-2 instagram-link"><SquarePlus className="w-6 h-6" /></Link>
      </div>
    </div>
  )
}


