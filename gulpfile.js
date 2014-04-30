// Notes :
// https://github.com/pwnjack/GulpJS-Bootstrap-LESS/blob/master/gulpfile.js
// A list of gulp plugins : https://www.npmjs.org/search?q=gulpplugin

// TODO :
// uncss it
// Bower it
// https://www.npmjs.org/package/gulp-w3cjs
// JS processes




var gulp        = require('gulp'),

    // Global tools
    browserSync = require('browser-sync'),
    gutil       = require('gulp-util'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    clean       = require('gulp-clean'),
    concat      = require('gulp-concat'),

    // For less-css files
    less        = require('gulp-less'),
    prefixer    = require('gulp-autoprefixer'),

    // For jade
    jade        = require('gulp-jade'),

    // For image files
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin');



// Paths
var paths = {
    build               : './build',
    src                 : './src',
    less                : './src/less/*.less',
    css_output          : 'style.css',
    jades               : './src/*.jade',
    js                  : './src/js/*.js',
    js_output           : 'all.js',
    js_vendor           : './src/js/vendor/*.js',
    js_build            : './build/js/',
    js_vendor_output    : 'vendor.js',
    images_src          : './src/images/**/*',
    html                : './build',
    css                 : './build/assets/css',
    images              : './build/assets/images',
    icons               : './src/favicons'
};





// The tasks
// ------------------------------

// Static server
gulp.task('server', function() {
    browserSync.init(null, {
      server: {
        baseDir: paths.build
      }
    });
});


gulp.task('js_vendors', function() {
  return gulp.src(paths.js_vendor)
    .pipe(concat(paths.js_vendor_output))
    .pipe(gulp.dest(paths.js_vendor_output))
});


// Tasks specs
// 0. Cleaning before building
// 1. Less processed
// 2. Prefixed
// 3. Copied as style.css in ./build/assets/css
// 4. Minified
// 5. Copied as style.min.css in ./build/assets/css
// 6. Reload Browser sync

gulp.task('clean', function () {
  return gulp.src(paths.build, {read: false})
    .pipe(clean());
});

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(plumber())
        .pipe(less())
        .pipe(prefixer('last 5 versions', 'ie 8'))
        .pipe(gulp.dest(paths.css))
        .pipe(rename('style.css'))
        .pipe(less({
            compress: true
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({stream:true}));
});




// Jade templates
// 1. Jade processed with pretty outpu
// 2. Copy generated file to html destination
// 3. Reload BS

gulp.task('templates', function() {
    return gulp.src(paths.jades)
        .pipe(plumber())
        .pipe(jade({
            pretty : true
        }))
        .pipe(gulp.dest(paths.html))
        .pipe(browserSync.reload({stream:true}));
});


// Image files compression
// 1. Compressing only modified pictures
// 2. Compressed images to destination

gulp.task('images', function () {
    return gulp.src(paths.images_src)
        .pipe(changed(paths.images))
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(paths.images));
});



// Favicons and touch icons
gulp.task('icons', function () {
    return gulp.src(paths.icons + 'favicon.png')
        .pipe(rename('favicon.ico'))
        .pipe(gulp.dest(paths.build));
});
gulp.task('touchicons', function() {
    return gulp.src(paths.icons + '/apple-touch*.png')
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(paths.build));
});


// Watch modifications
gulp.task( 'watch', function () {
    gulp.watch( paths.less, ['less'] );
    gulp.watch( paths.images_src, ['images'] );
    gulp.watch( paths.jades, ['templates'] );
});



gulp.task('default', ['server', 'images', 'templates', 'clean', 'less', 'icons', 'touchicons', 'watch']);

