import { BaseLevel } from "./BaseLevel.js";

export class Level2 extends BaseLevel {
  constructor() {
    super("level2"); // Pass scene key to parent class
    this.totalWaves = 1; // Total number of waves in the level
    this.nextScene = "level3"; // Next scene to load
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
    this.createEnemy("basic", 200, 50, 0);
    this.createEnemy("basic", 300, 50, 0);
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
