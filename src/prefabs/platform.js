class platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, imageKey) {
      super(scene, x, y, imageKey);
  
      // Add the platform to the existing scene and enable physics
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      // Customize the platform's physics properties
      this.setImmovable(true);
      this.body.allowGravity = false;
  
      //  additional platform behavior or animations
  
      // Register input events for platform removal
      this.setInteractive();
      this.on('pointerdown', this.removePlatform, this);
    }
  
    removePlatform() {
      // Remove the platform from the game world
      this.destroy();
  
      // Increment the available platforms count
      availablePlatforms++;
    }
  }