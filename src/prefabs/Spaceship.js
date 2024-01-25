// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
            scene.add.existing(this)
            this.points = pointValue
            this.moveSpeed = game.settings.spaceshipSpeed
            this.smallBoost = false;
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
    }

    reset() {
        this.x = game.config.width
    }

    // make current speed faster
    speedUp() {
        if(!this.smallBoost){
            this.moveSpeed = game.settings.speedUpSpeed
        }
        else{
            this.moveSpeed += 1
        }

    }
}