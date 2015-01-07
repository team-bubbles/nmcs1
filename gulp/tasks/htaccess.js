var gulp = require('gulp');
var config = require('../config').htaccess

gulp.task('htaccess', function() {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
});
