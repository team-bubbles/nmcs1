// project detail views. Has Transitions
var Backbone, _, Prefixer;

_ = require('underscore');
Backbone = require('backbone');
Backbone.$ = require('jquery');
Prefixer = require('./Prefixer');

module.exports = Backbone.View.extend({
  remove: function() {
		// Empty the element and remove it from the DOM while preserving events
		$(this.el).empty().detach();
		return this;
	},
  transitionIn: function (callback) {
    var view = this;
    var animateIn = function () {
      view.$el.find('.content').removeClass('page-out');
      view.$el.find('.content').addClass('page-in');
      view.$el.one( Prefixer.getAnimationend(), function () {
        if (_.isFunction(callback)) {
          callback();
        }
      });
    };
    _.delay(animateIn, 20); // browser bug hot fix
  },
  transitionOut: function (callback) {
    var view = this;
    view.$el.find('.content').removeClass('page-in');
    view.$el.find('.content').addClass('page-out');
    view.$el.one( Prefixer.getAnimationend(), function () {
      if (_.isFunction(callback)) {
        callback();
      }
    });

  },
});
