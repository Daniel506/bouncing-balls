import { BallState } from "../model/BallState";

/**
 * Handles the state of the ball at anytime on the canvas. 
 * It defines the next state of the ball on the canvas. 
 */
export interface StateService {

    /**
     * Updates the state of the ball according to the physics of the ball movement.
     * 
     * @param state current state of the ball that will be updated.
     */
    updateState(state : BallState) : void;
    
    /**
     * Resets the state of the ball when the ball reaches the bounce criteria
     * according to the physiscs and the configuration parameters.
     * 
     * @param state the current state of the ball.
     */
    resetState(state : BallState) : void;
}