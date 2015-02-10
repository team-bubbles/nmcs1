// Extend backbone view to include
// Transition functionality
var Backbone, _, Prefixer;

_ = require('underscore');
Backbone = require('backbone');
Backbone.$ = require('jquery');
var $ = Backbone.$;
Prefixer = require('./Prefixer');

module.exports = Backbone.View.extend({
  contentClass: 'content',
  transitInClass: 'transit-in',
  transitOutClass: 'transit-out',

  initialize: function( pOptions ) {
    this.options = pOptions;
  },

  parseTemplate: function() {
    this.content = _.template( this.options.template, this.options.data );
  },

  getOnPageEl: function() {
    this.content = $('#'+this.options.id).html();
  },

  render: function() {
    $(this.el).html(this.content);
    return this;
  },

  transitionIn: function (direction, callback) {
    var view = this;
    var animateIn = function () {
      view.$el.find('.'+view.contentClass).removeClass(view.transitOutClass)
                                          .addClass(view.transitInClass)
                                          .removeClass('from-right')
                                          .removeClass('from-left')
                                          .addClass(direction);
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
