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
            if(overlayOn == false){
                overlayOn = true;
                document.getElementById("prBox").className = "overlayMenu open";
                document.getElementById("menuBTN").className = "closeBTN";
            }
            else{
                overlayOn = false;
                document.getElementById("prBox").className = "overlayMenu";
                document.getElementById("menuBTN").className = "openBTN";
            }
        };
		
		
		//Arrow Buttons ---- Hook up the slider code here
		document.querySelector("#leftArrow").onclick = function(){
			
		};
		document.querySelector("#rightArrow").onclick = function(){
			
		};
        
        //Go to Projects Button
        document.querySelector('#gotoPro').onclick = function(){
            $('#projects-wrapper').ScrollTo();
        };
    }
    
    //function projectsButton (){
    //    var el = document.getElementById('#projects-wrapper');
    //    el.scrollIntoView(true);
    //}
    
    window.addEventListener("load", init);
}());