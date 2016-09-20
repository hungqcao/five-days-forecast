var fs = require('fs');
var config = JSON.parse(fs.readFileSync('build.json'));

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var zip = require('gulp-zip');

var merge = require('merge2');
var del = require('del');
var guid = require('guid');

gulp.task('default', ['clean', 'build']);

gulp.task('build', ['copy-index', 'copy-templates', 'copy-fonts', 'copy-images', 'copy-json', 'scripts', 'styles', 'inject-version', 'zip']);

gulp.task('clean', function () {
    del.sync([config.build.folders.output.root + '/**']);
});

gulp.task('zip', ['inject-version'], function() {
    return gulp.src(config.build.folders.output.root + '/**')
        .pipe(zip('release.zip'))
        .pipe(gulp.dest(config.build.folders.output.root));
})

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

gulp.task('inject-version', ['copy-templates', 'copy-fonts', 'copy-images', 'copy-json', 'scripts', 'styles'], function () {
    var version = guid.create().value.replace('-', '');
    var target = gulp.src(config.build.folders.output.root + '/' + config.build.files.input.app.index);

    var scripts = function (filePath, file, i, length) {
        var src = filePath + '?noCache=' + version;
        return '<script src="' + src + '"></script>';
    };

    var styles = function (filePath, file, i, length) {
        var src = filePath + '?noCache=' + version;
        return '<link rel="stylesheet" href="' + src + '">';
    };

    return target
        .pipe(inject(gulp.src(config.build.folders.output.root + '/' + config.build.folders.output.scripts + '/' + config.build.files.output.app.scripts, {read: false}), {
            relative: true,
            name: 'app-scripts',
            transform: scripts
        }))
        .pipe(inject(gulp.src(config.build.folders.output.root + '/' + config.build.folders.output.scripts + '/' + config.build.files.output.external.scripts, {read: false}), {
            relative: true,
            name: 'external-scripts',
            transform: scripts
        }))
        .pipe(inject(gulp.src(config.build.folders.output.root + '/' + config.build.folders.output.styles + '/' + config.build.files.output.app.styles, {read: false}), {
            relative: true,
            name: 'app-styles',
            transform: styles
        }))
        .pipe(inject(gulp.src(config.build.folders.output.root + '/' + config.build.folders.output.styles + '/' + config.build.files.output.external.styles, {read: false}), {
            relative: true,
            name: 'external-styles',
            transform: styles
        }))
        .pipe(gulp.dest(config.build.folders.output.root));
});

gulp.task('scripts', ['copy-templates', 'external-scripts', 'app-scripts']);

gulp.task('external-scripts', function () {
    return gulp.src(config.build.files.input.external.scripts)
        .pipe(concat(config.build.files.output.external.scripts))
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.scripts));
});

gulp.task('app-scripts', ['transpile-ts'], function () {
    var files = [
        config.build.folders.input.app + '/**/*.module.js',
        config.build.folders.input.app + '/**/*.js'
    ];

    return gulp.src(files, {base: '.'})
        .pipe(concat(config.build.files.output.app.scripts))
        .pipe(sourcemaps.init({ loadMaps: false }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.scripts));
});

gulp.task('transpile-ts', function () {
    var options = JSON.parse(fs.readFileSync('tsconfig.json')).compilerOptions;

    options.inlineSourceMap = false;
    options.sourceMap = false;

    var ts = config.build.folders.input.app + '/**/*.ts';
    var dts = config.build.folders.input.typings + '/**/*.d.ts';

    return gulp.src([ts, dts])
        .pipe(typescript(options)).js
        .pipe(gulp.dest(config.build.folders.input.app));
});

gulp.task('styles', ['copy-templates', 'transpile-sass', 'app-styles', 'external-styles']);

gulp.task('transpile-sass', function () {
    var options = {
        includePaths: []
    };

    var includePaths = config.build.folders.input.sassOptions.includePaths;

    for (var i = 0; i < includePaths.length; i++) {
        options.includePaths[i] = config.build.folders.input.app + '/' + includePaths[i];
    }

    return gulp.src(config.build.folders.input.app + '/**/*.scss')
        .pipe(sass(options))
        .on('error', gutil.log)
        .pipe(gulp.dest(config.build.folders.input.app));
});

gulp.task('app-styles', ['transpile-sass'], function () {
    return gulp.src(config.build.folders.input.app + '/**/*.css')
        .pipe(concat(config.build.files.output.app.styles))
        .pipe(cleanCSS({rebase: false}))
        .pipe(gulp.dest(config.build.folders.output.root + '/' + config.build.folders.output.styles));
});

gulp.task('external-styles', function () {
    return gulp.src(config.build.files.input.external.styles)
        .pipe(concat(config.build.files.output.external.styles))
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
    gulp.watch([config.build.folders.input.app + '/**/*.html'], ['build']);
    gulp.watch([config.build.folders.input.app + '/**/*.ts'], ['build']);
    gulp.watch([config.build.folders.input.app + '/**/*.scss'], ['build']);
    gulp.watch([config.build.folders.input.app + '/**/*.json'], ['build']);
    gulp.watch([config.build.folders.input.app + '/' + config.build.folders.input.images + '/**/*'], ['build']);
    gulp.watch([config.build.folders.input.app + '/' + config.build.folders.input.fonts + '/**/*'], ['build']);

    gulp.watch(config.build.files.input.external.scripts, ['build']);
    gulp.watch(config.build.files.input.external.styles, ['build']);
});