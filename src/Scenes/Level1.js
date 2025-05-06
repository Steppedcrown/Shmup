import { BaseLevel } from "./BaseLevel.js";

export class Level1 extends BaseLevel {
  constructor() {
    super("level1"); // Pass scene key to parent class
    this.totalWaves = 2; // Total number of waves in the level
  }

  // Preload all necessary assets
  preload() {
    this.preloadAssets();
  }

  create() {
    // Setup keyboard controls
    this.setupInputs();

    // Setup sounds
    this.setupSounds();

    // Add score text
    this.setupText();

    // Add player ship sprite to the screen
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height - 100, "ships", "shipGreen_manned.png", 
                            this.aKey, this.dKey, this.playerSpeed, this.playerMovementSFX, this.playerLaserSFX);

    for (let i = 0; i < this.totalWaves; i++) {
      this.waves[i] = this.add.group({ runChildUpdate: true }); // Group to hold all enemies
    }

    this.createEnemy("basic", "ships", "shipYellow_manned.png", 0.25, 2, 100, this.shipExplosionSFX);
  }

  update(time, delta) {
    // Laser cooldown timer
    this.playerLaserCooldownTimer -= delta / 1000;

    // Update the player ship
    this.player.update();
  }
}
