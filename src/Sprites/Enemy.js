class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, path, texture, frame, speed = 0.2) {
        // Start at the beginning of the path
        super(scene, path.getStartPoint().x, path.getStartPoint().y, texture, frame);

        this.scene = scene;
        this.path = path;               // Phaser.Curves.Spline path
        this.pathProgress = 0;          // Between 0 and 1
        this.speed = speed;             // Adjust for difficulty/different enemies

        this.setScale(0.7);
        this.setDepth(1);

        scene.add.existing(this);
    }

    update(_, delta) {
        this.pathProgress += this.speed * (delta / 1000);

        if (this.pathProgress >= 1) {
            this.pathProgress = 0; // Reset to the start of the path
        }

        // Get the current point along the spline
        const point = this.path.getPoint(this.pathProgress);
        this.setPosition(point.x, point.y);
    }
}
