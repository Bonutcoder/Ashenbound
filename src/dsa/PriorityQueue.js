/**
 * Priority Queue (Binary Min-Heap) Implementation
 * Purpose: Sorts frame-by-frame combat actions. 
 * Priority 1 (Parry) beats Priority 2 (Dodge) and Priority 3 (Damage Collision).
 */

export class PriorityQueueItem {
  constructor(action, priority, metadata = {}) {
    this.action = action;       // Action identifier / function
    this.priority = priority;   // Priority level (1 = Highest priority, e.g. Parry)
    this.metadata = metadata;   // Action parameters (source, target, damage, hitboxes)
  }
}

export class PriorityQueue {
  constructor() {
    this.heapArray = [];
  }

  /**
   * Enqueues an item into the Min-Heap in O(log N) time.
   * @param {string|Function} action 
   * @param {number} priority Lower number = Higher priority (1 beats 3)
   * @param {Object} metadata 
   */
  enqueue(action, priority, metadata = {}) {
    const item = new PriorityQueueItem(action, priority, metadata);
    this.heapArray.push(item);
    this._bubbleUp(this.heapArray.length - 1);
  }

  /**
   * Dequeues the highest-priority item (smallest priority number) in O(log N) time.
   * @returns {PriorityQueueItem|null}
   */
  dequeue() {
    if (this.isEmpty()) return null;
    const root = this.heapArray[0];
    const end = this.heapArray.pop();
    if (this.heapArray.length > 0) {
      this.heapArray[0] = end;
      this._bubbleDown(0);
    }
    return root;
  }

  /**
   * Inspects the highest priority root item in O(1) time.
   * @returns {PriorityQueueItem|null}
   */
  peek() {
    return this.isEmpty() ? null : this.heapArray[0];
  }

  size() {
    return this.heapArray.length;
  }

  isEmpty() {
    return this.heapArray.length === 0;
  }

  clear() {
    this.heapArray = [];
  }

  // Private Helper Methods for Heap Invariant Maintenance
  _bubbleUp(index) {
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      if (this.heapArray[index].priority >= this.heapArray[parentIdx].priority) break;

      // Swap element with parent
      const temp = this.heapArray[index];
      this.heapArray[index] = this.heapArray[parentIdx];
      this.heapArray[parentIdx] = temp;

      index = parentIdx;
    }
  }

  _bubbleDown(index) {
    const length = this.heapArray.length;
    while (true) {
      let smallestIdx = index;
      const leftChildIdx = 2 * index + 1;
      const rightChildIdx = 2 * index + 2;

      if (leftChildIdx < length && this.heapArray[leftChildIdx].priority < this.heapArray[smallestIdx].priority) {
        smallestIdx = leftChildIdx;
      }
      if (rightChildIdx < length && this.heapArray[rightChildIdx].priority < this.heapArray[smallestIdx].priority) {
        smallestIdx = rightChildIdx;
      }

      if (smallestIdx === index) break;

      // Swap
      const temp = this.heapArray[index];
      this.heapArray[index] = this.heapArray[smallestIdx];
      this.heapArray[smallestIdx] = temp;

      index = smallestIdx;
    }
  }
}
