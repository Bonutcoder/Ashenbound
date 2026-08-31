# Ashenbound — Data Structures for the Living Death

> **Version:** 1.0.0  
> **Tech Stack:** Vanilla ES6+ JavaScript, HTML5 Canvas 2D, CSS3, Vite, Vitest, Docker, Nginx, GitHub Actions  
> **Deployment:** GitHub Pages & Docker Container  
> **Cost Guarantee:** 100% Free & Open Source ($0.00 Cost Stack)

---

## 📜 Overview & Core Philosophy

**Ashenbound** is a deterministic, version-controlled 2D Souls-like action game engine built around one foundational principle:

> **Data structures are not theoretical concepts; they are the operational foundation of high-performance rendering, combat arbitration, and world logic.**

The engine operates without external game frameworks (No React, PixiJS, or external physics libraries). Every system—from 60 FPS entity memory management to frame-perfect combat collision—is governed directly by fundamental Computer Science data structures and algorithms.

---

## 🧠 Data Structure Engine Specifications

| Data Structure | Module | Engine Operational Role | Time Complexity |
|---|---|---|---|
| **Doubly Linked List** | [`src/dsa/LinkedList.js`](file:///c:/Users/hp/Desktop/Ashenbound/src/dsa/LinkedList.js) | Active memory collection for living entities (`Player`, `Enemies`, `Projectiles`). Enables node removal without `Array.splice()` GC stutter at 60 FPS. | $O(1)$ Insertion / Removal |
| **Priority Queue (Min-Heap)** | [`src/dsa/PriorityQueue.js`](file:///c:/Users/hp/Desktop/Ashenbound/src/dsa/PriorityQueue.js) | Sorts frame-by-frame combat events. Priority 1 (Parry) overrides Priority 2 (Dodge) and Priority 3 (Damage Collision). | $O(\log N)$ Enqueue / Dequeue |
| **LIFO Stack** | [`src/dsa/StateStack.js`](file:///c:/Users/hp/Desktop/Ashenbound/src/dsa/StateStack.js) | Manages active UI & game states (`Gameplay`, `LoreModal`, `PauseMenu`). Top state receives `update()` and `draw()`. | $O(1)$ Push / Pop |
| **Directed Acyclic Graph (DAG)** | [`src/dsa/MapGraph.js`](file:///c:/Users/hp/Desktop/Ashenbound/src/dsa/MapGraph.js) | Maps the 4 world sectors and key gating. Runs Depth-First Search (DFS) on startup to validate map reachability. | $O(V + E)$ Traversal |
| **Breadth-First Search (BFS)** | [`src/dsa/MapGraph.js`](file:///c:/Users/hp/Desktop/Ashenbound/src/dsa/MapGraph.js) | Computes the shortest tile grid path for ground-based melee enemy AI pathfinding. | $O(V + E)$ Search |
| **FIFO Queue** | [`src/dsa/AttackQueue.js`](file:///c:/Users/hp/Desktop/Ashenbound/src/dsa/AttackQueue.js) | Caches boss multi-hit combo sequences (e.g. `[Slash, Backstep, HeavySlam]`). Cleared on successful player parry to trigger stagger. | $O(1)$ Dequeue / Clear |
| **Memento Pattern** | [`src/dsa/Memento.js`](file:///c:/Users/hp/Desktop/Ashenbound/src/dsa/Memento.js) | Captures deep-copy state snapshots at Ashen Shrines. Instantly restores state on player death without page reloads. | $O(1)$ Restore |
| **Hash Map Registry** | [`src/dsa/AssetMap.js`](file:///c:/Users/hp/Desktop/Ashenbound/src/dsa/AssetMap.js) | Key-value store mapping weapon stats, sprite sheets, and sound parameter triggers. | $O(1)$ Lookup |

---

## 🎮 Controls & Combat Mechanics

### Keybindings

| Input / Key | Action | Engine Mechanics |
|---|---|---|
| **W / A / S / D** | Movement | Horizontal & Platform Navigation |
| **Left Click** | Light Attack | Fast execution, standard damage |
| **Shift + Left Click** | Heavy Attack | Slow execution; deals **+50% bonus critical damage** on staggered targets |
| **Right Click** | Parry | Active 150ms window. Counters physical attacks, clears boss FIFO queue, triggers **1.5s–2.0s Stagger** |
| **Space** | Dodge / Roll | Invincibility frames (i-frames) against unparryable heavy strikes and magic |
| **Shift** | Jump | Evades ground shockwaves and low sweep hitboxes |
| **R** | Heal | Consumes Healing Flask (Tier 1 vs Tier 2 dynamic restoration rules) |
| **E** | Interact | Rest at Ashen Shrine / Dismiss Lore overlay |
| **ESC** | Pause Menu | Pushes/Pops LIFO UI StateStack |
| **F1** | Telemetry Overlay | Toggles live DSA memory and queue monitoring dashboard |

---

## 👹 World & Boss Progression

The world is structured as a linear, unidirectional Directed Acyclic Graph (DAG):

1. **🌲 Area 1 — Forsaken Woods $\to$ Forest Warden (250 HP)**
   - *Archetype:* Earth Mage / Area Control
   - *Reward:* Weapon Switching Unlocked + 1 Healing Flask (Total: 2 Flasks).
2. **🏘️ Area 2 — Stonesmith Village $\to$ Iron Sentinel (300 HP)**
   - *Archetype:* Heavy Armored Knight (Sword & Shield)
   - *Reward:* Permanent Armor Upgrade (-15% damage taken) + 1 Healing Flask (Total: 3 Flasks).
3. **🏰 Area 3 — Ruins of Grandeur $\to$ Rykard the Blasphemous (400 HP)**
   - *Archetype:* Dual-Wielder (Fire & Ice Sword Magic Hybrid)
   - *Reward:* +15% Max HP Boost (100 HP $\to$ 115 HP) + 1 Healing Flask (Total: 4 Flasks).
4. **👑 Area 4 — Fallen Palace $\to$ Malachar, The Black Reaper (500 HP)**
   - *Phase 1 (500–250 HP):* Aerial Flight & Extreme Physical Dominance.
   - *Phase 2 (250–0 HP):* Blood-Imbued Greatsword & Blood Projections DoT (5% Max HP / 3s).

---

## 🛠️ Local Development & Testing

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup Instructions

```powershell
# 1. Clone the repository
git clone https://github.com/Bonutcoder/Ashenbound.git
cd Ashenbound

# 2. Install dependencies
npm install

# 3. Start local development server (with Hot Module Replacement)
npm run dev
# App will open at http://localhost:5173

# 4. Run automated DSA Vitest unit test suite
npm run test

# 5. Build static production bundle
npm run build
```

---

## 🐳 Docker Deployment

The application includes a multi-stage Docker build with Nginx Alpine for stateless container deployment:

```powershell
# Build and run using Docker Compose (Accessible at http://localhost:8080)
docker-compose up -d

# Or build manually using Docker CLI
docker build -t ashenbound:latest .
docker run -d -p 8080:80 ashenbound:latest
```

---

## 🚢 CI/CD & Deployment Strategy

- **GitHub Pages**: Automated deployment workflow (`.github/workflows/deploy.yml`) builds static production assets and deploys to `gh-pages` branch on push to `main`.
- **Git Branching Strategy**:
  - `main`: Production releases (`v1.0.0`).
  - `develop`: Primary integration branch.
  - `feature/*`: Dedicated feature development branches (`feature/01-scaffolding-config`, `feature/02-dsa-engine`, `feature/03-core-engine`, etc.).

---

## 📊 Live Telemetry Dashboard

Press **`F1`** or launch with URL query parameter `?debug=true` to toggle the live DOM telemetry overlay exposing real-time engine internals:
- **DLL Size**: Living entity node count in memory.
- **Priority Heap Root**: Current active event & priority level ($P1 \dots P4$).
- **World Graph Node**: Active region node pointer.
- **Boss AI FIFO Queue**: Pending attack combo queue length.
- **FPS & Frame Time**: Real-time millisecond execution monitoring.

---

## 📄 License

This project is licensed under the MIT License — 100% Free & Open Source ($0.00 Cost Stack).
