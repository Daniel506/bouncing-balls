import { DefaultBallFactory } from "../services/impl/DefaultBallFactory";
import { DefaultStateService } from "../services/impl/DefaultStateService";
import { DefaultWorkerExchangeFactory } from "../services/impl/DefaultWorkerExchangeFactory";
import { DefaultWorkerFactory } from "../services/impl/DefaultWorkerFactory";
import { DefaultBounceDrawingService } from "../services/impl/DefaultBounceDrawingService";
import { Configuration } from "./Configuration";
import { ApplicationStarter } from "../starter/ApplicationStarter";

/**
 * Container class which implements simple IoC. It contains a context map which resolves all the dependency injections.
 * The registry is responsible to resolve all the dependencies and correctly start the application context.
 * The implementation only supports configuration of singletons that can interoperably reused.
 */
export class Registry {

    private static registry : Registry;
    private static context : Map<String ,any>;

    private constructor() { }

    static getInstance() {
        if (this.registry == null) {
            this.context = new Map();
            this.init();
        }
        return this.registry;
    }
    
    static startContext() {
        console.log("Starting new application context ...")
        this.getInstance();
        console.log("Application context startup is complete ...")
    }
    
    private static init() {
        this.context.set("configuration", this.getConfiguration());
        this.context.set("ballFactory", this.getBallFactory());
        this.context.set("stateService", this.getStateService());
        this.context.set("workerExchangeFactory", this.getWorkerExchangeFactory());
        this.context.set("workerFactory", this.getWorkerFactory());
        this.context.set("bounceDrawingService", this.getBounceDrawingService());
        this.context.set("applicationStarter", this.getApplicationStarter());
    }

    static getContext() {
        return this.context;
    }

    static getConfiguration() {
        const config = new Configuration();
        return config;
    }

    static getBallFactory() {
        return new DefaultBallFactory();
    }

    static getStateService() {
        const defaultStateService = new DefaultStateService();
        defaultStateService.setConfiguration(this.context.get("configuration"));
        return defaultStateService;
    }

    static getWorkerExchangeFactory() {
        const defaultWorkerExchangeFactory = new DefaultWorkerExchangeFactory();
        defaultWorkerExchangeFactory.setConfiguration(this.context.get("configuration"));
        defaultWorkerExchangeFactory.setBallFactory(this.context.get("ballFactory"));
        return defaultWorkerExchangeFactory;
    }

    static getWorkerFactory () {
        const defaultWorkerFactory = new DefaultWorkerFactory();
        defaultWorkerFactory.setWorkerExchangeFactory(this.context.get("workerExchangeFactory"));
        return defaultWorkerFactory;
    }

    static getApplicationStarter() {
        const applicationStarter = new ApplicationStarter();
        applicationStarter.setWorkerFactory(this.context.get("workerFactory"));
        applicationStarter.setConfiguration(this.context.get("configuration"));
        return applicationStarter;
    }

    static getBounceDrawingService() {
        const bounceDrawingService = new DefaultBounceDrawingService();
        bounceDrawingService.setConfiguration(this.context.get("configuration"));
        bounceDrawingService.setStateService(this.context.get("stateService"));
        bounceDrawingService.setWorkerExchangeFactory(this.context.get("workerExchangeFactory"));
        return bounceDrawingService;
    }

}
