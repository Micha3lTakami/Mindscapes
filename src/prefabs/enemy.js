class enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spritesheet) {
        super(scene, x, y, spritesheet);
        //this.setTint(Phaser.Display.Color.RandomRGB().color);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        this.body.setAllowGravity(true);
        this.body.setGravityY(50);

        // set up 'attack' animation
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers(spritesheet, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // start 'attack' animation and set callback function to loop animation
        this.anims.play('attack');

        // detect collisions with protagonist and pause scene when collision occurs
        scene.physics.add.collider(this, scene.synapse, () => {
            scene.physics.pause();
            scene.sound.stopAll();
            scene.sound.play('deathNoise');
            this.destroy();
            
            scene.gameOver = true;
        });
  
    }

    update() {
        // check if iceman is onscreen
        if (this.x < -50) {
            this.destroy();
        }
    }
}