var fs = require('fs');
var config = JSON.parse(fs.readFileSync('build.json'));

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var merge = require('merge2');
var del = require('del');
var guid = require('guid');

gulp.task('default', ['clean', 'build']);

gulp.task('build', ['copy-index', 'copy-templates', 'copy-fonts', 'copy-images', 'copy-json', 'scripts', 'styles', 'inject-tags']);

gulp.task('clean', function () {
    del.sync([config.build.folders.output.root + '/**']);
});

gulp.task('copy-index', function () {
    return gulp.src(config.build.folders.input.app + '/' + config.build.files.input.app.index)
        .pipe(gulp.dest(config.build.folders.output.root));
});

gulp.task('copy-templates', function () {
    var featurePaths = [
        config.build.folders.input.app + '/' + config.build.folders.input.templates.feature + '/**/*.html',
        '!' + config.build.folders.input.app + '/' + config.build.files.input.app.index
    ];

    var commonPaths = config.build.folders.input.app + '/' + config.build.folders.input.templates.common + '/**/*.html';

    var stream = gulp.src(featurePaths).pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.templates.feature));
    var stream2 = gulp.src(commonPaths).pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.templates.common));

    return merge([stream, stream2]);
});

gulp.task('copy-json', function () {
    return gulp.src(config.build.folders.input.app + '/**/*.json')
        .pipe(gulp.dest(config.build.folders.output.root));
});

gulp.task('inject-tags', ['copy-index', 'copy-templates', 'copy-fonts', 'copy-images', 'copy-json', 'scripts', 'styles'], function () {
    var target = gulp.src(config.build.folders.output.root + '/' + config.build.files.input.app.index);

    var scripts = function (filePath, file, i, length) {
        return '<script src="' + filePath + '"></script>';
    };

    var styles = function (filePath, file, i, length) {
        return '<link rel="stylesheet" href="' + filePath + '">';
    };

    var appScriptPaths = [
        config.build.folders.output.root + '/' + config.build.folders.output.scripts + '/**/*.module.js',
        config.build.folders.output.root + '/' + config.build.folders.output.scripts + '/**/*.js',
        '!' + config.build.folders.output.root + '/' + config.build.folders.output.scripts + '/*.js'
    ];

    var externalScriptPaths = [
        config.build.folders.output.root + '/' + config.build.folders.output.scripts + '/jquery.min.js',
        config.build.folders.output.root + '/' + config.build.folders.output.scripts + '/*angular.js',
        config.build.folders.output.root + '/' + config.build.folders.output.scripts + '/*.js'
    ];

    var appStylePaths = [
        config.build.folders.output.root + '/' + config.build.folders.output.styles + '/**/*.css',
        '!' + config.build.folders.output.root + '/' + config.build.folders.output.styles + '/*.css'
    ];

    var externalStylePaths = [config.build.folders.output.root + '/' + config.build.folders.output.styles + '/*.css'];

    return target
        .pipe(inject(gulp.src(appScriptPaths, {read: false}), {
            relative: true,
            name: 'app-scripts',
            transform: scripts
        }))
        .pipe(inject(gulp.src(externalScriptPaths, {read: false}), {
            relative: true,
            name: 'external-scripts',
            transform: scripts
        }))
        .pipe(inject(gulp.src(appStylePaths, {read: false}), {
            relative: true,
            name: 'app-styles',
            transform: styles
        }))
        .pipe(inject(gulp.src(externalStylePaths, {read: false}), {
            relative: true,
            name: 'external-styles',
            transform: styles
        }))
        .pipe(gulp.dest(config.build.folders.output.root));
});

gulp.task('scripts', ['transpile-ts', 'external-scripts']);

gulp.task('transpile-ts', function () {
    var options = JSON.parse(fs.readFileSync('tsconfig.json')).compilerOptions;

    options.inlineSourceMap = true;
    options.sourceMap = false;

    var ts = config.build.folders.input.app + '/**/*.ts';
    var dts = config.build.folders.input.typings + '/**/*.d.ts';

    return gulp.src([ts, dts])
        .pipe(sourcemaps.init())
        .pipe(typescript(options)).js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.scripts));
});

gulp.task('external-scripts', function () {
    return gulp.src(config.build.files.input.external.scripts)
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.scripts));
});

gulp.task('styles', ['transpile-sass', 'external-styles']);

gulp.task('transpile-sass', function () {
    var options = {
        includePaths: []
    };

    var includePaths = config.build.folders.input.sassOptions.includePaths;

    for (var i = 0; i < includePaths.length; i++) {
        options.includePaths[i] = config.build.folders.input.app + '/' + includePaths[i];
    }

    var stream = gulp.src(config.build.folders.input.app + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(options))
        .on('error', onError)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.styles));

    return stream;
});

gulp.task('external-styles', function () {
    return gulp.src(config.build.files.input.external.styles)
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.styles));
});

gulp.task('copy-fonts', function () {
    var app = gulp.src(config.build.folders.input.app + '/' + config.build.folders.input.fonts + '/**/*')
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.fonts));

    var external = gulp.src(config.build.files.input.external.fonts)
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.fonts));

    return merge([app, external]);
});

gulp.task('copy-images', function () {
    return gulp.src(config.build.folders.input.app + '/' + config.build.folders.input.images + '/**/*')
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.images));
});

gulp.task('watch', function () {
    gulp.watch([config.build.folders.input.app + '/**/index.html'], ['build']);

    gulp.watch([config.build.folders.input.app + '/**/*.html', '!' + config.build.folders.input.app + '/**/index.html'], ['copy-templates']);
    gulp.watch([config.build.folders.input.app + '/**/*.ts'], ['transpile-ts']);
    gulp.watch([config.build.folders.input.app + '/**/*.scss'], ['transpile-sass']);
    gulp.watch([config.build.folders.input.app + '/**/*.json'], ['copy-json']);
    gulp.watch([config.build.folders.input.app + '/' + config.build.folders.input.images + '/**/*'], ['copy-images']);
    gulp.watch([config.build.folders.input.app + '/' + config.build.folders.input.fonts + '/**/*'], ['copy-fonts']);

    gulp.watch(config.build.files.input.external.scripts, ['scripts']);
    gulp.watch(config.build.files.input.external.styles, ['scripts']);
});

function onError(error) {
    console.log(error.toString());
    this.emit('end');
}