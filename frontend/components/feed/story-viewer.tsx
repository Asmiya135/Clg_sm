"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface StoryViewerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  media: { src: string; caption?: string }[]
}

export default function StoryViewer({ open, onOpenChange, media }: StoryViewerProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!open) return
    setIndex(0)
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % Math.max(media.length, 1))
    }, 4000)
    return () => clearInterval(id)
  }, [open, media.length])

  if (media.length === 0) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <div className="relative bg-black">
          <img src={media[index].src} alt="story" className="w-full h-[70vh] object-contain bg-black" />
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80"
            onClick={() => setIndex((i) => (i - 1 + media.length) % media.length)}
            aria-label="Prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80"
            onClick={() => setIndex((i) => (i + 1) % media.length)}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}



