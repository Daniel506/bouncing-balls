import { BallState } from "../model/BallState";
import { BallFactory } from "./BallFactory";

export interface WorkerFactory {
    createWorker(clientX : number, clientY : number, canvasRectangle : any, canvasContext : any) : any;
}