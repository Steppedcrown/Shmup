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
        this.playerProjectileSpeed = 10;

        // Array to keep track of active projectiles
        this.playerProjectiles = [];

        // Player variables
        this.playerLaserCooldown = 0.8;
        this.playerLaserCooldownTimer = 0;
        this.playerScore = 0;
        this.playerDamage = 1;
        this.playerDamageCooldown = 0.5;
        this.playerDamageCooldownTimer = 0;
        this.playerMaxHP = 3;
        this.playerHp = this.playerMaxHP;
        this.playerAlive = true;

        // Wave variables
        this.wave = 0;
        this.totalWaves = 0;
        this.waves = [];
        this.midWave = true;
        this.waveStart = 3;
        this.waveTimer = this.waveStart;
        this.newWave = false;
        this.groupMoveSpd = 5;

        // Enemy paths
        const basicPath1 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(100, 50), 
            new Phaser.Math.Vector2(150, 100),
            new Phaser.Math.Vector2(300, 200),
            new Phaser.Math.Vector2(400, 300),
            new Phaser.Math.Vector2(500, 1000)
        ]);
        const basicPath2 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(100, 50), 
            new Phaser.Math.Vector2(200, 100),
            new Phaser.Math.Vector2(400, 200),
            new Phaser.Math.Vector2(800, 400),
            new Phaser.Math.Vector2(1000, 1000)
        ]);
        this.basicPaths = [basicPath1, basicPath2];
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

        // Font
        this.load.bitmapFont('myFont', 'fonts/myFont.png', 'fonts/myFont.xml');
    }

    setupInputs() {
        // Setup keyboard controls
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    setupSounds() {
        // Setup sounds
        this.playerLaserSFX = this.sound.add("playerLaser");
        this.playerMovementSFX = this.sound.add("playerMovement");
        this.shipExplosionSFX = this.sound.add("shipExplosion");
    }

    setupScoreText() {
        // Add score text
        this.displayScore = this.add.bitmapText(850, 850, 'myFont', 'Score: ' + this.playerScore, 32);
    }

    setupHealthText() {
        // Add health text
        this.displayHealth = this.add.bitmapText(50, 850, 'myFont', 'Hp: ' + this.playerHp, 32);
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
                this.gameOver();
                this.playerAlive = false;
            }
        }
    }

    // Create enemy on random path based on type
    createEnemy(type, texture, frame, speed = 0.2, maxHP, points, destroySFX, wave, initX, initY) {
        let path = null;
        let pathSet = null;
        switch (type) {
            case "basic":
                path = Phaser.Utils.Array.GetRandom(this.basicPaths);
                pathSet = this.basicPaths;
                break;
            default:
                console.error("Unknown enemy type: " + type);
                return;
        }
        const enemy = new Enemy(this, path, texture, frame, pathSet, speed, maxHP, points, destroySFX, initX, initY);
        this.waves[wave].add(enemy);
    }

    updateWave(delta) {
        this.waveTimer -= delta / 1000;
        if (this.midWave && this.waveTimer <= 0) {
            this.midWave = false;
            this.newWave = true;
            console.log("Next wave started!");
        } else if (!this.midWave) {
            if (this.wave >= this.totalWaves) {
                console.log("Level complete!");
                if (this.nextScene) {
                    this.scene.start(this.nextScene);
                } else {
                    this.gameOver();
                }
            } else {
                let len = this.waves[this.wave].getLength();
                if (len == 0) {
                    this.midWave = true;
                    this.waveTimer = this.waveStart;
                    this.wave++;
                    console.log("Wave complete!");
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

    gameOver() {
        console.log("Game Over");
    }
}
  