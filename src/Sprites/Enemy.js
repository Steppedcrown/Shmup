class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, path, texture, frame, speed = 0.2, maxHP, destorySFX) {
        // Start at the beginning of the path
        super(scene, path.getStartPoint().x, path.getStartPoint().y, texture, frame);

        this.scene = scene;
        this.path = path;               
        this.pathProgress = 0;         
        this.speed = speed;        
        this.destroySFX = destorySFX;
        this.hp = maxHP;
        this.maxHP = maxHP;

        this.setScale(0.7);
        this.setDepth(1);

        scene.add.existing(this);
    }

    update(_, delta) {
        this.pathProgress += this.speed * (delta / 1000);

        if (this.pathProgress >= 1) {
            this.pathProgress = 0; // Reset to the start of the path
        }

        // Get the current point along the spline
        const point = this.path.getPoint(this.pathProgress);
        this.setPosition(point.x, point.y);
    }

    destroy() {
        // Remove the enemy from the scene
        this.scene.enemies.remove(this);
        super.destroy();

        // Play the destroy sound effect
        if (this.destroySFX) {
            this.destroySFX.play({ volume: 0.5 });
        }
    }
}
