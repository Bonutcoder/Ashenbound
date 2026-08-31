import { CONFIG } from '../config.js';

/**
 * Input Engine Implementation
 * Purpose: Buffers keyboard & mouse events into a 3-frame queue.
 * Guarantees zero dropped inputs during frame transitions.
 */
export class InputManager {
  constructor() {
    this.keysPressed = new Set();
    this.keysJustPressed = new Set();
    this.mouseButtons = new Set();
    this.mouseJustPressed = new Set();

    // 3-frame input buffer queue
    this.inputBufferQueue = [];
    this.BUFFER_FRAME_LIFESPAN = 3; // Kept valid for up to 3 frames

    this._setupListeners();
  }

  _setupListeners() {
    window.addEventListener('keydown', (e) => {
      if (!this.keysPressed.has(e.code)) {
        this.keysJustPressed.add(e.code);
        this._bufferInput({ type: 'KEY_DOWN', code: e.code, frameLife: this.BUFFER_FRAME_LIFESPAN });
      }
      this.keysPressed.add(e.code);

      // Prevent default scrolling on space / arrows / shift
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ShiftLeft'].includes(e.code)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keysPressed.delete(e.code);
    });

    window.addEventListener('mousedown', (e) => {
      const buttonCode = e.button === 0 ? 'PrimaryClick' : e.button === 2 ? 'SecondaryClick' : `Mouse_${e.button}`;
      if (!this.mouseButtons.has(buttonCode)) {
        this.mouseJustPressed.add(buttonCode);
        this._bufferInput({ type: 'MOUSE_DOWN', code: buttonCode, frameLife: this.BUFFER_FRAME_LIFESPAN });
      }
      this.mouseButtons.add(buttonCode);
    });

    window.addEventListener('mouseup', (e) => {
      const buttonCode = e.button === 0 ? 'PrimaryClick' : e.button === 2 ? 'SecondaryClick' : `Mouse_${e.button}`;
      this.mouseButtons.delete(buttonCode);
    });

    // Prevent context menu on RMB for Parry
    window.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  _bufferInput(inputEvent) {
    this.inputBufferQueue.push(inputEvent);
  }

  /**
   * Called once per frame tick to update input buffer lifespans.
   */
  update() {
    this.keysJustPressed.clear();
    this.mouseJustPressed.clear();

    // Age buffered inputs and purge expired (>3 frames)
    this.inputBufferQueue = this.inputBufferQueue
      .map(item => ({ ...item, frameLife: item.frameLife - 1 }))
      .filter(item => item.frameLife > 0);
  }

  isKeyDown(code) {
    return this.keysPressed.has(code);
  }

  isKeyJustPressed(code) {
    return this.keysJustPressed.has(code);
  }

  isMouseDown(code) {
    return this.mouseButtons.has(code);
  }

  isMouseJustPressed(code) {
    return this.mouseJustPressed.has(code);
  }

  /**
   * Consumes a matching action from the 3-frame buffer if present.
   * @param {string} code 
   * @returns {boolean}
   */
  consumeBufferedInput(code) {
    const index = this.inputBufferQueue.findIndex(item => item.code === code);
    if (index !== -1) {
      this.inputBufferQueue.splice(index, 1);
      return true;
    }
    return false;
  }

  clear() {
    this.keysPressed.clear();
    this.keysJustPressed.clear();
    this.mouseButtons.clear();
    this.mouseJustPressed.clear();
    this.inputBufferQueue = [];
  }
}
