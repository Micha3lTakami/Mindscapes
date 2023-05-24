class Loader extends Phaser.Scene {
    constructor() {
        super('loaderScene');
    }
    
    // preload()
    // pre-load game assets
    preload() {
        // NEEDS COLOR CHANGE: updates CSS styling for start scene
        let canvas = document.querySelector('canvas');
        canvas.style.border = '10px #fff inset';  
        this.cameras.main.fadeIn(1000);
        
        // WORK NEEDED: NEEDS TYPOGRAPHY UPDATE
        let loadConfig = { 
            fontFamily: 'Helvetica', 
            fontSize: '48px', 
            fontStyle: 'bold', 
            fill: '#e6dfcc' 
        };
        
        // add text object for percentage loaded
        let progressText = this.add.text(game.config.width/2, game.config.height/2, '0%', loadConfig).setOrigin(0.5);

        // update the loading percentage as assets are loaded
        this.load.on('progress', function (value) {
            let percentage = Math.floor(value * 100) + '%';
            progressText.setText(percentage); 
        });
        
        //add tile info
        this.load.tilemapTiledJSON('tilemapJSON', './assets/tilemap_items/mindscapes_tilemaps.json');

        // load audio file path
        this.load.path  = './assets/audio/'
        // load audio
        //this.load.audio('sfx_select', 'menu_select.wav');

        // load image file path
        this.load.path = "./assets/images/"
        // load images
        this.load.image('tilesetImage', 'basic-platformer-tileset.png');
        this.load.image('title_screen', 'title_screen.png');
        this.load.image('platform', 'block.png' );


        // load spritesheet file path
        this.load.path = "./assets/spritesheets/"
        // load spritesheets 
        this.load.spritesheet('protagonist', 'protagonist.png', {frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 1});
        this.load.spritesheet('synapse', 'neuron.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 4});
        this.load.spritesheet('anger', 'anger.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
        this.load.spritesheet('happy', 'happiness.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
        this.load.spritesheet('sad', 'sadness.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 4});

        
        
        
        // change scene upon completion
        this.load.on('complete', function () {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.time.delayedCall(700, () =>{
                this.scene.start('startScene')});
        }, this);

    }
  
}
