'use strict';

var gulp       = require('gulp');
var glob       = require('glob');
var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');

gulp.task('scripts', function() {
    glob('lib/**/*.jsx', function(err, files) {
        
        return browserify({ entries: files })
            .transform('babelify', {
                presets: ['es2015', 'react']
            })
            .bundle()
            .pipe(source('index.js'))
            //.pipe(buffer())
            .pipe(gulp.dest('build'));
    });
});

gulp.task('default', ['scripts']);