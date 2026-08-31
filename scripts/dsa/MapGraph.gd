# Ashenbound — Directed Acyclic Graph (DAG) with DFS & BFS in GDScript
# Purpose: Maps world reachability, key lock verification, and enemy tile pathfinding.

class_name MapGraph
extends RefCounted

var nodes: Dictionary = {}          # NodeId -> Data
var adjacency_list: Dictionary = {} # NodeId -> Array of Edge Dictionaries

func add_node(id: String, data: Dictionary = {}) -> void:
	if not nodes.has(id):
		nodes[id] = data
		adjacency_list[id] = []

func add_edge(from_id: String, to_id: String, key_required: String = "", weight: int = 1) -> void:
	if not nodes.has(from_id): add_node(from_id)
	if not nodes.has(to_id): add_node(to_id)

	adjacency_list[from_id].append({
		"target_node_id": to_id,
		"key_required": key_required,
		"weight": weight
	})

func dfs(start_id: String, target_id: String, inventory_keys: Array = []) -> bool:
	if not nodes.has(start_id) or not nodes.has(target_id):
		return false
		
	var visited = {}
	var key_set = {}
	for k in inventory_keys:
		key_set[k] = true

	return _dfs_recursive(start_id, target_id, visited, key_set)

func _dfs_recursive(curr_id: String, target_id: String, visited: Dictionary, key_set: Dictionary) -> bool:
	if curr_id == target_id:
		return true
	visited[curr_id] = true

	var edges = adjacency_list.get(curr_id, [])
	for edge in edges:
		var req = edge["key_required"]
		var can_traverse = (req == "" or key_set.has(req))
		if can_traverse and not visited.has(edge["target_node_id"]):
			if _dfs_recursive(edge["target_node_id"], target_id, visited, key_set):
				return true
	return false

static func bfs_grid_path(start_pos: Vector2i, target_pos: Vector2i, tile_grid: Array) -> Array:
	var rows = tile_grid.size()
	if rows == 0: return []
	var cols = tile_grid[0].size()

	var is_valid = func(r: int, c: int) -> bool:
		return r >= 0 and r < rows and c >= 0 and c < cols and tile_grid[r][c] == 0

	if not is_valid.call(start_pos.y, start_pos.x) or not is_valid.call(target_pos.y, target_pos.x):
		return []

	var queue = [start_pos]
	var visited = { str(start_pos): true }
	var parent_map = {}

	var dirs = [Vector2i(0, -1), Vector2i(0, 1), Vector2i(-1, 0), Vector2i(1, 0)]

	while queue.size() > 0:
		var curr = queue.pop_front()
		var curr_str = str(curr)

		if curr == target_pos:
			var path = []
			var p = target_pos
			while parent_map.has(str(p)):
				path.push_front(p)
				p = parent_map[str(p)]
			path.push_front(start_pos)
			return path

		for d in dirs:
			var next_pos = curr + d
			var next_str = str(next_pos)
			if is_valid.call(next_pos.y, next_pos.x) and not visited.has(next_str):
				visited[next_str] = true
				parent_map[next_str] = curr
				queue.append(next_pos)

	return []
