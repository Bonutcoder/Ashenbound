# Ashenbound — Memento Checkpoint Snapshot Manager in GDScript
# Purpose: Deep-copies state at Ashen Shrines and restores state upon death.

class_name MementoManager
extends RefCounted

const STORAGE_KEY = "user://ashenbound_memento.save"

class MementoSnapshot:
	var timestamp: int
	var player_stats: Dictionary
	var respawn_node_id: String
	var unlocked_keys: Array
	var defeated_bosses: Array

	func _init(p_stats: Dictionary, p_node_id: String, p_keys: Array = [], p_bosses: Array = []) -> void:
		timestamp = Time.get_unix_time_from_system()
		player_stats = p_stats.duplicate(true)
		respawn_node_id = p_node_id
		unlocked_keys = p_keys.duplicate()
		defeated_bosses = p_bosses.duplicate()

var active_snapshot: MementoSnapshot = null

func create_checkpoint(player_stats: Dictionary, respawn_node_id: String, keys: Array = [], bosses: Array = []) -> MementoSnapshot:
	var sanitized = {
		"hp": mini(player_stats.get("hp", 100), player_stats.get("max_hp", 100)),
		"max_hp": player_stats.get("max_hp", 100),
		"flasks": player_stats.get("flasks", 1),
		"max_flasks": player_stats.get("max_flasks", 1),
		"current_weapon": player_stats.get("current_weapon", "SWORD"),
		"armor_upgrade": player_stats.get("armor_upgrade", false)
	}

	active_snapshot = MementoSnapshot.new(sanitized, respawn_node_id, keys, bosses)
	save_to_disk()
	return active_snapshot

func restore_checkpoint() -> MementoSnapshot:
	if active_snapshot == null:
		load_from_disk()
	return active_snapshot

func save_to_disk() -> void:
	if active_snapshot == null: return
	var file = FileAccess.open(STORAGE_KEY, FileAccess.WRITE)
	if file != null:
		var data = {
			"timestamp": active_snapshot.timestamp,
			"player_stats": active_snapshot.player_stats,
			"respawn_node_id": active_snapshot.respawn_node_id,
			"unlocked_keys": active_snapshot.unlocked_keys,
			"defeated_bosses": active_snapshot.defeated_bosses
		}
		file.store_string(Marshalls.utf8_to_base64(JSON.stringify(data)))
		file.close()

func load_from_disk() -> MementoSnapshot:
	if not FileAccess.file_exists(STORAGE_KEY): return null
	var file = FileAccess.open(STORAGE_KEY, FileAccess.READ)
	if file != null:
		var base64_str = file.get_as_text()
		file.close()
		var json_str = Marshalls.base64_to_utf8(base64_str)
		var json = JSON.new()
		if json.parse(json_str) == OK:
			var data = json.data
			if data is Dictionary and data.has("player_stats") and data.has("respawn_node_id"):
				active_snapshot = MementoSnapshot.new(
					data["player_stats"],
					data["respawn_node_id"],
					data.get("unlocked_keys", []),
					data.get("defeated_bosses", [])
				)
				return active_snapshot
	return null
