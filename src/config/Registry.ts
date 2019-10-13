import { ContextConfiguration } from "./ContextConfiguration";

/**
 * Container class which implements simple IoC. It contains a context map which resolves all the dependency injections.
 * The registry is responsible to resolve all the dependencies and correctly start the application context.
 * The implementation only supports configuration of singletons that can interoperably reused.
 */
export class Registry {

    private static registry : Registry;
    private static context : Map<String ,any>;
    private static config : ContextConfiguration;

    private constructor() { }

    static getInstance() {
        if (this.registry == null) {
            this.context = new Map();
            this.config = new ContextConfiguration();
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
        this.context.set("configurationService", this.config.getConfigurationService());
        this.context.set("configLoader", this.config.getConfigLoader());
        this.context.set("ballFactory", this.config.getBallFactory());
        this.context.set("stateService", this.config.getStateService());
        this.context.set("workerExchangeFactory", this.config.getWorkerExchangeFactory());
        this.context.set("workerFactory", this.config.getWorkerFactory());
        this.context.set("bounceDrawingService", this.config.getBounceDrawingService());
        this.context.set("applicationStarter", this.config.getApplicationStarter());
    }

    static getContext() {
        return this.context;
    }
}
