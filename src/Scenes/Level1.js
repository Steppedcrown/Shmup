import { BaseLevel } from "./BaseLevel.js";

export class Level1 extends BaseLevel {
  constructor() {
    super("level1"); // Pass scene key to parent class
  }

  // Preload all necessary assets
  preload() {
    this.load.setPath("./assets/");
  
    // Spritesheets
    this.load.atlasXML("ships", "sprites/spritesheet_spaceships.png", "sprites/spritesheet_spaceships.xml");
    this.load.atlasXML("lasers", "sprites/spritesheet_lasers.png", "sprites/spritesheet_lasers.xml");
  
    // Sound effects
    this.load.audio("playerLaser", "audio/laserRetro_000.ogg");
    this.load.audio("playerMovement", "audio/spaceEngine_003.ogg");
    this.load.audio("shipExplosion", "audio/explosionCrunch_001.ogg");

    // Font
    this.load.bitmapFont('myFont', 'fonts/myFont.png', 'fonts/myFont.xml');
  }

  create() {
    // Setup keyboard controls
    this.setupInputs();

    // Setup sounds
    this.setupSounds();

    // Add score text
    this.displayScore = this.add.bitmapText(850, 25, 'myFont', 'Score: ' + this.playerScore, 32);

    // Add player ship sprite to the screen
    this.player = new Player(this, this.game.config.width / 2, this.game.config.height - 100, "ships", "shipGreen_manned.png", 
                            this.aKey, this.dKey, this.playerSpeed, this.playerMovementSFX, this.playerLaserSFX);

    // Enemy path
    this.splinePath = new Phaser.Curves.Spline([
      new Phaser.Math.Vector2(100, -50), 
      new Phaser.Math.Vector2(150, 100),
      new Phaser.Math.Vector2(300, 200),
      new Phaser.Math.Vector2(400, 300),
      new Phaser.Math.Vector2(500, 1000)
    ]);

    this.enemies = this.add.group({ runChildUpdate: true });

    const enemy = new Enemy(this, this.splinePath, "ships", "shipYellow_manned.png", 0.25, 2, 100, this.shipExplosionSFX);
    this.enemies.add(enemy);
  }

  update(time, delta) {
    // Laser cooldown timer
    this.playerLaserCooldownTimer -= delta / 1000;

    // Update the player ship
    this.player.update();
  }
}
