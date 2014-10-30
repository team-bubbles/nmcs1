var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var handleErrors = require('../util/handleErrors');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer-core');
var config=require('../config').sass;

gulp.task('sass', ['images'], function () {
  return gulp.src(config.src)
    .pipe(sass({
      compass: true,
      bundleExec: false,
      trace: true,
      sourcemapPath: '../sass'
    }))
    .on('error', handleErrors)
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
});
