class GravityBlock extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    scene.add.existing(this);

    // Enable physics for the gravity well
    scene.physics.add.existing(this);
    this.body.setAllowGravity(false);
    this.setScale(0.5);
    this.setImmovable(true);
    this.scene.physics.world.enable(this);
    

    this.scene.physics.add.collider(this, this.scene.sid);

    // Set up the properties of the gravity well
    this.radius = 30;
    this.gravityForce = 5000;

    // Create a circle sensor to detect the main character
    this.sensor = scene.add.circle(x, y, this.radius, 0x0000ff, 0.0);
    scene.physics.add.existing(this.sensor);
    this.sensor.body.setAllowGravity(false);
    this.sensor.body.moves = false;

    // Detect and apply gravitational force to the player
    scene.physics.add.overlap(this.sensor, this.scene.sid, this.applyGravity, null, this);

    // Enable input for the block
    this.setInteractive();
    this.on('pointerdown', this.onClick, this);
    this.anims.play('Placed', true);
  }

  applyGravity(sensor, player) {
    // Calculate the direction and magnitude of the gravitational force
    const direction = new Phaser.Math.Vector2(sensor.x - player.x, sensor.y - player.y).normalize();
    const magnitude = Phaser.Math.Distance.Between(sensor.x, sensor.y, player.x, player.y);

    // Apply the gravitational force to the player
    const force = direction.scale(this.gravityForce / magnitude);
    player.body.setAcceleration(force.x, force.y);
  }

  onClick() {
    // Delete the block
    
    this.scene.physics.world.disable(this.sensor);
    //this.sensor.destory();
    this.destroy();

    // Increment the availablePlatforms global variable by 1
    availablePlatforms += 1;
  }
}