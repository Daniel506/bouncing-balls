import { WorkerExchangeFactory } from "../WorkerExchangeFactory";
import { BallState } from "../../model/BallState";
import { BallFactory } from "../BallFactory";
import { SequenceIdGenerator } from "../../utils/SequenceIdGenerator";
import { ConfigurationService } from "../ConfigurationService";

export class DefaultWorkerExchangeFactory implements WorkerExchangeFactory {

    private configurationService : ConfigurationService;
    private ballFactory : BallFactory; 

    createWorkerExchange(clientX : number, clientY : number, canvasRectangle : any) {
        
        let x = clientX - canvasRectangle.left;
        let y = clientY - canvasRectangle.top;
        let config = this.getConfigurationService().getConfiguration();

        const bottomEdge = config.getCanvasHeight() - config.getBallSize() / 2;
        
        return { 
            x : x, 
            y : y, 
            bottomEdge : bottomEdge, 
            config : this.getConfigurationService().getConfiguration(),
            id: SequenceIdGenerator.getInstance().getNextSequenceId()
        };
    }

    createCallbackExchange(currentState : BallState, previousState : BallState) {
        return {
            currentState : currentState, 
            previousState : previousState, 
            config : this.getConfigurationService().getConfiguration()
        };
    }

    setConfigurationService(configurationService : ConfigurationService) {
        this.configurationService = configurationService;
    }

    getConfigurationService() {
        return this.configurationService;
    }

    setBallFactory(ballFactory : BallFactory) {
        this.ballFactory = ballFactory;
    }

    getBAllFactory() {
        return this.ballFactory;
    }
}