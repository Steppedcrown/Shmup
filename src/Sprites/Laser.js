class Bullet extends Phaser.GameObjects.Sprite {
    constructor() {        
        //super(scene, x, y, texture, frame);

        // Array to keep track of active projectiles
        this.playerProjectiles = [];

        return this;
    }

    update(cooldown) {
        if (this.spaceKey.isDown) {
            // If the cooldown timer is at 0, shoot a laser
            if (this.cooldown <= 0) {
              this.shootLaser();
              this.cooldown = this.playerLaserCooldown;
            }
        }

        // Move the player and update lasers
        this.movePlayerProjectiles();

        return cooldown;
    }

    // Fire a new laser from the character’s position
    shootLaser() {
        const proj = this.add.sprite(this.character.x, this.character.y, "lasers", "laserYellow1.png");
        proj.setScale(0.3);
        proj.setOrigin(0.5, 1);
        proj.setDepth(-1);
        this.playerProjectiles.push(proj);
    
        // Play firing sound
        this.playerLaserSFX.play({
          volume: 0.25,
          detune: Phaser.Math.Between(-200, 200)
        });
    }

    // Move each projectile upward and remove it when it goes off screen
    movePlayerProjectiles() {
        for (let i = 0; i < this.playerProjectiles.length; i++) {
          let projectile = this.playerProjectiles[i];
          projectile.y -= this.playerProjectileSpeed;
    
          // Remove projectile if off screen
          if (projectile.y < 0) {
            projectile.destroy();
            this.playerProjectiles.splice(i, 1);
            i--;
          }
        }
      }
}