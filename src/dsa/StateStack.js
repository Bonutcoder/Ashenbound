/**
 * LIFO StateStack Implementation
 * Purpose: Controls active UI states (Gameplay, Lore Modal, Pause Menu).
 * Only the state at the top of the stack receives update/draw calls.
 */

export class StateStack {
  constructor() {
    this.stackArray = [];
  }

  /**
   * Pushes a new state onto the stack in O(1) time.
   * @param {Object} state Must implement update(dt) and draw(ctx)
   */
  pushState(state) {
    if (state.onEnter) state.onEnter();
    this.stackArray.push(state);
  }

  /**
   * Pops the top state from the stack in O(1) time.
   * @returns {Object|null}
   */
  popState() {
    if (this.isEmpty()) return null;
    const popped = this.stackArray.pop();
    if (popped.onExit) popped.onExit();
    return popped;
  }

  /**
   * Peeks at the active top state in O(1) time.
   * @returns {Object|null}
   */
  peek() {
    return this.isEmpty() ? null : this.stackArray[this.stackArray.length - 1];
  }

  size() {
    return this.stackArray.length;
  }

  isEmpty() {
    return this.stackArray.length === 0;
  }

  clear() {
    while (!this.isEmpty()) {
      this.popState();
    }
  }

  /**
   * Updates top state
   * @param {number} dt Delta time
   */
  update(dt) {
    const activeState = this.peek();
    if (activeState && typeof activeState.update === 'function') {
      activeState.update(dt);
    }
  }

  /**
   * Renders active state(s)
   * @param {CanvasRenderingContext2D} ctx 
   */
  draw(ctx) {
    const activeState = this.peek();
    if (activeState && typeof activeState.draw === 'function') {
      activeState.draw(ctx);
    }
  }
}
