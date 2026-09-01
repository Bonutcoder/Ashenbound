# Ashenbound — Base Boss State Machine in GDScript
# States: IDLE (0), CHASE (1), TELEGRAPH (2), ATTACKING (3), STAGGERED (4)

class_name BossState
extends CharacterBody2D

enum State {
	IDLE,
	CHASE,
	TELEGRAPH,
	ATTACKING,
	STAGGERED
}

signal boss_hp_changed(current_hp, max_hp)
signal boss_staggered(duration_ms)
signal boss_defeated()

var state: State = State.IDLE
var current_hp: int = 100
var max_hp: int = 100
var is_phase_two: bool = false

var combo_queue: AttackQueue = AttackQueue.new()
var gravity: float = 580.0
var target_player: CharacterBody2D = null

@onready var stagger_timer: Timer = Timer.new()

func _ready() -> void:
	add_child(stagger_timer)
	stagger_timer.one_shot = true
	stagger_timer.timeout.connect(_on_stagger_timeout)

func take_damage(amount: int, is_heavy_crit: bool = false) -> void:
	if is_heavy_crit and state == State.STAGGERED:
		amount = int(amount * GameConfig.PLAYER["heavy_attack_crit_mult"]) # +50% critical
		
	current_hp -= amount
	current_hp = maxi(0, current_hp)
	emit_signal("boss_hp_changed", current_hp, max_hp)
	
	if current_hp <= 0:
		_on_death()

func trigger_stagger() -> void:
	combo_queue.clear() # Clear FIFO combo on successful parry
	state = State.STAGGERED
	velocity.x = 0
	var duration_sec = GameConfig.PLAYER["stagger_duration_ms"] / 1000.0
	stagger_timer.start(duration_sec)
	emit_signal("boss_staggered", GameConfig.PLAYER["stagger_duration_ms"])
	print("BOSS STAGGERED! Heavy attack crit window open (1.5s - 2.0s)")

func _on_stagger_timeout() -> void:
	if state == State.STAGGERED:
		state = State.IDLE

func _on_death() -> void:
	emit_signal("boss_defeated")
	queue_free()
