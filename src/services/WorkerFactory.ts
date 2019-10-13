import { BallState } from "../model/BallState";
import { BallFactory } from "./BallFactory";

/**
 * Instatnitates a new worker for each ball. 
 */
export interface WorkerFactory {
    /**
     * Creates a new worker in the pool of workers that will independently draw on the canvas.
     * 
     * @param clientX the X position where the user clicked on the canvas.
     * @param clientY the Y position where the user clicked on the canvas.
     * @param canvasRectangle defines the boundaries of the canvas
     * @param canvasContext contains the canvas context
     */
    createWorker(clientX : number, clientY : number, canvasRectangle : any, canvasContext : any) : any;
}