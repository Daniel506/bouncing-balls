import { Velocity } from "./Velocity";

/**
 * Defines the ball state. For every ball on the canvas there is a unique state at every moment. The state is defined by the 
 * current coordinates of the ball on the canvas, its color, velocity and the angle.
 */
export class BallState {

    private id : number;
    private coordinateX : number;
    private coordinateY : number;
    private color : string;
    private velocity : Velocity;
    private angle : number;

    constructor(id : number, coordinateX : number, coordinateY : number, color : string, velocity : Velocity, angle : number) {
        this.id = id;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.color = color;
        this.velocity = velocity;
        this.angle = angle;
    }

    setId(id : number) {
        this.id = id;
    }

    setCoordinateX(coordinateX: number) {
        this.coordinateX = coordinateX;
    }

    setCoordinateY(coordinateY: number) {
        this.coordinateY = coordinateY;
    }

    setVelocity(velocity : Velocity) {
        this.velocity = velocity;
    }

    setColor(color : string) {
        this.color = color;
    }

    setAngle(angle : number) {
        this.angle = angle;
    }

    getId() {
        return this.id;
    }

    getCoordinateX() : number {
        return this.coordinateX;
    }

    getCoordinateY() : number {
        return this.coordinateY;
    }

    getVelocity() {
        return this.velocity;
    }

    getColor() : string {
        return this.color;
    }

    getAngle() : number {
        return this.angle;
    }
}