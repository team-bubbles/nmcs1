var Backbone = require('backbone');
var OnPageView = require('./OnPageView');
var TemplatedView = require('./TemplatedView');
var NProgress = require('nprogress');

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

	switchView: function(view) {
    var previous = this.currentView;
		if (previous) {
			// Detach the old view
      previous.transitionOut(function(){
        previous.remove();
      });

		  //add past view
		  this.pastView = previous;
      // Move the view element into the DOM (replacing the old content)
		  this.el.prepend(view.el);
    }
    else{
      //if no previous view existed, totally replace contents in dom
      this.el.html(view.el);
    }

		// Render view after it is in the DOM (styles are applied)
		view.render();
		this.currentView = view;
    this.currentView.transitionIn();

	},

	/*
	 * Change the active element in the topbar
	 */
	changeView: function(type, id){
    // Check for empty case
    var path;
    if (!type && !id)
    {
      path = '';
    } else {
      path = type +"/"+ id
    }
    console.log("Path: " + path);
    //$('.loading-screen').fadeIn(400);
    NProgress.start();
    // Make a reference to router itself
    // Fuck this. no like seriously, fuck this
    var router = this;
    if (path)
    {
      $.ajax({
        url: path + '.html',
        dataType: 'text',
        cache: true,
        success: function(data){
          router.addedView = new TemplatedView({template:data, data:{}, routeId:type +"/"+ id});
          router.switchView(router.addedView);
          //$('.loading-screen').fadeOut(400); // Danny's stuff
          NProgress.done();
        },
        error: function(){ // [TODO] eeewwww this code is not DRY
          router.addedView = new OnPageView({template:"#404"});
          router.switchView(router.addedView);
          //$('.loading-screen').fadeOut(400); // Danny's stuff
          NProgress.done();
        },
        progress: function(){
          NProgress.inc();
        },
      });
    } else {
      router.clear();
    }


	},

  clear: function(){
    this.addedView = new OnPageView({}); // renders empty html
    this.switchView(this.addedView);
  },

	notFound: function() {
    NProgress.done();
		this.addedView = new OnPageView({template:"#404"});
		this.switchView(this.addedView);
	}

});
