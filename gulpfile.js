//Include gulp
var gulp = require('gulp');

//Include plugins
var sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	zip = require('gulp-zip'),
	jshint = require('gulp-jshint'),
	karma = require('karma').server;


//Task input
var style_watch = [
		'src/style/**/*.scss'
	],
	style_src = [
		'src/style/style.scss'
	],
	script_src = [
		'bower_components/angular/angular.min.js',
		'bower_components/angular-mocks/angular-mocks.js',
		'src/script/app.js',
		'src/script/controllers/**/*.js',
		'src/script/directives/**/*.js',
		'src/script/filters/**/*.js',
		'src/script/services/**/*.js'
	],
	jshint_src = [
		'src/script/app.js',
		'src/script/controllers/**/*.js',
		'src/script/directives/**/*.js',
		'src/script/filters/**/*.js',
		'src/script/services/**/*.js'
	],
	karma_src = 'tests/**/*.js',
	zip_src = 'extension/**/*.*';


//Tasks
gulp.task('style', function(){
	gulp.src(style_src)
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(gulp.dest('extension'));
});

gulp.task('script', function(){

	//Run tests
	gulp.src(jshint_src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

	//Build
	gulp.src(script_src)
		.pipe(concat('script.js'))
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest('extension'));
});

gulp.task('zip', function(){

	gulp.src(zip_src)
		.pipe(zip('AlphaTab.zip'))
		.pipe(gulp.dest('dist'));
});

gulp.task('test', function(){

	//Run JShint
	gulp.src(jshint_src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

	//Run tests
	karma.start({
		configFile: process.cwd() + '/karma.conf.js'
	});
});

gulp.task('build', [
	'style',
	'script',
	'zip'
]);

gulp.task('watch', function(){

	gulp.watch(style_watch, ['style']);

	gulp.watch([
		jshint_src,
		script_src
	], ['script']);

	gulp.watch(karma_src, ['test']);
});
gulp.task('default', ['watch']);