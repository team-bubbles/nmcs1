/*
Handles the url interpretation, ajax loading, and transition animation
*/
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
require('pagepiling');
var ContentView = require('./ContentView');
var Prefixer = require('./Prefixer');
var EventEmitter2 = require('eventemitter2').EventEmitter2;

module.exports = Backbone.Router.extend({

  initialize: function(el, evi) {
    this.el = el;
    this.EVI = evi;
    this.currentId = 0;
    this.projAmount = 9;
    router = this;
    this.EVI.on('requestContentChange', function(direction) {
      var id;
      if (direction == 'left') {
        id = parseInt(router.currentId) - 1;
        if (id < 1) id = router.projAmount;
      }
      if (direction == 'right') {
        id = parseInt(router.currentId) + 1;
        if (id > router.projAmount) id = 1;
      }
      Backbone.history.navigate('/project/pro' + id, {
        trigger: true
      });
    });
  },

  currentView: null,
  pastView: null,

  routes: {
    "": "home",
		"project": "projectGrid",
    "project/:id": "projectDetail",
    "*else": "notFound",
  },

	/**
	 * Route handler for root url
	 * Loads header into content
	 */
  home: function() {
    console.log("Home");
    var router = this;
    this.showLoader();
    this.loadNewContentView('header.html');
    this.closeMenu();
  },

	/**
	 * Route handler for project
	 * Shows project grid
	 */
	projectGrid: function(){
		$('#below-pp').css('display', 'initial');
		$("html, body").animate({
			scrollTop: $("#projects").offset().top
		}, "slow");
		this.closeMenu();
	},

  /**
   * Route handler
	 * Loads and displays specific project details
   * @param {string} type URI 1st part
   * @param {string} id   URI 2nd part
   */
	projectDetail: function(id) {
    console.log("Projects");
    // [HACK] Avoid serverside url rewriting problem
    var pUrl = '/proj/' + id + '.html';
    //$('.loading-screen').fadeIn(400);
    this.showLoader();
    this.loadNewContentView(pUrl, {
      id: id
    });

    this.closeMenu();
  },

  /**
   * Grabs 404 in the index file and displays it
   */
  notFound: function() {

    this.addedView = new ContentView({
      id: "404"
    });
    this.addedView.getOnPageEl();
    this.switchView(this.addedView);
  },

  loadNewContentView: function(pUrl, pOptions) {

    // optionally pass in id
    var options = pOptions || {};

    // Make a reference to router itself
    // Fuck this. no like seriously, fuck this
    var router = this;

    $.ajax({
      url: pUrl,
      dataType: 'text',
      cache: true,
      success: function(data) {
        router.addedView = new ContentView({
          template: data,
          id: options.id
        });
        router.addedView.routeId = options.id;
        router.addedView.parseTemplate();
        router.switchView(router.addedView);
      },
      error: function() { // [TODO] Make this DRY [TODO] finish up 404
        router.addedView = new ContentView({
          id: "404"
        });
        router.addedView.getOnPageEl();
        router.switchView(router.addedView);
      },
      progress: function() {

      },
    });
  },

  /**
   * Adds new DOM, and
   * Animates transition
   * @param {ContentView} pView Usually is this.addedView
   */
  switchView: function(pView) {
    // !important
    var router = this;
    // Scroll to top
    $("html, body").animate({
      scrollTop: $("#content-wrapper").offset().top
    }, "slow");

    // if no previous view, just put it in already
    var previous = router.currentView;
    if (!previous) {
      //if no previous view existed, totally replace contents in dom
      router.el.html(pView.el);
    } else {
      //add past view
      router.pastView = previous;
      // Move the view element into the DOM (replacing the old content)
      router.el.prepend(pView.el);
    }
    // Render view after it is in the DOM (styles are applied)
    pView.render();
    router.currentView = pView;
    // Make-disappear loader animation
    router.hideLoader(function() {
      // Determine transition direction
      var direction = 'from-right'; // default
      if (router.pastView) {
        router.pastView.transitionOut();
        if (router.currentView.routeId < router.pastView.routeId) {
          direction = 'from-left';
        }
        // Exception: wrapping. [HACK]
        if (router.currentView.routeId == 'pro1' && router.pastView.routeId == 'pro' + router.projAmount) {
          direction = 'from-right';
        }
        if (router.pastView.routeId == 'pro1' && router.currentView.routeId == 'pro' + router.projAmount) {
          direction = 'from-left';
        }
      }
      router.currentView.transitionIn(direction, function() {
        if (router.pastView) {
          // Detach the old view
          router.pastView.remove();
        }
        // pub to event hub
        router.EVI.emit('newContentIsIn', router.currentView.routeId);
        // Start Page Piling
        $('#below-pp').css('display', 'initial'); // reset hidden contents
        if (!_.isUndefined(router.currentView.routeId)) {
          $("#" + router.currentView.routeId).pagepiling({
            verticalCentered: false,
            scrollingSpeed: 300,
            normalScrollElements: '.finalcompswrapper',
            navigation: {
              'textColor': '#000',
              'bulletsColor': '#000',
              'position': 'right',
              'tooltips': ['Header', 'Mission & Goals', 'Wireframes', 'Moodboard', 'User Journey', 'Final Comps']
            },
          });
          router.currentId = router.currentView.routeId[3]; // [0]:p, [1]:r, [2]:o.  [TODO] shitty code
        } else {
          router.currentId = 0;
        }
      });
    });
  },

	closeMenu: function() {
		$('.menu').removeClass("active");
    $('.menuBtn').removeClass("active");
	},

  showLoader: function() {
    $('.loader-wrapper').addClass('active');
  },
  hideLoader: function(callback) {
    _.delay(function() {
      $('.loader-wrapper').removeClass('active');
      $('.loader-wrapper').one(Prefixer.getTransitionend() + ' ' + Prefixer.getAnimationend(), function() {
        if (_.isFunction(callback)) {
          callback();
        }
      });
    }, 300);
  }

});
