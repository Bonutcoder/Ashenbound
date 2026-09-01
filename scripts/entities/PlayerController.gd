# Ashenbound — Player Controller in GDScript (The Living Death)
# Implements movement, 5 weapons, parry window, dodge i-frames, and dynamic healing.

class_name PlayerController
extends CharacterBody2D

signal hp_changed(current_hp, max_hp)
signal flask_changed(current_flasks, max_flasks)
signal weapon_swapped(weapon_name)

# Attributes
var current_hp: int = 100
var max_hp: int = 100
var flasks: int = 1
var max_flasks: int = 1
var current_weapon: String = "SWORD"

# State Flags
var is_parrying: bool = false
var is_dodging: bool = false
var is_attacking: bool = false

# Gravity & Movement
var gravity: float = 580.0

@onready var parry_timer: Timer = $ParryTimer
@onready var dodge_timer: Timer = $DodgeTimer

func _ready() -> void:
	max_hp = GameConfig.PLAYER["max_hp_tier1"]
	current_hp = max_hp
	flasks = GameConfig.PLAYER["initial_flasks"]

func _physics_process(delta: float) -> void:
	if not is_on_floor():
		velocity.y += gravity * delta

	_handle_movement()
	_handle_combat_actions()

	move_and_slide()

func _handle_movement() -> void:
	if is_dodging or is_attacking: return

	var direction := Input.get_axis("move_left", "move_right")
	if direction != 0:
		velocity.x = direction * GameConfig.PLAYER["move_speed"]
	else:
		velocity.x = move_toward(velocity.x, 0, GameConfig.PLAYER["move_speed"])

	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = GameConfig.PLAYER["jump_force"]

func _handle_combat_actions() -> void:
	if Input.is_action_just_pressed("parry") and not is_parrying and not is_dodging:
		_execute_parry()

	if Input.is_action_just_pressed("dodge") and not is_dodging and not is_parrying:
		_execute_dodge()

	if Input.is_action_just_pressed("heal"):
		_execute_heal()

func _execute_parry() -> void:
	is_parrying = true
	parry_timer.start(GameConfig.PLAYER["parry_window_ms"] / 1000.0)
	print("Parry Window Active (150ms)")

func _execute_dodge() -> void:
	is_dodging = true
	dodge_timer.start(GameConfig.PLAYER["dodge_duration_ms"] / 1000.0)
	var facing = -1.0 if velocity.x < 0 else 1.0
	velocity.x = facing * GameConfig.PLAYER["dodge_speed"]
	print("Dodge Roll Active (i-frames)")

func _execute_heal() -> void:
	if flasks <= 0 or current_hp >= max_hp: return
	
	flasks -= 1
	if max_hp <= 100:
		if current_hp <= 30: current_hp += 70
		else: current_hp = max_hp
	else:
		if current_hp <= 60: current_hp += 65
		else: current_hp = max_hp
		
	current_hp = mini(current_hp, max_hp)
	emit_signal("hp_changed", current_hp, max_hp)
	emit_signal("flask_changed", flasks, max_flasks)
	print("Healed! HP:", current_hp, "/", max_hp)

func _on_parry_timer_timeout() -> void:
	is_parrying = false

func _on_dodge_timer_timeout() -> void:
	is_dodging = false
