/*** View with ajax loaded template ***/

var _ = require('underscore');
var Backbone = require('backbone');
TransitableView = require('./TransitableView');


module.exports = TransitableView.extend({

	// Initialize with the template-id
	initialize: function( options ) {
		this.template = _.template( options.template, options.data );
		this.routeId = options.routeId;
	},

	// Get the template content and render it into a new div-element
	render: function() {
		var content = this.template;
		$(this.el).html(content);

		return this;
	},

	transitionIn: function (callback) {
		TransitableView.prototype.transitionIn.apply(this, arguments);
	},

	transitionOut: function (callback) {
		TransitableView.prototype.transitionOut.apply(this, arguments);
	}

});
