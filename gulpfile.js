'use strict'

const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const concatCss = require('gulp-concat-css');
const del = require('del');
const livereload = require('gulp-livereload');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');
const server = require('gulp-server-livereload');
const plumber = require('gulp-plumber');

gulp.task('css', function () {
	return gulp.src('src/css/**/*.css')
      .pipe(plumber())
      .pipe(concatCss('main.min.css'))
      .pipe(cssmin())
      .pipe(plumber.stop())
      .pipe(gulp.dest('dist/css'))
      .pipe(livereload());
});

gulp.task('image', function () {
  gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('index', function (){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('clean', function() {
	return del('dist');
});

gulp.task('default', function (callback) {
	runSequence('clean', ['css', 'image'], ['index'], ['watch'], ['webserver'], callback);
});

gulp.task('watch', function () {
	livereload.listen();
  
	watch('./src/css/**/*.css', function () {
		gulp.start('css');
	});
  
	watch('./src/assets/**/*.*', function () {
		gulp.start('image');
	});
  
	watch('./src/index.html', function () {
		gulp.start('index');
	});
});

gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true
    }));
});