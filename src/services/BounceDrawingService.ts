import { BallState } from "../model/BallState";

/**
 * Contains all the actions related to the drawing on the canvas.
 */
export interface BounceDrawingService {

    /**
     * Draw the ball on the canvas according to the state and the bounce criteria.
     * 
     * @param state the current state of the ball
     * @param bottomEdge the Y coordinate of the bottom edge. Usually calcuated as the 
     *        difference between the max height of the canvas and the ball radius.
     */
    drawBall(state : BallState, bottomEdge:Number) : void;
}