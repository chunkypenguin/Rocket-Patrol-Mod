class Menu extends Phaser.Scene{ //Menu class becomes a child of Phaser.Scene
    constructor(){
        super("menuScene")
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/Rocket.png')
        this.load.image('rockettwo', './assets/RocketTwo.png')
        this.load.image('spaceship', './assets/SpaceShip.png')
        this.load.image('smallship', './assets/SmallShip.png')
        this.load.image('mothership', './assets/MotherShip.png')
        this.load.image('starfield', './assets/Starfield.png')

        // load spritesheet
        this.load.spritesheet('explosion', './assets/SpaceshipBrokeSpriteSheet.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 8
        })

        // load audio
        this.load.audio('sfx-shot', './assets/laserShoot.wav')
        this.load.audio('sfx-explosion', './assets/explosion.wav')
        this.load.audio('sfx-select', './assets/UISelect.wav')
        this.load.audio('music', './assets/Music.mp3')
    }
    create() {
        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0, end: 8, first: 0}),
                frameRate: 30
        })

        let menuConfig = {
            frontFamily: 'Courier',
            frontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', 
        menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'P1: Use ←→ arrows to move & ↑ to fire', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*5, 'Press ↓ for Two Player VS Mode', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding*9, 'P2:Use (A) & (D) to move & (W) to fire', menuConfig).setOrigin(0.5)
        // define keys
        keyLEFT = 
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = 
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyDOWN =
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //easy mode
            game.settings = {
                spaceshipSpeed: 1,
                speedUpSpeed: 2,
                gameTimer: 61000,
                twoPlayerMode: false
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard mode
            game.settings = {
                spaceshipSpeed: 2,
                speedUpSpeed: 3,
                gameTimer: 46000,
                twoPlayerMode: false
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)){
            //TwoPlayer Mode
            game.settings = {
                spaceshipSpeed: 2,
                speedUpSpeed: 3,
                gameTimer: 60000,
                twoPlayerMode: true
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}