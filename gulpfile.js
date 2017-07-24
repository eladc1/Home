var gulp = require('gulp'),
    minify = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-cssnano'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin');
    nodemon = require('gulp-nodemon');

var paths = {
    scripts: 'src/client/js/**/*.*',
    styles: 'src/client/sass/**/*.*',
    images: 'src/client/img/**/*.*',
    templates: 'src/client/templates/**/*.html',
    index: 'src/client/index.html',
    bower_fonts: 'src/client/components/**/*.{ttf,woff,eof,svg}',
};

gulp.task('start', function () {
    nodemon({
        script: 'bin/www',
         ext: 'js html',
         env: { 'NODE_ENV': 'development' }
    });
});


/**
 * Handle bower components from index
 */
gulp.task('minify', function() {
    return gulp.src(paths.index)
        .pipe(minify({
      //      js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js',  'custom-templates']);

gulp.task('elad-build-custom', ['custom-images', 'elad-custom-js',  'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
});

gulp.task('elad-custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
   //     .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
 //   gulp.watch([paths.index], ['minify']);
});

/**
 * Watch custom files
 */
gulp.task('elad-watch', function() {
   // gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.scripts], ['elad-custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    //   gulp.watch([paths.index], ['minify']);
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 3000
    });
});

gulp.task('livereload', function() {
    gulp.src(['dist/**/*.*'])
        .pipe(watch(['dist/**/*.*']))
        .pipe(connect.reload());
});

/**
 * Gulp tasks
 */
gulp.task('build', ['minify', 'build-assets', 'build-custom']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
gulp.task('elad', [ 'elad-build-custom', 'start', 'livereload', 'elad-watch']);