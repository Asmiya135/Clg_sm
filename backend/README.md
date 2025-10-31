# comiteex Backend (Demo Cluster)

Run a local distributed demo: coordinator, API gateway, and 3 data-nodes.

## Start

```bash
cd backend
npm i
npm run dev
```

Services:
- Coordinator: http://localhost:4500
- Gateway: http://localhost:4000
- Data-nodes: 4101/4102/4103

Frontend config:
- Set `NEXT_PUBLIC_API_URL=http://localhost:4000` in `.env.local` (frontend).

## Features
- RPC over HTTP with Lamport clock (`x-lamport` header).
- Multithreading: each data-node runs a background `worker_threads` task.
- Clock sync: `/time` on coordinator for physical time; logical time hop.
- Leader election: POST `POST /election/run { algorithm: "bully"|"ring" }` on coordinator via gateway `/control/election`.
- Load balancing: gateway round-robin across alive nodes discovered from coordinator.
- Replication model: demo reads from any node; likes mutate a single node in this demo.


