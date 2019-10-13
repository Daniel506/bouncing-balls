/**
 * Defines the velocity and its axis components in the ball state. This class contains the information about 
 * the scalar value of the velocity and project values on the x and y axis.
 */
export class Velocity {
    private currentVelocity : number;
    private velocityX : number;
    private velocityY : number;

    constructor(currentVelocity : number, velocityX : number, velocityY : number) {
        this.currentVelocity = currentVelocity;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    setCurrentVelocity(currentVelocity : number) {
        this.currentVelocity = currentVelocity;
    }

    setVelocityX(velocityX : number) {
        this.velocityX = velocityX;
    }

    setVelocityY(velocityY : number) {
        this.velocityY = velocityY;
    }
    
    getCurrentVelocity() : number {
        return this.currentVelocity;
    }

    getVelocityX() : number {
        return this.velocityX;
    }

    getVelocityY() : number {
        return this.velocityY;
    }

}