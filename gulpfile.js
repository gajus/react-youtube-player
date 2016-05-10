var gulp = require('gulp');
var webpack = require('webpack-stream');

function swallowError(error) {
  console.error(error.toString());
  this.emit('end');
}

gulp.task('testem-js', function() {
  return gulp.src('tests/src/reactYoutubePlayer.js')
    .pipe(webpack({
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'stage-0'],
              plugins: ['transform-react-jsx', 'transform-runtime']
            }
          }
        ]
      },
      node: {
        fs: 'empty'
      },
      output: {
        filename: 'tests.js'
      }
    }))
    .on('error', swallowError)
    .pipe(gulp.dest('testem/build'));
});

gulp.task('build-testem', ['testem-js']);

gulp.task('watch-testem', ['build-testem'], function () {
  gulp.watch('src/*.js', ['testem-js']);
  gulp.watch('testem/src/*.js', ['testem-js']);
});

gulp.task('default', ['build-testem']);
