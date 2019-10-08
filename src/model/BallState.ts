import { Velocity } from "./velocity";

export class BallState {
    private coordinateX : number;
    private coordinateY : number;
    private color : string;
    private velocity : Velocity;
    private angle : number;

    constructor(coordinateX : number, coordinateY : number, color : string, velocity : Velocity, angle : number) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.color = color;
        this.velocity = velocity;
        this.angle = angle;
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