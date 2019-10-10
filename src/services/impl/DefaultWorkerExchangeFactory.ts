import { WorkerExchangeFactory } from "../WorkerExchangeFactory";
import { BallState } from "../../model/BallState";
import { Configuration } from "../../config/Configuration";
import { BallFactory } from "../BallFactory";
import { Registry } from "../../config/Registry";

export class DefaultWorkerExchangeFactory implements WorkerExchangeFactory {

    private config : Configuration;
    private ballFactory : BallFactory; 

    createWorkerExchange(clientX : number, clientY : number, canvasRectangle : any) {
        
        let x = clientX - canvasRectangle.left;
        let y = clientY - canvasRectangle.top;

        const bottomEdge = this.getConfiguration().getCanvasHeight() - this.getConfiguration().getBallSize() / 2;
        
        return {x : x, y : y, bottomEdge : bottomEdge, config : this.getConfiguration(), context : Registry.getContext()};
    }

    createCallbackExchange(currentState : BallState, previousState : BallState) {
        return {currentState : currentState, previousState : previousState, config : this.getConfiguration()};
    }

    setConfiguration(config : Configuration) {
        this.config = config;
    }

    getConfiguration() {
        return this.config;
    }

    setBallFactory(ballFactory : BallFactory) {
        this.ballFactory = ballFactory;
    }

    getBAllFactory() {
        return this.ballFactory;
    }
}