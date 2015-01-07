// It seems that the browsers have finally evolved to the point where
// we only need to support one to two prefixes
// May the legend of Moz, MS, and O rest in peace
module.exports = {
  transEndEventNames: {
    'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
    'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
  },
  animEndEventNames: {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'animation'       : 'animationend'
  },

  getTransitionend: function(){
    return this.transEndEventNames[Modernizr.prefixed('transition')];
  },
  getAnimationend: function(){
    return this.animEndEventNames[Modernizr.prefixed('animation')];
  },
};
