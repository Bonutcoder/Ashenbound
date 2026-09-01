# Ashenbound — Iron Sentinel Boss Controller (Area 2 — Stonesmith Village)
# HP: 300 HP | Archetype: Heavy Armored Knight (Sword & Shield)

class_name IronSentinel
extends BossState

const DIALOGUE_START = "I have stood watch while kingdoms crumbled. I shall not abandon my post now."
const DIALOGUE_50 = "You walk as one alive, yet death follows every step."

func _ready() -> void:
	super._ready()
	max_hp = GameConfig.BOSSES["IRON_SENTINEL"]["hp"]
	current_hp = max_hp
	print("Iron Sentinel Aggro! dialogue:", DIALOGUE_START)

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
			{ "name": "Sword Slash 1", "dmg": 18, "type": "Physical", "parryable": true },
			{ "name": "Sword Slash 2", "dmg": 18, "type": "Physical", "parryable": true },
			{ "name": "Heavy Overhead", "dmg": 25, "type": "Physical", "parryable": true }
		])
