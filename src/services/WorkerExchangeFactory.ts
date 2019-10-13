import { BallState } from "../model/BallState";
import { BallFactory } from "./BallFactory";

/**
 * Contains the operation of exchange messages generation in the communication between workers and the parent parallel process.
 */
export interface WorkerExchangeFactory {
    /**
     * THis method prepares a message that will be transfered from the root context to the child worker.
     * 
     * @param clientX the X position of the ball on the canvas
     * @param clientY the y position of the ball on the canvas
     * @param canvasRectangle the boundaries and the size of the canvas
     */
    createWorkerExchange(clientX : number, clientY : number, canvasRectangle : any) : any;

    /**
     * Generates a exchange message which goes in the direction from the child worker to the main parent context.
     * 
     * @param state the current state of the ball on the canvas
     * @param previousState the previous state of teh ball on the canvas
     */
    createCallbackExchange(state : BallState, previousState : BallState) : any;
}