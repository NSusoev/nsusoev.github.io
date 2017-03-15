var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .on('error', console.log)
    .pipe(gulp.dest('css'));
});

gulp.task('build', ['sass']);

gulp.task('watch', ['build'], function() {
  browserSync.init({
    server: "."
  });

  gulp.watch('js/*.js', ['js']).on('change', browserSync.reload);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('sass/*.sass', ['sass']).on('change', browserSync.reload);
});

gulp.task('default', ['watch']);