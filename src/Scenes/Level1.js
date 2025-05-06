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
    this.playerLaserCooldown = 0.4;
    this.playerLaserCooldownTimer = 0;
    this.playerScore = 0;

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
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Setup sounds
    this.playerLaserSFX = this.sound.add("playerLaser");
    this.playerMovementSFX = this.sound.add("playerMovement");
    this.shipExplosionSFX = this.sound.add("shipExplosion");

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

  // Collision detection for rectangles
  collides(a, b) {
    // Check for overlap on the X-axis
    if (Math.abs(a.x - b.x) > (a.width / 2 + b.width / 2)) {
      return false; // No overlap on the X-axis
    }

    // Check for overlap on the Y-axis
    if (Math.abs(a.y - b.y) > (a.height / 2 + b.height / 2)) {
      return false; // No overlap on the Y-axis
    }

    return true; // Objects are colliding
  }
}
