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
        this.load.setPath("./assets/sprites/");

        // Load ship sprite atlas
        this.load.atlasXML("ships", "spritesheet_spaceships.png", "spritesheet_spaceships.xml");
        // Load laser sprite atlas
        this.load.atlasXML("lasers", "spritesheet_lasers.png", "spritesheet_lasers.xml");
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

        // Add event listener for space key
        this.input.keyboard.on("keydown-SPACE", () => {
            this.proj = this.add.sprite(this.character.x, this.character.y, "lasers", "laserYellow1.png");
            this.proj.setScale(0.3);
            this.proj.setOrigin(0.5, 1);
            this.proj.setDepth(-1);
            this.projectiles.push(this.proj);
        });
    }

    update(Time, Delta) {
        // Check for key presses
        if (this.aKey.isDown) {
            this.character.x -= 10;
        } else if (this.dKey.isDown) {
            this.character.x += 10;
        }

        // Check for screen bounds
        if (this.character.x < 0) {
            this.character.x = 0;
        } else if (this.character.x > this.game.config.width) {
            this.character.x = this.game.config.width;
        }

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
}