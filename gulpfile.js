var gulp = require('gulp');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var copy = require('gulp-copy');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var concat = require('gulp-concat');
var size = require('gulp-size');
var sequence = require('run-sequence');
var del = require('del');
var miwoTranslates = require('gulp-miwo-translates');
var mainBowerFiles = require('main-bower-files');


var paths = {
	srcDir: './src',
	distDir: './dist',
	vendorDir: './vendor',
	watch: {
		coffee: ['src/app/**/*.coffee'],
		templates: ['src/templates/**/*.latte'],
		less: ['src/less/*.less', 'bower_components/**/*.less'],
		images: ['src/img/**/*'],
		translates: ['src/translates/**/*.json']
	}
};


var pipes = {
	createBrowserify: function(options) {
		var pipe = browserify(options);
		pipe.on('error', gutil.log);
		return pipe;
	},
	createLess: function(options) {
		var pipe = less(options)
		pipe.on('error', gutil.log);
		return pipe;
	}
};



// MAIN TASKS
gulp.task('default', ['build']);

gulp.task('build', function(cb) {
	sequence('clean', ['app-build', 'vendor-build'], cb);
});

gulp.task('dist', function(cb) {
	sequence('clean', ['app-dist', 'vendor-build'], cb);
});

gulp.task('watch', function() {
	gulp.start('build');
	gulp.watch(paths.watch.coffee, ['app-compile-js']);
	gulp.watch(paths.watch.less, ['app-compile-css']);
	gulp.watch(paths.watch.translates, ['app-compile-translates']);
	gulp.watch(paths.watch.images, ['app-copy-images']);
	gulp.watch(paths.watch.templates, ['app-copy-templates']);
});

gulp.task('clean', function(cb) {
	del(['dist/**/*'], cb)
});


// APPLICATION TASKS
gulp.task('app-copy-templates', function() {
	return gulp.src(paths.srcDir+'/templates/**/*.latte')
		.pipe(newer(paths.distDir+'/templates'))
		.pipe(copy(paths.distDir+'/templates', {prefix:2}));
});

gulp.task('app-copy-images', function() {
	return gulp.src(paths.srcDir+'/img/**/*')
		.pipe(newer(paths.distDir+'/img'))
		.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
		.pipe(gulp.dest(paths.distDir+'/img'))
});

gulp.task('app-compile-js', function() {
	return gulp.src(paths.srcDir+'/app/index.coffee', { read: false })
		.pipe(pipes.createBrowserify({transform: ['caching-coffeeify'], extensions: ['.coffee']}))
		.pipe(rename('app.js'))
		.pipe(gulp.dest(paths.distDir+'/js'));
});

gulp.task('app-compile-css', function() {
	return gulp.src([paths.srcDir+'/less/index.less'])
		.pipe(pipes.createLess())
		.pipe(rename('app.css'))
		.pipe(gulp.dest(paths.distDir+'/css/'));
});

gulp.task('app-compile-translates', function() {
	return gulp.src(paths.srcDir+'/translates/**/*.json')
		.pipe(miwoTranslates())
		.pipe(gulp.dest(paths.distDir+'/translates/'));
});

gulp.task('app-minify-js', ['app-compile-js'], function() {
	return gulp.src(paths.distDir+'/js/*.js')
		.pipe(uglify())
		.pipe(size({title: 'APP all js files'}))
		.pipe(gulp.dest(paths.distDir+'/js'));
});

gulp.task('app-minify-css', ['app-compile-css'], function() {
	return gulp.src(paths.distDir+'/css/*.css')
		.pipe(minifycss({keepBreaks:true}))
		.pipe(size({title: 'APP all css files'}))
		.pipe(gulp.dest(paths.distDir+'/css'));
});

gulp.task('app-build', function(cb) {
	sequence(['app-compile-translates', 'app-compile-js', 'app-compile-css', 'app-copy-templates', 'app-copy-images'], cb);
});

gulp.task('app-dist', function(cb) {
	sequence(['app-compile-translates', 'app-minify-js', 'app-minify-css', 'app-copy-templates', 'app-copy-images'], cb);
});


// VENDOR TASKS
gulp.task('vendor-build', function() {
	return gulp.src(mainBowerFiles(), { base: './bower_components' })
		.pipe(newer(paths.vendorDir))
		.pipe(gulp.dest(paths.vendorDir));
});