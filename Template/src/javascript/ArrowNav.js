var EventEmitter2 = require('eventemitter2').EventEmitter2;
var $ = require('jquery');

// Handles arrow nav button and keyboard-controlled project switching
module.exports = {
  init: function(evi) {
    this.EVI = evi;
    //Arrow Buttons ---- Hook up the slider code here
    var arrowNav = this;
    document.querySelector(".left.arrowbutton").onclick = function(){
      arrowNav.navigate('left');
    };
    document.querySelector(".right.arrowbutton").onclick = function(){
      arrowNav.navigate('right');
    };
    $(document).keydown( function(e){
      switch (e.which) {
          //left
        case 37:
          arrowNav.navigate('left');
          break;
          //right
        case 39:
          arrowNav.navigate('right');
          break;
        default:
          return; // exit this handler for other keys
      }
    });

    this.EVI = evi;
    this.EVI.on('newContentIsIn', function(id){
      if (id) {
        $("#BTNControl").addClass('active');
      } else {
        $("#BTNControl").removeClass('active');
      }
    });
  },

  navigate: function(direction) { // [TODO] USE ENUM YOU FUCKTARD
    this.EVI.emit('requestContentChange', direction);
  },

};
