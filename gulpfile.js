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
	},
	vendor: {
		js: [
			"bower_components/mootools-core/dist/mootools-core.js",
			"bower_components/miwo/js/miwo.js",
			"bower_components/miwo-app/js/miwo-app.js",
			"bower_components/miwo-data/js/miwo-data.js",
			"bower_components/miwo-latte/js/miwo-latte.js",
			"bower_components/miwo-templates/js/miwo-templates.js",
			"bower_components/miwo-ui/js/miwo-ui.js",
			"bower_components/miwo-navside/js/miwo-navside.js"
		],
		css: [
			"bower_components/fontawesome/css/font-awesome.css",
			"bower_components/bootstrap/dist/css/bootstrap.css",
			"bower_components/miwo/css/miwo.css",
			"bower_components/miwo-ui/css/miwo-ui.css"
		],
		assets: [
			"bower_components/miwo-ui/**/*.(png)",
			"bower_components/bootstrap/dist/**/*.(eot|svg|ttf|woff|otf)",
			"bower_components/fontawesome/**/*.(eot|svg|ttf|woff|otf)"
		]
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



// COMMON TASKS
gulp.task('default', ['build']);

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
gulp.task('vendor-copy-assets', function() {
	return gulp.src(paths.vendor.assets)
		.pipe(newer(paths.vendorDir))
		.pipe(gulp.dest(paths.vendorDir));
});

gulp.task('vendor-concat-js', function() {
	return gulp.src(paths.vendor.js)
		.pipe(concat('vendor.js', {newLine: ';'}))
		.pipe(gulp.dest(paths.vendorDir+'/js'));
});

gulp.task('vendor-concat-css', function() {
	return gulp.src(paths.vendor.css)
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest(paths.vendorDir+'/css'));
});

gulp.task('vendor-minify-js', ['vendor-concat-js'], function() {
	return gulp.src(paths.vendorDir+'/js/*.js')
		.pipe(uglify())
		.pipe(size({title: 'VENDOR all js files'}))
		.pipe(gulp.dest(paths.vendorDir+'/js'));
});

gulp.task('vendor-minify-css', ['vendor-concat-css'], function() {
	return gulp.src(paths.vendorDir+'/css/*.css')
		.pipe(minifycss({keepBreaks:true}))
		.pipe(size({title: 'VENDOR all css files'}))
		.pipe(gulp.dest(paths.vendorDir+'/css'));
});

gulp.task('vendor-build', function(cb) {
	sequence(['vendor-copy-assets', 'vendor-concat-js', 'vendor-concat-css'], cb);
});

gulp.task('vendor-dist', function(cb) {
	sequence(['vendor-copy-assets', 'vendor-minify-js', 'vendor-minify-css'], cb);
});


// MAIN TASKS
gulp.task('build', function(cb) {
	sequence('clean', ['app-build', 'vendor-build'], cb);
});

gulp.task('dist', function(cb) {
	sequence('clean', ['app-dist', 'vendor-dist'], cb);
});

gulp.task('watch', function() {
	gulp.start('build');
	gulp.watch(paths.watch.coffee, 'app-compile-js');
	gulp.watch(paths.watch.less, 'app-compile-css');
	gulp.watch(paths.watch.translates, 'app-compile-translates');
	gulp.watch(paths.watch.images, 'app-copy-images');
	gulp.watch(paths.watch.templates, 'app-copy-templates');
	gulp.watch(paths.vendor.js, 'vendor-concat-js');
	gulp.watch(paths.vendor.css, 'vendor-concat-css');
});