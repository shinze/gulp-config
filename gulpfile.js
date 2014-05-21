// Notes :
// https://github.com/pwnjack/GulpJS-Bootstrap-LESS/blob/master/gulpfile.js
// A list of gulp plugins : https://www.npmjs.org/search?q=gulpplugin


var gulp = require('gulp'),

    // Global tools
    browserSync = require('browser-sync'),
    gutil       = require('gulp-util'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    clean       = require('gulp-clean'),
    concat      = require('gulp-concat'),
    filesize    = require('gulp-filesize'),
    uglify      = require('gulp-uglify'),

    // For less-css files
    less        = require('gulp-less'),
    prefixer    = require('gulp-autoprefixer'),
    uncss       = require('gulp-uncss'),

    // For jade
    jade        = require('gulp-jade'),

    // HTML validation
    htmlvalidator       = require('gulp-w3cjs'),

    // For image files
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin');



// Paths
var paths = {
    base               : './',
    build               : './assets',
    src                 : './src',
    js                  : {
        files               : ['./src/js/vendor/*.js','./src/js/*.js'],
        output_min          : 'main.min.js',
        dest                : './assets/js',
    },
    style               : {
        files               : ['./src/less/*.less', '!./src/less/_*.less'],
        watch               : './src/less/*.less',
        output              : 'style.css',
        output_min          : 'style.min.css',
        dest                : './assets/css'
    },
    layout                : {
        files               : './src/*.jade',
        watch               : './src/**/*.jade',
        dest                : './'
    },
    validator           : {
        watchables:         './*.html',
    },
    images              : {
        files               : './src/images/**/*',
        icons               : './src/favicons',
        dest                : './assets/images'
    },

};

// The tasks
// ------------------------------


// Static server
gulp.task('server', function() {
    browserSync.init(null, {
        server: {
            baseDir: './'
        }
    });
});



// Tasks specs
// 0. Cleaning before building
// 1. Less processed
// 2. Prefixed
// 3. Copied as style.css in ./assets/css
// 4. Minified
// 5. Copied as style.min.css in ./assets/css
// 6. Reload Browser sync

gulp.task('clean', function () {
    return gulp.src(paths.js.build + '/*', {read: false})
    .pipe(clean());
});

gulp.task('style', function () {
    return gulp.src(paths.style.files)
    .pipe(plumber())
    .pipe(less())
    .pipe(prefixer('last 5 versions', 'ie 8'))
    .pipe(gulp.dest(paths.style.dest))
    .pipe(rename(paths.style.output))
    .pipe(uncss({
        html: ['index.html']
    }))
    .pipe(less({ compress: true }))
    .pipe(rename(paths.style.output_min))
    .pipe(gulp.dest(paths.style.dest))
    .pipe(browserSync.reload({stream:true}));
    }
);

gulp.task('js', function() {
    return gulp.src(paths.js.files)
    .pipe(plumber())
    .pipe(concat(paths.js.output_min))
    .pipe(uglify()) // = concat+ugly
    .pipe(gulp.dest(paths.js.dest))
    .pipe(filesize())
    .pipe(browserSync.reload({stream:true}));
});

// Jade templates
// 1. Jade processed with pretty output
// 2. Copy generated file to html destination
// 3. Reload BS

gulp.task('templates', function() {
    return gulp.src(paths.layout.files)
    .pipe(plumber())
    .pipe(jade({pretty : true}))
    .pipe(gulp.dest(paths.base))
    .pipe(browserSync.reload({stream:true}));
});



// HTML validation
gulp.task('htmlvalidator', function () {
    return gulp.src(paths.validator.watchables)
    .pipe(htmlvalidator());
});



// Image files compression
// 1. Compressing only modified pictures
// 2. Compressed images to destination

gulp.task('images', function () {
    return gulp.src(paths.images.files)
    .pipe(changed(paths.images.dest))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.images.dest));
});



// Favicons and touch icons
gulp.task('icons', function () {
    return gulp.src(paths.images.icons + 'favicon.png')
    .pipe(rename('favicon.ico'))
    .pipe(gulp.dest(paths.build));
});
gulp.task('touchicons', function() {
    return gulp.src(paths.images.icons + '/apple-touch*.png')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.build));
});



// Watch modifications
gulp.task( 'watch', function () {
    gulp.watch( paths.style.watch,      ['style'] );
    gulp.watch( paths.images.files,     ['images'] );
    gulp.watch( paths.layout.watch,     ['templates'] );
    gulp.watch( paths.layout.output,    ['htmlvalidator'] );
    gulp.watch( paths.js.files,         ['js'] );
});

gulp.task('default', ['clean', 'images', 'templates', 'style', 'js', 'icons', 'touchicons', 'htmlvalidator', 'server', 'watch']);
gulp.task('build', ['clean', 'images', 'templates', 'style', 'js', 'icons', 'touchicons', 'htmlvalidator']);
