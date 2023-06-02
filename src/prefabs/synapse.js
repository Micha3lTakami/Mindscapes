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
        this.cursors = scene.input.keyboard.addKeys('W,A,D');

        // Set the collision detection for the sprite
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        // Set the drag to control friction
        this.body.setDrag(500, 0); // Adjust the values as needed

        // Adjust hitbox size
        this.body.setSize(12, 30, true);

        // Load sounds
        this.walkLeftSound = scene.sound.add('walkLeft', {loop: true});
        this.walkLeftSound.setRate(1.5);
        
        this.walkRightSound = scene.sound.add('walkRight', {loop : true});
        this.walkRightSound.setRate(1.5);
        
        this.jumpSound = scene.sound.add('jump');

        // Create sound variables
        this.isWalkingLeft = false;
        this.isWalkingRight = false;

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 3, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers(spritesheet, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        // Check for keyboard input
        if (this.cursors.A.isDown) {
            this.body.setVelocityX(-100);
            this.anims.play('left', true);
            if (!this.isWalkingLeft) {
                this.walkLeftSound.play();
                this.walkRightSound.stop();
                this.isWalkingLeft = true;
                this.isWalkingRight = false;
            }
        } else if (this.cursors.D.isDown) {
            this.body.setVelocityX(100);
            this.anims.play('right', true);
            if (!this.isWalkingRight) {
                this.walkRightSound.play();
                this.walkLeftSound.stop();
                this.isWalkingRight = true;
                this.isWalkingLeft = false;
            }
        } else {
            this.anims.play('idle', true);
            this.walkLeftSound.stop();
            this.walkRightSound.stop();
            this.isWalkingLeft = false;
            this.isWalkingRight = false;
        }

        // Check if the up key is pressed and the sprite can jump
        if (this.cursors.W.isDown && this.body.onFloor()) {
            this.body.setVelocityY(-200); // Adjust the value as needed
            this.jumpSound.play();
        }
    }
}