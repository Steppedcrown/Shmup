// BaseLevel: A reusable scene class for common game logic across levels
export class BaseLevel extends Phaser.Scene {
    constructor(key) {
      super(key);
  
      // Keys for input
      this.aKey = null;
      this.dKey = null;
      this.spaceKey = null;
  
      // Array to keep track of active projectiles
      this.projectiles = [];
    }
  
    // Preload all shared assets
    preloadAssets() {
      this.load.setPath("./assets/");
  
      // Spritesheets
      this.load.atlasXML("ships", "sprites/spritesheet_spaceships.png", "sprites/spritesheet_spaceships.xml");
      this.load.atlasXML("lasers", "sprites/spritesheet_lasers.png", "sprites/spritesheet_lasers.xml");
  
      // Sound effects
      this.load.audio("playerLaser", "audio/laserRetro_000.ogg");
      this.load.audio("playerMovement", "audio/spaceEngine_003.ogg");
      this.load.audio("shipExplosion", "audio/explosionCrunch_001.ogg");
    }
  
    // Set up keyboard input and shooting
    createInput() {
      this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
      // Fire laser when SPACE is pressed
      this.input.keyboard.on("keydown-SPACE", () => {
        this.shootLaser();
      });
    }
  
    // Create sound objects from preloaded audio
    setupSounds() {
      this.playerLaserSFX = this.sound.add("playerLaser");
      this.playerMovementSFX = this.sound.add("playerMovement");
      this.shipExplosionSFX = this.sound.add("shipExplosion");
    }
  
    // Fire a new laser from the character’s position
    shootLaser() {
      const proj = this.add.sprite(this.character.x, this.character.y, "lasers", "laserYellow1.png");
      proj.setScale(0.3);
      proj.setOrigin(0.5, 1);
      proj.setDepth(-1);
      this.projectiles.push(proj);
  
      // Play firing sound
      this.playerLaserSFX.play({
        volume: 0.25,
        detune: Phaser.Math.Between(-200, 200)
      });
    }
  
    // Move the player left or right based on velocity
    movePlayer(velocity) {
      this.character.x += velocity;
  
      // Keep character inside screen bounds
      if (this.character.x < 0) this.character.x = 0;
      if (this.character.x > this.game.config.width) this.character.x = this.game.config.width;
  
      // Play/stop engine sound when moving
      if (velocity !== 0) {
        if (!this.playerMovementSFX.isPlaying) {
          this.playerMovementSFX.play({ volume: 0.2, loop: true });
        }
      } else {
        if (this.playerMovementSFX.isPlaying) {
          this.playerMovementSFX.stop();
        }
      }
    }
  
    // Move each projectile upward and remove it when it goes off screen
    moveProjectiles() {
      for (let i = 0; i < this.projectiles.length; i++) {
        let projectile = this.projectiles[i];
        projectile.y -= 18;
  
        // Remove projectile if off screen
        if (projectile.y < 0) {
          projectile.destroy();
          this.projectiles.splice(i, 1);
          i--;
        }
      }
    }
  
    // Play explosion sound (you can call this on ship destruction)
    destroyShip() {
      this.shipExplosionSFX.play({ volume: 0.5 });
    }
  }
  