/**
 * Ashenbound — Master Configuration
 * Baseline engineering parameters strictly reflecting Ashenbound.md blueprint.
 */
export const CONFIG = {
  // Engine & Canvas Scaling
  CANVAS_WIDTH: 640,
  CANVAS_HEIGHT: 360,
  TARGET_FPS: 60,
  FIXED_STEP: 1000 / 60, // ~16.67ms per tick
  MAX_DELTA_TIME: 100,   // Clamp dt if tab inactive (>100ms -> 16.67ms)

  // Physics
  GRAVITY: 9.8 * 60,
  GROUND_Y: 300,

  // Player Baseline Attributes
  PLAYER: {
    MAX_HP_TIER1: 100,
    MAX_HP_TIER2: 115,  // Post-Rykard HP boost (+15%)
    INITIAL_FLASKS: 1,
    MOVE_SPEED: 180,    // Pixels / second
    JUMP_FORCE: -300,
    DODGE_SPEED: 260,
    DODGE_DURATION_MS: 300,
    DODGE_IFRAMES_MS: 250,
    DODGE_COOLDOWN_MS: 500,
    PARRY_WINDOW_MS: 150,
    PARRY_RECOVERY_MS: 200,
    HEAVY_ATTACK_CRIT_MULT: 1.5, // +50% bonus critical vs staggered targets
    STAGGER_DURATION_MS: 1800,  // 1.5s - 2.0s enemy stagger
  },

  // Keybindings
  KEYS: {
    MOVE_LEFT: 'KeyA',
    MOVE_RIGHT: 'KeyD',
    JUMP: 'ShiftLeft',
    DODGE: 'Space',
    PARRY: 'SecondaryClick', // Right Mouse
    LIGHT_ATTACK: 'PrimaryClick', // Left Mouse
    HEAVY_ATTACK: 'ShiftPrimaryClick',
    HEAL: 'KeyR',
    INTERACT: 'KeyE',
    PAUSE: 'Escape',
    TELEMETRY_TOGGLE: 'F1',
  },

  // Boss Attributes
  BOSSES: {
    FOREST_WARDEN: { id: 'boss_1', name: 'Forest Warden', hp: 250, area: 'Forsaken Woods' },
    IRON_SENTINEL: { id: 'boss_2', name: 'The Iron Sentinel', hp: 300, area: 'Stonesmith Village' },
    RYKARD:        { id: 'boss_3', name: 'Rykard the Blasphemous', hp: 400, area: 'Ruins of Grandeur' },
    MALACHAR:      { id: 'boss_4', name: 'Malachar, The Black Reaper', hp: 500, area: 'Fallen Palace' }
  },

  // Telemetry Defaults
  DEBUG_DEFAULT: false
};
