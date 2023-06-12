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
        //add tile info
        this.load.tilemapTiledJSON('tilemapJSON2', './assets/tilemap_items/level_2.json');

        // load audio file path
        this.load.path  = './assets/sounds/'
        // load audio
        this.load.audio('levelMusic', 'brainMusic.mp3');
        this.load.audio('menuMusic','menuMusic.mp3');
        this.load.audio('select','selecter.mp3');
        this.load.audio('jump','slimeJump.mp3');
        this.load.audio('walkLeft','stepLeft.mp3');
        this.load.audio('walkRight','stepRight.mp3');


        // load image file path
        this.load.path = "./assets/images/"
        // load images
        this.load.image('tilesetImage', 'basic-platformer-tileset.png');
        this.load.image('title_screen', 'title_screen.png');
        this.load.image('platform', 'block.png' );
        this.load.image('X', 'xEmoji.png');

        //load fonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');



        // load spritesheet file path
        this.load.path = "./assets/spritesheets/"
        // load spritesheets 
        //this.load.spritesheet('protagonist', 'protagonist.png', {frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 1});
        this.load.spritesheet('runLeft', 'main-run-left.png', {frameWidth: 32,frameHeight: 32,startFrame: 0, endFrame: 5});
        this.load.spritesheet('runRight', 'main-run-right.png', {frameWidth: 32,frameHeight: 32,startFrame: 0, endFrame: 5});
        this.load.spritesheet('jumpRight', 'main-jump-right.png', {frameWidth: 32,frameHeight: 32,startFrame: 0, endFrame: 7});
        this.load.spritesheet('jumpLeft', 'main-jump-left.png', {frameWidth: 32,frameHeight: 32,startFrame: 0, endFrame: 7});
        this.load.spritesheet('idleLeft', 'main-idle-left.png', {frameWidth: 32,frameHeight: 32,startFrame: 0, endFrame: 3});
        this.load.spritesheet('idleRight', 'main-idle-right.png', {frameWidth: 32,frameHeight: 32,startFrame: 0, endFrame: 3});
        this.load.spritesheet('death', 'main-death.png', {frameWidth: 32,frameHeight: 32,startFrame: 0, endFrame: 7});
        this.load.spritesheet('synapse', 'neuron.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 4});
        this.load.spritesheet('anger', 'anger.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
        this.load.spritesheet('happy', 'happiness.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 2});
        this.load.spritesheet('sad', 'sadness.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 4});
        this.load.spritesheet('brainFlag', 'brainFlag.png', {frameWidth: 32, frameHeight: 50, startFrame: 0, endFrame: 4});
        this.load.spritesheet('jumpBlock', 'jumpBlock.png', {frameWidth: 32, frameHeight:32, startFrame:0, endFrame: 5 })
        
        
        
        // change scene upon completion
        this.load.on('complete', function () {
            this.cameras.main.fadeOut(1000,0,0,0);
            this.time.delayedCall(700, () =>{
                this.scene.start('startScene')});
        }, this);

    }
  
}
