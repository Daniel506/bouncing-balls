import { WorkerFactory } from "../WorkerFactory";
import { WorkerExchangeFactory } from "../WorkerExchangeFactory";

export class DefaultWorkerFactory implements WorkerFactory {
    
    private workerExchangeFactory : WorkerExchangeFactory;
    private workerUrl : string = 'bounce.js';

    createWorker(clientX : number, clientY : number, canvasRectangle : any, ctx : any) {
        var worker = new Worker(this.getWorkerUrl());

        let message = this.workerExchangeFactory.createWorkerExchange(clientX, clientY, canvasRectangle);
        worker.postMessage(message);
        
        worker.addEventListener('message', event => this.onWorkerMessage(event, ctx), false);

        return worker;
    }

    onWorkerMessage (event, ctx) {
      var currentState = event.data.currentState;
      var previousState = event.data.previousState; 
      
      if (ctx != null) {

        var config = event.data.config;
        var ballRadius = config.ballSize / 2;
        ctx.clearRect(previousState.coordinateX - ballRadius -2, previousState.coordinateY - ballRadius-2, config.ballSize + 3, config.ballSize + 3);
        ctx.fillStyle = currentState.color;
        ctx.beginPath();
        ctx.arc(currentState.coordinateX, currentState.coordinateY, ballRadius, 0, Math.PI*2,true);
        ctx.fill();
      }
    }

    setWorkerExchangeFactory(workerExchangeFactory : WorkerExchangeFactory) {
      this.workerExchangeFactory = workerExchangeFactory;
    }

    setWorkerUrl(workerUrl : string) {
      this.workerUrl = workerUrl;
    }
    
    getWorkerUrl() {
      return this.workerUrl;
    }

    getWorkerExchangeFactory() {
      return this.workerExchangeFactory;
    }

}