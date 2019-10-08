import { StateService } from "../StateService";
import { BallState } from "../../model/BallState";
import { Configuration } from "../../config/configuration";

export class DefaultStateService implements StateService {
    
    updateState(state : BallState) {
        let config = Configuration.getInstance();
        let time = config.getFrameRate()/1000;
        const velocity = state.getVelocity();

        state.setCoordinateX(state.getCoordinateX() + velocity.getVelocityX() * time);
        state.setCoordinateY(state.getCoordinateY() + velocity.getVelocityY() * time); 
        velocity.setVelocityY(velocity.getVelocityY() + config.getAcceleration() * time);
    }

    resetState(state : BallState) {
        let config = Configuration.getInstance();
        const velocity = state.getVelocity();

        let currentVelocity = velocity.getCurrentVelocity();
        state.getVelocity().setCurrentVelocity(currentVelocity * (1 - config.getBallAbsorption())); // bounding with less velocity
        velocity.setVelocityX(currentVelocity * Math.cos(state.getAngle()));
        velocity.setVelocityY(currentVelocity * Math.sin(state.getAngle()) * -1);
    }
}