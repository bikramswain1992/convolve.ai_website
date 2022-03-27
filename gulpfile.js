// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

// gulp.task('sass', function(cb) {
//   gulp
//     .src('*.scss')
//     .pipe(sass())
//     .pipe(
//       gulp.dest(function(f) {
//         return f.base;
//       })
//     );
//   cb();
// });

// gulp.task(
//   'default',
//   gulp.series('sass', function(cb) {
//     gulp.watch('*.scss', gulp.series('sass'));
//     cb();
//   })
// );

gulp.task('sass', function () {
  return gulp.src('./css/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./css/'));
});

gulp.task(
  'default',
  gulp.series('sass', function(cb) {
    gulp.watch('./css/**/*.scss', gulp.series('sass'));
    cb();
  })
);