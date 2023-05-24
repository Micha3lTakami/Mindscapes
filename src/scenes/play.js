class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    placePlatform(pointer) {
        if (availablePlatforms > 0) {
          const worldX = pointer.worldX;
          const worldY = pointer.worldY;
      
          //const x = worldX - this.cameras.main.scrollX;
          //const y = worldY - this.cameras.main.scrollY;
      
          const newPlat = new platform(this, worldX, worldY, 'platform');
          availablePlatforms--;
          blocksLeft.text = availablePlatforms;
          console.log('avail plats: ' + availablePlatforms)
        }
      }

    // create()
    // create play scene
    create() {
        /*let gameMusic = this.sound.add('gameMusic', { loop: true });
        gameMusic.play();*/

        
        
        //add map tilesprite
        const map = this.add.tilemap('tilemapJSON');
        const brain_set = map.addTilesetImage('brain_set', 'tilesetImage');
        

        

        //add layers for tile
        const bgLayer = map.createLayer('Sky', brain_set, 0, 0);
        const groundLayer = map.createLayer('Ground', brain_set, 0, 0);
        const terrainLayer = map.createLayer('Decoration', brain_set, 0, 0);
        
        //const terrain2Layer = map.createLayer('Decoration 2', brain_set, 0, 0);
        
        /*groundLayer.setCollisionByProperty({ is_placeable: true });
        this.physics.add.collider(this.sid, groundLayer);*/

        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            color: '#e4a672',
            backgroundColor: '#F5DEB3',
            padding: {
                x: 10,
                y: 5
            },
            align: 'center'
        };

        // Initialize timer
        this.counter = game.settings.gameTimer / 1000;
        this.startTime = this.time.now; // Resets every 1000 milliseconds

        // Display timer
        this.timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#e4a672',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 
            }
            this.timeLeft = this.add.text(130, borderUISize + borderPadding - 30, this.counter, this.timerConfig);
            this.timeLeft.setScrollFactor(0);
            this.timeLeft.setAlpha(0.7);
            this.timerConfig.fixedWidth = 0;

        // Display blocks left
        this.blocksConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#e4a672',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 
            }
            blocksLeft = this.add.text(260, borderUISize + borderPadding - 30, availablePlatforms, this.blocksConfig);
            blocksLeft.setScrollFactor(0);
            blocksLeft.setAlpha(0.7);
            this.blocksConfig.fixedWidth = 0;
        
        //platform event listener
        this.input.on('pointerdown', this.placePlatform, this);
        // create protagonist object
        this.sid = new synapse(this, this.game.config.width / 2, this.game.config.height / 2, 'synapse').setOrigin(0.5, 0.5);
        this.sid.setFriction(0.2, 0.2);
        //this.sid.setScale(2);
        
        this.happy1 = new enemy(this, game.config.width/3, game.config.height/2, 'happy').setOrigin(0.5)
        //this.happy1.setScale(3);
        this.sad1 = new enemy(this, game.config.width * .75, game.config.height/2, 'sad').setOrigin(0.5)
        //this.sad1.setScale(3)
        //could fix animation later
        
        //enable collision for map
        groundLayer.setCollisionByProperty({ collides: true })
        //terrainLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.sid, groundLayer)
        //this.physics.add.collider(this.sid, terrainLayer)
        this.physics.add.collider(this.happy1, groundLayer)
        this.physics.add.collider(this.sad1, groundLayer)
        
        //add camera to follow protag if needed (or just make map scroll)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.sid, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        this.gameOver = false;

        // reserve keys to navigate to menu or advance to next level
        this.keyM = this.input.keyboard.addKey('M');
        this.keySPACE = this.input.keyboard.addKey('SPACE');
    }
    


    // update()
    // menu update function
    update() {
        let playConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#e4a672',
            allign: 'center',
            fixedWidth: 0
        }

        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            color: '#e4a672',
            backgroundColor: '#F5DEB3',
            padding: {
                x: 10,
                y: 5
            },
            align: 'center'
        };
        this.sid.update();

        // Scene timer
        let nowTime = this.time.now
        if(nowTime > (this.startTime + 1000)) {
            if(this.counter > 0) {
                this.counter -= 1;
                this.startTime = nowTime
                this.timeLeft.text = this.counter;
            }   
        }


        // detect collisions with protagonist and pause scene when collision occurs
        this.physics.add.collider(this.happy1, this.sid, () => {
            this.physics.pause();
            this.sound.stopAll();
            //this.sound.play('deathNoise');
            //this.sid.destroy();
            
            this.gameOver = true;
        });

        // second enemy
        this.physics.add.collider(this.sad1, this.sid, () => {
            this.physics.pause();
            this.sound.stopAll();
            //this.sound.play('deathNoise');
            //this.sid.destroy();
            
            this.gameOver = true;
        });

        if (this.counter == 0) {
            this.physics.pause();
            this.sound.stopAll();
            this.gameOver = true;
        }

        if (this.gameOver == true) {
            this.gameOver = true;
            let change = this.add.text(w / 2, h / 4, 'Level Complete!', playConfig).setOrigin(0.5);
            let REST = this.add.text(w / 2, h / 3, 'Press (SPACE) for next level or (M) for Menu', playConfig).setOrigin(0.5);
    
            if (this.keyM.isDown) {
                change.destroy();
                REST.destroy();
                this.gameOver = false;
                this.scene.start('menuScene');
            }
            if (this.keySPACE.isDown) {
                change.destroy();
                REST.destroy();
                this.gameOver = false;
                this.scene.start('playScene2');
            }
        }
    }
}