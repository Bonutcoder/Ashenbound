# Ashenbound — Forest Warden Boss Controller (Area 1 — Forsaken Woods)
# HP: 250 HP | Archetype: Earth Mage / Area Control

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
	# Check 50% HP threshold
	if not is_phase_two and current_hp <= max_hp * 0.5:
		is_phase_two = true
		print("50% HP Threshold:", DIALOGUE_50)

	# Queue attacks into FIFO combo
	if combo_queue.is_empty():
		combo_queue.enqueue_combo([
			{ "name": "Earth Projectile", "dmg": 18, "type": "Magic", "parryable": false },
			{ "name": "Staff Strike", "dmg": 15, "type": "Physical", "parryable": true },
			{ "name": "Earth Spike", "dmg": 22, "type": "Ground", "parryable": false }
		])
