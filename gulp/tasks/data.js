var gulp,
    config;

gulp   = require('gulp');
config = require('../config').data;

gulp.task('data', ['clean-data'], function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
