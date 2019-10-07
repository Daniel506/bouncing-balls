import { Configuration } from "../config/configuration";
import { BallState } from "../model/ball-state";
import { Velocity } from "../model/velocity";

self.addEventListener('message', function(params) {
    console.log("messageReceived");
    
    let state = generateState(params.data[0], params.data[1]);
    let config = Configuration.getInstance();
    if ( config.getInterval() == undefined) {
		config.setInterval(setInterval(
        function() {
            drawBall(state, params.data[2]);
        }, config.getFrameRate()));
    }
}, false);

function drawBall(state : BallState, bottomEdge:Number) {
        
    let config = Configuration.getInstance();
    const velocity = state.getVelocity();
    let currentVelocity = velocity.getCurrentVelocity();
    if(state.getCoordinateY() >= bottomEdge && currentVelocity > 0) {
        state.getVelocity().setCurrentVelocity(currentVelocity * (1 - config.getBallAbsorption())); // bounding with less velocity
        console.log('bong');
        if(currentVelocity > -0.1 && currentVelocity < 0.1) {
            clearInterval(config.getInterval());
			config.setInterval(undefined);
            console.log('stop');
            self.close();
        }
        velocity.setVelocityX(currentVelocity * Math.cos(state.getAngle()));
        velocity.setVelocityY(currentVelocity * Math.sin(state.getAngle()) * -1);
    }

    let time = config.getFrameRate()/1000;
    
    var previousState = state;
    
    state.setCoordinateX(state.getCoordinateX() + velocity.getVelocityX() * time);
    state.setCoordinateY(state.getCoordinateY() + velocity.getVelocityY() * time); 

    velocity.setVelocityY(velocity.getVelocityY() + config.getAcceleration() * time);
    self.postMessage([state, previousState], location.origin);
}

function generateState(coordinateX : number, coordinateY : number) {
    const randomAngle = Math.random() * Math.PI / 2;
    const randomVelocity = Math.random() * 100;
    console.log("a: " + randomAngle + " v: " + randomVelocity);
    let velocity = generateVelocity(randomVelocity, randomAngle);
    let color = generateColor(coordinateX, coordinateY, randomAngle); 

    return new BallState(coordinateX, coordinateY, color, velocity, randomAngle);
}

function generateVelocity(randomVelocity: number, randomAngle: number) {
    let velocity = new Velocity(randomVelocity, 0, 0);
    velocity.setVelocityX(velocity.getCurrentVelocity() * Math.cos(randomAngle));
    velocity.setVelocityY(velocity.getCurrentVelocity() * Math.sin(randomAngle) * -1);
    return velocity;
}

function generateColor(coordinateX: number, coordinateY: number, randomAngle: number) {
    const rvalue = coordinateX % 255;
    const gvalue = coordinateY % 255;
    const bvalue = randomAngle;
    return `rgb(${rvalue},${gvalue},${bvalue})`;
}
