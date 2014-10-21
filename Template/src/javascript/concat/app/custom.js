
(function(){
    'use strict';
    var overlayOn = false;
    var ww = window.innerWidth;
    var wh = window.innerHeight;

    function init(){
        setupUI();
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

    }



    window.addEventListener("load", init);
}());

function movetoEl(elID){
    var el = elID;
    $(el).ScrollTo();
    console.log(el);
}
