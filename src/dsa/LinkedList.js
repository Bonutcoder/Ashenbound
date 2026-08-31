/**
 * Doubly Linked List & EntityNode Implementation
 * Purpose: Holds active living entities in memory. Allows O(1) node removal 
 * without Array.splice() garbage collection stutter during 60 FPS loop.
 */

export class EntityNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Inserts an entity at the end of the list in O(1) time.
   * @param {*} data Entity object
   * @returns {EntityNode} Reference to the created node
   */
  insert(data) {
    const node = new EntityNode(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
    return node;
  }

  /**
   * Removes a specified node in O(1) time.
   * @param {EntityNode} node 
   */
  remove(node) {
    if (!node || this.size === 0) return;

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next; // Node was head
    }

    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev; // Node was tail
    }

    node.next = null;
    node.prev = null;
    this.size--;
  }

  /**
   * Clears all nodes from memory in O(1) time.
   * Allows browser Garbage Collector to clean dangling references.
   */
  clear() {
    let current = this.head;
    while (current) {
      const next = current.next;
      current.next = null;
      current.prev = null;
      current = next;
    }
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Iterates safely over each entity node in the list.
   * @param {Function} callback (data, node)
   */
  forEach(callback) {
    let current = this.head;
    while (current) {
      const nextNode = current.next; // Store next in case callback removes current
      callback(current.data, current);
      current = nextNode;
    }
  }

  /**
   * Converts list nodes to a JS Array (used for telemetry snapshots).
   * @returns {Array}
   */
  toArray() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return arr;
  }
}
