import { WorkerExchangeFactory } from "../WorkerExchangeFacory";
import { BallState } from "../../model/BallState";
import { Configuration } from "../../config/configuration";

export class DefaultWorkerExchangeFactory implements WorkerExchangeFactory {
    createWorkerExchange(clientX : number, clientY : number, canvasRectangle : any) {
        var config = Configuration.getInstance();
        let x = clientX - canvasRectangle.left;
        let y = clientY - canvasRectangle.top;

        const bottomEdge = config.getCanvasHeight() - config.getBallSize() / 2;
        
        return {x : x, y : y, bottomEdge : bottomEdge};
    }

    createCallbackExchange(currentState : BallState, previousState : BallState) {
        return {currentState : currentState, previousState : previousState};
    }
}