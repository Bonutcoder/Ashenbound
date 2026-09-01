# Ashenbound — Forest Warden Boss Controller (Area 1 — Forsaken Woods)
# HP: 250 HP | Archetype: Earth Mage / Area Control
# Reward: Unlocks Magic Spell "BLAST" (Q) for the Player!

class_name ForestWarden
extends BossState

const DIALOGUE_START = "The forest remembers every soul it has claimed... and soon, it shall remember yours."
const DIALOGUE_50 = "The woods know you... yet they cannot remember your name."

func _ready() -> void:
	super._ready()
	max_hp = GameConfig.BOSSES["FOREST_WARDEN"]["hp"]
	current_hp = max_hp
	print("Forest Warden Aggro! dialogue:", DIALOGUE_START)

func _physics_process(delta: float) -> void:
	if not is_on_floor():
		velocity.y += gravity * delta

	if state == State.IDLE:
		_evaluate_ai_behavior()

	move_and_slide()

func _evaluate_ai_behavior() -> void:
	if not is_phase_two and current_hp <= max_hp * 0.5:
		is_phase_two = true
		print("50% HP Threshold:", DIALOGUE_50)

	if combo_queue.is_empty():
		combo_queue.enqueue_combo([
			{ "name": "Earth Projectile", "dmg": 18, "type": "Magic", "parryable": false },
			{ "name": "Staff Strike", "dmg": 15, "type": "Physical", "parryable": true },
			{ "name": "Earth Spike", "dmg": 22, "type": "Ground", "parryable": false }
		])

func _on_death() -> void:
	# Unlock Magic Blast spell for the player upon defeating Boss 1
	var players = get_tree().get_nodes_in_group("player")
	if players.size() > 0 and players[0] is PlayerController:
		(players[0] as PlayerController).unlock_magic_blast()
	else:
		# Fallback search by class
		for node in get_parent().get_children():
			if node is PlayerController:
				(node as PlayerController).unlock_magic_blast()
				break
				
	print("Forest Warden Defeated! Player gained Magic Spell 'BLAST'!")
	super._on_death()
