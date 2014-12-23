var gulp = require('gulp');

gulp.task('build', ['scripts', 'browserify', 'sass', 'images', 'markup', 'htaccess']);
