
import { Registry } from "./config/Registry";

/** 
 * The main function where the application starts. The application starts in 2 simple steps:
 * 1. Start the application context.
 * 2. Get the application starter from the application context and start the application.
 * 
 * Additionally, on every environmental configuration change on the frontend we need to restart
 * the application in order to completely reload the config.
*/
window.onload = function() {
  Registry.startContext();

  setTimeout(function () {
    const starter = Registry.getContext().get("applicationStarter"); 
    
    starter.start();
    
    const saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", function(e) {
      starter.start();
    });
  }, 10);
}