/**
 * Memento Checkpoint System Implementation
 * Purpose: Restores exact room and player state upon death without reloading the browser.
 * Serializes state to Base64 LocalStorage with bounds checking.
 */

export class MementoSnapshot {
  constructor(playerStats, currentRespawnNodeId, unlockedKeys, defeatedBosses) {
    this.timestamp = Date.now();
    this.playerStats = JSON.parse(JSON.stringify(playerStats)); // Deep copy
    this.currentRespawnNodeId = currentRespawnNodeId;
    this.unlockedKeys = [...unlockedKeys];
    this.defeatedBosses = [...defeatedBosses];
  }
}

export class MementoManager {
  constructor() {
    this.activeSnapshot = null;
    this.STORAGE_KEY = 'ASHENBOUND_MEMENTO_SAVE';
  }

  /**
   * Captures a new Memento snapshot upon resting at an Ashen Shrine.
   * @param {Object} playerStats { hp, maxHp, flasks, maxFlasks, armorUpgrade }
   * @param {string} respawnNodeId 
   * @param {Array<string>} unlockedKeys 
   * @param {Array<string>} defeatedBosses 
   * @returns {MementoSnapshot}
   */
  createCheckpoint(playerStats, respawnNodeId, unlockedKeys = [], defeatedBosses = []) {
    // Clamping & Bounds checking
    const sanitizedStats = {
      hp: Math.min(playerStats.hp, playerStats.maxHp),
      maxHp: playerStats.maxHp,
      flasks: playerStats.flasks,
      maxFlasks: playerStats.maxFlasks,
      currentWeapon: playerStats.currentWeapon || 'SWORD',
      armorUpgrade: !!playerStats.armorUpgrade
    };

    this.activeSnapshot = new MementoSnapshot(
      sanitizedStats,
      respawnNodeId,
      unlockedKeys,
      defeatedBosses
    );

    // Save to LocalStorage (Base64 Encoded for memory security)
    this.saveToStorage();
    return this.activeSnapshot;
  }

  /**
   * Restores snapshot memory upon player death in O(1) time.
   * @returns {MementoSnapshot|null}
   */
  restoreCheckpoint() {
    if (!this.activeSnapshot) {
      this.loadFromStorage();
    }
    return this.activeSnapshot;
  }

  saveToStorage() {
    if (!this.activeSnapshot || typeof localStorage === 'undefined') return;
    try {
      const jsonStr = JSON.stringify(this.activeSnapshot);
      const encoded = btoa(jsonStr);
      localStorage.setItem(this.STORAGE_KEY, encoded);
    } catch (e) {
      console.warn('Memento save failed:', e);
    }
  }

  loadFromStorage() {
    if (typeof localStorage === 'undefined') return null;
    try {
      const encoded = localStorage.getItem(this.STORAGE_KEY);
      if (!encoded) return null;
      const jsonStr = atob(encoded);
      const data = JSON.parse(jsonStr);

      // Bounds validation check
      if (data && data.playerStats && data.currentRespawnNodeId) {
        data.playerStats.hp = Math.min(data.playerStats.hp, data.playerStats.maxHp);
        this.activeSnapshot = data;
        return this.activeSnapshot;
      }
    } catch (e) {
      console.warn('Memento save string corrupted. Resetting to baseline shrine.', e);
      if (typeof localStorage !== 'undefined') localStorage.removeItem(this.STORAGE_KEY);
    }
    return null;
  }

  clearStorage() {
    this.activeSnapshot = null;
    if (typeof localStorage !== 'undefined') localStorage.removeItem(this.STORAGE_KEY);
  }
}
