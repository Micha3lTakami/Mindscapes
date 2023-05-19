class Start extends Phaser.Scene{
    constructor(){
        super('startScene')
    }
    // create()
    // create start scene
    create() {
        // NEEDS COLOR CHANGE: updates CSS styling for start scene
        let canvas = document.querySelector('canvas');
        canvas.style.border = '10px #f58b57 inset';  
        this.cameras.main.fadeIn(1000);

        // start scene text configuration
        let startConfig = {
            fontFamily: 'Verdana',
            fontSize: '35px',
            color: '#f58b57',
            stroke: '#000',
            strokeThickness: 4,
            allign: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // display start screen text and set default background
        this.cameras.main.setBackgroundColor('E52424');
        this.add.text(game.config.width/2, game.config.height/2, 'Press (ENTER) to continue', startConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height*.75, 'Game Created by ', startConfig).setOrigin(0.5);
        let names = this.add.text(game.config.width/2, game.config.height*.85, 'Michael Takami, Alejanda Sicaros, Jacob Penlan, and Jessica Zogaric', startConfig).setOrigin(0.5);
        names.setScale(0.75)
        

        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
      
    }

    // update()
    // menu update function
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            // NEEDS TESTING: Uses callback to start the next scene
            this.cameras.main.fadeOut(1000,10,20,30,);
            this.time.delayedCall(1100, () =>{
                // restyle border for next scene
                let canvas = document.querySelector('canvas');
                canvas.style.border = '10px #ADD8E6 inset';   
                this.scene.start('menuScene'); 
            });
        }
    }
}