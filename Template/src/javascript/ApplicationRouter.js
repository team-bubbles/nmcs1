/*
Handles the url interpretation, ajax loading, and transition animation
*/
var Backbone = require('backbone');
var _ = require('underscore');
var OnPageView = require('./OnPageView');
var TemplatedView = require('./TemplatedView');
var Prefixer = require('./Prefixer');
var EventEmitter2 = require('eventemitter2').EventEmitter2;

module.exports = Backbone.Router.extend({

	initialize: function(el, evi) {
		this.el = el;
		this.EVI = evi;
		this.currentId = 0;
		this.projAmount = 9;
		router = this;
		this.EVI.on('requestContentChange', function(direction){
			var id;
			if (direction == 'left') {
				id = parseInt(router.currentId) - 1;
				if (id<1) id = router.projAmount;
			}
			if (direction == 'right') {
				id = parseInt(router.currentId) + 1;
				if (id>router.projAmount) id = 1;
			}

			router.changeView('project', "pro"+id);
		});
	},

	currentView: null,
	pastView: null,

	routes: {
		"": "changeView",
    ":type/:id" : "changeView",
		"*else": "notFound",
	},

	// Adds new DOM, and ANIMATES transition
	switchView: function(pView) {
		// !important
		var router = this;
		// Scroll to top
		movetoEl('#content-wrapper');

		// if no previous view, just put it in already
		var previous = router.currentView;
		if (!previous) {
			//if no previous view existed, totally replace contents in dom
			router.el.html(pView.el);
		}
		else{
			//add past view
			router.pastView = previous;
			// Move the view element into the DOM (replacing the old content)
			router.el.prepend(pView.el);
		}
		// Render view after it is in the DOM (styles are applied)
		pView.render();
		router.currentView = pView;
		// Make-disappear loader animation
		router.hideLoader(function(){
			if (router.pastView) router.pastView.transitionOut();
	    router.currentView.transitionIn(function(){
				console.log("router.currentView.transitionIn complete");
				if (router.pastView) {
					// Detach the old view
					router.pastView.remove();
				}
				// pub to event hub
				router.EVI.emit('newContentIsIn', router.currentView.routeId);
				// Start Page Piling
				$('#below-pp').css('display', 'initial'); // reset hidden contents
				if (router.currentView.routeId) {
					console.log("Starting PagePiling on " + router.currentView.routeId);
					$("#"+router.currentView.routeId).pagepiling({verticalCentered:false, normalScrollElements:'.finalcompswrapper'});
					router.currentId = router.currentView.routeId[3]; // [TODO] shitty code
				} else {
					router.currentId = 0;
				}
			});
		});
	},

	/*
	 * Change the active element in the topbar
	 */
	changeView: function(type, id){
    // Check for empty case
    var pUrl;
    if (!type && !id)
    {
      pUrl = 'header.html';
    } else {
      pUrl = type +"/"+ id + '.html';
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
      success: function(data){
        router.addedView = new TemplatedView({template:data, data:{}, routeId:id});
        router.switchView(router.addedView);
      },
      error: function(){ // [TODO] Make this DRY [TODO] finish up 404
        router.addedView = new OnPageView({template:"#404"});
        router.switchView(router.addedView);
      },
      progress: function(){

      },
    });

		// [TODO] [REFACTOR] quick code to hide the menu whenever switching view
		document.getElementById("prBox").className = "overlayMenu";
		document.getElementById("menuBTN").className = "";
	},

  clear: function(){
    this.addedView = new OnPageView({}); // renders empty html
    this.switchView(this.addedView);
  },

	notFound: function() {

		this.addedView = new OnPageView({template:"#404"});
		this.switchView(this.addedView);
	},

	showLoader: function() {
		$('#loader-wrapper').removeClass('inactive');
		$('#loader-wrapper').addClass('active');
	},
	hideLoader: function(callback) {
		_.delay(function(){
			$('#loader-wrapper').removeClass('active');
			$('#loader-wrapper').addClass('inactive');
			$('#loader-wrapper').one( Prefixer.getTransitionend() + ' ' + Prefixer.getAnimationend(), function () {
				if (_.isFunction(callback)) {
					callback();
				}
			});
		}, 300);
	}

});
