"use client"

import { useState } from "react"
import { Send, CheckCheck } from "lucide-react"

export default function MessagesPage() {
  const [message, setMessage] = useState("")
  const [selected, setSelected] = useState<string | null>("CSI")
  const threads = [
    { id: "CSI", avatar: "/csi-committee-logo.jpg", last: "Hackathon tomorrow!", unread: 2 },
    { id: "Enacts", avatar: "/enacts-performance-logo.jpg", last: "Dance auditions open", unread: 0 },
    { id: "E-Cell", avatar: "/e-cell-entrepreneurship-logo.jpg", last: "Pitch deck tips", unread: 1 },
    { id: "IETE", avatar: "/iete-tech-logo.jpg", last: "Workshop slides", unread: 0 },
  ]
  const allMessages: Record<string, { me: boolean; text: string; time: string }[]> = {
    CSI: [
      { me: false, text: "Welcome to CSI! Are you joining the hackathon?", time: "10:20" },
      { me: true, text: "Yes! What are the tracks?", time: "10:22" },
      { me: false, text: "Web, mobile, and ML.", time: "10:23" },
    ],
    Enacts: [{ me: false, text: "Auditions at 5 PM in the auditorium.", time: "09:10" }],
    "E-Cell": [{ me: false, text: "Don’t forget to register for pitching.", time: "08:00" }],
    IETE: [{ me: false, text: "Slides uploaded to the drive.", time: "Yesterday" }],
  }

  const messages = selected ? allMessages[selected] || [] : []

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4">
      {/* Threads */}
      <aside className="bg-card border border-border rounded h-[70vh] overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <ul className="divide-y divide-border">
          {threads.map((t) => {
            const active = selected === t.id
            return (
              <li
                key={t.id}
                className={`p-4 flex items-center gap-3 cursor-pointer ${active ? "bg-muted" : "hover:bg-muted"}`}
                onClick={() => setSelected(t.id)}
              >
                <img src={t.avatar} alt={t.id} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{t.id}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.last}</p>
                </div>
                {t.unread > 0 && (
                  <span className="text-xs bg-foreground text-background rounded-full px-2 py-0.5">{t.unread}</span>
                )}
              </li>
            )
          })}
        </ul>
      </aside>

      {/* Chat window */}
      <section className="bg-card border border-border rounded h-[70vh] flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-3">
          {selected && <img src={threads.find(t=>t.id===selected)?.avatar} className="w-8 h-8 rounded-full" alt="Chat" />}
          <p className="font-semibold">{selected || "comiteex Chat"}</p>
        </div>
        <div className="flex-1 p-4 space-y-3 overflow-auto">
          {messages.length === 0 ? (
            <div className="text-sm text-muted-foreground">Select a conversation or start typing…</div>
          ) : (
            messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${
                    m.me ? "bg-foreground text-background" : "bg-muted"
                  }`}
                >
                  <p>{m.text}</p>
                  <div className={`flex items-center gap-1 mt-1 text-[10px] ${m.me ? "text-background/80" : "text-muted-foreground"}`}>
                    <span>{m.time}</span>
                    {m.me && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <form
          className="p-3 border-t border-border flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (!selected || !message.trim()) return
            allMessages[selected] = [...messages, { me: true, text: message.trim(), time: "now" }]
            setMessage("")
          }}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none"
          />
          <button className="instagram-link" aria-label="Send">
            <Send className="w-6 h-6" />
          </button>
        </form>
      </section>
    </div>
  )
}


