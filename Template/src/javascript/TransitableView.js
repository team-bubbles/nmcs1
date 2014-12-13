// Extend backbone view to include
// Transition functionality
var Backbone, _, Prefixer;

_ = require('underscore');
Backbone = require('backbone');
Backbone.$ = require('jquery');
Prefixer = require('./Prefixer');

module.exports = Backbone.View.extend({
  contentClass: 'content',
  transitInClass: 'transit-in',
  transitOutClass: 'transit-out',
  transitionIn: function (callback) {
    console.log("[TransitableView] callback: " + callback);
    var view = this;
    var animateIn = function () {
      view.$el.find('.'+view.contentClass).removeClass(view.transitOutClass);
      view.$el.find('.'+view.contentClass).addClass(view.transitInClass);
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
    view.$el.find('.'+view.contentClass).removeClass(view.transitInClass);
    view.$el.find('.'+view.contentClass).addClass(view.transitOutClass);
    view.$el.one( Prefixer.getAnimationend(), function () {
      if (_.isFunction(callback)) {
        callback();
      }
    });
  },
});
