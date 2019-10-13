import { Registry } from "../../../src/config/Registry";
import { DefaultConfgurationService } from "../../../src/services/impl/DefaultConfigurationService";
import { ApplicationStarter } from "../../../src/starter/ApplicationStarter";
import { DefaultBounceDrawingService } from "../../../src/services/impl/DefaultBounceDrawingService";
import { DefaultWorkerFactory } from "../../../src/services/impl/DefaultWorkerFactory";
import { DefaultWorkerExchangeFactory } from "../../../src/services/impl/DefaultWorkerExchangeFactory";
import { DefaultStateService } from "../../../src/services/impl/DefaultStateService";
import { DefaultBallFactory } from "../../../src/services/impl/DefaultBallFactory";

describe("Registry tests", () => {
    test('context startup', () => {
        Registry.startContext();

        let context = Registry.getContext();
        
        expect( context.get("ballFactory") ).toBeInstanceOf( DefaultBallFactory )
        expect( context.get("stateService") ).toBeInstanceOf( DefaultStateService )
        expect( context.get("workerExchangeFactory") ).toBeInstanceOf( DefaultWorkerExchangeFactory )
        expect( context.get("workerFactory") ).toBeInstanceOf( DefaultWorkerFactory )
        expect( context.get("bounceDrawingService") ).toBeInstanceOf( DefaultBounceDrawingService )
        expect( context.get("applicationStarter") ).toBeInstanceOf( ApplicationStarter )      
        expect( context.get("configurationService") ).toBeInstanceOf( DefaultConfgurationService )
        
        let configuration = context.get("configurationService").getConfiguration();
        expect( configuration.getAcceleration() ).toBe( 50 );
        expect( configuration.getBallAbsorption() ).toBe( 0.1 );
        expect( configuration.getBallSize() ).toBe( 20 );
        expect( configuration.getCanvasHeight() ).toBe( 400 );
        expect( configuration.getCanvasWidth() ).toBe( 1000 );
        expect( configuration.getFrameRate() ).toBe( 2 );
        expect( configuration.getInterval() ).toBe( undefined );
    });
});