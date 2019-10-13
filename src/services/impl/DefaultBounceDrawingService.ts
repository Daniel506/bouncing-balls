import { Configuration } from "../../model/Configuration";
import { StateService } from "../StateService";
import { WorkerExchangeFactory } from "../WorkerExchangeFactory";
import { ConfigurationService } from "../ConfigurationService";

export class DefaultBounceDrawingService {

    private stateService : StateService;
    private workerExchangeFactory : WorkerExchangeFactory;
    private configurationService : ConfigurationService;

    drawBall(state : any, bottomEdge:Number) {

        this.checkStopCriteria(state, bottomEdge);
        
        var previousState = state.clone();
        this.getStateService().updateState(state);
        
        let message = this.getWorkerExchangeFactory().createCallbackExchange(state, previousState);
        self.postMessage(message);
    }

    checkStopCriteria(state, bottomEdge) {

        const config = this.getConfigurationService().getConfiguration();
        let currentVelocity = state.velocity.currentVelocity;
        if(state.getCoordinateY() >= bottomEdge && currentVelocity > 0) {
            this.getStateService().resetState(state);
            
            if((currentVelocity > -0.1 && currentVelocity < 0.1) ) {
                this.stopWorker(config, state);
            }
        }

        const width = config.canvasWidth + config.ballSize / 2;
        const height = -1 * config.ballSize / 2;
        if (state.coordinateX > width || state.coordinateY < height) {
            this.stopWorker(config, state);
        }
    }

    stopWorker(config, state) {
        clearInterval(config.getInterval());
        config.setInterval(undefined);
        console.log("Ball with id: " + state.getId() + " stopped.");
        self.close();
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
