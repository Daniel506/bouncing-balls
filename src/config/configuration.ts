
/**
 * Pojo class containing all the parameters that define the environment in which the balls will bounce:
 * - acceleration: the ground acceleration of the environment.
 * - ballApsorption: defines the loss of energy when the balls bounce from the ground (bottom edge). 
 *   Value of 0.1 means that after the bounce the ball will 10% of it's speed before the bounce.
 * - frameRate: defines the rate of the frames in which the ball will move in the canvas. Low value of frame rate will
 *   mean more frequent refresh of the canvas context, but more smooth movement of the balls.
 * - canvasWidth: the horizontal dimension of the canvas.
 * - canvasHeight: the vertical dimension of the canvas.
 * - ballSize: the diameter of the circle that defines the ball that will bounce in the canvas.
 * - interval: initial value of the interval at which the frames will operate on the canvas.
 */
export class Configuration {

    private acceleration : number = 50; 
    private ballAbsorption : number = 0.1;
    private frameRate : number = 2; 
    private canvasHeight : number = 400;
    private canvasWidth : number = 1000;
    private ballSize : number = 20;
    private interval : undefined | number;

     setAcceleration(acceleration:number) {
        return this.acceleration = acceleration;
    }

     setBallAbsorption(ballAbsorption:number) {
        return this.ballAbsorption = ballAbsorption;
    }
    
     setFrameRate(frameRate:number) {
        return this.frameRate = frameRate;
    }

     setCanvasHeight(canvasHeight:number) {
        return this.canvasHeight = canvasHeight;
    }

     setCanvasWidth(canvasWidth:number) {
        return this.canvasWidth = canvasWidth;
    }

     setBallSize(ballSize:number) {
        return this.ballSize = ballSize;
    }

    setInterval(interval:number|undefined) {
        return this.interval = interval;
    }

     getAcceleration() {
        return this.acceleration;
    }

    getBallAbsorption() {
        return this.ballAbsorption;
    }
    
    getFrameRate() {
        return this.frameRate;
    }

    getCanvasHeight() {
        return this.canvasHeight;
    }

     getCanvasWidth() {
        return this.canvasWidth;
    }

    getBallSize() {
        return this.ballSize;
    }

    getInterval() {
        return this.interval;
    }
}
