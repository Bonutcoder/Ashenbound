import { CONFIG } from '../config.js';

/**
 * Renderer Engine Implementation
 * Purpose: Decouples rendering from business logic. Uses integer coordinate rounding
 * (Math.round) to prevent sub-pixel rendering blur on canvas.
 */
export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = CONFIG.CANVAS_WIDTH;
    this.height = CONFIG.CANVAS_HEIGHT;

    this.ctx.imageSmoothingEnabled = false;
  }

  /**
   * Clears the entire canvas viewport for the next frame.
   */
  clear() {
    this.ctx.fillStyle = '#0a0a0e';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Draws a filled rectangle using integer rounding.
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {string} color 
   */
  fillRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      Math.round(x),
      Math.round(y),
      Math.round(width),
      Math.round(height)
    );
  }

  /**
   * Draws a stroke rectangle outline (e.g. for hitboxes).
   * @param {number} x 
   * @param {number} y 
   * @param {number} width 
   * @param {number} height 
   * @param {string} color 
   * @param {number} lineWidth 
   */
  strokeRect(x, y, width, height, color, lineWidth = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(
      Math.round(x) + 0.5,
      Math.round(y) + 0.5,
      Math.round(width),
      Math.round(height)
    );
  }

  /**
   * Draws text cleanly with pixel rounding.
   * @param {string} text 
   * @param {number} x 
   * @param {number} y 
   * @param {string} font 
   * @param {string} color 
   * @param {string} align 
   */
  drawText(text, x, y, font = '16px VT323, monospace', color = '#ffffff', align = 'left') {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = align;
    this.ctx.fillText(text, Math.round(x), Math.round(y));
  }
}
