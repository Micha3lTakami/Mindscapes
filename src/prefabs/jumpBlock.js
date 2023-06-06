class JumpBlock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      this.scene = scene;
      this.setOrigin(0, 0);
      this.scene.add.existing(this);
      this.scene.physics.world.enable(this);
      this.setImmovable(true);
  
      // Add collider between JumpBlock and main character
      this.scene.physics.add.collider(this, this.scene.sid, this.onCollision, null, this);
      
      // Event listener for when the block is clicked
      this.setInteractive().on('pointerdown', this.onClick, this);
      this.anims.play('Placed', true);


    }
    
    update(){
        
    }
    onCollision(jumpBlock, mainCharacter) {
        mainCharacter.body.velocity.y = -600;
    }
  
    onClick() {
      // Remove the block when clicked
      this.destroy();
  
      // Update available platform count
      availablePlatforms += 1;
    }
  }

  
  
  
  
  
  