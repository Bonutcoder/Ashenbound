# Ashenbound — HUD & Telemetry Controller in GDScript
extends CanvasLayer

@onready var hp_bar_fill: ColorRect = $TopLeftMargin/VBox/HPBarTrack/HPBarFill
@onready var hp_label: Label = $TopLeftMargin/VBox/HPRow/HPLabel
@onready var flask_label: Label = $TopLeftMargin/VBox/HPRow/FlaskLabel

@onready var telemetry_box: ColorRect = $TelemetryBox
@onready var tel_dll_label: Label = $TelemetryBox/VBox/DLLLabel
@onready var tel_heap_label: Label = $TelemetryBox/VBox/HeapLabel
@onready var tel_fps_label: Label = $TelemetryBox/VBox/FPSLabel

func _ready() -> void:
	pass

func _process(delta: float) -> void:
	if Input.is_action_just_pressed("telemetry_toggle"):
		telemetry_box.visible = not telemetry_box.visible

	if tel_fps_label and telemetry_box.visible:
		var fps = Engine.get_frames_per_second()
		tel_fps_label.text = "FPS: %d (%.1fms)" % [fps, delta * 1000.0]

func update_hp(current_hp: int, max_hp: int) -> void:
	if hp_label:
		hp_label.text = "%d / %d" % [current_hp, max_hp]
	if hp_bar_fill:
		var ratio = float(current_hp) / float(max_hp)
		hp_bar_fill.size.x = 160.0 * ratio

func update_flasks(current_flasks: int, max_flasks: int) -> void:
	if flask_label:
		flask_label.text = "  Flasks x %d" % current_flasks

func update_telemetry(dll_size: int, heap_root_str: String) -> void:
	if tel_dll_label:
		tel_dll_label.text = "Entity List Size (DLL): %d" % dll_size
	if tel_heap_label:
		tel_heap_label.text = "Priority Heap Root: %s" % heap_root_str
