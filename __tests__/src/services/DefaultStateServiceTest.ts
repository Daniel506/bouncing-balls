import { Registry } from "../../../src/config/Registry";
import { Velocity } from "../../../src/model/Velocity";
import { mockRandomForEach } from 'jest-mock-random';
import { StateService } from "../../../src/services/StateService";
import { DefaultBallFactory } from "../../../src/services/impl/DefaultBallFactory";
import { DefaultStateService } from "../../../src/services/impl/DefaultStateService";

describe("Default state service tests", () => {

    mockRandomForEach(0.5);

    beforeEach(() => {
        Registry.startContext();
    });

    test('update state', () => {

        const context = Registry.getContext();
        const stateService = <DefaultStateService>context.get("stateService");

        const ballFactory = <DefaultBallFactory>context.get("ballFactory");
        const state = ballFactory.generateState(10,10);
        state.getVelocity().setVelocityX(50);
        state.getVelocity().setVelocityY(50);

        stateService.updateState(state);
    
        expect( state.getCoordinateX() ).toBe( 10.1 );
        expect( state.getCoordinateY() ).toBe( 10.1 );

        const velocity = <Velocity>state.getVelocity();
        expect( velocity.getVelocityY() ).toBe( 50.1 );

    });

    test('reset state', () => {

        const context = Registry.getContext();
        const stateService = <DefaultStateService>context.get("stateService");

        const ballFactory = <DefaultBallFactory>context.get("ballFactory");
        const state = ballFactory.generateState(10,10);
        state.getVelocity().setCurrentVelocity(50);
        state.setAngle(Math.PI / 6);

        stateService.resetState(state);
    
        const velocity = <Velocity>state.getVelocity();
        expect( velocity.getCurrentVelocity() ).toBe( 45 );

        expect( velocity.getVelocityX() ).toBe( 50 * Math.cos(Math.PI /6) );
        expect( velocity.getVelocityY() ).toBe( -50 * Math.sin(Math.PI /6) );

    });
});