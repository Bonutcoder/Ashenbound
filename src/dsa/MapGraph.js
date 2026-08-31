/**
 * MapGraph Implementation (Directed Acyclic Graph with DFS & BFS)
 * Purpose: Maps world region reachability, key lock validation via DFS, 
 * and enemy tile pathfinding via BFS.
 */

export class MapGraph {
  constructor() {
    this.adjacencyList = new Map(); // Map<NodeId, Array<{ targetNodeId, keyRequired, weight }>>
    this.nodes = new Map();         // Map<NodeId, NodeData>
  }

  addNode(id, data = {}) {
    if (!this.nodes.has(id)) {
      this.nodes.set(id, data);
      this.adjacencyList.set(id, []);
    }
  }

  addEdge(fromId, toId, keyRequired = null, weight = 1) {
    if (!this.nodes.has(fromId)) this.addNode(fromId);
    if (!this.nodes.has(toId)) this.addNode(toId);

    this.adjacencyList.get(fromId).push({
      targetNodeId: toId,
      keyRequired,
      weight
    });
  }

  /**
   * Depth-First Search (DFS)
   * Validates if targetNodeId is reachable from startNodeId given inventoryKeys.
   * Runs on engine startup to verify map structure validity.
   * @param {string} startNodeId 
   * @param {string} targetNodeId 
   * @param {Array<string>} inventoryKeys 
   * @returns {boolean} True if path mathematically exists
   */
  dfs(startNodeId, targetNodeId, inventoryKeys = []) {
    if (!this.nodes.has(startNodeId) || !this.nodes.has(targetNodeId)) return false;

    const visited = new Set();
    const keySet = new Set(inventoryKeys);

    const traverse = (currentNodeId) => {
      if (currentNodeId === targetNodeId) return true;
      visited.add(currentNodeId);

      const edges = this.adjacencyList.get(currentNodeId) || [];
      for (const edge of edges) {
        // If edge requires a key, check if player holds key
        const canTraverse = !edge.keyRequired || keySet.has(edge.keyRequired);
        if (canTraverse && !visited.has(edge.targetNodeId)) {
          if (traverse(edge.targetNodeId)) return true;
        }
      }
      return false;
    };

    return traverse(startNodeId);
  }

  /**
   * Breadth-First Search (BFS) for Grid Pathfinding
   * Calculates the shortest tile path from startPos {x, y} to targetPos {x, y}
   * on a 2D collision grid.
   * @param {{x: number, y: number}} startPos 
   * @param {{x: number, y: number}} targetPos 
   * @param {Array<Array<number>>} tileGrid 0 = Walkable, 1 = Wall/Solid
   * @returns {Array<{x: number, y: number}>} Array of grid coordinates
   */
  static bfsGridPath(startPos, targetPos, tileGrid) {
    const rows = tileGrid.length;
    if (rows === 0) return [];
    const cols = tileGrid[0].length;

    const isValid = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols && tileGrid[r][c] === 0;

    const startKey = `${startPos.x},${startPos.y}`;
    const targetKey = `${targetPos.x},${targetPos.y}`;

    if (!isValid(startPos.y, startPos.x) || !isValid(targetPos.y, targetPos.x)) return [];

    const queue = [startPos];
    const visited = new Set([startKey]);
    const parentMap = new Map();

    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 },  // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 }   // Right
    ];

    while (queue.length > 0) {
      const current = queue.shift();
      const currentKey = `${current.x},${current.y}`;

      if (currentKey === targetKey) {
        // Reconstruct path
        const path = [];
        let currKey = targetKey;
        while (currKey) {
          const [cx, cy] = currKey.split(',').map(Number);
          path.unshift({ x: cx, y: cy });
          currKey = parentMap.get(currKey);
        }
        return path;
      }

      for (const dir of directions) {
        const nextX = current.x + dir.x;
        const nextY = current.y + dir.y;
        const nextKey = `${nextX},${nextY}`;

        if (isValid(nextY, nextX) && !visited.has(nextKey)) {
          visited.add(nextKey);
          parentMap.set(nextKey, currentKey);
          queue.push({ x: nextX, y: nextY });
        }
      }
    }

    return []; // No valid path found
  }
}
