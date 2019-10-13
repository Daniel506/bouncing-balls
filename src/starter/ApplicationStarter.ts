import { Configuration } from "../model/Configuration";
import { Registry } from "../config/Registry";
import { WorkerFactory } from "../services/WorkerFactory";
import { ConfigLoader } from "../config/ConfigLoader";
import { ConfigurationService } from "../services/ConfigurationService";

/**
 * Helper class to simplify the context startup, prepare the canvas for drawing and initialize the click event. 
 */
export class ApplicationStarter {

  private configLoader : ConfigLoader;
  private workerFactory : WorkerFactory;
  private configurationService : ConfigurationService;

  start() {
    this.initCanvas();
  }
  
  initCanvas() {
    this.configLoader.loadConfig();
    const config = this.getConfigurationService().getConfiguration();

    const canvas = <HTMLCanvasElement>document.getElementById('c');
    canvas.height = config.getCanvasHeight();
    canvas.width = config.getCanvasWidth();
  
    canvas.addEventListener("click", this.startWorker);
  }
  
  startWorker(e) {
    const canvas = <HTMLCanvasElement>document.getElementById('c');
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    const starter = Registry.getContext().get("applicationStarter");
    starter.getWorkerFactory().createWorker(e.clientX, e.clientY, rect, ctx)
  }

  setWorkerFactory(workerFactory : WorkerFactory) {
    this.workerFactory = workerFactory;
  }

  getWorkerFactory() {
      return this.workerFactory;
  }

  setConfigurationService(configurationService : ConfigurationService) {
    this.configurationService = configurationService;
  }

  getConfigurationService() {
    return this.configurationService;
  }

  setConfigLoader(configLoader : ConfigLoader) {
    this.configLoader = configLoader;
  }

  getConfigLoader() {
    return this.configLoader;
  }
}