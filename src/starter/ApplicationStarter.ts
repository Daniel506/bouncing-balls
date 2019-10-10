import { Configuration } from "../config/Configuration";
import { Registry } from "../config/Registry";
import { WorkerFactory } from "../services/WorkerFactory";

export class ApplicationStarter {

    private config : Configuration;
    private workerFactory : WorkerFactory;

  start() {
    this.initCanvas();
  }
  
  initCanvas() {
    this.loadConfig();
    const canvas = <HTMLCanvasElement>document.getElementById('c');
    canvas.height = this.getConfiguration().getCanvasHeight();
    canvas.width = this.getConfiguration().getCanvasWidth();
  
    canvas.addEventListener("click", this.startWorker);
  }
  
  startWorker(e) {
    const canvas = <HTMLCanvasElement>document.getElementById('c');
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    const starter = Registry.getContext().get("applicationStarter");
    starter.getWorkerFactory().createWorker(e.clientX, e.clientY, rect, ctx)
  }
  
  loadConfig() {
    this.getConfiguration().setAcceleration(+(<HTMLInputElement>document.getElementById("acceleration")).value || 50);
    this.getConfiguration().setBallAbsorption(+(<HTMLInputElement>document.getElementById("ballAbsorption")).value || 0.1);
    this.getConfiguration().setBallSize(+(<HTMLInputElement>document.getElementById("ballSize")).value || 20);
    this.getConfiguration().setCanvasHeight(+(<HTMLInputElement>document.getElementById("canvasHeight")).value || 400);
    this.getConfiguration().setCanvasWidth(+(<HTMLInputElement>document.getElementById("canvasWidth")).value || 1000);
    this.getConfiguration().setFrameRate(+(<HTMLInputElement>document.getElementById("frameRate")).value || 20);
  }

  copyConfig(config : any) {
    this.getConfiguration().setAcceleration(+config.acceleration || 50);
    this.getConfiguration().setBallAbsorption(+config.ballAbsorption || 0.1);
    this.getConfiguration().setBallSize(+config.ballSize || 20);
    this.getConfiguration().setCanvasHeight(+config.canvasHeight || 400);
    this.getConfiguration().setCanvasWidth(+config.canvasWidth || 1000);
    this.getConfiguration().setFrameRate(+config.frameRate || 20);
  }
  setConfiguration(config : Configuration) {
      this.config = config;
  }

  setWorkerFactory(workerFactory : WorkerFactory) {
    this.workerFactory = workerFactory;
  }

  getWorkerFactory() {
      return this.workerFactory;
  }

  getConfiguration() {
      return this.config;
  }
}