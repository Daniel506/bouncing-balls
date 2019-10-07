import { Configuration } from "./config/configuration";

export function main(config : Configuration) {
  
  var ballRadius = config.getBallSize() / 2;

  var canvas = <HTMLCanvasElement>document.getElementById('c');
  canvas.height = config.getCanvasHeight();
  canvas.width = config.getCanvasWidth();
  
  const rect = canvas.getBoundingClientRect();
  
  var ctx = canvas.getContext("2d");
  canvas.addEventListener('mousedown', function(e) {
    var worker = new Worker('bounce.js');

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    console.log("messageSent " + worker);
    worker.postMessage([x, y, config.getCanvasHeight() - ballRadius]);
    
    worker.addEventListener('message', function(params) {
      var currentState = params.data[0];
      var previousState = params.data[1]; 
      if (ctx != null) {
        ctx.clearRect(previousState.coordinateX - ballRadius, previousState.coordinateY - ballRadius, config.getBallSize(), config.getBallSize());
        ctx.fillStyle = currentState.color;
        ctx.beginPath();
        ctx.arc(currentState.coordinateX, currentState.coordinateY, ballRadius, 0, Math.PI*2,true);
        ctx.fill();
      }
    }, false);
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

  main(config);
}