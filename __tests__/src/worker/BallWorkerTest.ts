import {onWindowWorkerMessage} from "../../../src/worker/BallWorker";
import { Registry } from "../../../src/config/Registry";
import { mockRandomForEach } from 'jest-mock-random';

jest.mock("../../../src/services/impl/DefaultBounceDrawingService")

describe("Worker ball tests", () => {

    mockRandomForEach(0);

    test('on message received', async() => {

        const config = {
            "acceleration": 100,
            "ballAbsorption": 0.5,
            "frameRate": 5,
            "ballSize": 10,
            "canvasHeight": 200,
            "canvasWidth": 500
        };
        const event = {data: { 'x' : 10, 'y' : 10, 'config' : config, 'bottomEdge' : 10}};

        onWindowWorkerMessage(event);
        
        setTimeout(() => {
            const context = Registry.getContext();
            const configuration = context.get("configuration");
            expect( configuration.getAcceleration() ).toBe( 100 );
            expect( configuration.getBallAbsorption() ).toBe( 0.5 );
            expect( configuration.getBallSize() ).toBe( 10 );
            expect( configuration.getCanvasHeight() ).toBe( 200 );
            expect( configuration.getCanvasWidth() ).toBe( 500 );
            
            expect( context.get("bounceDrawingService").drawBall ).toBeCalled();
        }, 100);
        
    });
});