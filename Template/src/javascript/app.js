console.log('app.js loaded!');

// Set up Module libs
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require ('jquery'); // Silly Linkage
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var ApplicationRouter = require('./ApplicationRouter');
var ArrowNav = require('./ArrowNav');

// Application Logic
// http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
$(document).on("click", "a[href^='/']", function(event) {
  var href, passThrough, url;
  href = $(event.currentTarget).attr('href');
  if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
    event.preventDefault();
    url = href.replace(/^\//, '').replace('\#\!\/', '');
    Backbone.history.navigate(url, {
      trigger: true
    });
    return false;
  }
});

$(document).ready(function() {
  for (var i = 0; i < $(".project").length; i++) {
    $(".project")[i].onclick = function(){
      var hash = $(this).attr('data-hash');
      Backbone.history.navigate(hash, {trigger: true});
    };
  }
  var EVI = new EventEmitter2();
  ArrowNav.init(EVI);
  new ApplicationRouter($('#content-wrapper'), EVI);
  Backbone.history.start({pushState:true});
  //Backbone.history.start();
});
