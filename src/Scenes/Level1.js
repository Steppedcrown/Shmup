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
    this.character = this.add.sprite(400, 800, "ships", "shipYellow_manned.png");
    this.character.setScale(0.75);
    this.character.setDepth(0);

    // Setup keyboard controls and sound effects
    this.createInput();
    this.setupSounds();
  }

  update(time, delta) {
    // Check for left/right movement
    let velocity = 0;
    if (this.aKey.isDown) velocity = -10;
    if (this.dKey.isDown) velocity = 10;

    // Move the player and update lasers
    this.movePlayer(velocity);
    this.moveProjectiles();
  }
}
