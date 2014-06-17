//Include gulp
var gulp = require('gulp');

//Include plugins
var sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint');


//Task input
var styles_src = [
		'src/sass/style.scss'
	],
	scripts_src = [
		'src/js/vendor/**/*.js',
		'src/js/app.js',
		'src/js/controllers/**/*.js',
		'src/js/directives/**/*.js',
		'src/js/filters/**/*.js',
		'src/js/services/**/*.js'
	],
	jshint_src = [
		'src/js/app.js',
		'src/js/controllers/**/*.js',
		'src/js/directives/**/*.js',
		'src/js/filters/**/*.js',
		'src/js/services/**/*.js'
	];


//Tasks
gulp.task('styles', function(){
	gulp.src(styles_src)
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(gulp.dest('extension'));
});

gulp.task('scripts', function(){

	//Run tests
	gulp.src(jshint_src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

	//Build
	gulp.src(scripts_src)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('extension'));
});

gulp.task('watch', function(){
	gulp.watch(styles_src, ['styles']);
	gulp.watch([jshint_src, scripts_src], ['scripts']);
});