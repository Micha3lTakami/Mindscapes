class enemy2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spritesheet) {
        super(scene, x, y, spritesheet);
        //this.setTint(Phaser.Display.Color.RandomRGB().color);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        //set hitbox
        this.body.setSize(23, 17, true);

        this.body.setAllowGravity(true);
        this.body.setGravityY(50);

        // set up 'attack' animation
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers(spritesheet, { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // start 'attack' animation and set callback function to loop animation
        this.anims.play('attack');
    }

    update() {
        // check if is onscreen
        if (this.x < -50) {
            this.destroy();
        }
    }
}