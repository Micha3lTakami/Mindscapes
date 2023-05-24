// Mindscapes

// enable JS Strict Mode
'use strict';

// define and configure main Phaser game object
let config = {
    type: Phaser.AUTO,
    // make pixel art crip
    render: {
        pixelArt: true
    },
    // set parent container for where playscreen should be displayed on webpage
    parent : 'mindscape',
    height: 320  ,
    width: 480,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    zoom: 2,
    scene: [ Loader, Menu, Play, Play2, Start ]
}

// define game
let game = new Phaser.Game(config);

//set UI Sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyUP, keyLEFT, keyRIGHT, keyENTER, keyR;

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let availablePlatforms = 10;

