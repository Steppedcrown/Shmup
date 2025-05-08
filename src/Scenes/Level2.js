import { BaseLevel } from "./BaseLevel.js";

export class Level2 extends BaseLevel {
  constructor() {
    super("level2"); // Pass scene key to parent class
    this.totalWaves = 3; // Total number of waves in the level
    this.nextScene = "level3"; // Next scene to load
  }

  create() {
    // Run initialization functions
    this.initGame();

    // Add player ship sprite to the screen
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height - 100, "ships", "shipGreen_manned.png", 
                            this.aKey, this.dKey, this.playerSpeed, this.playerMovementSFX, this.playerLaserSFX);

    for (let i = 0; i < this.totalWaves; i++) {
      this.waves[i] = this.add.group({ runChildUpdate: true }); // Group to hold all enemies
    }

    this.createEnemy("basic", 200, 50, 0);
    this.createEnemy("heavy", 300, 50, 0);
    this.createEnemy("basic", 400, 50, 0);
    this.createEnemy("heavy", 150, 125, 0);
    this.createEnemy("basic", 250, 125, 0);
    this.createEnemy("heavy", 350, 125, 0);

    this.createEnemy("heavy", 700, 150, 1);
    this.createEnemy("heavy", 800, 150, 1);
    this.createEnemy("heavy", 750, 225, 1);
    this.createEnemy("heavy", 850, 225, 1);

    this.createEnemy("basic", 400, 300, 2);
    this.createEnemy("basic", 500, 300, 2);
    this.createEnemy("basic", 450, 375, 2);
    this.createEnemy("basic", 550, 375, 2);
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
