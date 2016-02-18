var gulp        = require('gulp');
var browserify  = require('browserify');
var babelify    = require("babelify");
var source      = require('vinyl-source-stream');
var plugins     = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var watchLess   = require('gulp-watch-less');
var domain      = require("domain");
var uglify      = require('gulp-uglify');
var buffer      = require('vinyl-buffer');

gulp.task('browserify', function(){
  console.log('Browserifying ...');
	return browserify({
    entries : ['./public/js/index.js'],
    debug   : true
  })
  .transform('babelify', {presets: ['es2015', 'react']})
  .bundle()
  .on('error', function(err) {
    console.log('Error:', err);
  })
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./public'))
})

gulp.task('build', function() {
  runSequence(
    ['browserify'], ['watch']
  );
});

gulp.task('watch', function(){
  gulp.watch(['./public/js/*.js'],['browserify'])
  gulp.watch(['./public/css/*.css'],['browserify'])
})