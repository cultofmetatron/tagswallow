var gulp = require('gulp');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var path = require('path');
var fs = require('fs');
var reactify = require('reactify');


gulp.task('frontend', function() {
  return browserify({
    debug: true,
    transform: ['reactify']
    //standalone: true
  })
    .require(require.resolve('./frontend/src/js/app.js'), { entry: true })
    .on('error', function(err) { console.log(err); })
    .bundle()
    //.pipe(gulp.dest('./frontend/build/js'));
    .pipe(fs.createWriteStream('./frontend/build/js/app.js'))
});

var logger = function() {
  console.log.apply(console, arguments);
}

gulp.task('less', function() {
  return gulp.src('./frontend/src/stylesheets/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname,'frontend', 'src', 'stylesheets') ]
    }))
    .on('error', logger)
    .pipe(gulp.dest('./frontend/build/stylesheets'))
});

gulp.task('default', function() {
  //livereload.listen();
  gulp.run('less')
  gulp.run('frontend');
  gulp.watch(['./frontend/src/**/*.js', './shared'],['frontend']);
  gulp.watch('./frontend/src/**/*.less', ['less']);

})




