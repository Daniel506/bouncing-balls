import { Configuration } from "../config/Configuration";
import { BallState } from "../model/BallState";
import { DefaultBallFactory } from "../services/impl/DefaultBallFactory";
import { DefaultStateService } from "../services/impl/DefaultStateService";
import { DefaultWorkerExchangeFactory } from "../services/impl/DefaultWorkerExchangeFactory";

var ballFactory = new DefaultBallFactory();
var stateService = new DefaultStateService();
var workerExchangeFactory = new DefaultWorkerExchangeFactory();
let config = Configuration.getInstance();

self.addEventListener('message', function(event) {
    console.log("messageReceived");
    
    let state = ballFactory.generateState(event.data.x, event.data.y);
    if ( config.getInterval() == undefined) {
		config.setInterval(setInterval(
        function() {
            drawBall(state, event.data.bottomEdge);
        }, config.getFrameRate()));
    }
}, false);

function drawBall(state : BallState, bottomEdge:Number) {
    
    let currentVelocity = state.getVelocity().getCurrentVelocity();
    if(state.getCoordinateY() >= bottomEdge && currentVelocity > 0) {
        stateService.resetState(state);
        console.log('bong');
        if(currentVelocity > -0.1 && currentVelocity < 0.1) {
            clearInterval(config.getInterval());
			config.setInterval(undefined);
            console.log('stop');
            self.close();
        }
    }
    
    var previousState = state;
    stateService.updateState(state);
    
    let message = workerExchangeFactory.createCallbackExchange(state, previousState);
    self.postMessage(message);
}