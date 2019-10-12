import { DefaultWorkerFactory } from "../../../src/services/impl/DefaultWorkerFactory";
import { Registry } from "../../../src/config/Registry";
import { ApplicationStarter } from "../../../src/starter/ApplicationStarter";
import { Configuration } from "../../../src/config/Configuration";
import 'jest-canvas-mock';

const createWorker = DefaultWorkerFactory.prototype.createWorker = jest.fn();

describe("Application starter tests", () => {

    beforeEach(() => {        
        Registry.startContext();
        initView();
    });
    
    test('start application', () => {
        const context = Registry.getContext();

        const applicationStarter = <ApplicationStarter>context.get("applicationStarter");
        applicationStarter.start();

        let configuration = <Configuration>context.get("configuration");
        expect( configuration.getAcceleration() ).toBe( 100 );
        expect( configuration.getBallAbsorption() ).toBe( 0.5 );
        expect( configuration.getBallSize() ).toBe( 10 );
        expect( configuration.getCanvasHeight() ).toBe( 200 );
        expect( configuration.getCanvasWidth() ).toBe( 500 );
        expect( configuration.getFrameRate() ).toBe( 5 );
        expect( configuration.getInterval() ).toBe( undefined );
    });

    test('start worker', () => {
        const context = Registry.getContext();
        const workerFactorySpy = jest.spyOn(context.get("workerFactory"), 'createWorker');

        const applicationStarter = <ApplicationStarter>context.get("applicationStarter");
        applicationStarter.startWorker({clientX: 10, clientY : 10});

        expect( workerFactorySpy ).toBeCalled();
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

        const applicationStarter = <ApplicationStarter>context.get("applicationStarter");
        applicationStarter.copyConfig(config);

        let configuration = <Configuration>context.get("configuration");
        expect( configuration.getAcceleration() ).toBe( 100 );
        expect( configuration.getBallAbsorption() ).toBe( 0.5 );
        expect( configuration.getBallSize() ).toBe( 10 );
        expect( configuration.getCanvasHeight() ).toBe( 200 );
        expect( configuration.getCanvasWidth() ).toBe( 500 );
        expect( configuration.getFrameRate() ).toBe( 5 );
        expect( configuration.getInterval() ).toBe( undefined );
    });

    function initView() {
        document.body.appendChild(createElement("acceleration", 100));
        document.body.appendChild(createElement("ballAbsorption", 0.5));
        document.body.appendChild(createElement("frameRate", 5));
        document.body.appendChild(createElement("ballSize", 10));
        document.body.appendChild(createElement("canvasHeight", 200));
        document.body.appendChild(createElement("canvasWidth", 500));

        document.body.appendChild(createCanvas());
    }

    function createElement(id, value) {
        var input = document.createElement("input");
        input.id = id;
        input.type = "number";
        input.value = value;
        return input;
    }

    function createCanvas() {
        var canvas= document.createElement("canvas");
        canvas.id = "c";
        jest.spyOn(canvas, 'getContext').mockImplementation(() => {
            return new CanvasRenderingContext2D();
        });
        return canvas;
    }
});