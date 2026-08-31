/**
 * AssetMap (Hash Map Lookup Registry) Implementation
 * Purpose: Provides O(1) key-value lookup for weapon parameters, sprite configurations,
 * audio triggers, and enemy stat registries.
 */

export class AssetMap {
  constructor() {
    this.registry = new Map();
  }

  /**
   * Sets a key-value pair in O(1) time.
   * @param {string} key 
   * @param {*} value 
   */
  set(key, value) {
    this.registry.set(key, value);
  }

  /**
   * Retrieves a value by key in O(1) time.
   * @param {string} key 
   * @returns {*}
   */
  get(key) {
    return this.registry.get(key);
  }

  /**
   * Checks if key exists in O(1) time.
   * @param {string} key 
   * @returns {boolean}
   */
  has(key) {
    return this.registry.has(key);
  }

  delete(key) {
    return this.registry.delete(key);
  }

  clear() {
    this.registry.clear();
  }

  size() {
    return this.registry.size;
  }
}

// Pre-configured Weapon Lookup Registry (Hash Map)
export const WEAPON_REGISTRY = new AssetMap();
WEAPON_REGISTRY.set('SWORD', {
  name: 'Sword',
  reach: 30,
  damage: 20,
  heavyDamage: 40,
  attackSpeedMs: 300,
  parryWindowMs: 150
});
WEAPON_REGISTRY.set('SPEAR', {
  name: 'Spear',
  reach: 55,
  damage: 18,
  heavyDamage: 36,
  attackSpeedMs: 350,
  parryWindowMs: 140
});
WEAPON_REGISTRY.set('AXE', {
  name: 'Axe',
  reach: 25,
  damage: 28,
  heavyDamage: 55,
  attackSpeedMs: 450,
  parryWindowMs: 130
});
WEAPON_REGISTRY.set('SCYTHE', {
  name: 'Scythe',
  reach: 45,
  damage: 24,
  heavyDamage: 50,
  attackSpeedMs: 400,
  parryWindowMs: 150
});
WEAPON_REGISTRY.set('BOW', {
  name: 'Bow & Arrow',
  reach: 200,
  damage: 15,
  heavyDamage: 30,
  attackSpeedMs: 500,
  parryWindowMs: 100
});
