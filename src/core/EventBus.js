/**
 * EventBus — Decoupled Event Dispatcher
 * Purpose: Decouples core engine, combat pipeline, HUD updates, and audio triggers.
 */
export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  /**
   * Subscribes a listener callback to an event type.
   * @param {string} event 
   * @param {Function} callback 
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  /**
   * Unsubscribes a listener callback.
   * @param {string} event 
   * @param {Function} callback 
   */
  off(event, callback) {
    if (!this.listeners.has(event)) return;
    const callbacks = this.listeners.get(event).filter(cb => cb !== callback);
    this.listeners.set(event, callbacks);
  }

  /**
   * Emits an event with data payload.
   * @param {string} event 
   * @param {*} payload 
   */
  emit(event, payload) {
    if (!this.listeners.has(event)) return;
    const callbacks = this.listeners.get(event);
    for (const callback of callbacks) {
      try {
        callback(payload);
      } catch (err) {
        console.error(`Error in EventBus listener for event "${event}":`, err);
      }
    }
  }

  clear() {
    this.listeners.clear();
  }
}

export const globalEventBus = new EventBus();
