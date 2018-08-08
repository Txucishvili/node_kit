'use strict';

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

var sassWatchersArray = ['./src/sass/**/*.scss'];
var sassWatchersDefault = ['./src/sass/style.compile.scss', './src/sass/libreries.compile.scss'];
var sassWatchers = sassWatchersArray;

gulp.task('sass', function () {
  return gulp.src(sassWatchers)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.watch(sassWatchers, ['sass'], function () {
  gulp.watch('./src/sass/*.scss').on('change', browserSync.reload);
});

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: './src',
    logLevel: "silent",
    logFileChanges: false,
    logPrefix: false,
    logConnections: true,
    logSnippet: false
  });

  gulp.watch(sassWatchers, ['sass']);
  gulp.watch('./src/*.html').on('change', browserSync.reload);
});
// default start function
gulp.task('start', function () {
  console.log('Project is starting...');
});

// Default Task
gulp.task('default', ['sass']);
