class Loader extends Phaser.Scene {
    constructor() {
        super('loaderScene');
    }
    
    // preload()
    // pre-load game assets
    preload() {
        // add text object for percentage loaded
        
        // WORK NEEDED: NEEDS TYPOGRAPHY UPDATE
        let loadConfig = { 
            fontFamily: 'Helvetica', 
            fontSize: '48px', 
            fontStyle: 'bold', 
            fill: '#e6dfcc' 
        };
        
        let progressText = this.add.text(game.config.width/2, game.config.height/2, '0%', loadConfig).setOrigin(0.5);

        // update the loading percentage as assets are loaded
        this.load.on('progress', function (value) {
            let percentage = Math.floor(value * 100) + '%';
            progressText.setText(percentage); 
        });
        
        // load audio file path
        this.load.path  = './assets/sounds'
        // load audio
        this.load.audio('sfx_select', 'menu_select.wav');

        // load image file path
        this.load.path = "./assets/images"
        // load images
        this.load.image('MenuBackground', '6MenuBackground.png');
        // WORK NEEDED: make a FavIcon (.ico file)

        // load spritesheet file path
        this.load.path = "./assets/spritesheets"
        // load spritesheets 
        this.load.spritesheet('protagonist', 'protagonist.png', {frameWidth: 16, frameHeight: 25, startFrame: 0, endFrame: 8});
    
        
        // change scene upon completion
        this.load.on('complete', function () {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.time.delayedCall(700, () =>{
                this.scene.start('startScene')});
        }, this);

    }
  
}
