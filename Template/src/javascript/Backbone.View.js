//  FUUUUUUCK HOW THE FUCK DOES MODULE WORK THIS IS ALL NEW STYUFF FOR ME
var Backbone, _;

_ = require('underscore');

Backbone = require('backbone');

Backbone.$ = require('jquery');

module.exports = Backbone.View.extend({
  remove: function() {
    console.log("[VIEW] remove");
		// Empty the element and remove it from the DOM while preserving events
		$(this.el).empty().detach();
		return this;
	},
  transitionIn: function (callback) {
    console.log("[VIEW] transitionIn");
    var view = this;
    var animateIn = function () {
      view.$el.find('.content').removeClass('page-nonactive');
      view.$el.find('.content').addClass('page-active');
      view.$el.one('transitionend', function () {
        if (_.isFunction(callback)) {
          callback();
        }
      });
    };
    _.delay(animateIn, 20);
  },
  transitionOut: function (callback) {
    console.log("[VIEW] transitionOut");
    var view = this;
    view.$el.find('.content').removeClass('page-active');
    view.$el.find('.content').addClass('page-nonactive');
    view.$el.one('transitionend', function () {
      if (_.isFunction(callback)) {
        callback();
      }
    });

  },
});
