**Ashenbound — Complete Engineering Blueprint**

**Product:** Ashenbound

**Tagline:** Data Structures for the Living Death

**Document:** Master Engineering, Architecture, DSA Integration, UX, Development & Deployment Blueprint

**Version:** 1.0

**Date:** 26 August 2026

**Status:** Engineering Baseline

**1\. Executive Summary**

Ashenbound is a highly deterministic, version-controlled 2D action game engine built around one core idea:

**Data structures are not theoretical concepts; they are the operational foundation of high-performance rendering, combat arbitration, and world logic.**

The product is not intended to be a generic browser platformer. Rendering and sprites are supporting capabilities. The primary product is a **Data Structures and Algorithms (DSA) demonstration engine** wrapped in an atmospheric Souls-like experience.

Ashenbound strictly manages memory using linked lists, resolves frame-perfect combat via priority queues, structures its world as a directed acyclic graph, caches AI sequences in FIFO queues, and restores checkpoints using the Memento pattern.

The architecture is deliberately split into:

- a game loop pipeline,
- an internal entity API,
- a frame-by-frame combat arbitration engine,
- an in-memory graph traversal system,
- an asynchronous asset loader,
- a fixed-timestep physics engine,
- and an isolated DSA telemetry UI.

The fundamental engineering principle is:

**Algorithms establish what happens in the game world; the Canvas API merely draws the results.**

**2\. Product Vision**

**2.1 Problem**

Computer Science students often build lab projects that are primarily optimized for simple grading.

Common workflows become:

Plaintext

Library Management System (Console)

Tic-Tac-Toe (React)

To-Do List (Vanilla JS)

This creates problems:

- weak demonstration of real-time algorithmic constraints,
- poor understanding of garbage collection in loops,
- superficial use of data structures,
- lack of deterministic logic,
- unengaging product delivery,
- and zero memory-management visibility.

**2.2 Vision**

Ashenbound provides a first-class execution environment for DSA.

An evaluator should be able to answer:

- How is memory managed when 50 projectiles spawn and die?
- How does the engine resolve simultaneous hitboxes?
- How is the world map validated for progression?
- How does the system efficiently reset world memory upon player death?
- What happens in the heap when a player dodges and gets hit on the exact same frame?

**2.3 Product Positioning**

Do not position Ashenbound as:

"A simple browser game for a lab grade."

Position it as:

**"A deterministic engine where every algorithmic choice directly impacts game feel, memory efficiency, and combat fairness."**

The central differentiators are:

1. memory management in a 60 FPS loop.
2. Combat arbitration via Min-Heap.
3. Node-based world progression.
4. Deterministic boss AI queues.
5. time checkpoint restoration.
6. Live DSA telemetry dashboard.
7. Zero-dependency Vanilla JS footprint.

**3\. Product Principles**

Ashenbound shall be designed around these principles.

**3.1 Deterministic Before Visual**

Frame data and hitboxes govern the game. Animations follow the logic, not the other way around.

**3.2 Security by Architecture**

Object pooling and strictly typed node removal prevent memory leaks and browser crashes.

**3.3 Zero Frameworks**

The engine must be written purely in ES6+ Javascript. No React, no PixiJS, no external physics engines.

**3.4 Data-Driven Logic**

Combat results are calculated via Priority Queues, not nested if/else hell based on sprite positions.

**3.5 Recoverability (Memento)**

Restoring a checkpoint must instantly reconstruct the exact node state without reloading the browser page.

**3.6 Auditability (Telemetry)**

The live telemetry overlay must expose exactly what the heap, stack, and linked lists are doing at any given millisecond.

**3.7 Graceful Degradation**

If an animation frame drops, the underlying fixed-timestep math must still calculate accurate damage and parry windows.

**3.8 Production First**

Even the hackathon/lab MVP should avoid monolithic game.js files that would make modular expansion impossible.

**4\. Product Scope**

**4.1 In Scope**

**Core Engine**

- HTML5 Canvas 2D Rendering
- Fixed-timestep loop (requestAnimationFrame)
- Delta-time normalization
- Asset Preloading
- AABB Collision Detection
- State Machine UI
- Memento Checkpoint System

**Data Structures**

- Doubly Linked Lists (Entity Manager)
- Min-Heap / Priority Queue (Combat Arbitration)
- LIFO Stack (Menu/Lore States)
- Directed Graph (World Map)
- Depth-First Search (Path Validation)
- Breadth-First Search (Enemy Pathfinding)
- FIFO Queue (Boss Combo Sequences)

**Combat & Mechanics**

- Parry windows
- i-frame dodging
- Boss phase transitions
- Dynamic Flask healing
- Stagger states

**Observability**

- Live DSA Telemetry Overlay
- FPS Monitor
- Memory allocation stats

**4.2 Out of Scope for Initial Release**

- WebGL rendering
- Multiplayer / Server synchronization
- Procedural generation
- Controller support (Gamepad API)
- Cloud saving

**5\. User Classes**

| **User**         | **Responsibilities / Needs**                                                            |
| ---------------- | --------------------------------------------------------------------------------------- |
| Player           | Navigate the world, learn combat mechanics, defeat bosses.                              |
| Lab Evaluator    | View source code, observe data structures in action via telemetry, evaluate efficiency. |
| System Developer | Expand engine capabilities, write unit tests for data structures, build new bosses.     |

**6\. Core Feature Model**

**6.1 The Entity Engine**

An entity is a node in the dynamic memory list.

Plaintext

Doubly Linked List

│

├── Node 1 (Player)

├── Node 2 (Enemy)

├── Node 3 (Projectile)

└── Node 4 (Particle)

**6.2 The Combat Priority**

A frame's events are sorted to prevent race conditions.

Plaintext

Min-Heap

├── P1: Parry Executions

├── P2: Dodge i-frames

├── P3: Magic Collision

└── P4: Physical Collision

**6.3 The World Graph**

A directed acyclic graph mapping regions and locks.

Plaintext

Shrine 2

/ \\

Shrine 1 Boss 1

│ │

Gate Gate

│ │

Forest Village

**6.4 The Memento Checkpoint**

Restore does not mutate memory; it deep-copies a saved state.

Plaintext

Live Memory -> Death -> Purge

Snapshot -> Deserialize -> Live Memory

**7\. Complete User Experience**

**7.1 Information Architecture**

Plaintext

Application

│

├── Main Menu

│

├── Gameplay State

│ ├── UI HUD (Health, Flasks)

│ ├── Game Canvas (Rendered World)

│ └── DSA Telemetry Overlay (Toggle: F1)

│

├── Lore Overlay State (Paused Engine)

│

└── Pause State (Settings)

**7.2 The Engine HUD**

The game interface must be clean but informative.

Plaintext

┌─────────────────────────────────────────────┐

│ 💖 \[████████████░░░\] 100/115 🧪 x 3 │

├─────────────────────────────────────────────┤

│ │

│ \[ BOSS \] │

│ │

│ │

│ \[PLAYER\] │

│ │

├─────────────────────────────────────────────┤

│ \[TELEMETRY\] │

│ DLL Size: 14 │

│ Heap Root: PARRY_WINDOW │

│ Target: MALACHAR (State: PHASE 2) │

└─────────────────────────────────────────────┘

**7.3 Required UI States**

- Asset Loading Screen
- Title Screen
- Active Gameplay
- Boss Intro / Lore Card
- Player Death (Fade to Shrine)
- Game Paused

**7.4 UX Rules**

- Transitions must not block the rendering loop abruptly.
- Input parsing must be buffered (no dropped inputs).
- Lore cards pause entity updates but allow canvas re-renders.
- Telemetry must be transparent and non-intrusive.

**8\. UI / UX Design System**

**8.1 Visual System**

- **Aesthetic:** Dark, corrupted, gothic.
- **Palette:** Deep blacks, ashen grays, blood reds, ethereal blues.
- **Post-Processing:** CSS-based CRT scanlines and subtle radial vignette.
- **Resolution:** Fixed logical resolution (e.g., 640x360) scaled up with image-rendering: pixelated.

**8.2 Core Components**

Plaintext

HealthBar (Canvas Fill)

Stamina/Stagger Bar

Floating Combat Text

Lore Modal (DOM Overlay)

Telemetry Box (DOM Absolute Position)

Retro Pixel Font

**8.3 Screen Adaptation**

- The canvas element uses object-fit to maintain a 16:9 aspect ratio regardless of window size.

**9\. Game State & Save System**

**9.1 Storage Features**

- LocalStorage serialization
- Current Graph Node ID
- Max HP / Flask Upgrades unlocked
- Defeated Boss Array

**9.2 Memory Security**

- Save strings must be base64 encoded.
- State loading must perform bounds checking (e.g., HP cannot exceed Max HP config).
- Checkpoints only occur at Ashen Shrines.

**10\. Combat Arbitration (Authorization)**

Input listeners answer:

What button was pressed?

The Combat Queue answers:

Did it actually register based on frame data?

**10.1 Arbitration Flow**

Plaintext

Key Press

↓

Buffer Input (3 frames)

↓

Entity State Check (Is Staggered? Is Attacking?)

↓

Push to Priority Queue

↓

Evaluate Hitbox Intersection

↓

Pop Priority Queue & Apply Damage/Parry

**10.2 Strict Arbitration**

Prevent:

- Taking damage while rolling.
- Spamming parry without recovery frames.
- Moving during heavy attack startups.

**11\. High-Level Architecture**

Plaintext

BROWSER

│

Input Listeners

│

┌──────────┴──────────┐

│ │

UI State Stack Priority Queue (Heap)

│ │

┌──────┼─────────────────────┼──────┐

│ │ │ │

▼ ▼ ▼ ▼

Linked List 2D Array Graph FIFO

(Entities) (Hitboxes) (World) (AI)

│ │ │ │

└──────┼─────────────────────┼──────┘

▼ ▼

Update() Draw()

│ │

└──────────┬──────────┘

▼

HTML5 &lt;canvas&gt;

**12\. Recommended Technology Stack**

| **Layer**      | **Technology**                      |
| -------------- | ----------------------------------- |
| Core Engine    | Vanilla ES6+ Javascript             |
| Rendering      | HTML5 &lt;canvas&gt; 2D API         |
| Styling        | CSS3 (Grid/Flexbox for UI overlays) |
| Bundler        | Vite                                |
| Math           | Native JS Math & Custom Geometry    |
| Physics        | Custom AABB Engine                  |
| Sound          | Web Audio API / HTML5 Audio         |
| Source Control | Git / GitHub                        |
| Deployment     | GitHub Pages                        |
| Testing        | Vitest (for strict DSA logic)       |

**13\. Why Vanilla Javascript?**

Using React or Phaser would hide the exact mechanisms the lab is grading.

- **React** abstracts the DOM and rendering loops.
- **Phaser** abstracts memory management and collision.

Vanilla JS forces the implementation of raw pointers (node.next, node.prev), raw arrays, and manual memory management logic, which is the entire point of the project.

**14\. Repository Architecture**

Plaintext

ashenbound/

│

├── public/

│ ├── sprites/

│ └── audio/

│

├── src/

│ ├── core/

│ │ ├── Engine.js

│ │ ├── Renderer.js

│ │ └── Input.js

│ │

│ ├── dsa/

│ │ ├── LinkedList.js

│ │ ├── PriorityQueue.js

│ │ ├── Graph.js

│ │ ├── Memento.js

│ │ └── StateStack.js

│ │

│ ├── entities/

│ │ ├── Player.js

│ │ ├── Boss.js

│ │ └── Projectile.js

│ │

│ ├── ui/

│ │ └── DebugOverlay.js

│ │

│ ├── main.js

│ └── config.js

│

├── index.html

├── style.css

├── package.json

└── vite.config.js

**15\. Engine Architecture**

Use clear phase boundaries.

Plaintext

Loop iteration

↓

Input Phase (Gather events)

↓

Logic Phase (Update Entities via DLL)

↓

Collision Phase (AABB + Priority Queue)

↓

Resolution Phase (Apply damage/death)

↓

Render Phase (Clear & Draw to Canvas)

Business logic (damage calculation) must never occur inside the draw() methods.

**16\. Data Structure Engine**

**16.1 Doubly Linked List (DLL)**

JavaScript

class EntityNode {

data;

next;

prev;

}

_Purpose:_ Holds living entities. Allows O(1) removal of dead projectiles.

**16.2 Priority Queue (Binary Heap)**

JavaScript

class MinHeap {

heapArray;

enqueue();

dequeue();

}

_Purpose:_ Sorts frame actions. Parry (Priority 1) beats Damage (Priority 3).

**16.3 LIFO Stack**

JavaScript

class StateStack {

stackArray;

pushState();

popState();

}

_Purpose:_ Handles Game Pausing and UI layering.

**16.4 Directed Acyclic Graph (DAG)**

JavaScript

class MapGraph {

adjacencyList; // Map&lt;NodeId, Edge\[\]&gt;

}

_Purpose:_ Maps the world structure and validates if keys unlock paths.

**16.5 FIFO Queue**

JavaScript

class AttackQueue {

queueArray;

enqueueCombo();

nextAttack();

}

_Purpose:_ Caches boss multi-hit sequences.

**17\. Engine Rules**

- Use requestAnimationFrame for loops.
- Calculate deltaTime to ensure movement speed is independent of framerate.
- Never use Array.prototype.splice() inside the main loop for dynamic entities.
- Garbage collection spikes cause stutter; use object pooling if projectile density is high.
- Logic updates must execute even if the canvas is hidden (tab inactive).

**18\. Asset Architecture**

**18.1 Principle**

Images and audio load asynchronously before the engine begins.

Plaintext

Boot

│

├── Load player.png

├── Load boss.png

├── Load hit.wav

└── Wait for Promise.all()

Start Engine

**18.2 Asset Caching**

Assets are stored in a simple Hash Map ( lookup):

JavaScript

const AssetCache = new Map();

AssetCache.set('player_idle', imgElement);

**19\. Combat Pipeline**

Never blindly trust input order.

Pipeline:

Plaintext

Player Hits Attack

↓

State = ATTACK_STARTUP

↓

Animation Frames Advance

↓

Active Frame Reached

↓

Generate Hitbox Event

↓

Push to Priority Queue

↓

Evaluate Intersection

↓

Apply Damage

**20\. Hitbox Engine**

The AABB Engine checks overlap.

JavaScript

function checkCollision(rect1, rect2) {

return (

rect1.x < rect2.x + rect2.width &&

rect1.x + rect1.width > rect2.x &&

rect1.y < rect2.y + rect2.height &&

rect1.height + rect1.y > rect2.y

);

}

This math executes on every node in the DLL that possesses a physical body.

**21\. Frame Data & Timing**

Animations are driven by elapsed time, not loop iterations.

Plaintext

Frame 1-4: Startup (Vulnerable)

Frame 5-8: Active (Deals Damage)

Frame 9-15: Recovery (Vulnerable)

Parries are successful if an enemy's _Active_ frame intersects with the player's _Parry Active_ frame.

**22\. World Graph**

Linear, locked progression.

Plaintext

Node: Forsaken Woods

Edges: -> Stonesmith Village (Requires: Woods Key)

On engine boot, DFS runs from Start Node to Final Boss Node. If path == false, the console logs a map structural error.

**23\. Memento Checkpoint Semantics**

Never mutate base room arrays.

Plaintext

Rest at Shrine -> Save Memento (Deep copy of player stats & Room ID)

Die -> Purge DLL -> Load Memento -> Re-instantiate Boss/Enemies.

This prevents duplicate enemy spawning and memory bloat.

**24\. Game Loop Pipeline**

Plaintext

requestAnimationFrame(timestamp)

↓

dt = timestamp - lastTime

↓

Input.update()

↓

StateStack.peek().update(dt)

↓

ctx.clearRect()

↓

StateStack.peek().draw(ctx)

Only the state at the top of the LIFO stack receives update/draw calls.

**25\. Queue Architecture (Combat Arbitration)**

Plaintext

Input Frame

│

├── Player Spacebar (Dodge, Priority 2)

│

└── Boss Sword Hit (Damage, Priority 3)

│

▼

Min-Heap

│

▼

Dodge processed first.

Player gets i-frames.

│

Damage processed second.

Target has i-frames -> Ignore Damage.

**26\. Boss AI State Machine**

A boss can only be in one state.

JavaScript

const BOSS_STATES = {

IDLE: 0,

CHASE: 1,

TELEGRAPH: 2,

ATTACKING: 3,

STAGGERED: 4

};

Transitions are strictly controlled by distance math (BFS) and HP thresholds.

**27\. FIFO Combo Engine**

Boss sequences:

Plaintext

Queue -> \[Slash, Backstep, Heavy Slam\]

If the player parries the Slash:

JavaScript

fifoQueue.clear();

boss.state = STAGGERED;

**28\. Action Resolution Model**

Hit calculations generate structured data:

JSON

{

"source": "Boss1",

"target": "Player",

"damage": 35,

"type": "Physical",

"wasParried": true,

"staggerApplied": 1.5

}

This ensures predictable physics responses.

**29\. Telemetry Architecture**

**29.1 Principle**

The evaluator must see the algorithm, not just the graphics.

Plaintext

Engine Internals

↓

DebugOverlay.js

↓

DOM innerText update

**29.2 Must Not**

- The telemetry overlay must not block the main thread.
- String concatenation for logs should be minimized to prevent garbage collection spikes.

**30\. Combat Cheat Defense**

Player variables are isolated in closured classes.

Plaintext

Player.hp = 9999; // Should not be possible from window scope.

Expose only explicit APIs for manipulation.

**31\. Telemetry Output Isolation**

Use a fixed DOM element updating text content rather than console.log() inside a 60FPS loop, which destroys browser memory.

**32\. Engine Output Validation**

If priority queue processes damage but health remains unchanged (due to logic error), the engine catches state mismatches via a checksum equivalent (Expected HP vs Actual HP).

**33\. Asset Pathing Architecture**

Use relative paths optimized for GitHub pages:

./public/sprites/boss.png

Not absolute:

/public/sprites/boss.png (Fails on username.github.io/repo/)

**34\. API Architecture (Internal)**

The engine exposes methods for the state machine:

JavaScript

Engine.start();

Engine.pause();

Engine.resume();

Engine.loadMap(nodeId);

Internal Event triggers:

JavaScript

EventBus.emit('BOSS_DEFEATED', bossId);

EventBus.emit('PLAYER_HEAL', amount);

**35\. Object Standards**

Every entity must define:

- update(dt)
- draw(ctx)
- getHitbox()
- onDeath()

**36\. Math Semantics**

Use integer rounding where possible for canvas coordinates to prevent sub-pixel rendering blur.

JavaScript

x = Math.round(position.x);

**37\. Input Buffer Limiting**

Apply strict limits to input registration to prevent queue flooding.

- Cooldown on dodge: 0.5s.
- Parry recovery frames: 0.2s.

**38\. Real-Time Processing (Physics)**

For collision resolution, use continuous swept AABB or discrete overlap rejection.

Plaintext

Detect Overlap

↓

Calculate Penetration Vector

↓

Push Player out of Wall

**39\. Application Security (State Protection)**

Defend against:

- Modifying local storage values to get infinite HP.
- Injecting script via DevTools.

While client-side games are inherently hackable, state validation checks upon loading the save file demonstrate engineering rigor.

**40\. Safe-Fail Execution**

If an audio file fails to load, catch the promise rejection and proceed silently. A missing .wav file must not break the linked list rendering logic.

**41\. Browser Execution Security**

- No eval().
- No innerHTML rendering of raw strings (use textContent for Lore overlays).
- Strict Mode enabled ("use strict";).

**42\. Configuration Management**

Store balancing numbers in one place:

JavaScript

export const CONFIG = {

PLAYER_MAX_HP: 100,

PARRY_WINDOW_MS: 150,

GRAVITY: 9.8,

CANVAS_WIDTH: 800,

CANVAS_HEIGHT: 450

};

**43\. Code Execution Environment**

The game must run purely in the browser. No Node.js runtime required for the final build.

**44\. Memory Isolation**

JavaScript

// Entities are purged when map changes.

entityManager.clear();

Dangling references to enemy objects must be nulled so the browser's Garbage Collector reclaims the memory.

**45\. Audit & Telemetry System**

Track events via console (only on major state changes):

- Level Loaded
- Boss Aggro
- Player Death
- Checkpoint Saved

Example log:

JSON

{

"event": "STATE_PUSH",

"stack_depth": 2,

"target": "PAUSE_MENU",

"timestamp": 169812345

}

**46\. Debugging Observability**

The game should include URL parameter flags for the evaluator:

?debug=true -> Enables Hitbox outlines.

?fps=true -> Enables Frame Counter.

?godmode=true -> For testing final boss mechanics quickly.

**47\. Audio Notifications**

Audio processing should be asynchronous.

- Parry success (high pitch _ting_).
- Dodge success (wind _whoosh_).
- Boss stagger (deep bass _boom_).

**48\. Performance Observability**

Track:

- FPS (Target: 60)
- Delta Time variations
- DLL Node Count
- Draw Calls per frame

Use performance.now() for precise millisecond tracking.

**49\. Engine Reliability**

Use:

- Fixed timesteps for physics to prevent clipping through walls on low framerates.
- Bounding box constraints (cannot walk off the canvas bounds).

**50\. Health Checks**

Check document.hidden.

If the user switches tabs, requestAnimationFrame pauses automatically, but delta time will explode when they return.

Clamp dt:

JavaScript

if (dt > 100) dt = 16; // Prevent massive physics jumps

**51\. Development Environment**

Local startup:

Bash

npm create vite@latest ashenbound -- --template vanilla

npm install

npm run dev

Expected local infrastructure:

- Vite Dev Server (Hot Module Replacement)
- Browser

**52\. Environment Variables**

Store deployment context (not critical for static games, but good practice):

Plaintext

VITE_BUILD_MODE=production

**53\. Asset Pipeline**

Images should be optimized .png files.

Audio should be compressed .ogg or .mp3.

**54\. CI/CD Pipeline**

**Continuous Integration**

Plaintext

Push to main

↓

GitHub Actions Workflow

↓

Install dependencies

↓

Vite Build

↓

Deploy to gh-pages branch

**Continuous Deployment**

GitHub Pages automatically hosts the static /dist/ folder.

**55\. Git Workflow**

For solo developer:

Plaintext

main

│

├── feature/player-movement

├── feature/priority-queue

└── feature/boss-ai

Merge via Pull Request to maintain an academic commit history.

**56\. Code Quality**

Recommended:

- Prettier formatting
- ESLint
- JSDoc comments for data structures to explain Big-O complexities to the evaluator.

**57\. Testing Strategy**

Testing layers:

Plaintext

Unit (Vitest)

↓

Integration (Manual Canvas testing)

↓

Performance Profiling (Chrome DevTools)

**Critical Unit Tests**

- LinkedList.insert() and remove()
- PriorityQueue.enqueue() and dequeue()
- Graph.dfs() validation

**58\. Logic Testing**

Test:

- Priority queue arbitration (ensure P1 overrides P3).
- Health clamping (Flask cannot heal over Max HP).
- Map reachability.

**59\. Performance Profiling**

Measure:

- Garbage collection sweeps in Chrome Performance tab.
- Render time (must be < 16.6ms per frame).
- Heap snapshot size.

**60\. Availability Targets**

The game must boot instantly from GitHub Pages globally via CDN.

**61\. State Recovery Strategy**

If the local storage save string becomes corrupted, reset to the initial Start Node with a fresh profile automatically to prevent black-screen soft-locks.

**62\. Data Lifecycle**

Plaintext

Boot -> Load Save

↓

Play -> RAM (DLL / Heap)

↓

Rest at Shrine -> Save Memento

↓

Quit -> Serialize to LocalStorage

**63\. Asset Cost Management**

Since hosting is GitHub Pages (Free), ensure the repository size stays well under 1GB by compressing audio and sprites.

**64\. Scalability (Engine)**

**Entities**

The DLL handles 100+ entities without frame drops.

**Rendering**

Only draw entities that are within the Canvas AABB (Frustum Culling).

**State**

The Stack can push infinitely deep (Menu -> Settings -> Lore -> Inventory), though usually clamped to 3-4 layers.

**65\. Map Scaling**

If adding more areas, simply inject new Nodes and Edges into the WorldGraph configuration file. The DFS algorithm scales automatically.

**66\. Infrastructure as Code**

No Terraform needed. A simple .github/workflows/deploy.yml manages the entire deployment infrastructure.

**67\. Deployment Environments**

**Development**

localhost:5173 via Vite.

**Production**

username.github.io/ashenbound

**68\. Production Asset Principles**

- Vite bundles all modules into a single minified JS file.
- Assets are fingerprinted (e.g., boss-7a8f.png) for cache-busting.

**69\. Gameplay Scenario — Parrying**

Plaintext

Frame 1: Boss raises sword (Telegraph).

Frame 40: Boss strikes (Active physical hitbox).

Frame 40: Player presses RMB (Parry Input).

Frame 41: Priority Queue evaluates -> Parry Window valid.

Frame 42: Boss attack nullified, State -> STAGGERED.

The telemetry shows the exact queue arbitration.

**70\. Gameplay Scenario — I-Frame Dodge**

Plaintext

Frame 1: Boss fires magic orb.

Frame 15: Orb intersects Player.

Frame 15: Player pressed SPACE (Dodge) on Frame 12.

Frame 16: Min-Heap parses. Dodge > Collision.

Frame 17: Damage ignored.

**71\. Gameplay Scenario — Checkpoint Restore**

Plaintext

Player dies at Malachar.

↓

Engine clears Entity Linked List.

↓

State loaded from Memento (Fallen Palace Shrine).

↓

Player X/Y resets.

↓

Entities re-instantiated.

complexity.

**72\. Gameplay Scenario — Map Validation**

Plaintext

Engine boots.

↓

Builds Graph (Nodes: A, B, C. Locks: Key 1).

↓

DFS executed.

↓

Validates Node C is reachable.

**73\. Gameplay Scenario — UI Stack**

Plaintext

Playing Game (Stack = \[Gameplay\])

↓

Finds Key (Stack = \[Gameplay, LoreModal\])

↓

Presses ESC (Stack = \[Gameplay, LoreModal, PauseMenu\])

Game loop calls peek().draw(). Only the Pause Menu renders over the cached canvas image.

**74\. End-to-End Workflow**

Plaintext

User opens URL

↓

Graph validated, Assets loaded

↓

Menu pushed to Stack

↓

Game started, Entities pushed to DLL

↓

Combat processed via Heap

↓

Boss defeated -> Flask logic executes

↓

Shrine Rest -> Memento serialized

**75\. Development Phases**

**Phase 0 — Planning**

- Define requirements, hitboxes, map graph.

**Phase 1 — Foundation**

- Game Loop, Delta Time, Canvas clearing.

**Phase 2 — DSA Integration**

- Linked List implementation.
- Min-Heap implementation.
- Entity spawning and culling.

**Phase 3 — Combat Arbitration**

- Hitboxes, Parries, Priority parsing.

**Phase 4 — Boss AI**

- State machine & FIFO combos.

**Phase 5 — Progression**

- Map Graph, DFS, Memento Checkpoints.

**Phase 6 — UI / UX**

- Stack states, Lore Modals, HUD.

**Phase 7 — Telemetry & Debug**

- Live overlay for evaluator.

**Phase 8 — Audio & Polish**

- Sound effects, scanlines, screenshake.

**Phase 9 — Production Readiness**

- Vite build testing.

**Phase 10 — Deployment**

- GitHub Actions execution.

**76\. Lab Evaluation MVP**

The lab demo must implement a vertical slice.

**P0**

- DLL memory management
- Min-Heap combat
- 1 Boss fight
- Telemetry Overlay

**P1**

- State Stack UI
- Memento Checkpoints

**P2**

- Directed Graph Map

**77\. Evaluation Demo Script**

**Step 1**

Open browser, press F1 to open Telemetry.

**Step 2**

Show the Graph DFS validation output in the console.

**Step 3**

Walk into boss arena, let boss spawn projectiles. Show the DLL size increasing and decreasing smoothly without array shifting.

**Step 4**

Perform a parry. Pause and show how the Priority Queue resolved the simultaneous hitboxes.

**Step 5**

Die on purpose. Show the Memento system instantly restoring state without a page refresh.

**78\. Project Documentation**

Repository should contain:

Plaintext

README.md (Game instructions)

DSA_REPORT.md (Detailed explanation of Big-O complexities)

ARCHITECTURE.md

**79\. Architecture Decision Records**

Example ADRs:

Plaintext

ADR-001 — HTML5 Canvas over DOM elements for rendering.

ADR-002 — Linked Lists over Arrays for entity management.

ADR-003 — Min-Heap for combat arbitration.

ADR-004 — Fixed timestep delta-time physics.

**80\. Governance**

Code ownership: Individual project.

Standards: Strict ES6 classes, minimal global variables.

**81\. Versioning**

Use standard semantic versioning:

1.0.0 -> Release candidate.

**82\. Bug Handling**

Since it's a fixed execution timeline, bugs are usually frame-data errors. Isolate via the telemetry overlay, pause the game loop (cancelAnimationFrame), and step manually through the arrays.

**83\. Cost Management**

Hosting is free via GitHub Pages. Zero backend database costs.

**84\. Future Portfolio Features**

Potential extensions:

- WebGL shader injection.
- Procedural Graph generation.
- A\* Pathfinding for complex mazes.

**85\. Conventional Engineering Standards**

- Modular ES6 imports.
- JSDoc type hinting.
- RequestAnimationFrame isolation.
- O(1) constraints on active loops.

**86\. Definition of Done**

A feature is complete when:

Plaintext

\[ \] Logic is decoupled from Rendering

\[ \] Operates at O(1) or O(log N) inside the main loop

\[ \] Telemetry confirms memory behavior

\[ \] Does not drop frame rate below 60fps

**87\. Production Readiness Checklist**

Plaintext

\[ \] Vite build succeeds

\[ \] Paths resolve on GitHub Pages

\[ \] Canvas scales correctly on laptops

\[ \] No memory leaks on checkpoint reloads

\[ \] Hitboxes align precisely with sprites

**88\. Project Maturity Model**

**Level 1 — Math Engine**

Boxes colliding on a blank canvas.

**Level 2 — DSA Integration**

Priority queues resolving collisions. Memory managed by lists.

**Level 3 — Visual Polish**

Sprites, Audio, CRT effects overlaying the math engine.

**89\. What Not to Build Too Early**

Avoid spending the first phase on:

- Beautiful sprites.
- Complex soundscapes.
- Menus.

**Start with squares. If the squares play like Dark Souls mathematically, the game is a success.**

**90\. Recommended Build Order**

Plaintext

1\. Engine Loop & Canvas

2\. Entity Linked List

3\. Input Buffer & Movement

4\. Hitbox AABB Math

5\. Priority Queue Combat Logic

6\. Boss State Machine

7\. Graph / DFS Checkpoints

8\. State Stack (UI)

9\. Telemetry Integration

10\. Sprites & Visuals

**91\. Final Architecture**

Plaintext

PLAYER INPUT

│

▼

PRIORITY BUFFER

│

▼

ENTITY LOGIC

│

┌─────────┴─────────┐

▼ ▼

COLLISION MATH BOSS AI QUEUE

│ │

▼ ▼

DAMAGE / STAGGER RESOLUTION

│

▼

UPDATE LINKED LIST (Purge Dead)

│

▼

CANVAS DRAW

**92\. Core Product Philosophy**

Ashenbound preserves this hierarchy:

Plaintext

TRUST

│

┌────────┴────────┐

│ │

DATA STRUCTURES MATH

│ │

▼ ▼

DETERMINISTIC COMBAT

│

▼

GAME PLAY EXPERIENCE

│

▼

VISUAL RENDERING

The graphics are not the foundation.

The algorithms are.

**93\. Final Product Definition**

Ashenbound is a deterministic, DSA-driven game engine that:

1. Implements raw computer science concepts into active game loops.
2. Manages memory efficiently via linked structures.
3. Arbitrates combat fairness via min-heaps.
4. Explores world traversal via graph theory.
5. Achieves high-performance state resets.
6. Proves technical competency to lab evaluators.
7. Deploys cleanly to static web hosting.

The strongest product statement remains:

**Data structures are not theoretical; in Ashenbound, they are the difference between life and death.**

**Ashenbound — Complete Engineering & Game Plan Blueprint**

**Product:** Ashenbound

**Tagline:** Data Structures for the Living Death

**Document:** Master Engineering, Architecture, DSA Integration, UX, Development, Deployment, & Game Plan Blueprint

**Version:** 2.0

**Status:** Engineering & Design Baseline

**PART I: COMPLETE ENGINEERING BLUEPRINT**

**1\. Executive Summary**

Ashenbound is a highly deterministic, version-controlled 2D action game engine built around one core idea:

**Data structures are not theoretical concepts; they are the operational foundation of high-performance rendering, combat arbitration, and world logic.**

The product is not intended to be a generic browser platformer. Rendering and sprites are supporting capabilities. The primary product is a **Data Structures and Algorithms (DSA) demonstration engine** wrapped in an atmospheric Souls-like experience.

Ashenbound strictly manages memory using linked lists, resolves frame-perfect combat via priority queues, structures its world as a directed acyclic graph, caches AI sequences in FIFO queues, and restores checkpoints using the Memento pattern.

**2\. Product Vision**

**2.1 Problem**

Computer Science students often build lab projects that are primarily optimized for simple grading. This creates problems: weak demonstration of real-time algorithmic constraints, poor understanding of garbage collection in loops, superficial use of data structures, and zero memory-management visibility.

**2.2 Vision**

Ashenbound provides a first-class execution environment for DSA. An evaluator should be able to answer:

- How is memory managed when 50 projectiles spawn and die?
- How does the engine resolve simultaneous hitboxes?
- How is the world map validated for progression?
- How does the system efficiently reset world memory upon player death?

**2.3 Product Positioning**

Do not position Ashenbound as a simple browser game for a lab grade. Position it as a deterministic engine where every algorithmic choice directly impacts game feel, memory efficiency, and combat fairness.

**3\. Product Principles**

**3.1 Deterministic Before Visual**

Frame data and hitboxes govern the game. Animations follow the logic, not the other way around.

**3.2 Security by Architecture**

Object pooling and strictly typed node removal prevent memory leaks and browser crashes.

**3.3 Zero Frameworks**

The engine must be written purely in ES6+ Javascript. No React, no PixiJS, no external physics engines.

**3.4 Data-Driven Logic**

Combat results are calculated via Priority Queues, not nested if/else hell based on sprite positions.

**3.5 Recoverability (Memento)**

Restoring a checkpoint must instantly reconstruct the exact node state without reloading the browser page.

**3.6 Auditability (Telemetry)**

The live telemetry overlay must expose exactly what the heap, stack, and linked lists are doing at any given millisecond.

**4\. Product Scope**

**4.1 In Scope**

- **Core Engine:** HTML5 Canvas 2D Rendering, Fixed-timestep loop, Asset Preloading, AABB Collision Detection, State Machine UI.
- **Data Structures:** Doubly Linked Lists (Entity Manager), Min-Heap (Combat Arbitration), LIFO Stack (Menu/Lore), Directed Graph (World Map), DFS (Path Validation), BFS (Enemy Pathfinding), FIFO Queue (Boss Combos).
- **Combat:** Parry windows, i-frame dodging, Boss phase transitions, Dynamic Flask healing.

**4.2 Out of Scope**

WebGL rendering, Multiplayer, Procedural generation, Controller support, Cloud saving.

**5\. User Classes**

| **User**          | **Responsibilities / Needs**                                                               |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Player**        | Navigate the world, learn combat mechanics, defeat bosses.                                 |
| **Lab Evaluator** | View source code, observe data structures in action via telemetry, evaluate vs efficiency. |
| **Developer**     | Expand engine capabilities, write unit tests for data structures, build new bosses.        |

**6\. Core Feature Model**

**6.1 The Entity Engine**

An entity is a node in the dynamic memory list.

Plaintext

Doubly Linked List

│

├── Node 1 (Player)

├── Node 2 (Enemy)

└── Node 3 (Projectile)

**6.2 The Combat Priority**

A frame's events are sorted to prevent race conditions.

Plaintext

Min-Heap

├── P1: Parry Executions

├── P2: Dodge i-frames

└── P3: Hitbox Damage

**6.3 The World Graph**

A directed acyclic graph mapping regions and locks.

Plaintext

Shrine 1 (Memento)

│

Gate (Edge)

│

Boss 1 (Node)

**7\. Complete User Experience**

**7.1 Information Architecture**

Plaintext

Application

│

├── Main Menu

├── Gameplay State (Canvas + HUD)

├── Lore Overlay State (LIFO Stack Pause)

└── Pause State

**7.2 The Engine HUD**

Plaintext

┌─────────────────────────────────────────────┐

│ 💖 \[████████████░░░\] 100/115 🧪 x 3 │

├─────────────────────────────────────────────┤

│ \[ BOSS \] │

│ \[PLAYER\] │

├─────────────────────────────────────────────┤

│ \[TELEMETRY\] │

│ DLL Size: 14 | Heap Root: PARRY_WINDOW │

└─────────────────────────────────────────────┘

**8\. High-Level Architecture**

Plaintext

BROWSER

│

Input Listeners

│

┌──────────┴──────────┐

│ │

UI State Stack Priority Queue (Heap)

│ │

┌──────┼─────────────────────┼──────┐

│ │ │ │

▼ ▼ ▼ ▼

Linked List 2D Array Graph FIFO

(Entities) (Hitboxes) (World) (AI)

│ │ │ │

└──────┼─────────────────────┼──────┘

▼ ▼

Update() Draw()

│ │

└──────────┬──────────┘

▼

HTML5 &lt;canvas&gt;

**9\. Data Structure Engine Specification**

**9.1 Doubly Linked List (DLL)**

Holds living entities. Allows removal of dead projectiles during the 60 FPS loop, preventing Array .splice() garbage collection memory leaks.

**9.2 Priority Queue (Binary Heap)**

Sorts frame actions. A Parry (Priority 1) will always execute before Hitbox Damage (Priority 3) if they occur on the exact same frame.

**9.3 LIFO Stack**

Manages UI state. Pushing a Lore Card pauses the underlying gameplay loop without purging the DLL memory.

**9.4 Directed Acyclic Graph (DAG) & DFS**

Maps the world structure. A Depth-First Search algorithm runs on boot to validate that all required keys mathematically connect the starting node to the final boss node.

**9.5 FIFO Queue**

Caches boss multi-hit sequences (e.g., Slash -> Backstep -> Heavy Slam). Parrying the first hit clears the queue and pushes a stagger state.

**9.6 Memento Checkpoint System**

When resting at an Ashen Shrine, a deep-copy snapshot of the graph node's default state is saved. Upon player death, the DLL is purged, and the snapshot is injected back into memory ( complexity) without a page reload.

**10\. Combat Pipeline & Arbitration**

Plaintext

Player Hits Attack

↓

State = ATTACK_STARTUP

↓

Generate Hitbox Event

↓

Push to Priority Queue

↓

Evaluate Hitbox Intersection

↓

Apply Damage / Trigger Stagger

Never blindly trust input order. If a player dodges and gets hit simultaneously, the Min-Heap extracts the Dodge () first, applies i-frames, and causes the Damage () check to fail safely.

**11\. Testing & Performance Strategy**

- **Unit Testing (Vitest):** Validate LinkedList.insert(), PriorityQueue.enqueue(), and Graph.dfs().
- **Engine Reliability:** Use fixed timesteps for physics to prevent clipping through walls on low framerates.
- **Performance Observability:** Track FPS, Delta Time variations, DLL Node Count, and Draw Calls per frame natively in the Telemetry DOM overlay.

**🎮 PART II: ASHENBOUND GAME PLAN**

**1\. THE PROTAGONIST — THE LIVING DEATH**

The player controls **The Living Death**, an unyielding force walking among fallen conquerors.

- **Starting Max HP:** 100 / 100
- **Starting Healing Flasks:** 1
- **Streamlined Mechanics:**
  - No Stamina Bar
  - No Currency / Souls dropping
  - No Character Leveling or Skill Trees
  - No Weapon Upgrades

**2\. CONTROLS & COMBAT MECHANICS**

**Input Mapping**

| **Key / Input**        | **Action / Function** | **Notes**                                           |
| ---------------------- | --------------------- | --------------------------------------------------- |
| **W / A / S / D**      | Movement              | Horizontal & Platform Navigation                    |
| **Left Mouse Click**   | Light Attack          | Fast execution, standard damage                     |
| **Shift + Left Click** | Heavy Attack          | Slow execution, high damage                         |
| **Right Mouse Click**  | Parry                 | Defensive physical counter                          |
| **Shift**              | Jump                  | Avoid low/ground/magic attacks                      |
| **Space**              | Dodge / Roll          | Invincibility frames (i-frames)                     |
| **R**                  | Heal                  | Consume Flask (Conditional Rule)                    |
| **E**                  | Interact              | Pick up key / Dismiss lore overlay / Rest at Shrine |
| **ESC**                | Pause Menu            | Push/Pop UI Stack State                             |

**Defensive & Stagger Mechanics**

1. 🛡️ **Parry (Right Mouse Click):** Counters physical melee attacks only. A successful parry places the enemy into a **Stagger State (1.5s – 2.0s)**, granting a guaranteed opening for a Heavy Attack with a **+50% bonus critical multiplier**.
2. 🌀 **Dodge / Roll (Space):** Counters unparryable heavy strikes and projectiles by providing complete invincibility frames (i-frames).
3. ⬆️ **Jump (Shift):** Evades horizontal sweep hitboxes and ground shockwaves.

**3\. ASHEN SHRINES & FLASK SYSTEM**

**The Checkpoint System**

Scattered throughout the Directed Acyclic Graph are **Ashen Shrines**. Resting at a shrine updates the currentRespawnNode pointer in the World Graph, restores Player HP and Flasks, purges the current EntityLinkedList of enemies, and deserializes the Memento snapshot to respawn standard enemies at default coordinates. Death snaps the player instantly back to this node pointer.

**Healing Flask Progression**

- **Initial Inventory:** 1 Healing Flask.
- **Boss Defeat Reward:** +1 Max Flask slot after every boss kill.

**Flask Dynamic Restoration Rules**

- **Tier 1 (100 Max HP Base):**
  - HP 30 Restores +70 HP (e.g., 20 HP 90 HP).
  - HP 30 Restores directly to 100 Max HP.
- **Tier 2 (115 Max HP Post-Rykard):**
  - HP 60 Restores +65 HP.
  - HP 60 Restores directly to 115 Max HP.

Health restored can never exceed the player's current Maximum HP.

**4\. WEAPON SYSTEM**

At the start of the journey, the player selects **one primary weapon archetype**. Weapon switching is locked until the Forest Warden is vanquished.

- **Sword:** Balanced speed & frame data. Standard parry timing.
- **Spear:** Extended thrust reach. Ideal for keeping distance.
- **Axe:** High baseline damage. Slower heavy attack startup.
- **Scythe:** Wide sweeping hitboxes. Higher critical damage on staggered targets.
- **Bow & Arrow:** Ranged projectile capabilities. Consumes physical draw time.

**5\. WORLD STRUCTURE & AREA FLOW**

The game world is linear and unidirectional (Directed Acyclic Graph). Progression locks behind key acquisition in each sector.

Plaintext

\[ START \]

│

▼

\[ ASHEN SHRINE 1 \] ──► 🌲 FORSAKEN WOODS ──────────► \[Key\] ──► Boss: FOREST WARDEN

│

▼

\[ ASHEN SHRINE 2 \] ──► 🏘️ STONESMITH VILLAGE ──────► \[Key\] ──► Boss: IRON SENTINEL

│

▼

\[ ASHEN SHRINE 3 \] ──► 🏰 RUINS OF GRANDEUR ───────► \[Key\] ──► Boss: RYKARD

│

▼

\[ ASHEN SHRINE 4 \] ──► 👑 FALLEN PALACE ───────────► \[Key\] ──► Boss: MALACHAR

**6\. AREA LORE OVERLAY ENGINE**

Upon crossing threshold triggers into new regions, game mechanics suspend to render lore cards.

Plaintext

\[ ENTER REGION TRIGGER \] ──► \[ BLACK SCREEN FADE \] ──► \[ RENDER LORE TEXT \] ──► \[ AWAIT INPUT: 'E' \] ──► Resume Gameplay

**7\. AREA 1 — FORSAKEN WOODS & FOREST WARDEN**

A dark, corrupted wood choked with ancient ruins and tangled earth roots.

- **Boss:** Forest Warden (250 HP)
- **Archetype:** Earth Mage / Area Control
- **Attacks:** Earth Projectile (18 Dmg, Magic), Earth Spike (22 Dmg, Ground), Earth Wave (25 Dmg, Ground), Falling Rock (28 Dmg, Physical), Staff Strike (15 Dmg, Physical).
- **Rewards:** Weapon Switching Unlocked + 1 Healing Flask Slot (Total: 2 Flasks).

**8\. AREA 2 — STONESMITH VILLAGE & IRON SENTINEL**

A ruined settlement of collapsed stone forges and cold anvil works.

- **Boss:** The Iron Sentinel (300 HP)
- **Archetype:** Heavy Armored Knight (Sword & Shield)
- **Attacks:** Sword Slash (20 Dmg), Heavy Overhead Strike (32 Dmg), Shield Bash (24 Dmg), Shield Charge (28 Dmg), Sword Combo (18/18/25 Dmg), Guard Break Counter (35 Dmg).
- **Rewards:** Permanent Armor Upgrade (-15% incoming damage intake) + 1 Healing Flask Slot (Total: 3 Flasks).

**9\. AREA 3 — RUINS OF GRANDEUR & RYKARD**

Decaying grand halls, towering marble monuments, and royal courtyards.

- **Boss:** Rykard the Blasphemous (400 HP)
- **Archetype:** Dual-Wielder (Fire Sword & Ice Sword) / Magic Hybrid
- **Attacks:** Fire Sword Slash (25 Dmg), Ice Sword Slash (24 Dmg), Dual Sword Combo (20/20/28 Dmg), Fire Wave (27 Dmg), Ice Projectile (22 Dmg), Magic Blast (20 Dmg).
- **Rewards:** +15% Max HP Boost (100 HP 115 HP) + 1 Healing Flask Slot (Total: 4 Flasks).

**10\. AREA 4 — FALLEN PALACE & MALACHAR**

The dark heart of the ruined empire: The Dead Court.

- **Boss:** Malachar, The Black Reaper (500 HP)
- **Phase 1 (500 HP - 250 HP):** Aerial Flight Mechanics & Extreme Physical Dominance. Attacks include Flying Dive (40 Dmg), Aerial Greatsword Slash (35 Dmg), Ground Impact (32 Dmg), Flying Charge (38 Dmg), Heavy Ground Combo (30/30/45 Dmg), and Death Dive (50 Dmg).
- **Phase 2 Transition (250 HP - 0 HP):** Equips Blood-Imbued Greatsword and casts Blood Projections (5% Max HP DoT / 3s). Attacks include Blood Greatsword Slash (40 Dmg), Blood Greatsword Combo (30/30/50 Dmg), Blood Projection Barrage (DoT), Blood Ground Rupture (35 Dmg), Blood Charge (45 Dmg), and Aerial Blood Dive (50 Dmg)\[cite: 1\].

**11\. SUMMARY DIFFICULTY & PROGRESSION MATRIX**

| **Area**               | **Boss**      | **Boss HP** | **Damage Range** | **Primary Combat Lesson**            | **DS Module Spotlight**                   |
| ---------------------- | ------------- | ----------- | ---------------- | ------------------------------------ | ----------------------------------------- |
| **Forsaken Woods**     | Forest Warden | 250         | 15 – 28          | Magic/Ground Avoidance & Basic Parry | Linked Lists & BFS Pathfinding\[cite: 1\] |
| **Stonesmith Village** | Iron Sentinel | 300         | 20 – 35          | Physical Parrying & Armor Counters   | Priority Queue & 2D Grid Array\[cite: 1\] |
| **Ruins of Grandeur**  | Rykard        | 400         | 20 – 35          | Dual-Type Reaction (Parry vs. Jump)  | FIFO Queues & Hash Maps\[cite: 1\]        |
| **Fallen Palace**      | Malachar      | 500         | 30 – 50          |                                      |                                           |

**⚔️ ASHENBOUND — COMPLETE GAME PLAN & TECHNICAL SPECIFICATION**

**📄 PROJECT OVERVIEW**

**Ashenbound** is a dark, atmospheric 2D Souls-like action game built as an individual 30-mark Data Structures lab project, while being optimized for high-visibility showcase on GitHub and web deployment via GitHub Pages.

- **Target Tech Stack:** HTML5, CSS3, Pure JavaScript (ES6+), HTML5 Canvas Engine.
- **Deployment:** GitHub Pages (Zero external runtime dependencies).
- **Core Philosophy:** The game operates as an authentic, high-stakes Souls-like. Data structures are not superficial additions; they form the operational foundation of every system in the engine (rendering queues, combat priority buffers, room connectivity, pathfinding, and dynamic hitboxes).

**☠️ 1. THE PROTAGONIST — THE LIVING DEATH**

The player controls **The Living Death**, an unyielding force walking among fallen conquerors.

**Base Attributes**

- **Starting Max HP:** 100 / 100
- **Starting Healing Flasks:** 1
- **Defensive / Mobility Systems:** Parry, Dodge Roll, Jump.
- **Streamlined Mechanics:**
  - ❌ No Stamina Bar
  - ❌ No Currency / Souls dropping
  - ❌ No Character Leveling
  - ❌ No Skill Trees
  - ❌ No Weapon Upgrades

**🎮 2. CONTROLS & COMBAT MECHANICS**

**Input Mapping**

| **Key / Input**        | **Action / Function** | **Notes**                          |
| ---------------------- | --------------------- | ---------------------------------- |
| **W / A / S / D**      | Movement              | Horizontal & Platform Navigation   |
| **Left Mouse Click**   | Light Attack          | Fast execution, standard damage    |
| **Shift + Left Click** | Heavy Attack          | Slow execution, high damage        |
| **Right Mouse Click**  | Parry                 | Defensive physical counter         |
| **Shift**              | Jump                  | Avoid low/ground/magic attacks     |
| **Space**              | Dodge / Roll          | Invincibility frames (i-frames)    |
| **R**                  | Heal                  | Consume Flask (Conditional Rule)   |
| **E**                  | Interact              | Pick up key / Dismiss lore overlay |
| **ESC**                | Pause Menu            | Push/Pop UI Stack State            |

**Defensive & Stagger Mechanics**

The player must actively identify attack types rather than relying on a single panic button.

┌────────────────────────┐

│ INCOMING ENEMY ATTACK │

└───────────┬────────────┘

│

┌──────────────────────┼──────────────────────┐

│ │ │

⚔️ Physical 🌀 Heavy/AoE ⬆️ Magic/Ground

│ │ │

┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴──────┐

│ PARRY (RMB)│ │ DODGE(SPACE)│ │ JUMP(SHIFT) │

└──────┬──────┘ └─────────────┘ └─────────────┘

│

✨ SUCCESS!

│

┌──────┴───────────────────────────────────┐

│ • Enemy Stagger Duration: 1.5s - 2.0s │

│ • Guaranteed Heavy Attack Window │

│ • +50% Heavy Attack Critical Multiplier │

└──────────────────────────────────────────┘

1. 🛡️ **Parry (Right Mouse Click):**
   - **Target:** Physical melee attacks only (Swords, Axes, Scythes, Staff Strikes).
   - **Reward & Heavy Attack Window:** Successfully timing a parry interrupts the enemy's action and places them into a **Stagger State** (1.5s – 2.0s). During this window, the player gets a guaranteed opening to land a **Heavy Attack**, dealing **+50% bonus critical damage** and resetting boss poise.
2. 🌀 **Dodge / Roll (Space):**
   - **Target:** Unparryable heavy strikes, sweep combos, blood charges, high-density projectiles.
   - Gives complete invincibility frames (i-frames) during motion.
3. ⬆️ **Jump (Shift):**
   - **Target:** Ground shockwaves, earth spikes, low magic blasts, Malachar's floor projections.
   - Evades horizontal sweep hitboxes pinned to the ground layer.

**🧪 3. HEALING FLASK SYSTEM**

**Flask Progression**

- **Initial Inventory:** 1 Healing Flask
- **Boss Defeat Reward:** +1 Max Flask slot after every boss kill.

| **Stage / Milestone**      | **Max HP** | **Max Flasks** | **Flask Restore Rule**             |
| -------------------------- | ---------- | -------------- | ---------------------------------- |
| **Game Start**             | 100        | 1              | Standard Tier 1 Rule               |
| **Forest Warden Defeated** | 100        | 2              | Standard Tier 1 Rule               |
| **Iron Sentinel Defeated** | 100        | 3              | Standard Tier 1 Rule               |
| **Rykard Defeated**        | 115        | 4              | Upgraded Tier 2 Rule (+15% Max HP) |
| **Malachar (Final Boss)**  | 115        | 4              | Upgraded Tier 2 Rule               |

**Flask Dynamic Restoration Rules**

Tier 1: 100 Max HP Base

├── HP ≤ 30 ──> Restores +70 HP (e.g., 20 HP ──> 90 HP)

└── HP > 30 ──> Restores directly to 100 Max HP (e.g., 35 HP ──> 100 HP)

Tier 2: 115 Max HP (Post-Rykard Boost)

├── HP ≤ 60 ──> Restores +65 HP (e.g., 40 HP ──> 105 HP)

└── HP > 60 ──> Restores directly to 115 Max HP (e.g., 80 HP ──> 115 HP)

- **Cap Constraint:** Health restored by a flask call can never exceed the player's current Maximum HP.

**⚔️ 4. WEAPON SYSTEM**

At the start of the journey, the player selects **one primary weapon archetype**. Weapon switching is locked until the Forest Warden is vanquished.

\[ START GAME \] ──> Select Initial Weapon (Locked)

│

Defeat Forest Warden (Boss 1)

│

\[ UNLOCK WEAPON SWITCHING \] ──> Instant Swap Active

**Weapon Classes**

⚔️ SWORD : Balanced speed & frame data. Standard parry timing.

🗡️ SPEAR : Extended thrust reach. Ideal for keeping distance.

🪓 AXE : High baseline damage. Slower heavy attack startup.

☠️ SCYTHE : Wide sweeping hitboxes. Higher critical damage on staggered targets.

🏹 BOW & ARROW : Ranged projectile capabilities. Consumes physical draw time.

**🗺️ 5. WORLD STRUCTURE & AREA FLOW**

The game world is linear and unidirectional (**Directed Acyclic Graph**). Progression locks behind key acquisition in each sector.

\[ START \]

│

▼

🌲 FORSAKEN WOODS ──────────► \[Key\] ──► Boss: FOREST WARDEN

│ │

▼ ▼

🏘️ STONESMITH VILLAGE ──────► \[Key\] ──► Boss: IRON SENTINEL (+Armor Upgrade)

│ │

▼ ▼

🏰 RUINS OF GRANDEUR ───────► \[Key\] ──► Boss: RYKARD (+15% Max HP)

│ │

▼ ▼

👑 FALLEN PALACE ───────────► \[Key\] ──► Boss: MALACHAR, THE BLACK REAPER

│

▼

\[ ENDING \]

**📜 6. AREA LORE OVERLAY ENGINE**

Upon crossing threshold triggers into new regions, game mechanics suspend to render lore cards.

\[ ENTER REGION TRIGGER \]

│

▼

\[ BLACK SCREEN FADE \]

│

▼

\[ DISPLAY AREA NAME \]

│

▼

\[ RENDER LORE TEXT \]

│

▼

\[ AWAIT INPUT: 'E' \] ───► Resume Gameplay & Unpause Engine

**🌲 7. AREA 1 — FORSAKEN WOODS & FOREST WARDEN**

A dark, corrupted wood choked with ancient ruins and tangled earth roots.

**👹 Boss Specification: Forest Warden**

- **HP:** 250 HP
- **Archetype:** Earth Mage / Area Control
- **Opening Line:** _"The forest remembers every soul it has claimed... and soon, it shall remember yours."_
- **50% HP Dialogue (125 HP):** _"The woods know you... yet they cannot remember your name."_

Attack Name Damage Type Telegraph / Counter Strategy

──────────────────────────────────────────────────────────────────

Earth Projectile 18 Magic Fast projectile ──> Dodge / Jump

Earth Spike 22 Ground Erupts beneath player ──> Move / Jump

Earth Wave 25 Ground Horizontal ground wave ──> Jump / Dodge

Falling Rock 28 Physical Telegraphed mark ──> Evade zone

Staff Strike 15 Physical Melee strike ──> PARRY (Unlocks Heavy Window)

- **Rewards:** Weapon Switching Unlocked + 1 Healing Flask Slot (Total: 2 Flasks).

**🏘️ 8. AREA 2 — STONESMITH VILLAGE & IRON SENTINEL**

A ruined settlement of collapsed stone forges and cold anvil works.

**🛡️ Boss Specification: The Iron Sentinel**

- **HP:** 300 HP
- **Archetype:** Heavy Armored Knight (Sword & Shield)
- **Opening Line:** _"I have stood watch while kingdoms crumbled. I shall not abandon my post now."_
- **50% HP Dialogue (150 HP):** _"You walk as one alive, yet death follows every step."_

Attack Name Damage Type Telegraph / Counter Strategy

──────────────────────────────────────────────────────────────────────

Sword Slash 20 Physical Standard swing ──> PARRY (Stagger Window)

Heavy Overhead Strike 32 Physical Slow telegraphed ──> PARRY / Dodge

Shield Bash 24 Physical Blunt strike ──> Dodge / Parry

Shield Charge 28 Physical Rushing charge ──> Dodge

Sword Combo (3-Hit) 18/18/25 Physical Rhythmic slash ──> PARRY timing

Guard Break Counter 35 Physical Triggers vs button mashers ──> Reset position

- **Rewards:** Permanent Armor Upgrade (-15% incoming damage intake) + 1 Healing Flask Slot (Total: 3 Flasks).

**🏰 9. AREA 3 — RUINS OF GRANDEUR & RYKARD**

Decaying grand halls, towering marble monuments, and royal courtyards.

**⚔️ Boss Specification: Rykard the Blasphemous**

- **HP:** 400 HP
- **Archetype:** Dual-Wielder (Fire Sword & Ice Sword) / Magic Hybrid
- **Opening Line:** _"You have silenced his guardians... yet you still believe you may reach my lord?"_
- **50% HP Dialogue (200 HP):** _"So... the Living Death finally comes for my lord."_

Attack Name Damage Type Telegraph / Counter Strategy

───────────────────────────────────────────────────────────────────────────

Fire Sword Slash 25 Physical Flame blade ──> PARRY (Heavy Window)

Ice Sword Slash 24 Physical Frost blade ──> PARRY (Heavy Window)

Dual Sword Combo 20/20/28 Physical Fast multi-slash ──> PARRY timing

Fire Wave 27 Magic Ranged flame ──> Jump / Dodge

Ice Projectile 22 Magic Frost shard ──> Jump / Dodge

Magic Blast 20 Magic Fast energy bolt ──> Jump / Dodge

Fire + Ice Combo Var. Dual Sequential strike ──> Adapt per hit

- **Lore Note:** Rykard and Malachar together conquered the known realm, earned the moniker **The Walking Death**, and ruled until total collapse.
- **Rewards:** +15% Max HP Boost (100 HP → 115 HP) + 1 Healing Flask Slot (Total: 4 Flasks).

**👑 10. AREA 4 — FALLEN PALACE & MALACHAR**

The dark heart of the ruined empire: **The Dead Court**.

**☠️ Boss Specification: Malachar, The Black Reaper**

- **HP:** 500 HP
- **Titles:** _The Black Reaper_, _Bearer of Death_, _Warden of Hell_, _Lord of the Dead Court_
- **Opening Line:** _"O Death, awaken. Let the dead rise, let the living tremble, and let this fallen kingdom kneel once more."_

\[ PHASE 1: 500 HP ──► 250 HP \]

• Aerial Flight Mechanics

• Extreme Physical Dominance

│

▼

50% HP TRANSITION

"Let the heavens crumble. Let the dead awaken..."

│

▼

\[ PHASE 2: 250 HP ──► 0 HP \]

• Blood-Imbued Greatsword

• Blood Projections (5% Max HP DoT / 3s)

Attack Name Damage Phase Type Counter Strategy

───────────────────────────────────────────────────────────────────────────────

Flying Dive 40 1 Physical Dodge / Precise Parry

Aerial Greatsword Slash 35 1 Physical Dodge / PARRY (Heavy Window)

Ground Impact 32 1 Physical Jump / Dodge

Flying Charge 38 1 Physical Dodge / PARRY

Heavy Ground Combo 30/30/45 1 Physical Dodge / Frame Parry

Death Dive 50 1 Physical Perfect Dodge / Perfect Parry

Blood Greatsword Slash 40 2 Physical PARRY (Stagger Window)

Blood Greatsword Combo 30/30/50 2 Physical Precise Dodge / Parry

Blood Projection DoT 2 Ranged Jump / Dodge (Applies 5% DoT)

Projection Barrage DoT 2 Ranged Multi-Jump / Dodge

Blood Ground Rupture 35 2 Ground Jump / Dodge

Blood Charge 45 2 Physical Dodge / PARRY

Aerial Blood Dive 50 2 Physical Dodge / PARRY

**🧠 11. DATA STRUCTURES ENGINE SPECIFICATION**

This section details how core Computer Science Data Structures drive game systems for lab evaluations.

┌───────────────────────────┐

│ ASHENBOUND GAME ENGINE │

└─────────────┬─────────────┘

│

┌──────────────────────┬────────────────┼──────────────────────┬──────────────────────┐

│ │ │ │ │

▼ ▼ ▼ ▼ ▼

2D Array Linked List Priority Queue Graph Stack Hash Maps & Queues

(Tile Grid Engine) (Entity System) (Combat Pipeline) (World & UI Engine) (AI & Asset Cache)

**Data Structure Mappings**

1\. 2D ARRAY (Grid Collision & Layout)

└── Represents static level geometry, platform boundaries, and hazard zones.

└── O(1) coordinate lookup for collision detection (Player x, y bounds check).

2\. LINKED LIST (Dynamic Entity Manager)

└── Active collection storing living entities: \[Player\] ──> \[Enemies\] ──> \[Projectiles\] ──> \[Particles\].

└── Allows O(1) node removal when projectiles hit targets or enemies die.

3\. PRIORITY QUEUE (Combat Event & Input Pipeline)

└── Sorts frame-by-frame actions based on combat priority:

Priority 1: Parry Windows / Stagger Executions

Priority 2: Dodge i-frame validation

Priority 3: Physical & Magic Hitbox Collisions

Priority 4: Environmental rendering updates

4\. STACK (UI & Menu State Machine)

└── Manages game state stack push/pop operations:

\[ Base Gameplay \] ──push──> \[ Lore Screen \] ──push──> \[ Pause Menu \]

Pressing ESC or 'E' pops top state to resume underlying game loop seamlessly.

5\. GRAPH (World Connectivity & Key Locks)

└── Directed Graph representing interconnected regions (Nodes = Rooms/Boss Arenas, Edges = Gates).

└── Unlocking doors updates edge traversal weights from Infinity to 1.

6\. BFS (Breadth-First Search — Enemy Pathfinding)

└── Used by ground-based melee enemies to find the shortest tile path to the player in multi-platform arenas.

7\. DFS (Depth-First Search — Exploration & World Validation)

└── Executes on map load to ensure all key locations and boss gates are reachable before starting gameplay.

8\. QUEUE (Boss AI Skill Sequences)

└── First-In, First-Out (FIFO) queue managing boss telegraphed attack combos (e.g., Heavy Slash ──> Charge ──> Slam).

9\. HASH MAP (Asset & Entity Lookup Registry)

└── O(1) key-value store mapping weapon stats, sprite sheets, sound triggers, and boss damage parameters.

**🏆 12. SUMMARY DIFFICULTY & PROGRESSION MATRIX**

| **Area**               | **Boss**      | **Boss HP** | **Damage Range** | **Primary Combat Lesson**             | **DS Module Spotlight**        |
| ---------------------- | ------------- | ----------- | ---------------- | ------------------------------------- | ------------------------------ |
| **Forsaken Woods**     | Forest Warden | 250         | 15 – 28          | Magic/Ground Avoidance & Basic Parry  | Linked Lists & BFS Pathfinding |
| **Stonesmith Village** | Iron Sentinel | 300         | 20 – 35          | Physical Parrying & Armor Counters    | Priority Queue & 2D Grid Array |
| **Ruins of Grandeur**  | Rykard        | 400         | 20 – 35          | Dual-Type Reaction (Parry vs. Jump)   | FIFO Queues & Hash Maps        |
| **Fallen Palace**      | Malachar      | 500         | 30 – 50          | Total Mechanics Mastery & DoT Evading | Graph Traversal & Stack States |