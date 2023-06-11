class GravityBlock extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      scene.add.existing(this);
  
      // Enable physics for the gravity well
      scene.physics.add.existing(this);
      this.body.setAllowGravity(false);
  
      // Set up the properties of the gravity well
      this.radius = 200;
      this.gravityForce = 500;
  
      // Create a circle sensor to detect the main character
      this.sensor = scene.add.circle(x, y, this.radius, 0x0000ff, 0.0);
      scene.physics.add.existing(this.sensor);
      this.sensor.body.setAllowGravity(false);
      this.sensor.body.moves = false;
  
      // Set the collision callback for the sensor
      scene.physics.add.overlap(this.sensor, scene.mainCharacter, this.applyGravityWell, null, this);
    }
  
    applyGravityWell(sensor, mainCharacter) {
      // Calculate the direction vector from the gravity well to the main character
      const direction = new Phaser.Math.Vector2(mainCharacter.x - this.x, mainCharacter.y - this.y);
  
      // Normalize the direction vector
      direction.normalize();
  
      // Apply the gravity force to the main character in the direction of the gravity well
      mainCharacter.body.applyForce(direction.x * this.gravityForce, direction.y * this.gravityForce);
    }
  }