const gulp = require('gulp');
const browserify = require('browserify');
const minify = require('gulp-minify');
const babel = require('gulp-babel');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const runSequence = require("run-sequence");
const del = require("del");

gulp.task("clean",() => {
	return del("tmp", {force:true});
});

gulp.task('apply-prod-environment', function() {
	process.env.NODE_ENV = 'production';
});

gulp.task("ui-babel", () => {
	return gulp.src(["src/ui/**/*.jsx","src/ui/**/*.js"])
	.pipe(babel({
		presets: ["react","env","modern-browsers"],
		plugins:["transform-runtime"]
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

gulp.task("ui-min", () => {
	runSequence("apply-prod-environment","ui-babel","browserify","minify","clean");
});

gulp.task("ui", () => {
	return runSequence("ui-babel","browserify","clean");
});

gulp.task("watch-ui", () => {
	return gulp.watch("src/ui/**/*.jsx",["ui"]);
})

gulp.task("default", () => {
	return runSequence("ui");
});
