import { Configuration } from "../../config/Configuration";
import { BallState } from "../../model/BallState";
import { StateService } from "../StateService";
import { WorkerExchangeFactory } from "../WorkerExchangeFactory";

export class DefaultBounceDrawingService {

    private stateService : StateService;
    private workerExchangeFactory : WorkerExchangeFactory;
    private config : Configuration;

    drawBall(state : any, bottomEdge:Number) {
        
        let currentVelocity = state.velocity.currentVelocity;
        if(state.getCoordinateY() >= bottomEdge && currentVelocity > 0) {
            this.getStateService().resetState(state);
            if(currentVelocity > -0.1 && currentVelocity < 0.1) {
                clearInterval(this.getConfiguration().getInterval());
                this.getConfiguration().setInterval(undefined);
                console.log("Ball with id: " + state.getId() + " stopped.");
                self.close();
            }
        }
        
        var previousState = state;
        this.getStateService().updateState(state);
        
        let message = this.getWorkerExchangeFactory().createCallbackExchange(state, previousState);
        self.postMessage(message);
    }

    setStateService(stateService : StateService) {
        this.stateService = stateService;
    }
    
    setWorkerExchangeFactory(workerExchangeFactory : WorkerExchangeFactory) {
        this.workerExchangeFactory = workerExchangeFactory;
    }

    setConfiguration(config : Configuration) {
        this.config = config;
    }

    getStateService() {
        return this.stateService;
    }
    
    getWorkerExchangeFactory() {
        return this.workerExchangeFactory;
    }

    getConfiguration() {
        return this.config;
    }
}
