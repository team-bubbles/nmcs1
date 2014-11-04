
(function(){
    'use strict';
    var ww = window.innerWidth;
    var wh = window.innerHeight;

    function init(){
        setupUI();
    }

    function setupUI(){
    //Overlay Buttons
        document.querySelector("#menuBTN").onclick = function(){

            if(this.className == ""){
                document.getElementById("prBox").className = "overlayMenu open";
                this.className = "active";
            }
            else if (this.className == "active"){
                document.getElementById("prBox").className = "overlayMenu";
                this.className = "";
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
}
