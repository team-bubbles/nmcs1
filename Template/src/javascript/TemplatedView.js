/*** View with ajax loaded template ***/

var _ = require('underscore');
var Backbone = require('backbone');
Backbone.View = require('./Backbone.View');


module.exports = Backbone.View.extend({

	/*
	 * Initialize with the template-id
	 */
	initialize: function( options ) {
		this.template = _.template( options.template, options.data );
		this.routeId = options.routeId;
	},

	/*
	 * Get the template content and render it into a new div-element
	 */
	render: function() {
		var content = this.template;

		$(this.el).html(content);

		return this;
	}

});
