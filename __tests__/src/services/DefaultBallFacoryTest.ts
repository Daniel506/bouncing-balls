import { Registry } from "../../../src/config/Registry";
import { Velocity } from "../../../src/model/Velocity";
import { mockRandomForEach } from 'jest-mock-random';
import { DefaultBallFactory } from "../../../src/services/impl/DefaultBallFactory";

describe("Default ball factory tests", () => {

    mockRandomForEach(0.5);

    beforeEach(() => {
        Registry.startContext();
    });

    test('generate state', () => {

        const context = Registry.getContext();
        const ballFactory = <DefaultBallFactory>context.get("ballFactory");

        const state = ballFactory.generateState(10,10);
        const angleRadians = 45 * Math.PI / 180;
        expect( state.getAngle() ).toBe( angleRadians );
        expect( state.getCoordinateX() ).toBe( 10 );
        expect( state.getCoordinateY() ).toBe( 10 );
        expect( state.getColor() ).toBe( "rgb(10,10," + angleRadians + ")" );

        const velocity = <Velocity>state.getVelocity();
        expect( velocity.getCurrentVelocity() ).toBe( 125 );
        expect( velocity.getVelocityX() ).toBe( 125 * Math.cos(angleRadians) );
        expect( velocity.getVelocityY() ).toBe( -125 * Math.sin(angleRadians) );

    });
});