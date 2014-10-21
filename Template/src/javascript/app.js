console.log('app.js loaded!');

// Set up requires
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require ('jquery'); // FUUUUUUUUUCK
var ApplicationRouter = require('./ApplicationRouter');

// Application Logic

function igniteProjectClicks(pProject){
  pProject.onclick = function(){
    document.location.hash = $(this).attr('data-hash');
  };
}

$(document).ready(function() {
  for (var i = 0; i < $(".project").length; i++) { igniteProjectClicks($(".project")[i]);}
  new ApplicationRouter($('#project-detail'));
  Backbone.history.start();
});
