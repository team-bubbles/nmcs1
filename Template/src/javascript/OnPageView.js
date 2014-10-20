/*** View for contents preloaded onto the page ***/

var Backbone = require('backbone');
Backbone.View = require('./Backbone.View');

module.exports = Backbone.View.extend({

	initialize: function(options) {
		this.template = options.template;
	},

	render: function() {
		var content = $(this.template).html();
		$(this.el).html(content);

		return this;
	},

});
