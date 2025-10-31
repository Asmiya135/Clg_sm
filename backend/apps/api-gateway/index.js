import express from "express"
import fetch from "node-fetch"
import pino from "pino"

const app = express()
app.use(express.json())
// Minimal CORS so Next.js (localhost:3000) can call the gateway
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  if (req.method === "OPTIONS") return res.sendStatus(200)
  next()
})
const log = pino({ level: process.env.LOG_LEVEL || "info" })

const PORT = Number(process.env.PORT || 4000)
const COORD = process.env.COORDINATOR_URL || "http://localhost:4500"

// Discovery cache
let nodes = []
let lamport = 0

function bumpLamport(incoming) {
  lamport = Math.max(lamport, incoming || 0) + 1
  return lamport
}

async function refreshNodes() {
  try {
    const r = await fetch(`${COORD}/cluster`)
    const j = await r.json()
    nodes = (j.nodes || []).filter((n) => n.alive)
  } catch {}
}
setInterval(refreshNodes, 2000)
refreshNodes()

// Load balancer strategies
let rrIndex = 0
function pickNode() {
  if (nodes.length === 0) throw new Error("no nodes")
  rrIndex = (rrIndex + 1) % nodes.length
  return nodes[rrIndex]
}

// Public API consumed by frontend
app.get("/api/feed", async (_req, res) => {
  try {
    const node = pickNode()
    const url = `http://${node.host}:${node.port}/rpc/read/feed`
    const r = await fetch(url, { method: "POST", headers: { "x-lamport": String(lamport) } })
    const incomingLamport = Number(r.headers.get("x-lamport"))
    bumpLamport(incomingLamport)
    const data = await r.json()
    res.json({ ...data, lamport })
  } catch (e) {
    res.status(503).json({ error: "unavailable" })
  }
})

app.post("/api/like", async (req, res) => {
  try {
    const node = pickNode()
    const url = `http://${node.host}:${node.port}/rpc/write/like`
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", "x-lamport": String(lamport) },
      body: JSON.stringify({ postId: req.body?.postId, delta: req.body?.delta ?? 1 }),
    })
    const incomingLamport = Number(r.headers.get("x-lamport"))
    bumpLamport(incomingLamport)
    const data = await r.json()
    res.json({ ...data, lamport })
  } catch {
    res.status(503).json({ error: "unavailable" })
  }
})

// Election control endpoints for demo
app.post("/control/election", async (req, res) => {
  const algorithm = req.body?.algorithm || "bully"
  const r = await fetch(`${COORD}/election/run`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-lamport": String(lamport) },
    body: JSON.stringify({ algorithm }),
  })
  const j = await r.json()
  res.json(j)
})

app.listen(PORT, () => {
  log.info(`api-gateway listening on ${PORT}`)
})


