import { Player } from './player.js';
import { Coin } from './coin.js';
import { Bullet } from './bullet.js';
import { SoundManager } from './sound.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.sounds = new SoundManager();
        this.resize();

        // Game state
        this.score = 0;
        this.isGameOver = false;
        this.difficulty = 1;
        this.lastDifficultyIncrease = 0;
        this.gameTime = 0;
        
        // Game objects
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 60);
        this.coins = [];
        this.bullets = [];
        
        // Spawn timers
        this.coinSpawnTimer = 0;
        this.bulletSpawnTimer = 0;
        
        // Controls
        this.keys = {
            left: false,
            right: false
        };
        this.mouseX = null;
        this.usingMouse = false;
        
        this.setupEventListeners();
        this.setupMobileControls();
        this.setupMouseControls();
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = window.innerHeight * 0.8;
        if (this.player) {
            this.player.y = this.canvas.height - 60;
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.keys.left = true;
                this.usingMouse = false;
            }
            if (e.key === 'ArrowRight') {
                this.keys.right = true;
                this.usingMouse = false;
            }
            e.preventDefault();
        });
        
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') this.keys.left = false;
            if (e.key === 'ArrowRight') this.keys.right = false;
        });

        document.getElementById('restart-button').addEventListener('click', () => {
            this.restart();
        });
    }

    setupMouseControls() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.usingMouse = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouseX = null;
            this.usingMouse = false;
        });
    }

   setupMobileControls() {
    if ('ontouchstart' in window) {
        let lastTouchX = null;

        const handleTouchMove = (e) => {
            e.preventDefault(); // Prevent scrolling & default behaviors
            const rect = this.canvas.getBoundingClientRect();
            lastTouchX = e.touches[0].clientX - rect.left;
        };

        this.canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        this.canvas.addEventListener('touchstart', handleTouchMove, { passive: false });

        this.canvas.addEventListener('touchend', () => {
            lastTouchX = null; // Keep last position instead of resetting to null
        });

        // Modify the main game update function to use lastTouchX
        this.updatePlayer = () => {
            if (lastTouchX !== null) {
                this.mouseX = lastTouchX;
                this.usingMouse = true;
            }
        };
    }
}


    spawnCoin() {
        // Ensure coin stays within bounds
        const coinWidth = 30; 
        const x = Math.random() * (this.canvas.width - coinWidth);
    
        // To ensure coins don’t spawn too close to each other
        if (this.coins.length > 0) {
            const lastCoin = this.coins[this.coins.length - 1];
            if (Math.abs(lastCoin.x - x) < coinWidth) {
                return; // Skip this spawn to prevent overlap
            }
        }
    
        this.coins.push(new Coin(x, -30));
    }

    spawnBullet() {
        const bulletTypes = ['normal', 'fast', 'spiral'];
        const bulletCount = Math.floor(this.difficulty);
        
        // Spawn one of each type
        bulletTypes.forEach(type => {
            const x = Math.random() * (this.canvas.width - 20);
            this.bullets.push(new Bullet(x, -20, type));
        });

        // Ensure at least one bullet spawns
        const numBullets = Math.max(1, bulletCount - 3);

        for (let i = 0; i < numBullets; i++) {
            const x = Math.random() * (this.canvas.width - Bullet.width); // Adjust for actual bullet width
            const randomType = bulletTypes[Math.floor(Math.random() * bulletTypes.length)];

    // Optional: Add variation in speed for difficulty
    const speed = Math.random() * 2 + 3; // Random speed between 3 and 5

    this.bullets.push(new Bullet(x, -20, randomType, speed));
}
    }

    updateDifficulty(deltaTime) {
        this.gameTime += deltaTime;
    
        // Use logarithmic scaling for smoother difficulty increase
        const timeFactor = 1 + Math.log10(1 + this.gameTime / 10000);
        const scoreFactor = 1 + Math.log10(1 + this.score / 200);
    
        // Take the maximum of both but limit it to a max difficulty (e.g., 10)
        this.difficulty = Math.min(Math.max(timeFactor, scoreFactor), 10);
    }

    update(deltaTime) {
        if (this.isGameOver) return;

        this.updateDifficulty(deltaTime);

        if (this.usingMouse && this.mouseX !== null) {
            const targetX = this.mouseX - this.player.width / 2;
            const dx = targetX - this.player.x;
            this.player.x += dx * 0.1;
            if (this.player.x < 0) this.player.x = 0;
            if (this.player.x + this.player.width > this.canvas.width) {
                this.player.x = this.canvas.width - this.player.width;
            }
        } else {
            if (this.keys.left) this.player.moveLeft(deltaTime);
            if (this.keys.right) this.player.moveRight(deltaTime, this.canvas.width);
        }
        
                // Update Coin Spawning
        this.coinSpawnTimer += deltaTime;
        const coinSpawnDelay = Math.max(500, (2000 / this.difficulty) + Math.random() * 200); // Add randomness
        if (this.coinSpawnTimer > coinSpawnDelay) {
            this.spawnCoin();
            this.coinSpawnTimer %= coinSpawnDelay; // Carry over excess time
        }

        // Update Bullet Spawning
        this.bulletSpawnTimer += deltaTime;
        const bulletSpawnDelay = Math.max(300, (1500 / this.difficulty) + Math.random() * 150); // Add randomness
        if (this.bulletSpawnTimer > bulletSpawnDelay) {
            this.spawnBullet();
            this.bulletSpawnTimer %= bulletSpawnDelay; // Carry over excess time
        }

        this.coins = this.coins.filter(coin => {
            coin.update(deltaTime * this.difficulty);
            
            if (this.player.collidesWith(coin)) {
                this.score += 10;
                this.sounds.play('coin');
                document.getElementById('score').textContent = `Score: ${this.score}`;
                return false;
            }
            
            return coin.y < this.canvas.height;
        });

        this.bullets = this.bullets.filter(bullet => {
            bullet.update(deltaTime * this.difficulty);
            
            if (this.player.collidesWith(bullet)) {
                this.player.life -= 10;
                this.sounds.play('hit');
                document.getElementById('life').textContent = `Life: ${this.player.life}`;
                
                if (this.player.life <= 0) {
                    this.gameOver();
                }
                return false;
            }
            
            return bullet.y < this.canvas.height;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.player.draw(this.ctx);
        this.coins.forEach(coin => coin.draw(this.ctx));
        this.bullets.forEach(bullet => bullet.draw(this.ctx));
    }

    gameLoop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        if (!this.isGameOver) {
            requestAnimationFrame((t) => this.gameLoop(t));
        }
    }

    start() {
        this.sounds.load();
        this.gameTime = 0;
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    gameOver() {
        this.isGameOver = true;
        this.sounds.play('gameover');
        document.getElementById('game-over').classList.remove('hidden');
        document.getElementById('final-score').textContent = this.score;
    }

    restart() {
        this.score = 0;
        this.difficulty = 1;
        this.lastDifficultyIncrease = 0;
        this.gameTime = 0;
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 60);
        this.coins = [];
        this.bullets = [];
        this.isGameOver = false;
        this.usingMouse = false;
        document.getElementById('score').textContent = 'Score: 0';
        document.getElementById('life').textContent = 'Life: 100';
        document.getElementById('game-over').classList.add('hidden');
        this.start();
    }
}







