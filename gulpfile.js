// Notes :
// https://github.com/pwnjack/GulpJS-Bootstrap-LESS/blob/master/gulpfile.js
// A list of gulp plugins : https://www.npmjs.org/search?q=gulpplugin

// TODO :
// uncss it
// Bower it

var gulp = require('gulp'),

    // Global tools
    browserSync = require('browser-sync'),
    notify      = require('gulp-notify'),
    gutil       = require('gulp-util'),
    plumber     = require('gulp-plumber'),
    rename      = require("gulp-rename"),

    // For less-css files
    less        = require('gulp-less'),
    prefixer    = require('gulp-autoprefixer'),
    minifycss   = require('gulp-minify-css'),

    // For jade
    jade        = require('gulp-jade'),

    // For Bowered files
    gulpBowerFiles = require('gulp-bower-files'),

    // For image files
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush');



// Paths
var paths = {
    build       : './build',
    src         : './src',
    less        : './src/less/*.less',
    jades       : './src/*.jade',
    images_src  : './src/images/*',
    html        : './build/',
    css         : './build/assets/css',
    images      : './build/assets/images'
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



// Less files
// 1. Less processed
// 2. Prefixed
// 3. Copied as style.css in ./build/assets/css
// 4. Minified
// 5. Copied as style.min.css in ./build/assets/css
// 6. Reload Browser sync
// 7. Notify
gulp.task('less', function () {
    return gulp.src('./src/less/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(prefixer('last 5 versions', 'ie 8'))
        .pipe(gulp.dest(paths.css))
        .pipe(minifycss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({stream:true}));
});


// Jade templates
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
gulp.task('images', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(paths.images));
});

// Watch modifications
gulp.task( 'watch', function () {
    gulp.watch( paths.less, ['less'] );
    gulp.watch( paths.images, ['images'] );
    gulp.watch( paths.jades, ['templates'] );
});

gulp.task('default', ['server', 'images', 'templates', 'less', 'watch']);

