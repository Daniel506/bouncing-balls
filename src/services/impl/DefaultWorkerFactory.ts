import { WorkerFactory } from "../WorkerFactory";
import { WorkerExchangeFactory } from "../WorkerExchangeFactory";

export class DefaultWorkerFactory implements WorkerFactory {
    
    private workerExchangeFactory : WorkerExchangeFactory;

    createWorker(clientX : number, clientY : number, canvasRectangle : any, ctx : any) {
        var worker = new Worker('bounce.js');

        console.log("messageSent " + worker);
        let message = this.workerExchangeFactory.createWorkerExchange(clientX, clientY, canvasRectangle);
        worker.postMessage(message);
        
        worker.addEventListener('message', function(event) {
          var currentState = event.data.currentState;
          var previousState = event.data.previousState; 
          
          if (ctx != null) {
    
            var config = event.data.config;
            var ballRadius = config.ballSize / 2;
            ctx.clearRect(previousState.coordinateX - ballRadius, previousState.coordinateY - ballRadius, config.ballSize, config.ballSize);
            ctx.fillStyle = currentState.color;
            ctx.beginPath();
            ctx.arc(currentState.coordinateX, currentState.coordinateY, ballRadius, 0, Math.PI*2,true);
            ctx.fill();
          }
        }, false);

    }

    setWorkerExchangeFactory(workerExchangeFactory : WorkerExchangeFactory) {
      this.workerExchangeFactory = workerExchangeFactory;
    }

    getWorkerExchangeFactory() {
      return this.workerExchangeFactory;
    }

}