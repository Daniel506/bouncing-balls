import { Registry } from "../../../src/config/Registry";
import { Velocity } from "../../../src/model/Velocity";
import { mockRandomForEach } from 'jest-mock-random';
import { DefaultBallFactory } from "../../../src/services/impl/DefaultBallFactory";
import { DefaultStateService } from "../../../src/services/impl/DefaultStateService";
import { DefaultBounceDrawingService } from "../../../src/services/impl/DefaultBounceDrawingService";

describe("Default bounce drawing service tests", () => {

    mockRandomForEach(0.5);

    beforeEach(() => {
        Registry.startContext();
        window.postMessage = jest.fn();
        window.close = jest.fn();
    });

    test('draw ball when flying', () => {

        const context = Registry.getContext();
        const ballFactory = <DefaultBallFactory>context.get("ballFactory");
        
        const state = ballFactory.generateState(10,10);
        state.getVelocity().setVelocityX(50);
        state.getVelocity().setVelocityY(50);

        const bounceDrawingService = <DefaultBounceDrawingService>context.get("bounceDrawingService");
        bounceDrawingService.drawBall(state, 390);

        expect( state.getCoordinateX() ).toBe( 10.1 );
        expect( state.getCoordinateY() ).toBe( 10.1 );

        const velocity = <Velocity>state.getVelocity();
        expect( velocity.getVelocityY() ).toBe( 50.1 );

        expect(window.postMessage).toBeCalled();
    });

    test('draw ball when bouncing', () => {

        const context = Registry.getContext();
        const stateService = <DefaultStateService>context.get("stateService");

        const ballFactory = <DefaultBallFactory>context.get("ballFactory");
        const state = ballFactory.generateState(10,390);
        state.getVelocity().setVelocityX(50);
        state.getVelocity().setVelocityY(50);
        state.getVelocity().setCurrentVelocity(50);
        state.setAngle(Math.PI / 6);

        const bounceDrawingService = <DefaultBounceDrawingService>context.get("bounceDrawingService");
        bounceDrawingService.drawBall(state, 390);

        const velocity = <Velocity>state.getVelocity();
        expect( velocity.getCurrentVelocity() ).toBe( 45 );
        expect( velocity.getVelocityX() ).toBe( 50 * Math.cos(Math.PI /6) );
        expect( velocity.getVelocityY() ).toBe( -50 * Math.sin(Math.PI /6) + 0.1);

        expect( state.getCoordinateX() ).toBe( 10 + velocity.getVelocityX() * 0.002 );
        expect( Math.round(state.getCoordinateY()) ).toBe( Math.round(390 + velocity.getVelocityY() * 0.002) );

        expect(window.postMessage).toBeCalled();
    });

    test('draw ball when stop', () => {
        const context = Registry.getContext();
        const stateService = <DefaultStateService>context.get("stateService");

        const ballFactory = <DefaultBallFactory>context.get("ballFactory");
        const state = ballFactory.generateState(10,390);
        state.getVelocity().setCurrentVelocity(0.01);

        const bounceDrawingService = <DefaultBounceDrawingService>context.get("bounceDrawingService");
        bounceDrawingService.drawBall(state, 390);

        expect(window.close).toBeCalled();
    });
});