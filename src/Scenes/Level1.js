class Level1 extends Phaser.Scene {
    constructor(){
        super("level1");

        // Define keys
        this.aKey = null;
        this.dKey = null;
        this.spaceKey = null;
    }

    preload() {
        // Assets from Kenny Assets pack "Scribble Platformer"
        // https://kenney.nl/assets/alien-ufo-pack 
        this.load.setPath("./assets/");

        // Load ship sprite atlas
        this.load.atlasXML("ships", "sprites/spritesheet_spaceships.png", "sprites/spritesheet_spaceships.xml");
        // Load laser sprite atlas
        this.load.atlasXML("lasers", "sprites/spritesheet_lasers.png", "sprites/spritesheet_lasers.xml");

        // Load audio
        this.load.audio("playerLaser", "audio/laserRetro_000.ogg");
        this.load.audio("playerMovement", "audio/spaceEngine_003.ogg");
        this.load.audio("shipExplosion", "audio/explosionCrunch_001.ogg");
    }

    create() {
        // Create the character sprite
        this.character = this.add.sprite(400, 800, "ships", "shipYellow_manned.png");
        this.character.setScale(0.75);
        this.character.setDepth(0);
        this.projectiles = [];

        // Add inputs
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Set sfx
        this.playerLaserSFX = this.sound.add("playerLaser");
        this.playerMovementSFX = this.sound.add("playerMovement");
        this.shipExplosionSFX = this.sound.add("shipExplosion");

        // Add event listener for space key
        this.input.keyboard.on("keydown-SPACE", () => {
            this.shootLaser();
        });
    }

    update(Time, Delta) {
        // Check for key presses
        let velocity = 0;
        if (this.aKey.isDown) {
            velocity = -10;
        }
        if (this.dKey.isDown) {
            velocity = 10;
        }
        this.movePlayer(velocity);

        // Move projectiles
        this.moveProjectiles();
    }

    moveProjectiles() {
        // Move projectiles
        for (let i = 0; i < this.projectiles.length; i++) {
            let projectile = this.projectiles[i];
            projectile.y -= 18;
            if (projectile.y < 0) {
                projectile.destroy();
                this.projectiles.splice(i, 1);
                i--;
            }
        }
    }

    shootLaser() {
        // Create a new laser projectile
        this.proj = this.add.sprite(this.character.x, this.character.y, "lasers", "laserYellow1.png");
        this.proj.setScale(0.3);
        this.proj.setOrigin(0.5, 1);
        this.proj.setDepth(-1);
        this.projectiles.push(this.proj);

        // Play laser sound effect
        this.playerLaserSFX.play({
            volume: 0.25,
            detune: Phaser.Math.Between(-200, 200)
        });
    }

    movePlayer(velocity) {
        // Move the player
        this.character.x += velocity;

        // Check for screen bounds
        if (this.character.x < 0) {
            this.character.x = 0;
        } else if (this.character.x > this.game.config.width) {
            this.character.x = this.game.config.width;
        }

        if (velocity !== 0) {
            // Play movement sound effect
            if (!this.playerMovementSFX.isPlaying) this.playerMovementSFX.play({volume: 0.2});
        } else {
            // Stop movement sound effect
            if (this.playerMovementSFX.isPlaying) this.playerMovementSFX.stop();
        }
    }
    
    destroyShip() {
        // Play explosion sound effect
        this.shipExplosionSFX.play({volume: 0.5});
    }
}