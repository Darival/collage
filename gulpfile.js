var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var uglifycss   = require('gulp-uglifycss');


// Static server
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });

    gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js'));

    gulp.watch("./resources/scss/*.scss", ['sass']);
    gulp.watch("./resources/js/*.js", ['js']);
    gulp.watch("./*.html")
        .on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./resources/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('build', function (cb) {
    gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js'));
    gulp.start('bundlejs');
    gulp.start('js');
    gulp.start('bundlecss');
    gulp.start('sass');
});

gulp.task('bundlejs', function (cb) {
    return gulp.src([
            "./node_modules/lity/dist/lity.min.js",
        ])
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('bundlecss', function (cb) {
    return gulp.src([
            "./node_modules/lity/dist/lity.min.css",
        ])
        .pipe(concat('bundle.min.css'))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', function(){
    return gulp.src('./resources/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
