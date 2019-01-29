const gulp = require('gulp');
const browserify = require('browserify');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const del = require("del");

gulp.task("clean",() => {
	return del("tmp", {force:true});
});

gulp.task('apply-prod-environment', function() {
	process.env.NODE_ENV = 'production';
	return Promise.resolve();
});

gulp.task("ui-babel", () => {
	return gulp.src(["src/ui/**/*.jsx","src/ui/**/*.js"])
	.pipe(babel({
		presets: ["@babel/preset-env", "@babel/preset-react"],
		plugins: ["@babel/plugin-transform-runtime"]
	}))
	.pipe(gulp.dest("tmp/ui/"));
});

gulp.task("browserify", () => {
	return browserify({entries:"tmp/ui/ui.js",debug:false})
		.bundle()
		.pipe(source("ui.js"))
		.pipe(buffer())
		.pipe(gulp.dest("public/js"));
});

gulp.task("minify", () => {
	return gulp.src('public/js/ui.js')
		.pipe(minify({
			ext:{
				src:'.js',
				min:'.min.js'
			}
		}))
		.pipe(gulp.dest("public/js"));
});

gulp.task("ui-min", gulp.series("apply-prod-environment","ui-babel","browserify","minify","clean"));

gulp.task("ui", gulp.series("ui-babel","browserify","clean"));

gulp.task("watch", () => {
	return gulp.watch(["src/ui/**/*.jsx","src/ui/**/*.js"],gulp.series("ui"));
});

gulp.task("default", gulp.series("ui"));
