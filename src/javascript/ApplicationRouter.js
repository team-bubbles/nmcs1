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
		"": "changeView",
		":type/:id": "changeView",
		"*else": "notFound",
	},

	// Adds new DOM, and
	// ANIMATES transition
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

	/*
	* Change the content loaded
	*/
	changeView: function(type, id) {
		// Check for empty case
		var pUrl;
		if (!type && !id) {
			pUrl = 'header.html';
		} else {
			// [HACK] Avoid serverside url rewriting problem
			if (type == 'project') type = 'proj';
			pUrl = '/' + type + '/' + id + '.html';
		}
		//$('.loading-screen').fadeIn(400);
		// Make a reference to router itself
		// Fuck this. no like seriously, fuck this
		var router = this;

		this.showLoader();

		$.ajax({
			url: pUrl,
			dataType: 'text',
			cache: true,
			success: function(data) {
				router.addedView = new ContentView({
					template: data,
					id: id
				});
				router.addedView.routeId = id;
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

		// [TODO] [REFACTOR] quick code to hide the menu whenever switching view
		document.getElementById("prBox").className = "overlayMenu";
		document.getElementById("menuBTN").className = "";
	},

	notFound: function() {

		this.addedView = new ContentView({
			id: "404"
		});
		this.addedView.getOnPageEl();
		this.switchView(this.addedView);
	},

	showLoader: function() {
		$('#loader-wrapper').removeClass('inactive');
		$('#loader-wrapper').addClass('active');
	},
	hideLoader: function(callback) {
		_.delay(function() {
			$('#loader-wrapper').removeClass('active');
			$('#loader-wrapper').addClass('inactive');
			$('#loader-wrapper').one(Prefixer.getTransitionend() + ' ' + Prefixer.getAnimationend(), function() {
				if (_.isFunction(callback)) {
					callback();
				}
			});
		}, 300);
	}

});
