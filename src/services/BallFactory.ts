import { BallState } from "../model/BallState";
import { Velocity } from "../model/Velocity";

export interface BallFactory {
    generateState(coordinateX : number, coordinateY : number) : BallState;
    generateVelocity(randomVelocity: number, randomAngle: number) : Velocity;
    generateColor(coordinateX: number, coordinateY: number, randomAngle: number) : string;
}