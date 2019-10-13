import { Configuration } from "../../model/Configuration";
import { StateService } from "../StateService";
import { WorkerExchangeFactory } from "../WorkerExchangeFactory";
import { ConfigurationService } from "../ConfigurationService";

export class DefaultBounceDrawingService {

    private stateService : StateService;
    private workerExchangeFactory : WorkerExchangeFactory;
    private configurationService : ConfigurationService;

    drawBall(state : any, bottomEdge:Number) {
        
        let currentVelocity = state.velocity.currentVelocity;
        if(state.getCoordinateY() >= bottomEdge && currentVelocity > 0) {
            this.getStateService().resetState(state);
            
            if(currentVelocity > -0.1 && currentVelocity < 0.1) {
                const config = this.getConfigurationService().getConfiguration();
                
                clearInterval(config.getInterval());
                config.setInterval(undefined);
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

    setConfigurationService(configurationService : ConfigurationService) {
        this.configurationService = configurationService;
    }

    getStateService() {
        return this.stateService;
    }
    
    getWorkerExchangeFactory() {
        return this.workerExchangeFactory;
    }

    getConfigurationService() {
        return this.configurationService;
    }
}
