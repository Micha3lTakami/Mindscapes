class synapse extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spritesheet) {
        super(scene, x, y, spritesheet);

        // add object to existing scene
        scene.add.existing(this);

        // enable physics on the sprite
        scene.physics.add.existing(this);

        // apply gravity to the sprite
        this.body.gravity.y = 200;

        // set the maximum velocity of the sprite
        this.body.maxVelocity.x = 200;

        // create cursor keys for input
        this.cursors = scene.input.keyboard.createCursorKeys();



        // set the collision detection for the sprite
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        // add key inputs
        this.cursors = scene.input.keyboard.createCursorKeys();


 
    }

    update() {
  

        // check for keyboard input
        if (this.cursors.left.isDown && this.canMove) {
            this.body.setVelocityX(-200);
            this.anims.play('left', true);

        } 
        else if (this.cursors.right.isDown && this.canMove) {
            this.body.setVelocityX(200);
            this.anims.play('right', true);
        }
    
        // check if the up key is pressed and the sprite can jump
        if (this.cursors.up.isDown) {
                this.body.setVelocityY(-500);
                this.jumpCount++;
        }

    
        // tint tutorial
        if (this.rainbowTint) {
            this.setTint(0xff00ff);
        } 
        else {
            this.clearTint();
        }
    }
}