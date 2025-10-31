"use client"

import { useState } from "react"
import { ImagePlus } from "lucide-react"

export default function CreatePage() {
  const [caption, setCaption] = useState("")

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-card border border-border rounded p-6 space-y-4">
        <h2 className="text-lg font-semibold">Create new post</h2>
        <div className="aspect-square bg-muted rounded flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <ImagePlus className="w-10 h-10 mx-auto mb-2" />
            <p>Drag photos and videos here</p>
          </div>
        </div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="w-full bg-transparent outline-none min-h-24"
        />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-foreground text-background rounded">Share</button>
        </div>
      </div>
    </div>
  )
}



