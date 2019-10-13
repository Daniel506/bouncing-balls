import { BallState } from "../model/BallState";
import { Velocity } from "../model/Velocity";

/**
 * Contains actions related to the state of the ball.
 */
export interface BallFactory {
    /**
     * Generates the initial states of the ball on the canvas.
     * 
     * @param coordinateX X coordinate of the click event.
     * @param coordinateY Y coordinate of the click event.
     */
    generateState(coordinateX : number, coordinateY : number) : BallState;

    /**
     * Generates the velocity state of the ball based on the random values that
     * it receives as an input.
     * 
     * @param randomVelocity random number that represents the scalar vaue of the velocity.
     * @param randomAngle random number that represents the angle (in radians) of the direction in which 
     *        the ball moves.
     */
    generateVelocity(randomVelocity: number, randomAngle: number) : Velocity;

    /**
     * Generates the rgb color of the ball as a combination of the click coordinates and the random angle.
     * 
     * @param coordinateX the X coordinate of the click event on the canvas
     * @param coordinateY the Y coordinate of the click event on the canvas
     * @param randomAngle the angle of the direction in radians
     */
    generateColor(coordinateX: number, coordinateY: number, randomAngle: number) : string;
}