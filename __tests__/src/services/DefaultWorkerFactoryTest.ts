import { Registry } from "../../../src/config/Registry";
import { DefaultWorkerFactory } from "../../../src/services/impl/DefaultWorkerFactory";
import 'jsdom-worker';
import 'jest-canvas-mock';
import { DefaultBallFactory } from "../../../src/services/impl/DefaultBallFactory";
import { DefaultStateService } from "../../../src/services/impl/DefaultStateService";

describe("Default worker factory tests", () => {

    beforeEach(() => {
        Registry.startContext();
    });

    test('create worker', () => {

        const context = Registry.getContext();
        const canvasCtx = jest.mock;
        
        const workerFactory = <DefaultWorkerFactory>context.get("workerFactory");
        workerFactory.setWorkerUrl("http://test")
        const worker = workerFactory.createWorker(10, 10, {top: 2, left : 3}, canvasCtx);
    
        expect( worker ).not.toBe( undefined );
    });

    test('when worker is notified', () => {

        const context = Registry.getContext();
        const canvasCtx = new CanvasRenderingContext2D();
        
        const workerFactory = <DefaultWorkerFactory>context.get("workerFactory");
        const ballFactory = <DefaultBallFactory>context.get("ballFactory");

        const currentState = ballFactory.generateState(60,60);
        currentState.setColor("rgb(10,10,10)");
        const previousState = ballFactory.generateState(50,50);
        
        const event = {data: { 'currentState' : currentState, 'previousState' : previousState, config : {'ballSize' : 20}}};
        const worker = workerFactory.onWorkerMessage(event, canvasCtx);
    
        expect( canvasCtx.fillStyle ).toBe("#0a0a0a");
        expect( () => canvasCtx.arc(0, 0, 10, 0, Math.PI * 2) ).not.toThrowError();
        expect( () => canvasCtx.clearRect(40, 40, 10, 10) ).not.toThrowError();
        expect( () => canvasCtx.beginPath() ).not.toThrowError();
        expect( () => canvasCtx.arc(60, 60, 20, 0, Math.PI * 2, true) ).not.toThrowError();
        expect( () => canvasCtx.fill() ).not.toThrowError();
    });
});