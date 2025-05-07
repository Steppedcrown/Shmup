class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, path, texture, frame, pathSet, speed = 0.2, maxHP, points, destorySFX, initX, initY, laserSFX, projSpd, damage, maxLasers, laserCooldown, laserKey, laserFrame) {
        // Start at the beginning of the path
        super(scene, initX, initY, texture, frame);
        this.initX = null;
        this.initY = null;

        this.scene = scene;
        this.path = path;               
        this.pathProgress = 0;         
        this.speed = speed;
        this.pathSet = pathSet;     
        this.destroySFX = destorySFX;
        this.hp = maxHP;
        this.maxHP = maxHP;
        this.points = points;
        this.destroyed = false;

        // Lasers
        this.maxLasers = maxLasers;
        this.laserSFX = laserSFX;
        this.projSpd = projSpd;
        this.damage = damage;
        this.laserCooldown = laserCooldown;
        this.laserTimer = this.laserCooldown;
        this.laserKey = laserKey;
        this.laserFrame = laserFrame;

        // Create laser group
        this.laserGroup = scene.add.group({
            active: true,
            runChildUpdate: true,
            maxSize: maxLasers
        });

        // Add lasers to the group
        this.laserGroup.createMultiple({
            classType: EnemyLaser,
            key: this.laserKey,
            frame: this.laserFrame,
            active: false,
            visible: false,
            projSpd: this.projSpd,
            setXY: { x: -100, y: -100 },  // hides inactive lasers
            repeat: this.laserGroup.maxSize - 1
        });

        this.laserGroup.children.iterate((laser) => {
            laser.init(this.projSpd, this.damage);
        });

        this.visible = true;
        this.active = true;
        this.waveActive = false;

        this.setScale(0.7);
        this.setDepth(1);
        this.setOrigin(0.5, 0.5);

        scene.add.existing(this);
    }

    update(_, delta) {
        if (this.waveActive) {
            this.laserTimer -= delta / 1000;
            if (this.laserTimer < 0) {
                this.shoot();
            }

            this.pathProgress += this.speed * (delta / 1000);

            if (this.pathProgress >= 1) {
                this.pathProgress = 0; // Reset to the start of the path
                this.path = Phaser.Utils.Array.GetRandom(this.pathSet); // Get a random path from the set
                //this.path.points.unshift(new Phaser.Math.Vector2(this.initX, -75)); // Add the first point to the path
                let splinePoints = [new Phaser.Math.Vector2(this.initX, -25),];
                for (let i = 0; i < this.path.points.length; i++) {
                    splinePoints.push(new Phaser.Math.Vector2(this.initX/4 + this.path.points[i].x, this.initY/4 + this.path.points[i].y));
                } 
                // Create a new spline with those points
                this.path = new Phaser.Curves.Spline(splinePoints);
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
        if (this.destroyed) return; // Prevent double destruction
        this.destroyed = true; // Mark as destroyed

        // Update score 
        this.scene.playerScore += this.points;
        this.scene.displayScore.setText('Score: ' + this.scene.playerScore);

        // Play the destroy sound effect
        if (this.destroySFX && this.scene.playerAlive) {
            this.destroySFX.play();
        }

        super.destroy(); // destroy the enemy sprite

        // Remove the enemy from the scene
        if (
            this.scene &&
            this.scene.waves &&
            this.scene.wave !== undefined &&
            this.scene.waves[this.scene.wave]
        ) {
            // Remove the enemy from the scene
            this.scene.waves[this.scene.wave].remove(this, true, true);

        }
    }

    makeActive() {
        this.waveActive = true;
        this.initX = this.x;
        this.initY = this.y;

        // Create a new array of points starting with the current position and offset them
        let splinePoints = [new Phaser.Math.Vector2(this.x, this.y),];
        for (let i = 0; i < this.path.points.length; i++) {
            splinePoints.push(new Phaser.Math.Vector2(this.initX/4 + this.path.points[i].x, this.initY/4 + this.path.points[i].y));
        }

        // Create a new spline with those points
        this.path = new Phaser.Curves.Spline(splinePoints);
    }

    shoot() {
        let laser = this.laserGroup.getFirstDead(); // Get a dead laser from the group
        if (laser) { // If there is a dead laser available
            this.laserTimer = this.laserCooldown; // Reset cooldown
            laser.makeActive(); // Activate the laser
            laser.x = this.x; // Set laser position to player position
            laser.y = this.y - (this.displayHeight/2); // Set laser position to just above the player

            // Play firing sound
            this.laserSFX.play({
                detune: Phaser.Math.Between(-200, 200)
            });
        }
    }
}
