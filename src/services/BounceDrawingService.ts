import { BallState } from "../model/BallState";

export interface WorkerFactory {
    drawBall(state : BallState, bottomEdge:Number) : void;
}