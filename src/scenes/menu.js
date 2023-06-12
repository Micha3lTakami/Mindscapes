class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        this.cameras.main.fadeIn(1000);
        let text = this.add.text(game.config.width/2, game.config.height/2, 'menu');
        let next = this.add.text(game.config.width/2, game.config.height*0.65, 'Press Enter to change to play scene');
        this.add.image(0, 0, 'title_screen').setOrigin(0, 0);
        
        // Play menu music with looping enabled
        let menuMusic = this.sound.add('menuMusic', { loop: true });
        menuMusic.play();

        this.input.keyboard.on('keydown-ENTER', () => {
            // Stop menu music when Enter is pressed
            this.cameras.main.fadeOut(1000,10,20,30,);

            this.time.delayedCall(1200, () =>{
                this.sound.play('select');            
                menuMusic.stop();
                this.scene.start('playScene');
            });
        });
    }

    update() {
        game.settings = {
            gameTimer: 50000    
          }
    }
}