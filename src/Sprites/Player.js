class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, gameWidth, gameHeight, texture, frame, aKey, dKey, playerSpeed, movementSFX) {
        super(scene, gameWidth / 2, gameHeight - 100, texture, frame);

        // Game size
        this.gameWidth = gameWidth*2;
        this.gameHeight = gameHeight;

        // Inputs
        this.aKey = aKey;
        this.dKey = dKey;
        this.playerSpeed = playerSpeed;

        // SFX
        this.playerMovementSFX = movementSFX;

        scene.add.existing(this);

        return this;
    }

    update() {
        let moving = false;

        // Moving left
        if (this.aKey.isDown) {
            // Check to make sure the sprite can actually move left
            if (this.x > 0) {
                this.x -= this.playerSpeed;
                moving = true;
            }
        }

        // Moving right
        if (this.dKey.isDown) {
            // Check to make sure the sprite can actually move right
            if (this.x < this.gameWidth) {
                this.x += this.playerSpeed;
                moving = true;
            }
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
    }
}