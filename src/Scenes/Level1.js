import { BaseLevel } from "./BaseLevel.js";

// Level1 scene that extends shared logic from BaseLevel
export class Level1 extends BaseLevel {
  constructor() {
    super("level1"); // Pass scene key to parent class

    // Scene-specific variables
    this.playerLaserCooldown = 1;
    this.playerLaserCooldownTimer = 0;
  }

  // Preload all necessary assets (uses BaseLevel’s method)
  preload() {
    this.preloadAssets();
  }

  // Create the character and set up input and sounds
  create() {
    // Add player ship sprite to the screen
    this.character = this.createPlayer();

    // Store enemies in an array
    this.enemies = [];

    // Create an enemy ship
    const curve1 = new Phaser.Curves.Spline([20, 20, 80, 400, 300, 750]);
    const enemy1 = this.createBasicEnemy(curve1, 3000, 1500, true);
    this.enemies.push(enemy1);

    // Setup keyboard controls and sound effects
    this.createInput();
    this.setupSounds();
  }

  update(time, delta) {
    // Check for left/right movement
    let moveDir = 0;
    if (this.aKey.isDown) moveDir = -1;
    if (this.dKey.isDown) moveDir = 1;

    // Check for shooting
    this.playerLaserCooldownTimer -= delta / 1000;
    if (this.spaceKey.isDown) {
      // If the cooldown timer is at 0, shoot a laser
      if (this.playerLaserCooldownTimer <= 0) {
        this.shootLaser();
        this.playerLaserCooldownTimer = this.playerLaserCooldown;
      }
    }

    // Move the player and update lasers
    this.movePlayer(moveDir);
    this.movePlayerProjectiles();
  }
}
