var gulp = require('gulp');
var less = require("gulp-less");
var minifyCSS = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var connect = require('gulp-connect');

var paths = {
    stylesheets: 'less/*.less'
};

var distPaths = {
    stylesheets: 'css'
};

gulp.task('watch', function () {
    gulp.watch(paths.stylesheets, ['stylesheets']);
});

gulp.task('stylesheets', ['clean-dist-stylesheets'], function () {
    gulp.src('less/agency.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(gulp.dest(distPaths.stylesheets));
});

gulp.task('connect', function () {
    connect.server({
        port: 3000
    });
});

gulp.task('clean-dist-stylesheets', function () {
    return gulp.src(distPaths.stylesheets)
        .pipe(clean());
});

gulp.task('default', ['connect', 'watch']);
