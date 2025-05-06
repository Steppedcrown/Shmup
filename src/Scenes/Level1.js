// Level1 scene that extends shared logic from BaseLevel
class Level1 extends Phaser.Scene {
  constructor() {
    super("level1"); // Pass scene key to parent class

    // Keys for input
    this.aKey = null;
    this.dKey = null;
    this.spaceKey = null;

    // Game feel variables
    this.playerSpeed = 10;
    this.playerProjectileSpeed = 18;

    // Array to keep track of active projectiles
    this.playerProjectiles = [];

    // Scene-specific variables
    this.playerLaserCooldown = 1;
    this.playerLaserCooldownTimer = 0;

  }

  // Preload all necessary assets (uses BaseLevel’s method)
  preload() {
    this.load.setPath("./assets/");
  
    // Spritesheets
    this.load.atlasXML("ships", "sprites/spritesheet_spaceships.png", "sprites/spritesheet_spaceships.xml");
    this.load.atlasXML("lasers", "sprites/spritesheet_lasers.png", "sprites/spritesheet_lasers.xml");
  
    // Sound effects
    this.load.audio("playerLaser", "audio/laserRetro_000.ogg");
    this.load.audio("playerMovement", "audio/spaceEngine_003.ogg");
    this.load.audio("shipExplosion", "audio/explosionCrunch_001.ogg");
  }

  create() {
    // Setup keyboard controls
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Setup sounds
    this.playerLaserSFX = this.sound.add("playerLaser");
    this.playerMovementSFX = this.sound.add("playerMovement");
    this.shipExplosionSFX = this.sound.add("shipExplosion");

    // Add player ship sprite to the screen
    console.log(this.game.config.width, this.game.config.height);
    this.character = new Player(this, this.game.config.width, this.game.config.height, "ships", "shipGreen_manned.png", this.aKey, this.dKey, this.playerSpeed, this.playerMovementSFX);
  }

  update(time, delta) {
    // Update the player ship
    this.character.update();
  }
}
