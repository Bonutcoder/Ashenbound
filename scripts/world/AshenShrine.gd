# Ashenbound — Ashen Shrine Checkpoint Controller in GDScript
# Resting updates respawn node pointer, restores HP & Flasks, and saves Memento snapshot.

class_name AshenShrine
extends Area2D

@export var shrine_node_id: String = "Shrine_1"
var is_player_nearby: bool = false
var player_ref: PlayerController = null

func _process(delta: float) -> void:
	if is_player_nearby and Input.is_action_just_pressed("interact"):
		_rest_at_shrine()

func _rest_at_shrine() -> void:
	if player_ref == null: return
	
	# Restore Player HP & Flasks
	player_ref.current_hp = player_ref.max_hp
	player_ref.flasks = player_ref.max_flasks
	player_ref.emit_signal("hp_changed", player_ref.current_hp, player_ref.max_hp)
	player_ref.emit_signal("flask_changed", player_ref.flasks, player_ref.max_flasks)

	# Capture Memento Checkpoint Snapshot
	var memento_mgr = MementoManager.new()
	var player_stats = {
		"hp": player_ref.current_hp,
		"max_hp": player_ref.max_hp,
		"flasks": player_ref.flasks,
		"max_flasks": player_ref.max_flasks,
		"current_weapon": player_ref.current_weapon
	}
	memento_mgr.create_checkpoint(player_stats, shrine_node_id)
	print("Resting at Ashen Shrine:", shrine_node_id, "- Memento Checkpoint Saved!")

func _on_body_entered(body: Node2D) -> void:
	if body is PlayerController:
		is_player_nearby = true
		player_ref = body as PlayerController
		print("Press E to rest at Ashen Shrine")

func _on_body_exited(body: Node2D) -> void:
	if body is PlayerController:
		is_player_nearby = false
		player_ref = null
