// Gulp.js configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

// ------------------------------------------
// Sass
// ------------------------------------------
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// ------------------------------------------
// Templates
// ------------------------------------------
gulp.task('templates', function() {
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
    // Adding data to Nunjucks
    .pipe(data(function() {
      return require('./app/data.json')
    }))
    .pipe(nunjucksRender({
      path: ['app/templates']
    }))
    .pipe(gulp.dest('app'))
});

// ------------------------------------------
// Static Server - Page Reload
// ------------------------------------------
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// ------------------------------------------
// Watch Tasks
// ------------------------------------------
gulp.task('watch', ['browserSync', 'sass', 'templates'], function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/pages/**/*.+(html|nunjucks)', ['templates'])
    // Reloads the browser whenever our HTML files change
    gulp.watch('app/*.html', browserSync.reload);
});
