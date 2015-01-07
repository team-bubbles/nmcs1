/*** Concatinates all non-modules
 * The output is intended to concat all plugins, custom scripts, etc.
 * that weren't able to be integrated into the browserify workflow
 ***/

var gulp  = require('gulp');
var config= require('../config');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  config.scripts.forEach(function(bundleConfig){
    gulp.src(bundleConfig.src)
      .pipe(concat(bundleConfig.outputName))
      .pipe(gulp.dest(bundleConfig.dest));
  });
})
