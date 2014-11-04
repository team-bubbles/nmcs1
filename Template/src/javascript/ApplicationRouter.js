/*
Handles the url interpretation, ajax loading, and transition animation
*/
var Backbone = require('backbone');
var _ = require('underscore');
var OnPageView = require('./OnPageView');
var TemplatedView = require('./TemplatedView');

module.exports = Backbone.Router.extend({

	initialize: function(el) {
		this.el = el;
	},

	currentView: null,
	pastView: null,

	routes: {
		"": "changeView",
    ":type/:id" : "changeView",
		"*else": "notFound",
	},

	// Adds new DOM, and animates transition
	switchView: function(pView) {
		// Scroll to top
		movetoEl('#content-wrapper');
		// Make-disappear loader animation
		_.delay(this.hideLoader, 500);

		// if no previous view, just put it in already
    var previous = this.currentView;
		if (!previous) {
			//if no previous view existed, totally replace contents in dom
			this.el.html(pView.el);
    }
    else{
			//add past view
			this.pastView = previous;
			// Move the view element into the DOM (replacing the old content)
			this.el.prepend(pView.el);
    }

		// Render view after it is in the DOM (styles are applied)
		pView.render();
		this.currentView = pView;
		var router = this;
		if (this.pastView) this.pastView.transitionOut();
    this.currentView.transitionIn(function(){
			console.log(router.currentView + " transitionIn finished");
			if (router.pastView) {
				// Detach the old view
				console.log("Detach the old view: " + router.pastView);
				router.pastView.remove();
			}
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
    console.log("Path: " + pUrl);
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
        router.addedView = new TemplatedView({template:data, data:{}, routeId:type +"/"+ id});
        router.switchView(router.addedView);
      },
      error: function(){ // [TODO] Make this DRY
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
		document.getElementById("loader-wrapper").className = "active";
	},
	hideLoader: function() {
		document.getElementById("loader-wrapper").className = "inactive";
	}

});
