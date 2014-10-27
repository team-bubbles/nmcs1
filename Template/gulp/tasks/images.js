var changed    = require('gulp-changed');
var gulp       = require('gulp');
// var imagemin   = require('gulp-imagemin'); //[HACK] removed for now because dependency bugs
var config     = require('../config').images;

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    //.pipe(imagemin()) // Optimize [HACK] removed for now because dependency bugs
    .pipe(gulp.dest(config.dest));
});
