// Load Gulp
var gulp    = require('gulp'),
    compass = require('gulp-compass'),
    gutil   = require('gulp-util'),
    googleWebFonts = require('gulp-google-webfonts'),
    plugins = require('gulp-load-plugins')(),
    livereload = require('gulp-livereload'),
    phpunit = require('gulp-phpunit'),
    uncss = require('gulp-uncss'),
    mode = require('gulp-mode')({
          modes: ["prod", "dev"],
          default: "dev",
          verbose: false
    });

var exec = require('child_process').exec;

// Start Watching: Run "gulp"
gulp.task('default', ['icons','fonts','lint','build-poly','build-js','build-css','watch']);

// Just Build
gulp.task('build', ['icons','fonts','lint','build-poly','build-js','build-css']);

// Run phpunit Tests
//gulp.task('test', function () {
//    return gulp.src('./src/Acme/Bundle/*/Tests/**/*.php')
//        .pipe(phpunit('./bin/phpunit', {debug: false, configurationFile: './app/phpunit.xml'}));
//});

// code coverage report
//gulp.task('coverage', function () {
//    return gulp.src('./src/Tvst/Bundle/*/Tests/**/*.php')
//        .pipe(phpunit(
//            './bin/phpunit',
//            {debug: false, configurationFile: './app/phpunit.xml', coverageHtml: './build/coverage'}
//        ));
//});


// Minify Custom JS: Run manually with: "gulp build-js"
gulp.task('build-js', function() {
  return gulp.src([
        'web/bower/angular/angular.js',
        'web/js/src/*.js'
    ])
    .pipe(mode.prod(plugins.uglify()))
    .pipe(mode.prod(plugins.concat('scripts.min.js')))
    .pipe(mode.dev(plugins.concat('scripts.js')))
    .pipe(gulp.dest('./web/js/dist/'))
    .pipe(mode.dev(livereload()));
});

//stylish output for errors
gulp.task('lint', function() {

    //error handler helper for jshint
    var errorHandler = function(error) {
      this.emit('end');
    }

  return gulp.src('web/js/src/*.js')
      .pipe(plugins.jshint()).on('error', errorHandler)
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
});

// Build pollyfil js: Run manually with: "gulp build-poly"
gulp.task('build-poly', function() {
  return gulp.src([
        'web/bower/modernizr/modernizr.js',
        'web/bower/src/respond.js',
        'bower/respond/cross-domain/respond.proxy.js'
    ])
    .pipe(mode.prod(plugins.uglify()))
    .pipe(mode.prod(plugins.concat('polyfills.min.js')))
    .pipe(mode.dev(plugins.concat('polyfills.js')))
    .pipe(gulp.dest('./web/js/dist/'));
});

gulp.task('build-css', function () {
    gulp.src(['./web/sass/master.scss'])
        .pipe(plugins.plumber())
        //.pipe(sass({sourceComments: 'map'}))
        .pipe(compass({
              config_file: 'compass.rb',
              css: 'web/css',
              sass: 'web/sass'
         }))
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))

        // not working last I checked
        // https://github.com/giakki/uncss/issues/150
        //.pipe(uncss({
        //    html: ['src/**/*.html.twig']
        //}))
        .pipe(mode.prod(plugins.cssmin()))
        .pipe(gulp.dest('./web/css/')).on('error', gutil.log)
        .pipe(mode.dev(livereload()));
});

/*
gulp.task('images', function() {
    return gulp.src('components/img/*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('img'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Images task complete' }));
});
*/

gulp.task('fonts', function () {
    return gulp.src('fonts.list')
        .pipe(googleWebFonts())
        .pipe(gulp.dest('web/fonts'))
        ;
});

gulp.task('icons', function() { 
    return gulp.src('web/bower/font-awesome/fonts/**.*') 
        .pipe(gulp.dest('web/fonts')); 
});

gulp.task('twig', function() {
  //livereload('update twig');
  //livereload.changed('twig')
  return gulp.src('src/View/**/*.html.twig')
      .pipe(gulp.dest(''))
      .pipe(livereload());
});


// Default task
gulp.task('watch', function() {

    var onChange = function (event) {
        console.log('File '+event.path+' has been '+event.type);
        //livereload.changed();
    };

    livereload.listen();

    //gulp.watch('assets/js/libs/**/*.js', ['squish-jquery']);
    gulp.watch('web/js/src/*.js', ['build-js'])
        .on('change', onChange);
    gulp.watch('web/sass/**/*.scss', ['build-css'])
        .on('change', onChange);
    gulp.watch('src/views/**/*.html.twig', ['twig'])
            .on('change', onChange);

});
