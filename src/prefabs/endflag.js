class endflag extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spritesheet) {
        super(scene, x, y, spritesheet);

        // Add the endFlag object to the existing scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        // Set properties of the endFlag sprite
        this.setCollideWorldBounds(true);
        this.body.setImmovable(true); // The endFlag should not be moved by collisions

        this.body.onWorldBounds = true;

        this.body.setAllowGravity(true);
        this.body.setGravityY(50);
        
        scene.anims.create({
            key: 'wave',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('wave');
    }
}