console.log('app.js loaded!');

// Set up Module libs
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require ('jquery'); // Silly Linkage
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var ApplicationRouter = require('./ApplicationRouter');
// Application Logic

function igniteProjectClicks(pProject){
  pProject.onclick = function(){
    document.location.hash = $(this).attr('data-hash');
  };
}

$(document).ready(function() {
  for (var i = 0; i < $(".project").length; i++) { igniteProjectClicks($(".project")[i]);}
  var EVI = new EventEmitter2();
  console.log(EVI);
  new ApplicationRouter($('#content-wrapper'));
  Backbone.history.start();
});
