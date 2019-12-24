'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const babelify = require('babelify');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

gulp.task('build', async () => {
    return browserify({
        entries: ['src/linter.js']
    })
        .transform(babelify.configure({
            presets : ['@babel/preset-env']
        }))
        .bundle()
        .pipe(source("script.js"))
        .pipe(gulp.dest('build'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('build'));
});

