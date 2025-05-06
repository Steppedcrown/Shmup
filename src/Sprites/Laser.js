class Laser extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {        
      super(scene, x, y, texture, frame);
      this.visible = false;
      this.active = false;

      this.setScale(0.3);
      this.setDepth(-1);

      return this;
  }

  update() {
      if (this.active) {
          this.y -= this.scene.playerProjectileSpeed;
          if (this.y < 0) {
              this.makeInactive();
          }
      }
  }

  makeActive() {
      this.visible = true;
      this.active = true;
  }

  makeInactive() {
      this.visible = false;
      this.active = false;
  }
}

    /* Fire a new laser from the character’s position
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
    }*/