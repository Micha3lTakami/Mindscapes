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
        this.setScale(.7);

        // Create cursor keys for input
        this.cursors = scene.input.keyboard.addKeys('W,A,D');

        // Set the collision detection for the sprite
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        // Set the drag to control friction
        this.body.setDrag(500, 0); // Adjust the values as needed

        // Adjust hitbox size
        this.body.setSize(12, 29, true);

        // Load sounds
        this.walkLeftSound = scene.sound.add('walkLeft', {loop: true});
        this.walkLeftSound.setRate(1.5);
        
        this.walkRightSound = scene.sound.add('walkRight', {loop : true});
        this.walkRightSound.setRate(1.5);
        
        this.jumpSound = scene.sound.add('jump');

        // Create sound variables
        this.isWalkingLeft = false;
        this.isWalkingRight = false;
        this.facingRight = false;
        this.facingLeft = false;


        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('runRight', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('runLeft', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'idleRight',
            frames: scene.anims.generateFrameNumbers('idleRight', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'idleLeft',
            frames: scene.anims.generateFrameNumbers('idleLeft', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'jumpLeft',
            frames: scene.anims.generateFrameNumbers('jumpLeft', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'jumpRight',
            frames: scene.anims.generateFrameNumbers('jumpRight', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'death',
            frames: scene.anims.generateFrameNumbers('death', { start: 0, end: 7 }),
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
            if(this.isWalkingRight){
                this.anims.play('idleRight', true);
                this.facingRight = true;
                this.facingLeft = false;
            }
            if(this.isWalkingLeft){
                this.anims.play('idleLeft', true);
                this.facingLeft = true;
                this.facingRight = false;
            }
            this.walkLeftSound.stop();
            this.walkRightSound.stop();
            this.isWalkingLeft = false;
            this.isWalkingRight = false;
        }

        // Check if the up key is pressed and the sprite can jump
        if (this.cursors.W.isDown && this.body.onFloor()) {
            if(this.facingRight){
                this.anims.stop();
                this.anims.play('jumpRight');
            }
            if(this.facingLeft){
                this.anims.stop();
                this.anims.play('jumpLeft', true);
            }
            this.body.setVelocityY(-145); // Adjust the value as needed
            this.jumpSound.play();
        }
    }
}