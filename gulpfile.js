var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('sass', function() {
    return gulp.src('./src/static/scss/*.scss')
        .pipe($.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError))
        .pipe(gulp.dest('./src/static/css'));
});

gulp.task('sass-watch', function() {
    gulp.watch('./src/static/scss/*.scss', ['sass']);
});

gulp.task('serve', function() {
    $.nodemon({
        script: 'app.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    });
});