// Gulp.js configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

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

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever our HTML files change
  gulp.watch('app/*.html', browserSync.reload); 
});
