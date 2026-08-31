# Ashenbound — FIFO Attack Queue in GDScript
# Purpose: Caches boss attack combos; cleared on successful player parry.

class_name AttackQueue
extends RefCounted

var queue_array: Array = []

func enqueue_combo(combo_array: Array) -> void:
	for step in combo_array:
		queue_array.append(step)

func enqueue(attack: Dictionary) -> void:
	queue_array.append(attack)

func next_attack() -> Variant:
	if is_empty():
		return null
	return queue_array.pop_front()

func peek() -> Variant:
	return null if is_empty() else queue_array[0]

func clear() -> void:
	queue_array.clear()

func size() -> int:
	return queue_array.size()

func is_empty() -> bool:
	return queue_array.size() == 0
