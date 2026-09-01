# Ashenbound — Malachar Boss Controller (Area 4 — Fallen Palace / Dead Court)
# HP: 500 HP | Titles: The Black Reaper, Bearer of Death, Warden of Hell
# Phase 1 (500-250 HP): Aerial Flight & Physical Dominance
# Phase 2 (250-0 HP): Blood-Imbued Greatsword & Blood Projections DoT (5% Max HP / 3s)

class_name Malachar
extends BossState

const DIALOGUE_START = "O Death, awaken. Let the dead rise, let the living tremble, and let this fallen kingdom kneel once more."
const DIALOGUE_PHASE_2 = "Let the heavens crumble. Let the dead awaken..."

func _ready() -> void:
	super._ready()
	max_hp = GameConfig.BOSSES["MALACHAR"]["hp"]
	current_hp = max_hp
	print("MALACHAR AGGRO! dialogue:", DIALOGUE_START)

func _physics_process(delta: float) -> void:
	if not is_on_floor():
		velocity.y += gravity * delta

	if state == State.IDLE:
		_evaluate_ai_behavior()

	move_and_slide()

func _evaluate_ai_behavior() -> void:
	if not is_phase_two and current_hp <= max_hp * 0.5:
		is_phase_two = true
		combo_queue.clear()
		print("PHASE 2 TRANSITION:", DIALOGUE_PHASE_2)

	if combo_queue.is_empty():
		if not is_phase_two:
			combo_queue.enqueue_combo([
				{ "name": "Flying Dive", "dmg": 40, "type": "Physical", "parryable": true },
				{ "name": "Aerial Greatsword Slash", "dmg": 35, "type": "Physical", "parryable": true },
				{ "name": "Death Dive", "dmg": 50, "type": "Physical", "parryable": true }
			])
		else:
			combo_queue.enqueue_combo([
				{ "name": "Blood Greatsword Slash", "dmg": 40, "type": "Physical", "parryable": true },
				{ "name": "Blood Projection Barrage", "dmg": 15, "type": "DoT", "parryable": false },
				{ "name": "Blood Greatsword Combo", "dmg": 50, "type": "Physical", "parryable": true }
			])
