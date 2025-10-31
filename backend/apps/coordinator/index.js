import express from "express"
import pino from "pino"

const app = express()
app.use(express.json())
const log = pino({ level: process.env.LOG_LEVEL || "info" })

const PORT = process.env.COORDINATOR_PORT || 4500

// Cluster state (in-memory for demo)
const nodes = new Map() // nodeId -> { id, host, port, lastBeat, alive }
let leaderId = null
let electionAlgo = "bully" // or "ring"
let logicalTime = 0
let timeOffsetMs = 0 // physical offset approximation

// Helpers
const now = () => Date.now() + timeOffsetMs
const incrementLamport = (incoming) => {
  logicalTime = Math.max(logicalTime, incoming || 0) + 1
  return logicalTime
}

function runBullyElection() {
  const aliveIds = [...nodes.values()].filter(n => n.alive).map(n => n.id)
  if (aliveIds.length === 0) {
    leaderId = null
    return leaderId
  }
  leaderId = Math.max(...aliveIds)
  return leaderId
}

function runRingElection() {
  const alive = [...nodes.values()].filter(n => n.alive).sort((a,b)=>a.id-b.id)
  if (alive.length === 0) { leaderId = null; return leaderId }
  // simple ring: pick next after the smallest id
  leaderId = alive[0].id
  return leaderId
}

// APIs
app.get("/health", (_req, res) => {
  res.json({ ok: true })
})

app.post("/register", (req, res) => {
  const { id, host, port } = req.body
  nodes.set(id, { id, host, port, lastBeat: now(), alive: true })
  incrementLamport(Number(req.headers["x-lamport"]))
  res.json({ ok: true, lamport: logicalTime })
})

app.post("/heartbeat", (req, res) => {
  const { id } = req.body
  const n = nodes.get(id)
  if (n) { n.lastBeat = now(); n.alive = true }
  incrementLamport(Number(req.headers["x-lamport"]))
  res.json({ ok: true, lamport: logicalTime })
})

app.post("/election/run", (req, res) => {
  electionAlgo = req.body.algorithm || electionAlgo
  leaderId = electionAlgo === "ring" ? runRingElection() : runBullyElection()
  incrementLamport(Number(req.headers["x-lamport"]))
  res.json({ leaderId, algorithm: electionAlgo, lamport: logicalTime })
})

app.get("/cluster", (_req, res) => {
  const list = [...nodes.values()]
  res.json({ leaderId, nodes: list })
})

app.get("/time", (_req, res) => {
  // physical time: approximate by server time
  res.json({ epochMs: now(), lamport: logicalTime })
})

// Reap dead nodes and trigger election if leader lost
setInterval(() => {
  const threshold = 5000
  let leaderLost = false
  for (const n of nodes.values()) {
    if (now() - n.lastBeat > threshold) {
      if (n.alive) log.warn({ node: n.id }, "node missed heartbeats")
      n.alive = false
      if (n.id === leaderId) leaderLost = true
    }
  }
  if (leaderLost) {
    leaderId = electionAlgo === "ring" ? runRingElection() : runBullyElection()
    log.info({ leaderId }, "new leader elected")
  }
}, 2000)

app.listen(PORT, () => {
  log.info(`coordinator listening on ${PORT}`)
})



