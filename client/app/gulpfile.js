var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy: false, rename: {"main-bower-files": "bowerFiles"}});
var es = require('event-stream');
var argv = require('yargs').argv;
var fs = require("fs");
var _ = require('lodash');

var mainBowerFiles = require('main-bower-files');


function runWebServer() {
    gulp.src('build')
        .pipe(plugins.webserver({
            //fallback: 'client.html',
            host: 'localhost',
            port: 9000

        }));
}


function clean() {
    gulp.src("build")
        .pipe(plugins.clean());
}

function buildDev() {
    gulp.src("./src/**").pipe(gulp.dest("build"));
    gulp.src(mainBowerFiles(), {base: "./bower_components"}).pipe(gulp.dest("build/libs"));
    return gulp.src('./src/index.html')
        .pipe(
                plugins.inject (
                    gulp.src(mainBowerFiles(), {base: "./bower_components", read: false})
                        .pipe(gulp.dest("./build/libs")),
                    {name: 'bower', ignorePath: "build"}
                                )
            )
        .pipe(plugins.inject(
            gulp.src("./src/**/*.js", {base: "./src", read: false}).pipe(gulp.dest("./build")), {ignorePath: "build"}))
        .pipe(gulp.dest('./build'));
}


gulp.task("release", ["buildVendorJsRelease", "buildVendorCssRelease"], function () {
    gulp.src('./src/index.html')
        .pipe(plugins.inject(
            gulp.src(["./build/libs/vendor*",]), {name: 'bower', ignorePath: "build"})).
        pipe(plugins.inject(
            gulp.src("./src/**/*.js", {base: "./src"})
                .pipe(plugins.concat("all.min.js"))
                .pipe(plugins.ngmin())
                .pipe(plugins.uglify())
                .pipe(gulp.dest("./build")), {ignorePath: "build"}))
        .pipe(gulp.dest('./build'));
});

gulp.task("copySrc", function () {
    gulp.src("./src/**").pipe(gulp.dest("build"));
});

gulp.task("buildVendorJsRelease", function () {
    gulp.src(mainBowerFiles())
        .pipe(plugins.filter('*.js'))
        .pipe(plugins.concat("vendor.min.js"))
        .pipe(gulp.dest("./build/libs"));
});

gulp.task("buildVendorCssRelease", function () {
    gulp.src(mainBowerFiles())
        .pipe(plugins.filter('*.css'))
        .pipe(plugins.concat("vendor.min.css"))
        .pipe(gulp.dest("build/libs"));
});


gulp.task("dev", function () {
    buildDev();
    //runWebServer();
});

gulp.task("watch", function () {
    gulp.watch("./src/**/*", function () {
        gulp.src("./src/**").pipe(gulp.dest("build"));
    });
});

gulp.task("clean", function () {
    clean();
    //runWebServer();
});
gulp.task("run", function () {
    runWebServer();
});