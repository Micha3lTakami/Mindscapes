class Play2 extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }
    preload(){
        this.load.image('tilesetImage2', './assets/images/basic-platformer-tileset2.png');
        
    }
    // create()
    // create play scene
    create() {

       
        // *******************************
        // CREATE OBJECTS 
        // *******************************
        
        this.cameras.main.fadeIn(1000);

        // Game Music and Settings
        let gameMusic = this.sound.add('levelMusic2', { loop: true });
        gameMusic.setVolume(0.5);
        gameMusic.setRate(0.6);
        gameMusic.play();

        // reset the availablePlatforms value
        availablePlatforms = 3;
        
        
        //add map tilesprite
        const map = this.add.tilemap('tilemapJSON2');
        const brain_set = map.addTilesetImage('basic-platformer-tileset', 'tilesetImage');

        //add layers for tile
        const bgLayer = map.createLayer('Sky', brain_set, 0, 0);
        const groundLayer = map.createLayer('Ground', brain_set, 0, 0);
        const terrainLayer = map.createLayer('Decoration', brain_set, 0, 0);
        const spikeLayer = map.createLayer('Spike', brain_set, 0, 0);


        // Initialize timer
        this.counter = game.settings.gameTimer / 500;
        this.startTime = this.time.now; // Resets every 1000 milliseconds

        //platform event listener
        this.input.on('pointerdown', this.placePlatform, this);
        
        // create protagonist object
        const p1Spawn = map.findObject("playerSpawn", obj => obj.name === "playerSpawn");
        this.sid = new synapse(this, p1Spawn.x,  p1Spawn.y, 'idleRight').setOrigin(0.5, 0.5);
        this.sid.setFriction(0.2, 0.2);

        // create End Flag and set game over state
        const p1EndFlag = map.findObject("playerEnd", obj => obj.name === "playerEnd");
        this.flag = new endflag(this, p1EndFlag.x, p1EndFlag.y, 'brainFlag');
        this.gameOver = false;
        
        // create enemies
        const enemySpawn1 = map.findObject("enemySpawn", obj => obj.name === "enemySpawn_Sad");
        const enemySpawn2 = map.findObject("enemySpawn", obj => obj.name === "enemySpawn_Happy");
        this.happy1 = new enemy(this, enemySpawn2.x, enemySpawn2.y, 'happy').setOrigin(0.5)
        this.sad1 = new enemy(this, enemySpawn1.x * .75, enemySpawn1.y, 'sad').setOrigin(0.5)
        //could fix animation later

        // Spawn vacuums
        const vacuumSpawn = map.findObject("vacuumBlocks", obj => obj.name === "vacuumBlock");
        this.vacuumBlock = new GravityBlock(this, vacuumSpawn.x, vacuumSpawn.y, 'GravityBlock').setOrigin(0.5)
        
        //enable collision for map
        groundLayer.setCollisionByProperty({ collides: true })
        this.physics.add.collider(this.sid, groundLayer)
        this.physics.add.collider(this.happy1, groundLayer)
        this.physics.add.collider(this.sad1, groundLayer)
        this.physics.add.collider(this.flag, groundLayer)

        //enable collision for spikes
        spikeLayer.setCollisionByProperty({ hurt: true }) 
        //this.physics.add.collider(this.sid, spikeLayer);
        dead = false;
        this.physics.add.collider(this.sid, spikeLayer, null, function(){
            dead = true;
            console.log('spike hit');
        });

        //add camera to follow protag if needed (or just make map scroll)
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.sid, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        // *******************************
        // CONFIGURATIONS  
        // *******************************
        
        // Display timer Configuration
        this.timerConfig = {
            fontFamily: 'Helvetica',
            fontSize: '28px',
            backgroundColor: '#181425',
            color: '#e4a672',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 
        }
               
        // Timer UI
        this.timeLeft = this.add.text(130, borderUISize + borderPadding - 30, this.counter, this.timerConfig);
        this.timeLeft.setScrollFactor(0);
        //this.timeLeft.setAlpha(0.7);
        this.timerConfig.fixedWidth = 0;

        // Display blocks left configuration
        this.blocksConfig = {
            fontFamily: 'Helvetica',
            fontSize: '28px',
            backgroundColor: '#181425',
            color: '#e4a672',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100 
        }
        
        // Blocks remaining UI
        this.blocksLeft = this.add.text(260, borderUISize + borderPadding - 30, availablePlatforms, this.blocksConfig);
        this.blocksLeft.setScrollFactor(0);
        //blocksLeft.setAlpha(0.7);
        this.blocksConfig.fixedWidth = 0;
        
        //Base Score Configuration
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


        // reserve keys to navigate to menu or advance to next level
        this.keyM = this.input.keyboard.addKey('M');
        this.keySPACE = this.input.keyboard.addKey('SPACE');
        this.anims.create({
            key: 'Placed',
            frames: this.anims.generateFrameNumbers('jumpBlock', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
            });
            this.anims.create({
                key: 'Placed2',
                frames: this.anims.generateFrameNumbers('GravityBlock', { start: 0, end: 9 }),
                frameRate: 10,
                repeat: -1
                });
  
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
        this.blocksLeft.text = availablePlatforms;
        

        this.physics.add.collider(this.happy1, this.sid, () => {
            this.physics.pause();
            this.sound.stopAll();
            this.sid.moveable = false;
            //this.sound.play('deathNoise');
            //this.sid.destroy();
            
            this.gameOver = true;
        });

        // second enemy
        this.physics.add.collider(this.sad1, this.sid, () => {
            this.physics.pause();
            this.sound.stopAll();
            this.sid.moveable = false;
            //this.sound.play('deathNoise');
            //this.sid.destroy();
            
            this.gameOver = true;
        });

        this.physics.add.collider(this.sid, this.flag, () => {
            this.sound.stopAll();
            let endText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "That's progress, great job friend :)", playConfig).setOrigin(0.5);
            endText.setScrollFactor(0);
            this.time.delayedCall(3000, () =>{
                this.scene.start('menuScene');
            });
            
        });

        if (this.counter == 0) {
            this.physics.pause();
            this.sound.stopAll();
            this.gameOver = true;
        }

        if (this.gameOver == true) {
            // Create the death animation in the scene where sid is created

            //this.sid.anims.play('death');
            this.time.delayedCall(1100, () =>{
                this.sid.destroy();
            });
            this.gameOver = true;
            let change = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Try Again(don\'t give up!)', playConfig).setOrigin(0.5);
            let REST = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'Press (SPACE) to restart or (M) for Menu', playConfig).setOrigin(0.5);
            this.sid.setAlpha(0);
            // Set scroll factor to 0 to fix the position of the text so text doesn't move on camera scroll
            change.setScrollFactor(0);
            REST.setScrollFactor(0);

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
        
        if (dead == true) {
            //this.physics.pause();
            this.sound.stopAll();
            this.gameOver = true;
            this.sid.moveable = false;
            //return;
        }
    }
    placePlatform(pointer) {
        if (availablePlatforms > 0) {
          const worldX = pointer.worldX;
          const worldY = pointer.worldY;  
          const newPlat = new JumpBlock(this, worldX, worldY, 'jumpBlock').setOrigin(0.5);
          //newPlat.setScale(0.75);
          availablePlatforms--;
          console.log('avail plats: ' + availablePlatforms)
        }
      }
}