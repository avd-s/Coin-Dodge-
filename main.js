import { Game } from './game.js';
import { SoundManager } from './sound.js';

// Initialize game when window loads
window.addEventListener('load', () => {
    const canvas = document.getElementById('gameCanvas');
    const game = new Game(canvas);
    game.start();
});

resizeCanvas() {
    if (window.innerWidth <= 768) { 
        // Mobile: Fullscreen canvas
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    } else {
        // Desktop: Keep fixed size
        this.canvas.width = 800;
        this.canvas.height = 600;
    }
}

// Run resize on load & when screen resizes
window.addEventListener('resize', () => this.resizeCanvas());

// Call it on game start
window.onload = () => {
    game.resizeCanvas();
};
