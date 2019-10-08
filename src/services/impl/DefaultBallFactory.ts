import { BallState } from "../../model/BallState";
import { Velocity } from "../../model/Velocity";
import { BallFactory } from "../BallFactory";

export class DefaultBallFactory implements BallFactory {
    
    generateState(coordinateX : number, coordinateY : number) {
        const randomAngle = Math.random() * Math.PI / 2;
        const randomVelocity = Math.random() * 100;
        
        let velocity = this.generateVelocity(randomVelocity, randomAngle);
        let color = this.generateColor(coordinateX, coordinateY, randomAngle); 
    
        return new BallState(coordinateX, coordinateY, color, velocity, randomAngle);
    }

    generateVelocity(randomVelocity: number, randomAngle: number) {
        let velocity = new Velocity(randomVelocity, 0, 0);
        velocity.setVelocityX(velocity.getCurrentVelocity() * Math.cos(randomAngle));
        velocity.setVelocityY(velocity.getCurrentVelocity() * Math.sin(randomAngle) * -1);
        return velocity;
    }

    generateColor(coordinateX: number, coordinateY: number, randomAngle: number) {
        const rvalue = coordinateX % 255;
        const gvalue = coordinateY % 255;
        const bvalue = randomAngle;
        return `rgb(${rvalue},${gvalue},${bvalue})`;
    }
}