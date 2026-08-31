/**
 * AttackQueue (FIFO Queue) Implementation
 * Purpose: Caches boss multi-hit combo sequences (e.g. Slash -> Backstep -> Heavy Slam).
 * On successful player parry: queue is immediately cleared via .clear() 
 * and boss enters STAGGERED state.
 */

export class AttackQueue {
  constructor() {
    this.queueArray = [];
  }

  /**
   * Enqueues an array of attack combo steps.
   * @param {Array<Object>} comboArray 
   */
  enqueueCombo(comboArray) {
    if (Array.isArray(comboArray)) {
      for (const step of comboArray) {
        this.queueArray.push(step);
      }
    }
  }

  /**
   * Enqueues a single attack step.
   * @param {Object} attack 
   */
  enqueue(attack) {
    this.queueArray.push(attack);
  }

  /**
   * Dequeues the next attack in the FIFO sequence in O(1) time.
   * @returns {Object|null}
   */
  nextAttack() {
    if (this.isEmpty()) return null;
    return this.queueArray.shift();
  }

  /**
   * Peeks at the upcoming attack without removing it.
   * @returns {Object|null}
   */
  peek() {
    return this.isEmpty() ? null : this.queueArray[0];
  }

  /**
   * Instantly clears all queued combo attacks when parried.
   */
  clear() {
    this.queueArray = [];
  }

  size() {
    return this.queueArray.length;
  }

  isEmpty() {
    return this.queueArray.length === 0;
  }
}
