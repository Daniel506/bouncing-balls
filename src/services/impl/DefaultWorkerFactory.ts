import { WorkerFactory } from "../WorkerFactory";
import { DefaultWorkerExchangeFactory } from "../../services/impl/DefaultWorkerExchangeFactory";
import { Configuration } from "../../config/configuration";

export class DefaultWorkerFactory implements WorkerFactory {
    
    private workerExchangeFactory = new DefaultWorkerExchangeFactory();

    createWorker(clientX : number, clientY : number, canvasRectangle : any, ctx : any) {
        var worker = new Worker('bounce.js');

        console.log("messageSent " + worker);
        let message = this.workerExchangeFactory.createWorkerExchange(clientX, clientY, canvasRectangle);
        worker.postMessage(message);
        
        worker.addEventListener('message', function(event) {
          var currentState = event.data.currentState;
          var previousState = event.data.previousState; 
          
          if (ctx != null) {
    
            var config = Configuration.getInstance();
            var ballRadius = config.getBallSize() / 2;
            ctx.clearRect(previousState.coordinateX - ballRadius, previousState.coordinateY - ballRadius, config.getBallSize(), config.getBallSize());
            ctx.fillStyle = currentState.color;
            ctx.beginPath();
            ctx.arc(currentState.coordinateX, currentState.coordinateY, ballRadius, 0, Math.PI*2,true);
            ctx.fill();
          }
        }, false);

    }
}