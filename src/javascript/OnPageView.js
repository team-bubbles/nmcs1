/*** View for contents preloaded onto the page ***/

var Backbone = require('backbone');
TransitableView = require('./TransitableView');

module.exports = TransitableView.extend({

	// Pass in and save the onPageView id
	initialize: function(options) {
		this.id = options.id;
	},

	// Find and grab that sweet sweet html and render it
	render: function() {
		var content = $(this.id).html();
		$(this.el).html(content);

		return this;
	},

});
