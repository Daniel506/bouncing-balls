import { Registry } from "../../../src/config/Registry";
import { mockRandomForEach } from 'jest-mock-random';
import { DefaultBallFactory } from "../../../src/services/impl/DefaultBallFactory";
import { DefaultWorkerExchangeFactory } from "../../../src/services/impl/DefaultWorkerExchangeFactory";

describe("Default worker exchange factory tests", () => {

    mockRandomForEach(0.5);

    beforeEach(() => {
        Registry.startContext();
    });

    test('create worker exchange', () => {

        const context = Registry.getContext();
        
        const workerExchangeFactory = <DefaultWorkerExchangeFactory>context.get("workerExchangeFactory");
        const exchange = workerExchangeFactory.createWorkerExchange(10, 10, {top : 2, left : 2});
    
        expect( exchange.x ).toBe( 8 );
        expect( exchange.y ).toBe( 8 );
        expect( exchange.bottomEdge ).toBe( 390 );
        expect( exchange.config ).toBe( workerExchangeFactory.getConfigurationService().getConfiguration() );
    });

    test('create callback exchange', () => {

        const context = Registry.getContext();
    
        const ballFactory = <DefaultBallFactory>context.get("ballFactory");
        const previousState = ballFactory.generateState(10,10);
        const state = ballFactory.generateState(20,20);

        const workerExchangeFactory = <DefaultWorkerExchangeFactory>context.get("workerExchangeFactory");
        const exchange = workerExchangeFactory.createCallbackExchange(state, previousState);
    
        expect( exchange.currentState ).toBe( state );
        expect( exchange.previousState ).toBe( previousState );
        expect( exchange.config ).toBe( workerExchangeFactory.getConfigurationService().getConfiguration() );
    });
});