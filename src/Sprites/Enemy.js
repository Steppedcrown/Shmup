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
                this.path.points.unshift(new Phaser.Math.Vector2(this.initX, -50)); // Make ship reappear at the top
            }

            // Get the current point along the spline
            const point = this.path.getPoint(this.pathProgress);
            this.setPosition(point.x, point.y);
        } else {
            this.x += this.scene.groupMoveSpd;
            if (this.x > this.scene.game.config.width - 100) {
                this.scene.groupMoveSpd *= -1;
            }
            if (this.x < 100) {
                this.scene.groupMoveSpd *= -1;
            }
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

        // Create a new array of points starting with the current position and offset them
        let splinePoints = [new Phaser.Math.Vector2(this.x, this.y),];
        for (let i = 0; i < this.path.points.length; i++) {
            splinePoints.push(new Phaser.Math.Vector2(this.x/2 + this.path.points[i].x, this.y/2 + this.path.points[i].y));
        }

        // Create a new spline with those points
        this.path = new Phaser.Curves.Spline(splinePoints);
    }
}
