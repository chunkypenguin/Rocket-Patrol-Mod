class Play extends Phaser.Scene{ //Menu class becomes a child of Phaser.Scene
    constructor(){
        super("playScene")
    }

    create() {

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480,
        'starfield').setOrigin(0,0)

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, 
        game.config.width, borderUISize, 0x00FF00).setOrigin(0, 0)

        // white borders
        this.add.rectangle(0,0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 + game.config.width/4, game.config.height - borderUISize - borderPadding, 'rocket', 0).setOrigin(0.5, 0)
        this.p2Rocket = new RocketTwo(this,game.config.width/4, game.config.height - borderUISize - borderPadding, 'rockettwo', 0).setOrigin(0.5, 0)
        
        // create point values for ships
        this.shipValues= [10, 20, 30, 50, 150]


        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*6 + borderPadding, 'spaceship', 0, this.shipValues[2]).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*7 + borderPadding*2, 'spaceship', 0, this.shipValues[1]).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*9, 'spaceship', 0, this.shipValues[0]).setOrigin(0,0)
        // add small ship
        this.shipSmall = new Spaceship(this, game.config.width + borderUISize*8, borderUISize*5, 'smallship', 0, this.shipValues[3]).setOrigin(0, 0)
        //mothership
        this.motherShip = new Spaceship(this, game.config.width + borderUISize*9, borderUISize*3, 'mothership', 0, this.shipValues[4]).setOrigin(0, 0)
        // set mothership health
        this.motherShipHP = this.getRandomInt(6) + 5
        console.log(this.motherShipHP)

        // define keys
        //Player 1
        keyFIRE = 
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyRESET =
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = 
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = 
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        //player 2
        keyFIRETwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyLEFTTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHTTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)


        // initialize scores
        this.p1Score = 0
        this.p2Score = 0

        //displayTimer
        let timeConfig = {
            frontFamily: 'Courier',
            fontSize: '34px',
            //backgroundColor: 'rgba(128, 128, 128, 0.15)',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 200
        }
        // display p1 score
        let scoreConfig = {
            frontFamily: 'Courier',
            fontSize: '34px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        // display p2 score
        let scoreConfigTwo = {
            frontFamily: 'Courier',
            fontSize: '34px',
            backgroundColor: '#FF0000',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }


        this.scoreLeft = this.add.text(borderUISize + borderPadding,
            borderUISize + borderPadding, this.p1Score, scoreConfigTwo)

        this.scoreRight = this.add.text(game.config.width/2 + borderUISize*5 + borderPadding,
            borderUISize + borderPadding, this.p1Score, scoreConfig)

        // displayed game timer
        this.displayedTimer = 0
        // initialize game timer
        this.currentTimer = 0
        // display game timer
        this.timerMiddle = this.add.text(game.config.width/2, 
            borderUISize + borderPadding, this.gameTimer, timeConfig).setOrigin(0.5, 0)
        
        // Game over flag
        this.gameOver = false
        // 60 second play clock
        scoreConfig.fixedWidth = 0

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            //this.add.text(game.config.width/2, game.config.height/2,
            //'GAME OVER', scoreConfig).setOrigin(0.5)
            if(this.p1Score > this.p2Score){
                this.WinnerText = 'Player One Wins!'
            }
            else if (this.p1Score < this.p2Score){
                this.WinnerText = 'Player Two Wins!'
            }
            else{
                this.WinnerText = "Tie Game!"
            }
            this.add.text(game.config.width/2, game.config.height/2, this.WinnerText, scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 
            64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        //sets timer for halfway through game time to speed up space ships
        this.speedUpClock = this.time.delayedCall(game.settings.gameTimer / 2, () => {
            this.speedUpText = this.add.text(game.config.width/2, game.config.height/2, 'SPEED UP', timeConfig).setOrigin(0.5, 0)
            this.ship01.speedUp()
            this.ship02.speedUp()
            this.ship03.speedUp()
            this.shipSmall.speedUp()
            //remove speed up text on screen after x amount of time
            this.speedUpRemoveClock = this.time.delayedCall(3000, () => {
                this.speedUpText.alpha = 0
            }, null, this)
        }, null, this)

    }

    update(){
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.restart()
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -= 4
        
        if(!this.gameOver){
            this.p1Rocket.update()
            this.p2Rocket.update()
            // update spaceships x3
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.shipSmall.update()
            this.motherShip.update()
        }

        // update game timer
        this.currentTimer = Math.floor((game.settings.gameTimer - this.clock.elapsed) / 1000) + this.displayedTimer
        this.timerMiddle.text = this.currentTimer

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship03, this.p1Rocket)
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship02, this.p1Rocket)
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship01, this.p1Rocket)
        }
        if(this.checkCollision(this.p1Rocket, this.shipSmall)){
            this.p1Rocket.reset()
            this.shipExplode(this.shipSmall, this.p1Rocket)
        }
        if(this.checkCollision(this.p1Rocket, this.motherShip)){
            this.p1Rocket.reset()
            this.motherShipHP --
            if(this.motherShipHP < 0){
                
                this.shipExplode(this.motherShip, this.p1Rocket)
                console.log(this.motherShipHP)
            }
            else{
                this.motherShipSpriteFlash()
            }
        }


        // check collisions player two
        if(this.checkCollision(this.p2Rocket, this.ship03)){
            this.p2Rocket.reset()
            this.shipExplode(this.ship03, this.p2Rocket)
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)){
            this.p2Rocket.reset()
            this.shipExplode(this.ship02, this.p2Rocket)
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)){
            this.p2Rocket.reset()
            this.shipExplode(this.ship01, this.p2Rocket)
        }
        if(this.checkCollision(this.p2Rocket, this.shipSmall)){
            this.p2Rocket.reset()
            this.shipExplode(this.shipSmall, this.p2Rocket)
        }
        if(this.checkCollision(this.p2Rocket, this.motherShip)){
            this.p2Rocket.reset()
            this.motherShipHP --
            if(this.motherShipHP < 0){
                this.shipExplode(this.motherShip, this.p2Rocket)
                console.log(this.motherShipHP)
            }
            else{
                this.motherShipSpriteFlash()
            }
        }

        this.motherShip

    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    checkCollision(rocket, ship){
        //simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true
            } else {
                return false
            }
    }

    shipExplode(ship, rocket){

        if(rocket == this.p1Rocket){
            // score add and text update
            this.p1Score += ship.points
            this.scoreRight.text = this.p1Score
        }
        else{
            // score add and text update
            this.p2Score += ship.points
            this.scoreLeft.text = this.p2Score
        }
        if(ship == this.motherShip){
            this.motherShipHP = this.getRandomInt(6) + 5
            console.log(this.motherShipHP)
        }
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0)
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
            })

        // add score text when a ship is hit
        this.scoreJuice = this.add.text(ship.x, ship.y, ship.points).setOrigin(0)
        this.scoreJuice.alpha = 1
        this.scoreJuiceClock = this.time.delayedCall(500, () => {
            this.scoreJuice.alpha = 0
        }, null, this)

        this.sound.play('sfx-explosion')
    }

    motherShipSpriteFlash(){
        this.motherShip.alpha = 0
        this.spriteFlashClock = this.time.delayedCall(100, () => {
            this.motherShip.alpha = 1
        }, null, this)
    }
}