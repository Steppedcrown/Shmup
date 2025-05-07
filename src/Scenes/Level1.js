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
    // Run initialization functions
    this.init();

    // Setup keyboard controls
    this.setupInputs();

    // Setup sounds
    this.setupSounds();

    // Add text
    this.setupScoreText();
    this.setupHealthText();

    // Add player ship sprite to the screen
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height - 100, "ships", "shipGreen_manned.png", 
                            this.aKey, this.dKey, this.playerSpeed, this.playerMovementSFX, this.playerLaserSFX);

    for (let i = 0; i < this.totalWaves; i++) {
      this.waves[i] = this.add.group({ runChildUpdate: true }); // Group to hold all enemies
    }

    this.createEnemy("basic", 100, 50, 0);
    this.createEnemy("heavy", 200, 50, 1);
    this.createEnemy("beam", 300, 50, 1);
    //this.createEnemy("basic", "ships", "shipPink_manned.png", 0.75, 1, 100, this.shipExplosionSFX, 1, 250, 200, this.basicLaserSFX, 15, 1, 3, 1);
  }

  update(time, delta) {
    // Decremenent timers
    this.playerLaserCooldownTimer -= delta / 1000;
    this.playerDamageCooldownTimer -= delta / 1000;

    // Update waves
    this.updateWave(delta);

    // Update the player ship
    this.player.update();

    // Move background
    this.moveBackground();
  }
}
