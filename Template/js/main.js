(function(){
    'use strict';
    var overlayOn = false;
    var ww = window.innerWidth;
    var wh = window.innerHeight;
    
    function init(){
        setupUI();
        update();
    }
    
    function update(){
        requestAnimationFrame(update);
        
        toggleOverlay();
        

        
        //console.log("Width " + ww + " Height " + wh);
    }
    
    function setupUI(){
        document.querySelector("#menuBTN").onclick = function(){
            //if(overlayOn == false){
            //    overlayOn = true;
                document.getElementById("overlayBase").className = "overlayMenu.open";
            document.getElementById("menuBTN").style.visibility = 'hidden';
            //}        
        };
        
        document.querySelector("#closeBTN").onclick = function(){
            //if(overlayOn == true){
                document.getElementById("overlayBase").className = "overlayMenu"; 
                document.getElementById("menuBTN").style.visibility = 'visible';
            //}
        };
    }
    
    
    function toggleOverlay(){
    }
    
    
    window.addEventListener("load", init);
}());