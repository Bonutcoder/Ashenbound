import { CONFIG } from './config.js';

/**
 * Ashenbound — Core Bootloader & Entry Point
 * Demonstrating deterministic Canvas 2D setup and DSA telemetry hook.
 */
class AshenboundApp {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Telemetry state
    this.debugMode = new URLSearchParams(window.location.search).get('debug') === 'true';
    this.telemetryBox = document.getElementById('telemetry-box');

    this.init();
  }

  init() {
    console.log('⚡ Ashenbound Engine 1.0 Booting...');
    console.log('📜 Loaded Configuration:', CONFIG);

    // Initial canvas setup
    this.ctx.imageSmoothingEnabled = false;

    // Toggle telemetry display baseline
    if (!this.debugMode) {
      this.telemetryBox.classList.remove('hidden');
    }

    // Keydown listener for F1 Telemetry toggle
    window.addEventListener('keydown', (e) => {
      if (e.code === 'F1') {
        e.preventDefault();
        this.telemetryBox.classList.toggle('hidden');
      }
    });

    // Render baseline title screen background
    this.renderBaseline();
  }

  renderBaseline() {
    const { CANVAS_WIDTH, CANVAS_HEIGHT } = CONFIG;

    // Dark background
    this.ctx.fillStyle = '#0e0e14';
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Grid baseline demo
    this.ctx.strokeStyle = '#1e1e2d';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < CANVAS_WIDTH; x += 32) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, CANVAS_HEIGHT);
      this.ctx.stroke();
    }
    for (let y = 0; y < CANVAS_HEIGHT; y += 32) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(CANVAS_WIDTH, y);
      this.ctx.stroke();
    }

    // Title placeholder text
    this.ctx.fillStyle = '#c5a059';
    this.ctx.font = '24px Cinzel, serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('ASHENBOUND', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);

    this.ctx.fillStyle = '#8b0000';
    this.ctx.font = '14px VT323, monospace';
    this.ctx.fillText('Data Structures for the Living Death', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 15);
  }
}

// Boot application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AshenboundApp();
});
