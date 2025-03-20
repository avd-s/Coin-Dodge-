export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.speed = 0.5;
        this.life = 100;
        
        // Load player image
        this.image = new Image();
        this.image.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiM2NDZjZmYiIHJ4PSI4Ii8+PC9zdmc+';
    }

    moveLeft(deltaTime) {
        this.x = Math.max(0, this.x - this.speed * deltaTime);
    }
    
    moveRight(deltaTime, canvasWidth) {
        this.x = Math.min(canvasWidth - this.width, this.x + this.speed * deltaTime);
    }
    
    collidesWith(object) {
        const isCollidingX = this.x < object.x + object.width && this.x + this.width > object.x;
        const isCollidingY = this.y < object.y + object.height && this.y + this.height > object.y;
        
        return isCollidingX && isCollidingY;
    }
    
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    reset() {
        this.life = 100;
        this.x = window.innerWidth / 2;
    }
}