# Ashenbound — Master Game Configuration in GDScript
# Baseline engineering parameters reflecting Ashenbound blueprint.

class_name GameConfig
extends RefCounted

const CANVAS_WIDTH: int = 640
const CANVAS_HEIGHT: int = 360
const TARGET_FPS: int = 60
const FIXED_STEP: float = 1.0 / 60.0 # 0.01667s

const PLAYER = {
	"weapon": "SWORD",             # Single weapon choice throughout game
	"magic_spell": "BLAST",        # Unlocked post-Boss 1 (Forest Warden)
	"max_hp_tier1": 100,
	"max_hp_tier2": 115,           # Post-Rykard HP boost (+15%)
	"initial_flasks": 1,
	"move_speed": 180.0,
	"jump_force": -300.0,
	"dodge_speed": 260.0,
	"dodge_duration_ms": 300,
	"dodge_iframes_ms": 250,
	"parry_window_ms": 150,
	"heavy_attack_crit_mult": 1.5, # +50% bonus critical vs staggered targets
	"stagger_duration_ms": 1800   # 1.5s - 2.0s enemy stagger
}

const BOSSES = {
	"FOREST_WARDEN": { "id": "boss_1", "name": "Forest Warden", "hp": 250, "area": "Forsaken Woods", "reward": "MAGIC_SPELL_BLAST" },
	"IRON_SENTINEL": { "id": "boss_2", "name": "The Iron Sentinel", "hp": 300, "area": "Stonesmith Village" },
	"RYKARD":        { "id": "boss_3", "name": "Rykard the Blasphemous", "hp": 400, "area": "Ruins of Grandeur", "reward": "HP_BOOST_15" },
	"MALACHAR":      { "id": "boss_4", "name": "Malachar, The Black Reaper", "hp": 500, "area": "Fallen Palace" }
}
