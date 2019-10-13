import { Registry } from "../config/Registry";
import { SequenceIdGenerator } from "../utils/SequenceIdGenerator";

/**
 * The main worker that will handle and define the ball movement on the canvas. Since it is a worker 
 * it has a separate child context against the parent context on the canvas.
 * Each ball operates in its own process and its own isolated context. All the instances of the objects 
 * defined in the context will be available only in the scope of the worker, but not in the parent context.
 * 
 * The idea is this worker to receive the initial state of the ball on the canvas and after that to update the canvas
 * on the interval defined by the frame rate until the ball loses of all its energy and evetually stops somewhere in the 
 * future. 
 */
self.addEventListener('message', event => onWindowWorkerMessage(event), false);

export function onWindowWorkerMessage(event) {
    
    if (event.data.config != undefined) {
        Registry.startContext();
        setTimeout(() => {
            const starter = Registry.getContext().get("applicationStarter"); 
            starter.copyConfig(event.data.config);

            SequenceIdGenerator.getInstance().setSequence(event.data.id);
            
            const ballFactory = Registry.getContext().get("ballFactory");
            const state = ballFactory.generateState(event.data.x, event.data.y);
            console.log("creating a new ball with id: " + state.getId());
            let config = event.data.config;
            if ( config.interval == undefined) {
                
                config.interval = setInterval(function () {
                    const bounceDrawingService = Registry.getContext().get("bounceDrawingService");
                    bounceDrawingService.drawBall(state, event.data.bottomEdge);   
                }, config.frameRate);
            }    
        }, 10);
    }
}