//Alex Beteta
//Title: Rocket Wars
//Approximate time to create: 12 hours
//List of Mods & point values
// +1 Implement speed increase half way through game time
// +1 Randomize each spaceship's movement direction (every time a ship is destroyed)
// +3 Display time remaining (in seconds)
// +5 create a new enemy spaceship (new art, smaller, moves faster, more points)
//Custom Mods
// +5 create another new enemy spaceship that takes multiple hits(new art, larger, moves slower, lots of points, has randomized HP (like supersmash bros ball!))
// +5 simultaneous two-player VS mode with custom scoring system, UI and win screen

//Added BG music 
//https://freesound.org/people/Volvion/sounds/265308/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyDOWN, keyFIRETwo, keyLEFTTwo, keyRIGHTTwo, KeyMENU

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3