import { CONFIG } from '../config.js';
import { Renderer } from './Renderer.js';
import { InputManager } from './Input.js';
import { DoublyLinkedList } from '../dsa/LinkedList.js';
import { PriorityQueue } from '../dsa/PriorityQueue.js';
import { StateStack } from '../dsa/StateStack.js';
import { globalEventBus } from './EventBus.js';

/**
 * Ashenbound Master Engine Loop Implementation
 * Drives the 60 FPS fixed-timestep pipeline, entity linked list iteration,
 * min-heap priority arbitration, and telemetry metrics.
 */
export class Engine {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.renderer = new Renderer(canvasElement);
    this.input = new InputManager();

    // Data Structure Engine Core Modules
    this.entities = new DoublyLinkedList(); // Living entity collection (DLL)
    this.priorityQueue = new PriorityQueue(); // Min-Heap combat event queue
    this.stateStack = new StateStack();       // LIFO UI & Game State stack

    // Loop Timing & State
    this.isRunning = false;
    this.lastTime = 0;
    this.accumulatedTime = 0;
    this.fps = 60;
    this.frameCount = 0;
    this.lastFpsUpdate = 0;

    // Telemetry Elements
    this.debugOverlay = {
      dllSize: document.getElementById('tel-dll-size'),
      heapRoot: document.getElementById('tel-heap-root'),
      fpsDisplay: document.getElementById('telemetry-fps')
    };

    this._bindEvents();
  }

  _bindEvents() {
    globalEventBus.on('ENGINE_PAUSE', () => this.pause());
    globalEventBus.on('ENGINE_RESUME', () => this.resume());
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.lastFpsUpdate = this.lastTime;
    requestAnimationFrame((timestamp) => this._loop(timestamp));
  }

  pause() {
    this.isRunning = false;
  }

  resume() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame((timestamp) => this._loop(timestamp));
  }

  /**
   * Main 60 FPS Engine Pipeline Loop
   * @param {number} timestamp 
   */
  _loop(timestamp) {
    if (!this.isRunning) return;

    let dt = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Tab Inactive Safety Clamp: Prevent massive physics jumps if tab was backgrounded
    if (dt > CONFIG.MAX_DELTA_TIME) {
      dt = CONFIG.FIXED_STEP;
    }

    const dtSeconds = dt / 1000;

    // FPS Counter Calculation
    this.frameCount++;
    if (timestamp - this.lastFpsUpdate >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = timestamp;
    }

    // 1. Input Phase (Gather & buffer input events)
    this.input.update();

    // 2. Logic Phase (Update top LIFO state & iterate living entities DLL)
    this.stateStack.update(dtSeconds);

    // 3. Collision Phase & Priority Queue Parsing (Process Min-Heap frame events)
    this._processCombatPriorityQueue();

    // 4. Render Phase (Clear & Draw active state to Canvas)
    this.renderer.clear();
    this.stateStack.draw(this.renderer.ctx);

    // 5. Telemetry Metrics Update (Non-blocking text DOM updates)
    this._updateTelemetry(dt);

    requestAnimationFrame((ts) => this._loop(ts));
  }

  /**
   * Processes frame actions from Min-Heap Priority Queue.
   * Parry (P1) > Dodge (P2) > Damage Collision (P3)
   */
  _processCombatPriorityQueue() {
    while (!this.priorityQueue.isEmpty()) {
      const event = this.priorityQueue.dequeue();
      if (!event) break;

      // Priority arbitration execution
      if (typeof event.action === 'function') {
        event.action(event.metadata);
      } else {
        globalEventBus.emit(event.action, event.metadata);
      }
    }
  }

  _updateTelemetry(frameTimeMs) {
    if (this.debugOverlay.dllSize) {
      this.debugOverlay.dllSize.textContent = `${this.entities.size} Entities`;
    }
    if (this.debugOverlay.heapRoot) {
      const root = this.priorityQueue.peek();
      this.debugOverlay.heapRoot.textContent = root 
        ? `${root.action} (P${root.priority})` 
        : 'IDLE (P4)';
    }
    if (this.debugOverlay.fpsDisplay) {
      this.debugOverlay.fpsDisplay.textContent = `FPS: ${this.fps} (${frameTimeMs.toFixed(1)}ms)`;
    }
  }
}
