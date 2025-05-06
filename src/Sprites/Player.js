class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, aKey, dKey, playerSpeed, movementSFX, laserSFX) {
        super(scene, x, y, texture, frame);

        // Inputs
        this.aKey = aKey;
        this.dKey = dKey;
        this.playerSpeed = playerSpeed;

        // SFX
        this.playerMovementSFX = movementSFX;
        this.playerLaserSFX = laserSFX;

        // Set the scale of the player ship
        this.setScale(0.8);
        this.setDepth(0);

        // Laser group
        this.laserGroup = scene.add.group({
            active: true,
            runChildUpdate: true,
            maxSize: 5
        });

        this.laserGroup.createMultiple({
            classType: Laser,
            key: "lasers",
            frame: "laserYellow1.png",
            active: false,
            visible: false,
            repeat: this.laserGroup.maxSize - 1
        });

        scene.add.existing(this);

        return this;
    }

    update() {
        let moving = false;

        // Moving left
        if (this.aKey.isDown && this.x - this.displayWidth / 2 > 0) {
            this.x -= this.playerSpeed;
            moving = true;
        }

        // Moving right
        if (this.dKey.isDown && this.x + this.displayWidth / 2 < this.scene.game.config.width) {
            this.x += this.playerSpeed;
            moving = true;
        }

        // Play/stop engine sound when moving
        if (moving) {
            if (!this.playerMovementSFX.isPlaying) {
            this.playerMovementSFX.play({ volume: 0.2, loop: true });
            }
        } else {
            if (this.playerMovementSFX.isPlaying) {
            this.playerMovementSFX.stop();
            }
        }

        // Fire laser
        if (this.scene.spaceKey.isDown && this.scene.playerLaserCooldownTimer <= 0) {
            this.scene.playerLaserCooldownTimer = this.scene.playerLaserCooldown;
            let laser = this.laserGroup.getFirstDead();
            if (laser != null) {
                this.scene.playerLaserCooldownTimer = this.scene.playerLaserCooldown;
                laser.makeActive();
                laser.x = this.x;
                laser.y = this.y - (this.displayHeight/2);

                // Play firing sound
                this.playerLaserSFX.play({
                    volume: 0.25,
                    detune: Phaser.Math.Between(-200, 200)
                });
            }
        }
    }
}