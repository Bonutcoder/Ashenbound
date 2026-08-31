# Ashenbound — Binary Min-Heap Priority Queue in GDScript
# Purpose: Frame-perfect combat event arbitration (P1 Parry > P2 Dodge > P3 Damage).

class_name PriorityQueue
extends RefCounted

class HeapItem:
	var action: String
	var priority: int
	var metadata: Dictionary

	func _init(p_action: String, p_priority: int, p_metadata: Dictionary = {}) -> void:
		action = p_action
		priority = p_priority
		metadata = p_metadata

var heap_array: Array = []

func enqueue(action: String, priority: int, metadata: Dictionary = {}) -> void:
	var item = HeapItem.new(action, priority, metadata)
	heap_array.append(item)
	_bubble_up(heap_array.size() - 1)

func dequeue() -> HeapItem:
	if is_empty():
		return null
	var root = heap_array[0]
	var end_item = heap_array.pop_back()
	if heap_array.size() > 0:
		heap_array[0] = end_item
		_bubble_down(0)
	return root

func peek() -> HeapItem:
	return null if is_empty() else heap_array[0]

func size() -> int:
	return heap_array.size()

func is_empty() -> bool:
	return heap_array.size() == 0

func clear() -> void:
	heap_array.clear()

func _bubble_up(index: int) -> void:
	while index > 0:
		var parent_idx = int((index - 1) / 2)
		if heap_array[index].priority >= heap_array[parent_idx].priority:
			break
		var temp = heap_array[index]
		heap_array[index] = heap_array[parent_idx]
		heap_array[parent_idx] = temp
		index = parent_idx

func _bubble_down(index: int) -> void:
	var length = heap_array.size()
	while true:
		var smallest = index
		var left = 2 * index + 1
		var right = 2 * index + 2
		
		if left < length and heap_array[left].priority < heap_array[smallest].priority:
			smallest = left
		if right < length and heap_array[right].priority < heap_array[smallest].priority:
			smallest = right
			
		if smallest == index:
			break
			
		var temp = heap_array[index]
		heap_array[index] = heap_array[smallest]
		heap_array[smallest] = temp
		index = smallest
