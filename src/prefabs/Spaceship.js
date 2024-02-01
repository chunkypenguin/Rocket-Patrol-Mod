// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
            scene.add.existing(this)
            this.points = pointValue
            this.moveSpeed = game.settings.spaceshipSpeed
            this.smallBoost = false;
            this.motherShip = false;
            this.respawnpoint = 0 
    }

    update(){

        // move spaceship left
        if(this.respawnpoint == 0){
            this.x -= this.moveSpeed
        }
        else{
            this.x += this.moveSpeed
            
        }


        // wrap from left to right edge
        if(this.x <= 0 - this.width && this.respawnpoint == 0) {
            this.x = game.config.width
        }

        else if(this.x >= game.config.width && this.respawnpoint == 1){
            this.x = 0 - borderUISize
        }

        if(this.points > 30 && !this.smallBoost){
            this.moveSpeed += 0.5
            this.smallBoost = true
        }

        if(this.points > 50 && !this.motherShip){
            this.moveSpeed -= 1
            this.motherShip = true
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    reset() {
        this.respawnpoint = this.getRandomInt(2)
        console.log(this.respawnpoint)
        if(this.respawnpoint == 0){
            this.x = game.config.width
            this.flipX = false
        }
        else{
            this.x = 0 - borderUISize
            this.flipX = true
        }

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