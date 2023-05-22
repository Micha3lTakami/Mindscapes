class Play2 extends Phaser.Scene {
    constructor() {
        super("playScene2");
    }

    // create()
    // create play scene
    create() {

        let playConfig = {
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
        this.add.text(w / 2, h / 4, 'Play2', playConfig).setOrigin(0.5);
        // create protagonist object
        this.sid = new synapse(this, this.game.config.width / 2, this.game.config.height / 2);
        this.sid.setScale(2);

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
                change.destroy();
                REST.destroy();
                this.gameOver = false;
                this.scene.start('playScene2');
            }
        }
    }
}