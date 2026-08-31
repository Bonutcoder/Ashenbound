import { describe, it, expect, beforeEach } from 'vitest';
import { DoublyLinkedList } from '../src/dsa/LinkedList.js';
import { PriorityQueue } from '../src/dsa/PriorityQueue.js';
import { StateStack } from '../src/dsa/StateStack.js';
import { MapGraph } from '../src/dsa/MapGraph.js';
import { AttackQueue } from '../src/dsa/AttackQueue.js';
import { MementoManager } from '../src/dsa/Memento.js';
import { WEAPON_REGISTRY } from '../src/dsa/AssetMap.js';

describe('Ashenbound — Core Data Structures Engine Test Suite', () => {

  // 1. DoublyLinkedList Verification
  describe('DoublyLinkedList (Entity Memory Manager)', () => {
    let dll;
    beforeEach(() => { dll = new DoublyLinkedList(); });

    it('should insert entities in O(1) time and update size', () => {
      const n1 = dll.insert({ id: 'player' });
      const n2 = dll.insert({ id: 'projectile_1' });
      expect(dll.size).toBe(2);
      expect(dll.head.data.id).toBe('player');
      expect(dll.tail.data.id).toBe('projectile_1');
    });

    it('should remove middle node in O(1) time without breaking links', () => {
      const n1 = dll.insert({ id: 'e1' });
      const n2 = dll.insert({ id: 'e2' });
      const n3 = dll.insert({ id: 'e3' });

      dll.remove(n2);
      expect(dll.size).toBe(2);
      expect(n1.next.data.id).toBe('e3');
      expect(n3.prev.data.id).toBe('e1');
    });

    it('should clear all nodes from memory safely', () => {
      dll.insert({ id: 'a' });
      dll.insert({ id: 'b' });
      dll.clear();
      expect(dll.size).toBe(0);
      expect(dll.head).toBeNull();
      expect(dll.tail).toBeNull();
    });
  });

  // 2. PriorityQueue (Min-Heap) Verification
  describe('PriorityQueue (Min-Heap Combat Arbitration)', () => {
    let pq;
    beforeEach(() => { pq = new PriorityQueue(); });

    it('should extract Parry (P1) before Dodge (P2) and Damage (P3)', () => {
      pq.enqueue('DAMAGE_HITBOX', 3);
      pq.enqueue('PARRY_WINDOW', 1);
      pq.enqueue('DODGE_IFRAMES', 2);

      expect(pq.dequeue().action).toBe('PARRY_WINDOW');
      expect(pq.dequeue().action).toBe('DODGE_IFRAMES');
      expect(pq.dequeue().action).toBe('DAMAGE_HITBOX');
    });

    it('should maintain heap invariant with multiple items', () => {
      pq.enqueue('EVENT_A', 4);
      pq.enqueue('EVENT_B', 1);
      pq.enqueue('EVENT_C', 2);
      pq.enqueue('EVENT_D', 1);

      expect(pq.peek().priority).toBe(1);
      expect(pq.size()).toBe(4);
    });
  });

  // 3. StateStack Verification
  describe('StateStack (LIFO UI Manager)', () => {
    let stack;
    beforeEach(() => { stack = new StateStack(); });

    it('should push and pop UI states in LIFO order', () => {
      const gameplay = { name: 'GAMEPLAY' };
      const lore = { name: 'LORE' };

      stack.pushState(gameplay);
      stack.pushState(lore);

      expect(stack.peek().name).toBe('LORE');
      expect(stack.popState().name).toBe('LORE');
      expect(stack.peek().name).toBe('GAMEPLAY');
    });
  });

  // 4. MapGraph DFS & BFS Verification
  describe('MapGraph (DAG World Traversal & DFS Path Validation)', () => {
    let graph;
    beforeEach(() => {
      graph = new MapGraph();
      graph.addNode('Shrine1');
      graph.addNode('WoodsArea');
      graph.addNode('VillageGate');
      graph.addNode('BossArena');

      graph.addEdge('Shrine1', 'WoodsArea');
      graph.addEdge('WoodsArea', 'VillageGate', 'WOODS_KEY');
      graph.addEdge('VillageGate', 'BossArena');
    });

    it('should validate DFS path reachability when key is present', () => {
      const reachable = graph.dfs('Shrine1', 'BossArena', ['WOODS_KEY']);
      expect(reachable).toBe(true);
    });

    it('should fail DFS path reachability when required key is missing', () => {
      const reachable = graph.dfs('Shrine1', 'BossArena', []);
      expect(reachable).toBe(false);
    });

    it('should calculate shortest BFS grid path for enemy AI', () => {
      const grid = [
        [0, 0, 0],
        [1, 1, 0],
        [0, 0, 0]
      ];
      const path = MapGraph.bfsGridPath({ x: 0, y: 0 }, { x: 2, y: 2 }, grid);
      expect(path.length).toBeGreaterThan(0);
      expect(path[0]).toEqual({ x: 0, y: 0 });
      expect(path[path.length - 1]).toEqual({ x: 2, y: 2 });
    });
  });

  // 5. AttackQueue Verification
  describe('AttackQueue (FIFO Combo Engine)', () => {
    let queue;
    beforeEach(() => { queue = new AttackQueue(); });

    it('should dequeue combo attacks in FIFO order', () => {
      queue.enqueueCombo(['Slash', 'Backstep', 'HeavySlam']);
      expect(queue.nextAttack()).toBe('Slash');
      expect(queue.nextAttack()).toBe('Backstep');
      expect(queue.nextAttack()).toBe('HeavySlam');
    });

    it('should clear queue on successful parry', () => {
      queue.enqueueCombo(['Slash', 'Slam']);
      queue.clear();
      expect(queue.isEmpty()).toBe(true);
    });
  });

  // 6. Memento Checkpoint Verification
  describe('MementoManager (State Snapshot Restoration)', () => {
    let memento;
    beforeEach(() => { memento = new MementoManager(); });

    it('should deep-copy and restore player stats cleanly', () => {
      const stats = { hp: 40, maxHp: 100, flasks: 1, maxFlasks: 1, currentWeapon: 'SWORD' };
      memento.createCheckpoint(stats, 'Shrine_1');

      const restored = memento.restoreCheckpoint();
      expect(restored.currentRespawnNodeId).toBe('Shrine_1');
      expect(restored.playerStats.hp).toBe(40);
    });
  });

  // 7. AssetMap Hash Registry Verification
  describe('AssetMap (Hash Registry)', () => {
    it('should fetch weapon stats in O(1) time', () => {
      const sword = WEAPON_REGISTRY.get('SWORD');
      expect(sword).toBeDefined();
      expect(sword.damage).toBe(20);
      expect(sword.parryWindowMs).toBe(150);
    });
  });
});
