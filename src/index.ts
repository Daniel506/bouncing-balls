import { Configuration } from "./config/Configuration";
import { DefaultWorkerFactory } from "./services/impl/DefaultWorkerFactory";

var config = Configuration.getInstance();
var workerFactory = new DefaultWorkerFactory();

export function main() {
  initCanvas();
}

function initCanvas() {

  var canvas = <HTMLCanvasElement>document.getElementById('c');
  canvas.height = config.getCanvasHeight();
  canvas.width = config.getCanvasWidth();
  var ctx = canvas.getContext("2d");

  canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect();
    workerFactory.createWorker(e.clientX, e.clientY, rect, ctx)
  });
}

window.onload = function() {
  let config = Configuration.getInstance();
  config.setAcceleration(10);
  config.setBallAbsorption(0.1);
  config.setBallSize(20);
  config.setCanvasHeight(500);
  config.setCanvasWidth(1000);
  config.setFrameRate(20);

  main();
}