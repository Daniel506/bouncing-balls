import { Registry } from "../config/Registry";
import { SequenceIdGenerator } from "../utils/SequenceIdGenerator";

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