/*--------------------------------------------------------
  modules
--------------------------------------------------------*/
'use strict';

const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  sass = require('gulp-sass');

//------------------------------------------------------------------------------
// sass / scss / css
//------------------------------------------------------------------------------

const style = () => {
  return gulp
    .src(__dirname + '/scss/**/*.scss')
    .pipe(
      plumber({
        errorHandler: notify.onError('<%= error.message %>')
      })
    )
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: [
          'last 3 versions',
          'ie >= 11',
          'ChromeAndroid >= 5',
          'Android >= 5',
          'iOS >= 9'
        ]
      })
    )
    .pipe(gulp.dest('../src/assets/css'));
};

//------------------------------------------------------------------------------
// watch
//------------------------------------------------------------------------------
const watch = () => {
  gulp.watch(__dirname + '/scss/**/*.scss', style);
};

exports.default = watch;
