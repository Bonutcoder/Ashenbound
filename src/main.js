import { CONFIG } from './config.js';
import { Engine } from './core/Engine.js';

/**
 * Ashenbound App Entry Point
 * Initializes Engine loop, Canvas 2D, and baseline StateStack state.
 */
class AshenboundApp {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.engine = new Engine(this.canvas);

    this.init();
  }

  init() {
    console.log('⚡ Ashenbound Engine 1.0 Initializing...');

    // Push initial Gameplay State onto LIFO StateStack
    const baselineState = {
      name: 'BASE_GAMEPLAY',
      update: (dt) => {
        // Baseline update tick
      },
      draw: (ctx) => {
        // Draw baseline world background
        ctx.fillStyle = '#0e0e14';
        ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);

        // Draw grid
        ctx.strokeStyle = '#1e1e2d';
        ctx.lineWidth = 1;
        for (let x = 0; x < CONFIG.CANVAS_WIDTH; x += 32) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, CONFIG.CANVAS_HEIGHT);
          ctx.stroke();
        }
        for (let y = 0; y < CONFIG.CANVAS_HEIGHT; y += 32) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(CONFIG.CANVAS_WIDTH, y);
          ctx.stroke();
        }

        // Title placeholder text
        ctx.fillStyle = '#c5a059';
        ctx.font = '24px Cinzel, serif';
        ctx.textAlign = 'center';
        ctx.fillText('ASHENBOUND', CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2 - 10);

        ctx.fillStyle = '#8b0000';
        ctx.font = '14px VT323, monospace';
        ctx.fillText('Data Structures for the Living Death', CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2 + 15);
      }
    };

    this.engine.stateStack.pushState(baselineState);
    this.engine.start();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new AshenboundApp();
});
