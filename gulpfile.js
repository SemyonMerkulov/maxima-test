const gulp = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('autoprefixer-stylus');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require("browser-sync").create(); 
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function css() {
    return gulp
    .src('./stylus/main.styl') 
    .pipe(sourcemaps.init())
    .pipe(stylus({
        use: [autoprefixer('last 2 versions', 'IE 10')],
        compress: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/'))
    .pipe(browsersync.stream());
}

function js() {
  return gulp
  .src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/inputmask/dist/min/jquery.inputmask.bundle.min.js",
    "node_modules/slick-carousel/slick/slick.min.js",
    "./js/script.js"
    ])
  .pipe(concat("main.js"))
  .pipe(uglify())
  .pipe(gulp.dest('./build/'))
  .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch("./stylus/blocks/*", css);
  gulp.watch("./js/*.*", js);
  gulp.watch([
    "./img/*.*",
    "./fonts/*.*",
    "./*.html"
    ], gulp.series(browserSyncReload));
}

const build = gulp.parallel(css, js);
const watch = gulp.parallel(watchFiles, browserSync);

exports.build = build;
exports.default = build;
exports.watch = watch;
