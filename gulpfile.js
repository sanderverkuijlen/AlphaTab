//Include gulp
var gulp = require('gulp');

//Include plugins
var sass = require('gulp-sass'),
	minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	karma = require('gulp-karma');


//Task input
var styles_src = [
		'src/style/style.scss'
	],
	scripts_src = [
		'src/script/vendor/angular.min.js',
		'src/script/vendor/angular-mocks.js',
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
	karma_src = [
		'src/script/tests/**/*.js',
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
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest('extension'));
});

gulp.task('tests', function(){
	gulp.src(jshint_src)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(karma({
			configFile: 'karma.conf.js'
		}))
		.on('error', function(err) {
			// Make sure failed tests cause gulp to exit non-zero
			throw err;
		});;
});

gulp.task('watch', function(){
	gulp.watch(styles_src, ['styles']);
	gulp.watch([jshint_src, scripts_src], ['scripts']);
	gulp.watch([karma_src], ['tests']);
});

gulp.task('default', ['watch']);