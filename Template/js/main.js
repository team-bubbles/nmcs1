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
        //console.log("Width " + ww + " Height " + wh);
    }
    
    function setupUI(){
		//Overlay Buttons
        document.querySelector("#menuBTN").onclick = function(){
            //if(overlayOn == false){
            //    overlayOn = true;
            document.getElementById("prBox").className = "overlayMenu open";
            document.getElementById("menuBTN").style.visibility = 'hidden';
            //}        
        };
        document.querySelector("#closeBTN").onclick = function(){
            //if(overlayOn == true){
            document.getElementById("prBox").className = "overlayMenu"; 
            document.getElementById("menuBTN").style.visibility = 'visible';
            //}
        };
		
		
		//Arrow Buttons ---- Hook up the slider code here
		document.querySelector("#leftArrow").onclick = function(){
			//console.log("Lefty");
		};
		document.querySelector("#rightArrow").onclick = function(){
			//console.log("Righty");
		};
    }
    window.addEventListener("load", init);
}());