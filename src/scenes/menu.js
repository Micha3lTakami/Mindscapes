class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }
    create(){
        this.add.text(game.config.width/2, game.configh.height/2,'menu');
    }
    update(){
        
    }
}