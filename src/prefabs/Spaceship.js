// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
            scene.add.existing(this)
            this.points = pointValue
            this.moveSpeed = game.settings.spaceshipSpeed
            this.smallBoost = false;
            this.motherShip = false;
    }

    update(){

        // move spaceship left
        this.x -= this.moveSpeed

        // wrap from left to right edge
        if(this.x <= 0- this.width) {
            this.x = game.config.width
        }

        if(this.points > 30 && !this.smallBoost){
            this.moveSpeed += 0.5
            this.smallBoost = true
        }

        if(this.points > 50 && !this.motherShip){
            this.moveSpeed -= 1.5
            this.motherShip = true
        }
    }

    reset() {
        this.x = game.config.width
    }

    // make current speed faster
    speedUp() {

        this.moveSpeed += 0.5
       /* if(!this.smallBoost){
            this.moveSpeed = game.settings.speedUpSpeed
        }

        else{
            this.moveSpeed += 1
        }*/

    }
}