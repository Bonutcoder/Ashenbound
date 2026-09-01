# Ashenbound — Player Controller in GDScript (The Living Death)
# Single Weapon Choice: SWORD. Magic Spell "BLAST" unlocked post-Boss 1 (Forest Warden).

class_name PlayerController
extends CharacterBody2D

signal hp_changed(current_hp, max_hp)
signal flask_changed(current_flasks, max_flasks)
signal magic_unlocked()

# Attributes
var current_hp: int = 100
var max_hp: int = 100
var flasks: int = 1
var max_flasks: int = 1
const current_weapon: String = "SWORD" # Single weapon throughout game

# Magic Spell Unlock (Unlocked after defeating Boss 1 Forest Warden)
var has_magic_blast: bool = false
var is_magic_on_cooldown: bool = false

# State Flags
var is_parrying: bool = false
var is_dodging: bool = false
var is_attacking: bool = false

# Gravity & Movement
var gravity: float = 580.0

@onready var parry_timer: Timer = $ParryTimer
@onready var dodge_timer: Timer = $DodgeTimer
@onready var animated_sprite: AnimatedSprite2D = $AnimatedSprite2D
@onready var sword_hitbox: Area2D = $SwordHitbox
@onready var sword_sprite: Sprite2D = $SwordHitbox/SwordSprite

var blast_scene: PackedScene = preload("res://scenes/effects/MagicBlast.tscn")

func _ready() -> void:
	max_hp = GameConfig.PLAYER["max_hp_tier1"]
	current_hp = max_hp
	flasks = GameConfig.PLAYER["initial_flasks"]

func unlock_magic_blast() -> void:
	has_magic_blast = true
	emit_signal("magic_unlocked")
	print("MAGIC SPELL UNLOCKED: 'BLAST'! Press Q to cast.")

func _physics_process(delta: float) -> void:
	if not is_on_floor():
		velocity.y += gravity * delta

	_handle_movement()
	_handle_combat_actions()
	_update_animations()

	move_and_slide()

func _handle_movement() -> void:
	if is_dodging or is_attacking: return

	var direction := Input.get_axis("move_left", "move_right")
	if direction != 0:
		velocity.x = direction * GameConfig.PLAYER["move_speed"]
		if animated_sprite:
			animated_sprite.flip_h = (direction < 0)
		if sword_sprite:
			sword_sprite.flip_h = (direction < 0)
		if sword_hitbox:
			sword_hitbox.position.x = -9.0 if direction < 0 else 9.0
	else:
		velocity.x = move_toward(velocity.x, 0, GameConfig.PLAYER["move_speed"])

	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = GameConfig.PLAYER["jump_force"]

func _handle_combat_actions() -> void:
	if Input.is_action_just_pressed("light_attack") and not is_attacking and not is_dodging:
		_execute_attack()

	if Input.is_action_just_pressed("magic_blast") and has_magic_blast and not is_magic_on_cooldown:
		_execute_magic_blast()

	if Input.is_action_just_pressed("parry") and not is_parrying and not is_dodging:
		_execute_parry()

	if Input.is_action_just_pressed("dodge") and not is_dodging and not is_parrying:
		_execute_dodge()

	if Input.is_action_just_pressed("heal"):
		_execute_heal()

func _execute_attack() -> void:
	is_attacking = true
	if animated_sprite and animated_sprite.sprite_frames.has_animation("attack"):
		animated_sprite.play("attack")
	print("Sword Light Attack Executed!")

func _execute_magic_blast() -> void:
	if blast_scene == null: return
	is_magic_on_cooldown = true
	
	var blast = blast_scene.instantiate() as Area2D
	var facing = -1.0 if (animated_sprite and animated_sprite.flip_h) else 1.0
	blast.direction = facing
	blast.position = global_position + Vector2(facing * 20.0, -15.0)
	get_parent().add_child(blast)
	print("MAGIC SPELL CAST: BLAST!")
	
	var cd_timer = get_tree().create_timer(1.5)
	cd_timer.timeout.connect(func(): is_magic_on_cooldown = false)

func _execute_parry() -> void:
	is_parrying = true
	parry_timer.start(GameConfig.PLAYER["parry_window_ms"] / 1000.0)
	print("Parry Window Active (150ms)")

func _execute_dodge() -> void:
	is_dodging = true
	dodge_timer.start(GameConfig.PLAYER["dodge_duration_ms"] / 1000.0)
	var facing = -1.0 if (animated_sprite and animated_sprite.flip_h) else 1.0
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

func _update_animations() -> void:
	if not animated_sprite or is_attacking: return

	if not is_on_floor():
		if animated_sprite.sprite_frames.has_animation("jump"):
			animated_sprite.play("jump")
	elif abs(velocity.x) > 10:
		if animated_sprite.sprite_frames.has_animation("walk"):
			animated_sprite.play("walk")
	else:
		if animated_sprite.sprite_frames.has_animation("idle"):
			animated_sprite.play("idle")

func _on_animated_sprite_2d_animation_finished() -> void:
	if animated_sprite and animated_sprite.animation == "attack":
		is_attacking = false

func _on_parry_timer_timeout() -> void:
	is_parrying = false

func _on_dodge_timer_timeout() -> void:
	is_dodging = false
