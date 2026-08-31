# Ashenbound — Main Scene Controller in GDScript
extends Node2D

func _ready() -> void:
	print("⚡ Ashenbound Godot 4 Engine Booted!")
	
	# Instantiate and verify baseline DSA modules
	var dll = DoublyLinkedList.new()
	dll.insert("Player")
	dll.insert("ForestWarden")
	print("📜 DoublyLinkedList size:", dll.size)
	
	var pq = PriorityQueue.new()
	pq.enqueue("DAMAGE", 3)
	pq.enqueue("PARRY", 1)
	pq.enqueue("DODGE", 2)
	print("🗡️ Min-Heap Root Priority:", pq.peek().action)
