import { BallState } from "../model/BallState";
import { BallFactory } from "./BallFactory";

export interface WorkerExchangeFactory {
    createWorkerExchange(clientX : number, clientY : number, canvasRectangle : any) : any;
    createCallbackExchange(state : BallState, previousState : BallState) : any;
}