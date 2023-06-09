class platform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setImmovable(true);
    this.body.allowGravity = false;
    this.setScale(0.5);

    // Add collider between platform and main character
    this.scene.physics.add.collider(this, this.scene.sid);

    // Event listener for when the block is clicked
    this.setInteractive().on('pointerdown', this.onClick, this);
  }



  onClick() {
    // Remove the block when clicked
    this.destroy();

    // Update available platform count
    availablePlatforms+=1;
  }
}