import { BaseLevel } from "./BaseLevel.js";

export class Level3 extends BaseLevel {
  constructor() {
    super("level3"); // Pass scene key to parent class
    this.totalWaves = 3; // Total number of waves in the level
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

    this.createEnemy("heavy", 250, 100, 0);
    this.createEnemy("basic", 350, 100, 0);
    this.createEnemy("heavy", 450, 100, 0);
    this.createEnemy("heavy", 200, 175, 0);
    this.createEnemy("heavy", 300, 175, 0);
    this.createEnemy("heavy", 400, 175, 0);

    this.createEnemy("basic", 600, 50, 1);
    this.createEnemy("basic", 700, 50, 1);
    this.createEnemy("basic", 800, 50, 1);
    this.createEnemy("heavy", 550, 125, 1);
    this.createEnemy("heavy", 650, 125, 1);
    this.createEnemy("heavy", 750, 125, 1);

    this.createEnemy("heavy", 400, 250, 2);
    this.createEnemy("heavy", 500, 250, 2);
    this.createEnemy("basic", 350, 325, 2);
    this.createEnemy("basic", 450, 325, 2);
    this.createEnemy("basic", 550, 325, 2);
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
