import { Registry } from "../config/Registry";
import { BallState } from "../model/BallState";

self.addEventListener('message', function(event) {
    console.log("messageReceived");
    
    if (event.data.config != undefined) {
        Registry.startContext();
        setTimeout(() => {
            const starter = Registry.getContext().get("applicationStarter"); 
            starter.copyConfig(event.data.config);

            const ballFactory = Registry.getContext().get("ballFactory");
            const state = ballFactory.generateState(event.data.x, event.data.y);
            let config = event.data.config;
            if ( config.interval == undefined) {
                
                config.interval = setInterval(function () {
                    const bounceDrawingService = Registry.getContext().get("bounceDrawingService");
                    bounceDrawingService.drawBall(state, event.data.bottomEdge);   
                }, config.frameRate);
            }    
        }, 10);
    }
}, false);