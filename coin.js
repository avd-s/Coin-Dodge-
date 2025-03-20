export class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 35;
        this.height = 35;
        this.speed = 0.2;
        
        // Load coin image
        this.image = new Image();
        this.image.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMjQgMjQiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICNhNTU3MTY7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogI2ZmYjIwODsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGNpcmNsZSBjbGFzcz0iY2xzLTIiIGN4PSIxMiIgY3k9IjEyIiByPSIxMiIvPgogIDxnPgogICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTEuNDksMTkuNDVjLS4wNywwLS4xNC0uMDItLjIxLS4wNi0uMTgtLjEyLS4yMy0uMzYtLjEyLS41NGwxLjgxLTIuODNjLjA3LS4xMS4yLS4xOC4zMy0uMThoMy45NGMuMzYsMCwuNjUtLjI5LjY1LS42NXYtNy4yYzAtLjM2LS4yOS0uNjUtLjY1LS42NWgtNC4xMmMtLjIyLDAtLjM5LS4xNy0uMzktLjM5cy4xNy0uMzkuMzktLjM5aDQuMTJjLjc5LDAsMS40My42NCwxLjQzLDEuNDN2Ny4yYzAsLjc5LS42NCwxLjQzLTEuNDMsMS40M2gtMy43MmwtMS43LDIuNjVjLS4wNy4xMi0uMi4xOC0uMzMuMThoMFpNOS42OCwxNi42MmgtMi45MmMtLjc5LDAtMS40My0uNjQtMS40My0xLjQzdi03LjJjMC0uNzkuNjQtMS40MywxLjQzLTEuNDNoMy43Yy4yMiwwLC4zOS4xNy4zOS4zOXMtLjE3LjM5LS4zOS4zOWgtMy43Yy0uMzYsMC0uNjUuMjktLjY1LjY1djcuMmMwLC4zNi4yOS42NS42NS42NWgyLjkyYy4yMiwwLC4zOS4xNy4zOS4zOXMtLjE3LjM5LS4zOS4zOVoiLz4KICAgIDxnPgogICAgICA8Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjE0Ljg3IiBjeT0iMTEuNiIgcj0iLjcyIi8+CiAgICAgIDxjaXJjbGUgY2xhc3M9ImNscy0xIiBjeD0iMTIiIGN5PSIxMS42IiByPSIuNzIiLz4KICAgICAgPGNpcmNsZSBjbGFzcz0iY2xzLTEiIGN4PSI5LjEzIiBjeT0iMTEuNiIgcj0iLjcyIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4='
    }

    update(deltaTime) {
        this.y += this.speed * deltaTime;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}