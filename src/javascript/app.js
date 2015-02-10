/*** Entry Point ***/
// Set up Module libs
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = require('jquery'); // Silly Linkage
var $ = Backbone.$;
var EventEmitter2 = require('eventemitter2').EventEmitter2;
var ApplicationRouter = require('./ApplicationRouter');
var ArrowNav = require('./ArrowNav');

// Application Logic

// http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
// Using event delegation since html will be dynamic
$(document).on("click", "a[href^='/']", function handleAnchorClick(event) {
  var href, url;
  href = $(event.currentTarget).attr('href');
  if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
    event.preventDefault();
    event.stopPropagation();
    url = href.replace(/^\//, '').replace('\#\!\/', '');
    Backbone.history.navigate(url, {
      trigger: true
    });
    return false;
  }
});

$(document).ready(function() {
  // Ignite Menu Btn
  $(".menuBtn").click(function handlemenuBtnClick() {
    $(".menuBtn").toggleClass("active");
    $(".menu").toggleClass("active");
  });

  // Ignite hash scrolls
  $(document).on("click", ".scroll-to", function handleScrollToClick(event) {
    var targetID = $(event.currentTarget).attr('href');
    $("html, body").animate({
      scrollTop: $(targetID).offset().top
    }, "slow");
  });
  // Ignite project grid clicks
  $(document).on("click", ".project", function handleProjectClick(event) {
    var hash = $(event.currentTarget).attr('data-hash');
    Backbone.history.navigate(hash, {
      trigger: true
    });
  });

  var EVI = new EventEmitter2();
  ArrowNav.init(EVI);
  new ApplicationRouter($('#content-wrapper'), EVI);
  Backbone.history.start({
    pushState: true
  });
  //Backbone.history.start();
});
