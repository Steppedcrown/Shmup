export class BaseLevel extends Phaser.Scene {
    constructor(key) {
      super(key);

        // Keys for input
        this.aKey = null;
        this.dKey = null;
        this.spaceKey = null;

        // Game feel variables
        this.playerSpeed = 10;
        this.playerProjectileSpeed = 18;

        // Array to keep track of active projectiles
        this.playerProjectiles = [];

        // Level variables
        this.playerLaserCooldown = 0.4;
        this.playerLaserCooldownTimer = 0;
        this.playerScore = 0;

        // Enemy paths
        const basicPath1 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(100, -50), 
            new Phaser.Math.Vector2(150, 100),
            new Phaser.Math.Vector2(300, 200),
            new Phaser.Math.Vector2(400, 300),
            new Phaser.Math.Vector2(500, 1000)
        ]);
        const basicPath2 = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(100, -50), 
            new Phaser.Math.Vector2(200, 100),
            new Phaser.Math.Vector2(400, 200),
            new Phaser.Math.Vector2(800, 400),
            new Phaser.Math.Vector2(1000, 1000)
        ]);
        this.basicPaths = [basicPath1, basicPath2];
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

    // Create enemy
    createEnemy(type, texture, frame, speed = 0.2, maxHP, points, destroySFX) {
        let path = null;
        switch (type) {
            case "basic":
                path = Phaser.Utils.Array.GetRandom(this.basicPaths);
                break;
            default:
                console.error("Unknown enemy type: " + type);
                return;
        }
        const enemy = new Enemy(this, path, texture, frame, speed, maxHP, points, destroySFX);
        this.enemies.add(enemy);
    }
  }
  