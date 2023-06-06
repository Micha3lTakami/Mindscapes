        /*
        // Create an object layer for the enemy spawns
        const objectLayer = map.getObjectLayer('Object Layer 1');

        // Spawn enemies at each object's location in the object layer
        objectLayer.objects.forEach(object => {
        if (object.type === 'sad_spawn') {
            const enemyX = object.x + object.width / 2;
            const enemyY = object.y + object.height / 2;
            const newEnemy = new enemy(this, enemyX, enemyY, 'sad').setOrigin(0.5);
        }
        });
        /*
        //const terrain2Layer = map.createLayer('Decoration 2', brain_set, 0, 0);
        
        /*groundLayer.setCollisionByProperty({ is_placeable: true });
        this.physics.add.collider(this.sid, groundLayer);*/

              // WORK IN PROGRESS: fullscreen
        /*this.input.keyboard.on('keydown-' + 'F', () => { 
         if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
        } else {
            this.scale.startFullscreen();
        }
        });*/


        //OG PLATFORM
        class platform extends Phaser.Physics.Arcade.Sprite {
            constructor(scene, x, y, imageKey) {
              super(scene, x, y, imageKey);
          
              // Add the platform to the existing scene and enable physics
              scene.add.existing(this);
              this.setScale(0.5);
              scene.physics.add.existing(this);
          
              // Customize the platform's physics properties
              this.setImmovable(true);
              this.body.allowGravity = false;
          
              // Register input events for platform removal
              this.setInteractive();
              //this.on('pointerdown', this.removePlatform, this);
              this.on('pointerdown', this.removePlatform(), this);
          
              // Add collider for player
              scene.physics.add.collider(scene.sid, this);
          
              // Set up block preview
              
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
              //this.scene.blocksLeft.text = availablePlatforms;
            }
            /*
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
            }*/
        
          }