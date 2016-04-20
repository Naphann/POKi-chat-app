var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mysql = require('mysql');
var Promise = require('bluebird');
var using = Promise.using;
var clc = require('cli-color');
var fs = require('fs');
var _ = require('lodash');

var error = clc.red.bold;
var warn = clc.yellow;
var info = clc.cyanBright;
var success = clc.green;

Promise.promisifyAll(fs);

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


function bar() {
    console.log(warn('============================================='));
}