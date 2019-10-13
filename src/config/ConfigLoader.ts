import { ConfigurationService } from "../services/ConfigurationService";

export class ConfigLoader {
    
    private configurationService : ConfigurationService;
    
    loadConfig() {
        const configuration = this.getConfigurationService().getConfiguration();
        configuration.setAcceleration(+(<HTMLInputElement>document.getElementById("acceleration")).value || 50);
        configuration.setBallAbsorption(+(<HTMLInputElement>document.getElementById("ballAbsorption")).value || 0.1);
        configuration.setBallSize(+(<HTMLInputElement>document.getElementById("ballSize")).value || 20);
        configuration.setCanvasHeight(+(<HTMLInputElement>document.getElementById("canvasHeight")).value || 400);
        configuration.setCanvasWidth(+(<HTMLInputElement>document.getElementById("canvasWidth")).value || 1000);
        configuration.setFrameRate(+(<HTMLInputElement>document.getElementById("frameRate")).value || 20);
    }

    copyConfig(config : any) {
        const configuration = this.getConfigurationService().getConfiguration();
        configuration.setAcceleration(+config.acceleration || 50);
        configuration.setBallAbsorption(+config.ballAbsorption || 0.1);
        configuration.setBallSize(+config.ballSize || 20);
        configuration.setCanvasHeight(+config.canvasHeight || 400);
        configuration.setCanvasWidth(+config.canvasWidth || 1000);
        configuration.setFrameRate(+config.frameRate || 20);
    }

    setConfigurationService(configurationService : ConfigurationService) {
        this.configurationService = configurationService;
    }

    getConfigurationService() {
        return this.configurationService;
    }
}