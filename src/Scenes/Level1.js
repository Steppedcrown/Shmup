import { BaseLevel } from "./BaseLevel.js";

// Level1 scene that extends shared logic from BaseLevel
export class Level1 extends BaseLevel {
  constructor() {
    super("level1"); // Pass scene key to parent class
  }

  // Preload all necessary assets (uses BaseLevel’s method)
  preload() {
    this.preloadAssets();
  }

  // Create the character and set up input and sounds
  create() {
    // Add player ship sprite to the screen
    this.character = this.createPlayer();

    // Create an enemy ship
    this.curve = new Phaser.Curves.Spline([
      20, 20,
      80, 400,
      300, 750
    ]);
    this.enemy00 = this.createBasicEnemy(this.curve, 5000);

    // Setup keyboard controls and sound effects
    this.createInput();
    this.setupSounds();
  }

  update(time, delta) {
    // Check for left/right movement
    let moveDir = 0;
    if (this.aKey.isDown) moveDir = -1;
    if (this.dKey.isDown) moveDir = 1;

    // Move the player and update lasers
    this.movePlayer(moveDir);
    this.movePlayerProjectiles();
  }
}
