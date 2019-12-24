const gulp = require('gulp');
const webpack = require('webpack-stream');
const webpack2 = require('webpack');
const named = require('vinyl-named');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('copy', () => {
	return gulp.src([
		'assets/**/*',
		'src/**/*',
		'!src/html/**',
		'!src/scripts/**',
		'!src/stylesheets/**'])
		.pipe(gulp.dest('build/assets/'));
});

gulp.task('html', () => {
	return gulp.src('src/html/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('build/'));
});

gulp.task('webpack', () => {
	return gulp.src(['src/scripts/public.jsx', 'src/scripts/private.jsx'])
		.pipe(named())
		.pipe(webpack({
			output: {filename: '[name].min.js'},
			mode: 'development',
			devtool: 'source-map',
			target: 'web',
			module: {
				rules: [
					{
						test: /\.jsx$/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env', '@babel/preset-react']
							}
						}
					}
				]
			},
			resolve: {
				extensions: ['.js', '.jsx']
			},
			plugins: [
				// new webpack2.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
			]
		}, require('webpack')))
		.pipe(gulp.dest('build/assets/scripts/'));
});

gulp.task('sass', function () {
	return gulp.src('src/stylesheets/style.sass')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('build/assets/'));
});

gulp.task('clean', () => {
	return del(['build/']);
});

gulp.task('build', gulp.parallel('copy', 'html', 'webpack', 'sass'));
gulp.task('default', gulp.series('clean', 'build'));