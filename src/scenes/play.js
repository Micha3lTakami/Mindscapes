class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    // create()
    // create play scene
    create() {
        /*let gameMusic = this.sound.add('gameMusic', { loop: true });
        gameMusic.play();*/

        //add camera to follow protag if needed (or just make map scroll)
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.startFollow(this.sid, true, 0.25, 0.25);
        // this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        
        //add map tilesprite
        const map = this.add.tilemap('tilemapJSON');
        const tileset = map.addTilesetImage('tileset', 'tilesetImage');

        

        //add layers for tile
        const bgLayer = map.createLayer('Sky', tileset, 0, 0);
        const terrainLayer = map.createLayer('Decoration', tileset, 0, 0);
        const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        const terrain2Layer = map.createLayer('Decoration 2', tileset, 0, 0);
        
        //enable collision for map
        /*groundLayer.setCollisionByProperty({ is_placeable: true });
        this.physics.add.collider(this.sid, groundLayer);*/

        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            color: '#F7E7CE',
            backgroundColor: '#F5DEB3',
            padding: {
                x: 10,
                y: 5
            },
            align: 'center'
        };
        
        // create protagonist object
        this.sid = new synapse(this, this.game.config.width / 2, this.game.config.height / 2, 'protagonist').setOrigin(0.5, 0.5);
        this.sid.setFriction(0.2, 0.2);
        //could fix animation later

        let gameOver = false;

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
            color: '#F7E7CE',
            allign: 'center',
            fixedWidth: 0
        }

        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '24px',
            color: '#000',
            backgroundColor: '#F5DEB3',
            padding: {
                x: 10,
                y: 5
            },
            align: 'center'
        };
        this.sid.update();

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
                GO.destroy();
                REST.destroy();
                this.gameOver = false;
                this.scene.start('playScene2');
            }
        }
    }
}