class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        let text = this.add.text(game.config.width/2, game.config.height/2, 'menu');
        let next = this.add.text(game.config.width/2, game.config.height*0.65, 'Press Enter to change to play scene');
        this.add.image(0, 0, 'title_screen').setOrigin(0, 0);
        
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('playScene');
        });
    }
}