
import { Registry } from "./config/Registry";

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