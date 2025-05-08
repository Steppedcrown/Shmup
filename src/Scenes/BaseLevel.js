export class BaseLevel extends Phaser.Scene {
    constructor(key) {
      super(key);

        // Keys for input
        this.aKey = null;
        this.dKey = null;
        this.spaceKey = null;

        // Scene variables
        this.nextScene = null;

        // Game feel variables
        this.playerSpeed = 10;
        this.playerProjectileSpeed = 20;

        // Basic enemy variables
        this.basicProjSpd = 15;
        this.basicLaserCooldown = 0.8;
        this.basicDamage = 1;
        this.basicMaxHP = 1;
        this.basicPoints = 150;
        this.basicMaxLasers = 3;
        this.basicSpd = 0.4;

        // Heavy enemy variables
        this.heavyProjSpd = 10;
        this.heavyLaserCooldown = 1.25;
        this.heavyDamage = 2;
        this.heavyMaxHP = 4;
        this.heavyPoints = 250;
        this.heavyMaxLasers = 2;
        this.heavySpd = 0.25;

        // Beam enemy variables
        this.beamProjSpd = 5;
        this.beamLaserCooldown = 0.2;
        this.beamDamage = 1;
        this.beamMaxHP = 2;
        this.beamPoints = 300;
        this.beamMaxLasers = 20;
        this.beamSpd = 0.5;

        // Player variables
        this.playerLaserCooldown = 0.8;
        this.playerDamage = 1;
        this.playerDamageCooldown = 0.5;
        this.playerMaxHP = 5;

        // Wave variables
        this.totalWaves = 0;
        this.waveStart = 1;
        this.groupMoveSpd = 5;

        // Basic enemy paths
        const basicPath1 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(100, 50),
            new Phaser.Math.Vector2(200, 150),
            new Phaser.Math.Vector2(400, 300),
            new Phaser.Math.Vector2(600, 450),
            new Phaser.Math.Vector2(1050, 600)
        ]);
        const basicPath2 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(750, 50),
            new Phaser.Math.Vector2(600, 200),
            new Phaser.Math.Vector2(500, 400),
            new Phaser.Math.Vector2(300, 600),
            new Phaser.Math.Vector2(-100, 900)
        ]);
        const basicPath3 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(0, 100),
            new Phaser.Math.Vector2(150, 250),
            new Phaser.Math.Vector2(400, 400),
            new Phaser.Math.Vector2(650, 600),
            new Phaser.Math.Vector2(1000, 950)
        ]);
        const basicPath4 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(500, 50),
            new Phaser.Math.Vector2(520, 200),
            new Phaser.Math.Vector2(540, 400),
            new Phaser.Math.Vector2(560, 600),
            new Phaser.Math.Vector2(580, 950)
        ]);
        this.basicPaths = [basicPath1, basicPath2, basicPath3, basicPath4];

        // Heavy
        const heavyPath1 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(100, 0),
            new Phaser.Math.Vector2(250, 100),
            new Phaser.Math.Vector2(400, 200),
            new Phaser.Math.Vector2(600, 300),
            new Phaser.Math.Vector2(800, 450),
            new Phaser.Math.Vector2(1050, 600)
        ]);
        const heavyPath2 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(700, 0),
            new Phaser.Math.Vector2(550, 100),
            new Phaser.Math.Vector2(400, 200),
            new Phaser.Math.Vector2(250, 300),
            new Phaser.Math.Vector2(100, 400),
            new Phaser.Math.Vector2(-50, 500)
        ]);
        const heavyPath3 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(500, 0),
            new Phaser.Math.Vector2(600, 200),
            new Phaser.Math.Vector2(700, 400),
            new Phaser.Math.Vector2(750, 600),
            new Phaser.Math.Vector2(800, 800),
            new Phaser.Math.Vector2(850, 1000)
        ]);
        const heavyPath4 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(300, 50),
            new Phaser.Math.Vector2(450, 200),
            new Phaser.Math.Vector2(600, 350),
            new Phaser.Math.Vector2(650, 450),
            new Phaser.Math.Vector2(600, 550),
            new Phaser.Math.Vector2(450, 950)
        ]);
        this.heavyPaths = [heavyPath1, heavyPath2, heavyPath3, heavyPath4];

        // Beam
        const beamPath1 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(100, 0),
            new Phaser.Math.Vector2(200, 100),
            new Phaser.Math.Vector2(300, 200),
            new Phaser.Math.Vector2(400, 200),
            new Phaser.Math.Vector2(300, 200),
            new Phaser.Math.Vector2(200, 200),
            new Phaser.Math.Vector2(100, 200),
            new Phaser.Math.Vector2(-100, 200)
        ]);
        this.beamPaths = [beamPath1];
    }

    preloadAssets() {
        this.load.setPath("./assets/");
  
        // Spritesheets
        this.load.atlasXML("ships", "sprites/spritesheet_spaceships.png", "sprites/spritesheet_spaceships.xml");
        this.load.atlasXML("lasers", "sprites/spritesheet_lasers.png", "sprites/spritesheet_lasers.xml");
    
        // Sound effects
        this.load.audio("playerLaser", "audio/laserRetro_000.ogg");
        this.load.audio("playerMovement", "audio/spaceEngine_003.ogg");
        this.load.audio("shipExplosion", "audio/explosionCrunch_001.ogg");
        this.load.audio("basicLaser", "audio/laserSmall_004.ogg");

        // Background music
        this.load.audio("bgMusic", "audio/brain-implant-cyberpunk-sci-fi-trailer-action-intro-330416.mp3");

        // Background image
        this.load.image("starfield1", "backgrounds/starfield1.png");
        this.load.image("starfield2", "backgrounds/starfield2.png");

        // Font
        this.load.bitmapFont('myFont', 'fonts/myFont.png', 'fonts/myFont.xml');
    }

    init() {
        // Add background
        this.starfield1 = this.add.image(0, 0, "starfield1").setOrigin(0, 0).setScale(1).setDepth(-100);
        this.starfield2 = this.add.image(0, 900, "starfield2").setOrigin(0, 0).setScale(1).setDepth(-100);

        // Player variables
        this.playerProjectiles = [];
        this.playerScore = 0;
        this.playerHp = this.playerMaxHP;
        this.playerLaserCooldownTimer = 0;
        this.playerDamageCooldownTimer = 0;
        this.playerAlive = true;

        // Wave variables
        this.wave = 0;
        this.waves = [];
        this.midWave = true;
        this.midWave = true;
        this.newWave = false;
        this.waveTimer = this.waveStart;

        // Create a semi-transparent overlay
        this.buttonRect = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, 200, 50, 0x000000, 0.5);
        this.buttonRect.setOrigin(0.5, 0.5);
        this.buttonRect.setVisible(false); // Hide the rectangle initially

        // Display "Game Over" text
        this.gameOverText = this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, "Game over", {
            fontSize: "32px",
            color: "#ffffff"
        }).setOrigin(0.5);
        this.gameOverText.setVisible(false); // Hide the text initially

        // Restart button
        this.restartButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 20, "Play Again", {
            fontSize: "24px",
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: { x: 20, y: 10 } // Add padding around the text
        })
        .setInteractive()
        .on('pointerdown', () => {
            this.restartGame();
        });
        this.restartButton.setOrigin(0.5, 0.5);
        this.restartButton.setVisible(false); // Hide the button initially
        this.restartButton.setInteractive(false); // Disable interaction initially
    }

    setupInputs() {
        // Setup keyboard controls
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.setDefaultCursor('pointer'); // Changes cursor to pointer
    }

    setupSounds() {
        // Setup sounds
        this.playerLaserSFX = this.sound.add("playerLaser", { volume: 0.12 });
        this.playerMovementSFX = this.sound.add("playerMovement", { volume: 0.1 });
        this.shipExplosionSFX = this.sound.add("shipExplosion", { volume: 0.15 });
        this.basicLaserSFX = this.sound.add("basicLaser", { volume: 0.4 });
        this.heavyLaserSFX = this.sound.add("basicLaser", { volume: 0.4 });
        this.beamSFX = this.sound.add("basicLaser", { volume: 0.4 });
    }

    startBackgroundMusic() {
        // Background music
        this.bgMusic = this.sound.add("bgMusic");
        this.bgMusic.setLoop(true);
        if (!this.bgMusic.isPlaying) this.bgMusic.play({ volume: 0.05 });
    }

    setupScoreText() {
        // Add score text
        this.displayScore = this.add.bitmapText(850, 850, 'myFont', 'Score: ' + this.playerScore, 32);
    }

    setupHealthText() {
        // Add health text
        this.displayHealth = this.add.bitmapText(50, 850, 'myFont', 'Hp: ' + this.playerHp, 32);
    }

    moveBackground() {
        // Move the background images to create a parallax effect
        let bgSpeed = 5;
        this.starfield1.y += bgSpeed;
        this.starfield2.y += bgSpeed;
    
        // Reset the background images when they go off-screen
        if (this.starfield1.y > this.game.config.height) {
            this.starfield1.y = this.starfield2.y - this.starfield2.displayHeight;
        }
        if (this.starfield2.y > this.game.config.height) {
            this.starfield2.y = this.starfield1.y - this.starfield1.displayHeight;
        }
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

    damagePlayer(damage) {
        if (this.playerDamageCooldownTimer <= 0 && this.playerAlive) {
            this.playerHp -= damage;
            this.displayHealth.setText('Hp: ' + this.playerHp);
            this.playerDamageCooldownTimer = this.playerDamageCooldown;
            if (this.playerHp <= 0) {
                this.playerAlive = false;
                // Play the destroy sound effect
                if (this.shipExplosionSFX) {
                    this.shipExplosionSFX.play({ volume: 0.25 });
                }
                this.player.setVisible(false); // Hide the player ship
                this.gameOver();
            }
        }
    }

    // Create enemy on random path based on type
    createEnemy(type, initX, initY, wave) {
        let texture = "ships";
        let frame = null;
        let destroySFX = this.shipExplosionSFX;
        let laserSFX = null;
        let path = null;
        let pathSet = null;
        let laserKey = "lasers";
        let laserFrame = null;
        let laserCooldown = null;
        let maxLasers = null;
        let maxHP = null;
        let points = null;
        let projSpd = null;
        let damage = null;
        let speed = null;

        // Set enemy properties based on type
        switch (type) {
            case "basic":
                path = Phaser.Utils.Array.GetRandom(this.basicPaths);
                laserFrame = "laserBlue1.png";
                frame = "shipBlue_manned.png";
                pathSet = this.basicPaths;
                projSpd = this.basicProjSpd;
                laserCooldown = this.basicLaserCooldown;
                maxLasers = this.basicMaxLasers;
                maxHP = this.basicMaxHP;
                points = this.basicPoints;
                damage = this.basicDamage;
                laserSFX = this.basicLaserSFX;
                speed = this.basicSpd;
                break;
            case "heavy":
                path = Phaser.Utils.Array.GetRandom(this.heavyPaths);
                laserFrame = "laserBeige2.png";
                frame = "shipBeige_manned.png";
                pathSet = this.heavyPaths;
                projSpd = this.heavyProjSpd;
                laserCooldown = this.heavyLaserCooldown;
                maxLasers = this.heavyMaxLasers;
                maxHP = this.heavyMaxHP;
                points = this.heavyPoints;
                damage = this.heavyDamage;
                laserSFX = this.heavyLaserSFX;
                speed = this.heavySpd;
                break;
            case "beam":
                path = Phaser.Utils.Array.GetRandom(this.beamPaths);
                laserFrame = "laserPink1.png";
                frame = "shipPink_manned.png";
                pathSet = this.basicPaths;
                projSpd = this.beamProjSpd;
                laserCooldown = this.beamLaserCooldown;
                maxLasers = this.beamMaxLasers;
                maxHP = this.beamMaxHP;
                points = this.beamPoints;
                damage = this.beamDamage;
                laserSFX = this.beamSFX;
                speed = this.beamSpd;
                break;
            default:
                console.error("Unknown enemy type: " + type);
                return;
        }
        const enemy = new Enemy(this, path, texture, frame, pathSet, speed, maxHP, points, destroySFX, initX, initY, laserSFX, projSpd, damage, maxLasers, laserCooldown, laserKey, laserFrame);
        this.waves[wave].add(enemy);
    }

    updateWave(delta) {
        this.waveTimer -= delta / 1000;
        if (this.midWave && this.waveTimer <= 0) {
            this.midWave = false;
            this.newWave = true;
        } else if (!this.midWave) {
            if (this.wave >= this.totalWaves) {
                if (this.nextScene) {
                    this.scene.start(this.nextScene);
                } else {
                    this.gameOver("You win!");
                }
            } else {
                let len = this.waves[this.wave].getLength();
                if (len == 0) {
                    this.midWave = true;
                    this.waveTimer = this.waveStart;
                    this.wave++;
                }

                if (this.newWave && len > 0) {
                    this.newWave = false;
                    for (let enemy of this.waves[this.wave].getChildren()) {
                        enemy.makeActive();
                        enemy.path
                    }
                }
            }
        }
    }

    gameOver(text="Game Over") {
        this.buttonRect.setVisible(true); // Show the overlay

        this.gameOverText.setText(text); // Set the text
        this.gameOverText.setVisible(true); // Show the text

        this.restartButton.setVisible(true); // Show the button
        this.restartButton.setInteractive(true); // Enable interaction
    }

    restartGame() {
        this.buttonRect.setVisible(false); // Hide the overlay
        
        this.gameOverText.setVisible(false); // Hide the text

        this.restartButton.setVisible(false); // Hide the button
        this.restartButton.setInteractive(false); // Disable interaction

        // Clear any existing waves
        if (this.waves) {
            for (let wave of this.waves) {
                wave.clear(true, true); // Clear the wave group
            }
        }

        // Clear player projectiles
        if (this.playerProjectiles) {
            for (let projectile of this.playerProjectiles) {
                projectile.destroy();
            }
            this.playerProjectiles = [];
        }
    
        this.scene.stop("level1");
        this.scene.start("level1");
    }
}
  