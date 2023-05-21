class synapse extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, spritesheet) {
        super(scene, x, y, spritesheet);

        // Add object to the existing scene
        scene.add.existing(this);

        // Enable physics on the sprite
        scene.physics.add.existing(this);

        // Apply gravity to the sprite
        this.body.gravity.y = 300;

        // Set the maximum velocity of the sprite
        this.body.setMaxVelocity(200, 400); // Adjust the values as needed

        // Create cursor keys for input
        this.cursors = scene.input.keyboard.createCursorKeys();

        // Set the collision detection for the sprite
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        // Set the drag to control friction
        this.body.setDrag(100, 0); // Adjust the values as needed
    }

    update() {
        // Check for keyboard input
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-100);
            // this.anims.play('left', true);
        } 
        else if (this.cursors.right.isDown) {
            this.body.setVelocityX(100);
            // this.anims.play('right', true);
        }

    
        // Check if the up key is pressed and the sprite can jump
        if (this.cursors.up.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-200); // Adjust the value as needed
        }
    }
}