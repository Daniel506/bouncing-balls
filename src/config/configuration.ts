
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