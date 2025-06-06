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
        let playerScale = 0.5;
        this.setScale(playerScale);
        this.setDepth(0);
        this.setOrigin(0.5, 0.5);

        // Shrink the sprite to fix its hitbox
        let reduction = 0.2;
        this.width *= (playerScale - reduction);
        this.height *= (playerScale - reduction);

        // Create laser group
        this.laserGroup = scene.add.group({
            active: true,
            runChildUpdate: true,
            maxSize: 5
        });

        // Add lasers to the group
        this.laserGroup.createMultiple({
            classType: Laser,
            key: "lasers",
            frame: "laserYellow1.png",
            active: false,
            visible: false,
            setXY: { x: -100, y: -100 },  // hides inactive lasers
            repeat: this.laserGroup.maxSize - 1
        });

        scene.add.existing(this);

        return this;
    }

    update() {
        if (this.scene.playerAlive) {
            // Check for collision with enemies
            for (let waveGroup of this.scene.waves) {
                for (let enemy of waveGroup.getChildren()) {
                    if (this.scene.collides(this, enemy)) {
                        this.scene.damagePlayer(1);
                    }
                }
            }

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
                this.playerMovementSFX.play();
                }
            } else {
                if (this.playerMovementSFX.isPlaying) {
                this.playerMovementSFX.stop();
                }
            }

            // Fire laser if space key is pressed and cooldown timer is up
            if (this.scene.spaceKey.isDown && this.scene.playerLaserCooldownTimer <= 0) {
                let laser = this.laserGroup.getFirstDead(); // Get a dead laser from the group
                if (laser) { // If there is a dead laser available
                    this.scene.playerLaserCooldownTimer = this.scene.playerLaserCooldown; // Reset cooldown timer
                    laser.makeActive(); // Activate the laser
                    laser.x = this.x; // Set laser position to player position
                    laser.y = this.y - (this.displayHeight/2); // Set laser position to just above the player

                    // Play firing sound
                    this.playerLaserSFX.play({
                        detune: Phaser.Math.Between(-200, 200)
                    });
                }
            }
        }
    }
}