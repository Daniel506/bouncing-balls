import { DefaultBallFactory } from "../services/impl/DefaultBallFactory";
import { DefaultStateService } from "../services/impl/DefaultStateService";
import { DefaultWorkerExchangeFactory } from "../services/impl/DefaultWorkerExchangeFactory";
import { DefaultWorkerFactory } from "../services/impl/DefaultWorkerFactory";
import { ApplicationStarter } from "../starter/ApplicationStarter";
import { DefaultBounceDrawingService } from "../services/impl/DefaultBounceDrawingService";
import { Registry } from "./Registry";
import { DefaultConfgurationService } from "../services/impl/DefaultConfigurationService";
import { ConfigLoader } from "./ConfigLoader";

export class ContextConfiguration {
    
    private context : Map<String, any>;

    constructor() {
        this.context = Registry.getContext();
    }

    getConfigurationService() {
        return new DefaultConfgurationService();
    }

    getConfigLoader() {
        const configLoader = new ConfigLoader();
        configLoader.setConfigurationService(this.context.get("configurationService"));
        return configLoader;
    }

    getBallFactory() {
        return new DefaultBallFactory();
    }

    getStateService() {
        const defaultStateService = new DefaultStateService();
        defaultStateService.setConfigurationService(this.context.get("configurationService"));
        return defaultStateService;
    }

    getWorkerExchangeFactory() {
        const defaultWorkerExchangeFactory = new DefaultWorkerExchangeFactory();
        defaultWorkerExchangeFactory.setConfigurationService(this.context.get("configurationService"));
        defaultWorkerExchangeFactory.setBallFactory(this.context.get("ballFactory"));
        return defaultWorkerExchangeFactory;
    }

    getWorkerFactory () {
        const defaultWorkerFactory = new DefaultWorkerFactory();
        defaultWorkerFactory.setWorkerExchangeFactory(this.context.get("workerExchangeFactory"));
        return defaultWorkerFactory;
    }

    getApplicationStarter() {
        const applicationStarter = new ApplicationStarter();
        applicationStarter.setWorkerFactory(this.context.get("workerFactory"));
        applicationStarter.setConfigurationService(this.context.get("configurationService"));
        applicationStarter.setConfigLoader(this.context.get("configLoader"));
        return applicationStarter;
    }

    getBounceDrawingService() {
        const bounceDrawingService = new DefaultBounceDrawingService();
        bounceDrawingService.setConfigurationService(this.context.get("configurationService"));
        bounceDrawingService.setStateService(this.context.get("stateService"));
        bounceDrawingService.setWorkerExchangeFactory(this.context.get("workerExchangeFactory"));
        return bounceDrawingService;
    }
}