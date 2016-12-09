var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var through2 = require('through2');
var server = require('gulp-express');
gulp.task('browserify', function () {
    var browserified = transform(function (filename) {
        return browserify(filename).bundle();
    });

    return gulp.src('script/index.js')
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path)
                .bundle(function (err, res) {
                    file.contents = res;
                    next(null, file);
                });
        }))
        .pipe(gulp.dest('./output/'));
});


gulp.task('server', function () {
    server.run(['server.js']);
});

gulp.task('watch', function () {
    gulp.watch(['script/*.js'], ['browserify']);
});


gulp.task('default', ['browserify', 'server', 'watch']);