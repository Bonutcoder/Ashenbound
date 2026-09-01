# Ashenbound — World Manager & DAG Progression Controller in GDScript
# Manages DAG world connectivity, startup DFS path validation, and Memento death respawns.

class_name WorldManager
extends Node

var world_graph: MapGraph = MapGraph.new()
var unlocked_keys: Array = []
var defeated_bosses: Array = []
var active_room_id: String = "Forsaken_Woods"

func _ready() -> void:
	_build_world_dag()
	_validate_map_reachability()

func _build_world_dag() -> void:
	# Nodes (Rooms / Boss Arenas)
	world_graph.add_node("Shrine_1", { "area": "Forsaken Woods" })
	world_graph.add_node("Woods_Gate", { "key": "WOODS_KEY" })
	world_graph.add_node("Boss_1", { "boss": "Forest Warden" })

	world_graph.add_node("Shrine_2", { "area": "Stonesmith Village" })
	world_graph.add_node("Village_Gate", { "key": "VILLAGE_KEY" })
	world_graph.add_node("Boss_2", { "boss": "Iron Sentinel" })

	world_graph.add_node("Shrine_3", { "area": "Ruins of Grandeur" })
	world_graph.add_node("Grandeur_Gate", { "key": "GRANDEUR_KEY" })
	world_graph.add_node("Boss_3", { "boss": "Rykard" })

	world_graph.add_node("Shrine_4", { "area": "Fallen Palace" })
	world_graph.add_node("Palace_Gate", { "key": "PALACE_KEY" })
	world_graph.add_node("Boss_4", { "boss": "Malachar" })

	# Edges (Directional Traversal Paths with Key Locks)
	world_graph.add_edge("Shrine_1", "Woods_Gate")
	world_graph.add_edge("Woods_Gate", "Boss_1", "WOODS_KEY")
	world_graph.add_edge("Boss_1", "Shrine_2")
	
	world_graph.add_edge("Shrine_2", "Village_Gate")
	world_graph.add_edge("Village_Gate", "Boss_2", "VILLAGE_KEY")
	world_graph.add_edge("Boss_2", "Shrine_3")
	
	world_graph.add_edge("Shrine_3", "Grandeur_Gate")
	world_graph.add_edge("Grandeur_Gate", "Boss_3", "GRANDEUR_KEY")
	world_graph.add_edge("Boss_3", "Shrine_4")

	world_graph.add_edge("Shrine_4", "Palace_Gate")
	world_graph.add_edge("Palace_Gate", "Boss_4", "PALACE_KEY")

func _validate_map_reachability() -> void:
	# Startup Depth-First Search (DFS) validation
	var test_keys = ["WOODS_KEY", "VILLAGE_KEY", "GRANDEUR_KEY", "PALACE_KEY"]
	var is_reachable = world_graph.dfs("Shrine_1", "Boss_4", test_keys)
	
	if is_reachable:
		print("DAG World Map DFS Validation: PASSED (Final boss Malachar is mathematically reachable)")
	else:
		push_error("DAG World Map Structural Error: Final boss unreachable!")

func unlock_key(key_name: String) -> void:
	if not unlocked_keys.has(key_name):
		unlocked_keys.append(key_name)
		print("Key Acquired:", key_name)

func respawn_player_from_memento(player: PlayerController) -> void:
	var memento_mgr = MementoManager.new()
	var snapshot = memento_mgr.restore_checkpoint()
	
	if snapshot != null and player != null:
		player.current_hp = snapshot.player_stats.get("hp", player.max_hp)
		player.max_hp = snapshot.player_stats.get("max_hp", player.max_hp)
		player.flasks = snapshot.player_stats.get("flasks", player.max_flasks)
		player.emit_signal("hp_changed", player.current_hp, player.max_hp)
		player.emit_signal("flask_changed", player.flasks, player.max_flasks)
		print("Player Respawned from Memento Snapshot at:", snapshot.respawn_node_id)
