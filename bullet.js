export class Bullet {
    constructor(x, y, type = 'normal') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 25;
        this.height = 25;
        
        // Different speeds for different bullet types
        const speeds = {
            normal: 0.3,
            fast: 0.4,
            spiral: 0.1
        };
        this.speed = speeds[type];
        
        // Spiral bullet properties
        this.angle = 0;
        this.amplitude = 50;
        this.originalX = x;
        
        // Load bullet image based on type
        this.image = new Image();
        const images = {
            normal: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMTguMiAzNy42NUMxMTUuOTUgMzUuOTUgOTMuNTQ5OCAxNy42NSA1OS45OTk4IDE3LjY1QzUyLjQ5OTggMTcuNjUgNDUuNTQ5OCAxOC42IDM5LjI0OTggMjAuMDVMOTAuODk5OCA3MS42NUwxMTguMiAzNy42NVpNMTYuMzQ5OCA5Ljg0OTk4TDkuOTk5OCAxNi4yNUwyMC4yNDk4IDI2LjU1QzkuNTQ5OCAzMS40NSAyLjk0OTggMzYuNzUgMS43OTk4IDM3LjY1TDU5Ljk0OTggMTEwLjFMNTkuOTk5OCAxMTAuMTVMNjAuMDQ5OCAxMTAuMUw3OS41NDk4IDg1LjhMOTYuMTQ5OCAxMDIuNEwxMDIuNSA5Ni4wNUwxNi4zNDk4IDkuODQ5OThaIiBmaWxsPSIjRjY2NDYyIi8+Cjwvc3ZnPgo=',
            fast: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02OS41IDI3LjVMNjcuNSAxNy41SDIyLjVWMTAyLjVIMzIuNVY2Ny41SDYwLjVMNjIuNSA3Ny41SDk3LjVWMjcuNUg2OS41WiIgZmlsbD0iI0Y2NjQ2MiIvPgo8L3N2Zz4K',
            spiral: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02MCAxMEMzMi40IDEwIDEwIDMyLjQgMTAgNjBDMTAgODcuNiAzMi40IDExMCA2MCAxMTBDODcuNiAxMTAgMTEwIDg3LjYgMTEwIDYwQzExMCAzMi40IDg3LjYgMTAgNjAgMTBaTTY1IDg1SDU1VjU1SDY1Vjg1Wk02NSA0NUg1NVYzNUg2NVY0NVoiIGZpbGw9IiNGNjY0NjIiLz4KPC9zdmc+Cg=='
       };
        this.image.src = images[type];
    }

    update(deltaTime) {
        if (this.type === 'spiral') {
            // Increase angle for rotation (adjust speed dynamically)
            this.angle += 0.01 * deltaTime; 
    
            // Adjust amplitude dynamically for varied patterns
            this.amplitude = Math.max(15, this.amplitude - 0.01 * deltaTime); 
    
            // Apply sinusoidal motion for spiral effect
            this.x = this.originalX + Math.sin(this.angle) * this.amplitude;
    
            // Move downward
            this.y += this.speed * deltaTime;
        } else {
            // Normal and fast bullets move straight down
            this.y += this.speed * deltaTime;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}