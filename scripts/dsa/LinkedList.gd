# Ashenbound — Doubly Linked List & EntityNode in GDScript
# Purpose: Holds active entity references in memory with O(1) insertion & removal.

class_name DoublyLinkedList
extends RefCounted

class EntityNode:
	var data: Variant
	var next: EntityNode = null
	var prev: EntityNode = null

	func _init(p_data: Variant) -> void:
		data = p_data

var head: EntityNode = null
var tail: EntityNode = null
var size: int = 0

func insert(data: Variant) -> EntityNode:
	var node = EntityNode.new(data)
	if head == null:
		head = node
		tail = node
	else:
		tail.next = node
		node.prev = tail
		tail = node
	size += 1
	return node

func remove(node: EntityNode) -> void:
	if node == null or size == 0:
		return
	if node.prev != null:
		node.prev.next = node.next
	else:
		head = node.next
		
	if node.next != null:
		node.next.prev = node.prev
	else:
		tail = node.prev
		
	node.next = null
	node.prev = null
	size -= 1

func clear() -> void:
	var current = head
	while current != null:
		var next_node = current.next
		current.next = null
		current.prev = null
		current = next_node
	head = null
	tail = null
	size = 0

func to_array() -> Array:
	var arr = []
	var current = head
	while current != null:
		arr.append(current.data)
		current = current.next
	return arr
