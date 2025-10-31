import express from "express"
import fetch from "node-fetch"
import pino from "pino"
import { Worker } from "worker_threads"

const app = express()
app.use(express.json())
const log = pino({ level: process.env.LOG_LEVEL || "info" })

const NODE_ID = Number(process.env.NODE_ID || 1)
const PORT = Number(process.env.PORT || 4101)
const COORD = process.env.COORDINATOR_URL || "http://localhost:4500"

// Simple data store (in-memory) with vector-like version
let lamport = 0
const posts = [
  {
    id: 1,
    committee: "CSI",
    logo: "/csi-committee-logo.jpg",
    image: "/college-tech-event.jpg",
    caption:
      "Amazing turnout at our latest hackathon! Great to see so much innovation from our community.",
    likes: 342,
    comments: 28,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    committee: "Enacts",
    logo: "/enacts-performance-logo.jpg",
    image: "/stage-performance-event.jpg",
    caption:
      "Our annual cultural fest was absolutely incredible! Thank you all for making it special.",
    likes: 518,
    comments: 45,
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    committee: "E-Cell",
    logo: "/e-cell-entrepreneurship-logo.jpg",
    image: "/startup-pitching-event.jpg",
    caption:
      "Pitch your idea at next week's startup challenge. Winners get mentorship and funding opportunities!",
    likes: 287,
    comments: 62,
    timestamp: "1 day ago",
  },
]

const committees = [
  { id: 1, name: "CSI", logo: "/csi-committee-logo.jpg" },
  { id: 2, name: "Oculus", logo: "/oculus-event-design.jpg" },
  { id: 3, name: "IETE", logo: "/iete-tech-logo.jpg" },
  { id: 4, name: "Enacts", logo: "/enacts-performance-logo.jpg" },
  { id: 5, name: "E-Cell", logo: "/e-cell-entrepreneurship-logo.jpg" },
  { id: 6, name: "RC", logo: "/rotaract-logo.jpg" },
]

const bumpLamport = (incoming) => {
  lamport = Math.max(lamport, incoming || 0) + 1
  return lamport
}

// RPC-like endpoints
app.post("/rpc/read/feed", (req, res) => {
  bumpLamport(Number(req.headers["x-lamport"]))
  res.set("x-lamport", String(lamport))
  res.json({ posts, committees, nodeId: NODE_ID })
})

app.post("/rpc/write/like", (req, res) => {
  bumpLamport(Number(req.headers["x-lamport"]))
  const { postId, delta } = req.body
  const p = posts.find((x) => x.id === postId)
  if (p) p.likes = Math.max(0, p.likes + (Number(delta) || 0))
  res.set("x-lamport", String(lamport))
  res.json({ ok: true, likes: p?.likes ?? null })
})

// Health/metrics
app.get("/health", (_req, res) => res.json({ ok: true, nodeId: NODE_ID }))
app.get("/metrics", (_req, res) => {
  res.json({ nodeId: NODE_ID, inflight: 0, cpu: 0, mem: process.memoryUsage().rss })
})

// Background worker to demonstrate multithreading
let worker
function startWorker() {
  worker = new Worker(`
    const { parentPort } = require('worker_threads');
    function fib(n){return n<2?n:fib(n-1)+fib(n-2)}
    setInterval(()=>{ fib(20); parentPort.postMessage({ done: true }) }, 3000)
  `, { eval: true })
  worker.on("message", () => {})
}

async function heartbeatLoop() {
  while (true) {
    try {
      await fetch(`${COORD}/heartbeat`, {
        method: "POST",
        headers: { "content-type": "application/json", "x-lamport": String(lamport) },
        body: JSON.stringify({ id: NODE_ID }),
      })
    } catch {}
    await new Promise((r) => setTimeout(r, 1500))
  }
}

async function register() {
  try {
    await fetch(`${COORD}/register`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-lamport": String(lamport) },
      body: JSON.stringify({ id: NODE_ID, host: "localhost", port: PORT }),
    })
  } catch (e) {
    log.error(e)
  }
}

app.listen(PORT, async () => {
  log.info(`data-node ${NODE_ID} on ${PORT}`)
  startWorker()
  await register()
  heartbeatLoop()
})



