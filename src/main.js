// Michael Takami
// Running Through the 6
// hours spent: 25
// 
// Technical Tilt:
// one of the main reasons why i don't enjoy endless runners as much as other genres is they sometimes feel empty,
// and redudnant. I wanted the player to have to do more than just "dodge obstacles" so I tried to make most of the gameplay
// around the "rapping" mechanic so they have an actual objective to focus on and the 'running' aspect is a bit secondary.
//
// Creative Tilt:
// If there was something I can improve upon in the nedxt project, it would be time management on asset creation. I am very proud of
// all the assets I created, especially both character sprites, although they are simple frame wise the 8 bit art style especially on iceman
/// took a lot of time and I'm happy hopw they turned out. I also learned a decent amount about CSS styling with inset and outsets as well
// as scaling the screen although my full screen button did not end up being functional. I also made the music using an AKAI MPK MINI.


// enable JS Strict Mode
'use strict';

// define and configure main Phaser game object
let config = {
    type: Phaser.AUTO,
    // set parent container for where playscreen should be displayed on webpage
    parent : 'runner',
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
        //mode: Phaser.Scale.FIT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 1100
            }
        }
    },
    scene: [ Loader, Start, Menu, Play]
}

// define game
let game = new Phaser.Game(config);


// reserve keyboard variables
let keyUP, keyLEFT, keyRIGHT, keyENTER, keyR;

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let enemyVelocity = 150;
let highScore;
let pushBack = -25;
// score = rappedTime / 100
//⤡
