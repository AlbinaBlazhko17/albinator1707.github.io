const gulp = require('gulp');
const webpack = require('webpack-stream');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const browsersync = require('browser-sync');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

const dist = './dist';

gulp.task('copy-html', () => {
  return gulp
    .src('./src/index.html')
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task('build-js', () => {
  return gulp
    .src('./src/js/script.js')
    .pipe(gulp.dest(dist + '/js'))
    .pipe(browsersync.stream());
});

gulp.task('build-sass', () => {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
    .pipe(browsersync.stream());
});

gulp.task('copy-assets', () => {
  gulp.src('./src/icons/**/*.*').pipe(gulp.dest(dist + '/icons'));

  return gulp
    .src('./src/img/**/*.*')
    .pipe(gulp.dest(dist + '/img'))
    .pipe(browsersync.stream());
});

gulp.task('build-css-min', () => {
  return gulp
    .src('./src/css/styles.css')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(gulp.dest(dist + '/css'))
    .pipe(browsersync.stream());
});

gulp.task('watch', () => {
  browsersync.init({
    server: './dist/',
    port: 4000,
    notify: true,
  });

  gulp.watch('./src/index.html', gulp.parallel('copy-html'));
  gulp.watch('./src/icons/**/*.*', gulp.parallel('copy-assets'));
  gulp.watch('./src/img/**/*.*', gulp.parallel('copy-assets'));
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('build-sass'));
  gulp.watch('./src/js/**/*.js', gulp.parallel('build-js'));
  gulp.watch('./src/css/styles.css', gulp.parallel('build-css-min'));
});

gulp.task(
  'build',
  gulp.parallel(
    'copy-html',
    'copy-assets',
    'build-sass',
    'build-js',
    'build-css-min'
  )
);

gulp.task('prod', () => {
  gulp.src('./src/index.html').pipe(gulp.dest(dist));
  gulp.src('./src/img/**/*.*').pipe(gulp.dest(dist + '/img'));
  gulp.src('./src/icons/**/*.*').pipe(gulp.dest(dist + '/icons'));

  gulp
    .src('./src/js/scipt.js')
    .pipe(
      webpack({
        mode: 'production',
        output: {
          filename: 'script.js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        debug: false,
                        corejs: 3,
                        useBuiltIns: 'usage',
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist + '/js'));

  return gulp
    .src('./src/scss/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./src/css'));
});

gulp.task('default', gulp.parallel('watch', 'build'));
