import { Registry } from "../../../src/config/Registry";
import { DefaultConfgurationService } from "../../../src/services/impl/DefaultConfigurationService";
import { ApplicationStarter } from "../../../src/starter/ApplicationStarter";
import { DefaultBounceDrawingService } from "../../../src/services/impl/DefaultBounceDrawingService";
import { DefaultWorkerFactory } from "../../../src/services/impl/DefaultWorkerFactory";
import { DefaultWorkerExchangeFactory } from "../../../src/services/impl/DefaultWorkerExchangeFactory";
import { DefaultStateService } from "../../../src/services/impl/DefaultStateService";
import { DefaultBallFactory } from "../../../src/services/impl/DefaultBallFactory";

describe("Registry tests", () => {
    
    beforeEach(() => {        
        Registry.startContext();
    });

    test('copy config', () => {
        const context = Registry.getContext();

        const config = {
            "acceleration": 100,
            "ballAbsorption": 0.5,
            "frameRate": 5,
            "ballSize": 10,
            "canvasHeight": 200,
            "canvasWidth": 500
        };

        const configLoader = context.get("configLoader");
        configLoader.copyConfig(config);

        let configuration = context.get("configurationService").getConfiguration();
        expect( configuration.getAcceleration() ).toBe( 100 );
        expect( configuration.getBallAbsorption() ).toBe( 0.5 );
        expect( configuration.getBallSize() ).toBe( 10 );
        expect( configuration.getCanvasHeight() ).toBe( 200 );
        expect( configuration.getCanvasWidth() ).toBe( 500 );
        expect( configuration.getFrameRate() ).toBe( 5 );
        expect( configuration.getInterval() ).toBe( undefined );
    });
});