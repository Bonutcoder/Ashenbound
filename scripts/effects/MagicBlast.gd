# Ashenbound — Magic Blast Projectile Controller in GDScript
# Magic Spell unlocked after defeating Forest Warden (Boss 1).

class_name MagicBlast
extends Area2D

@export var speed: float = 380.0
@export var damage: int = 35
var direction: float = 1.0

func _ready() -> void:
	# Self-destruct after 2.5 seconds if no hit
	var timer = get_tree().create_timer(2.5)
	timer.timeout.connect(queue_free)

func _process(delta: float) -> void:
	position.x += direction * speed * delta

func _on_body_entered(body: Node2D) -> void:
	if body is BossState:
		(body as BossState).take_damage(damage)
		print("Magic Blast hit boss for", damage, "damage!")
		queue_free()
	elif not (body is PlayerController):
		queue_free()
