# Ashenbound — Rykard Boss Controller (Area 3 — Ruins of Grandeur)
# HP: 400 HP | Archetype: Dual-Wielder (Fire & Ice) / Magic Hybrid

class_name Rykard
extends BossState

const DIALOGUE_START = "You have silenced his guardians... yet you still believe you may reach my lord?"
const DIALOGUE_50 = "So... the Living Death finally comes for my lord."

func _ready() -> void:
	super._ready()
	max_hp = GameConfig.BOSSES["RYKARD"]["hp"]
	current_hp = max_hp
	print("Rykard Aggro! dialogue:", DIALOGUE_START)

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
			{ "name": "Fire Sword Slash", "dmg": 25, "type": "Physical", "parryable": true },
			{ "name": "Ice Projectile", "dmg": 22, "type": "Magic", "parryable": false },
			{ "name": "Dual Sword Combo", "dmg": 28, "type": "Physical", "parryable": true }
		])
