class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, path, texture, frame, speed = 0.2, maxHP, points, destorySFX, initX, initY) {
        // Start at the beginning of the path
        super(scene, initX, initY, texture, frame);
        this.initX = initX;
        this.initY = initY;

        this.scene = scene;
        this.path = path;               
        this.pathProgress = 0;         
        this.speed = speed;        
        this.destroySFX = destorySFX;
        this.hp = maxHP;
        this.maxHP = maxHP;
        this.points = points;

        this.visible = true;
        this.active = true;
        this.waveActive = false;

        this.setScale(0.7);
        this.setDepth(1);

        scene.add.existing(this);
    }

    update(_, delta) {
        if (this.waveActive) {
            this.pathProgress += this.speed * (delta / 1000);

            if (this.pathProgress >= 1) {
                this.pathProgress = 0; // Reset to the start of the path
            }

            // Get the current point along the spline
            const point = this.path.getPoint(this.pathProgress);
            this.setPosition(point.x, point.y);
        } else {
        }
    }

    destroy() {
        // Remove the enemy from the scene
        this.scene.waves[this.scene.wave].remove(this);
        
        // Update score
        this.scene.playerScore += this.points;
        this.scene.displayScore.setText('Score: ' + this.scene.playerScore);

        // Play the destroy sound effect
        if (this.destroySFX) {
            this.destroySFX.play({ volume: 0.5 });
        }

        super.destroy(); // destroy the enemy sprite
    }

    makeActive() {
        this.waveActive = true;
    }
}
