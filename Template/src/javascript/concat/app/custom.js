
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

    }

  window.addEventListener("load", init);
}());

function movetoEl(elID){
  $("html, body").animate({ scrollTop: $(elID).offset().top }, "slow");
}
