class platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, imageKey) {
      super(scene, x, y, imageKey);
  
      // Add the platform to the existing scene and enable physics
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      // Customize the platform's physics properties
      this.setImmovable(true);
      this.body.allowGravity = false;
  
      // Register input events for platform removal
      this.setInteractive();
      this.on('pointerdown', this.removePlatform, this);
  
      // Add collider for player
      scene.physics.add.collider(scene.sid, this);
  
      // Set up block preview
      this.setAlpha(0.5);
      this.previewMode = false;
  
      // Set up cursor over block detection
      this.on('pointerover', this.checkCursorOver, this);
      this.on('pointerout', this.checkCursorOut, this);
    }
  
    removePlatform() {
      // Remove the platform from the game world
      this.destroy();
  
      // Increment the available platforms count
      availablePlatforms++;
    }
  
    checkCursorOver(pointer) {
      if (this.previewMode) {
        // Show 'x' emoji if cursor is over an existing platform
        pointer.cursor = '❌';
      }
    }
  
    checkCursorOut(pointer) {
      if (this.previewMode) {
        // Reset cursor if cursor moves out of the platform
        pointer.cursor = 'auto';
      }
    }
  
    setPreviewMode() {
      this.previewMode = true;
      this.setAlpha(0.5);
    }
  
    unsetPreviewMode() {
      this.previewMode = false;
      this.setAlpha(1);
    }
  }