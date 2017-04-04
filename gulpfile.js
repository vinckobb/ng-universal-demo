const gulp = require('gulp'),
      sass = require('gulp-sass'),
      watch = require('gulp-watch'),
      through2 = require('through2');

function logCopied()
{
    return through2.obj(function(vinyl, enc, callback)
    {
        console.log("Copying follow file: '" + vinyl.path + "'");
        this.push(vinyl);

        callback();
    });
}

gulp.task("create-aot-app", function()
{
    return gulp.src("app/**/*")
        .pipe(logCopied())
        .pipe(gulp.dest("app.aot"));
});

gulp.task("copy-bootstrap-css", function()
{
    return gulp.src("node_modules/bootstrap/dist/css/*.*")
        .pipe(logCopied())
        .pipe(gulp.dest("wwwroot/node_modules/bootstrap/dist/css"));
});

gulp.task("copy-bootstrap-fonts", function()
{
    return gulp.src("node_modules/bootstrap/dist/fonts/*.*")
        .pipe(logCopied())
        .pipe(gulp.dest("wwwroot/node_modules/bootstrap/dist/fonts"));
});

gulp.task("copy-bootstrap-select", function()
{
    return gulp.src("node_modules/bootstrap-select/dist/css/*.*")
        .pipe(logCopied())
        .pipe(gulp.dest("wwwroot/node_modules/bootstrap-select/dist/css"));
});

gulp.task("copy-bootstrap-datepicker", function()
{
    return gulp.src("node_modules/eonasdan-bootstrap-datetimepicker/build/css/*.*")
        .pipe(logCopied())
        .pipe(gulp.dest("wwwroot/node_modules/eonasdan-bootstrap-datetimepicker/build/css"));
});

gulp.task("copy-font-awesome-css", function()
{
    return gulp.src("node_modules/font-awesome/css/font-awesome.min.css")
        .pipe(logCopied())
        .pipe(gulp.dest("wwwroot/node_modules/font-awesome/css"));
});

gulp.task("copy-font-awesome-fonts", function()
{
    return gulp.src("node_modules/font-awesome/fonts/*.*")
        .pipe(logCopied())
        .pipe(gulp.dest("wwwroot/node_modules/font-awesome/fonts"));
});

gulp.task("copy-binaries", 
          ["copy-font-awesome-css",
           "copy-font-awesome-fonts",
           "copy-bootstrap-css",
           "copy-bootstrap-fonts",
           "copy-bootstrap-select",
           "copy-bootstrap-datepicker"], 
          function(cb)
{
    console.log("Node modules have been copied.");
    
    cb();
});

gulp.task("copy-config", function()
{
    return gulp.src("config/**/*.json")
        .pipe(logCopied())
        .pipe(gulp.dest("wwwroot/config"));
});

gulp.task("watch-config", ["copy-config"], function()
{
    return watch('config/**/*.json', { events: ['change', 'add'] })
        .pipe(through2.obj(function(vinyl, enc, cb)
                           {
                               if(vinyl.event == 'change' || vinyl.event == 'add')
                               {
                                   console.log("File '" + vinyl.basename + "' is being copied.");
                               }
                           
                               this.push(vinyl);
                               cb();
                           }))
        .pipe(gulp.dest('wwwroot/config'));
});

gulp.task("copy-external-content", function()
{
    return gulp.src("content/external/**/*.*")
        .pipe(logCopied())
        .pipe(gulp.dest("wwwroot/content/external"));
});

gulp.task("watch-external-content", ["copy-external-content"], function()
{
    return watch('content/external/**/*.*', { events: ['change', 'add'] })
        .pipe(through2.obj(function(vinyl, enc, cb)
                           {
                               if(vinyl.event == 'change' || vinyl.event == 'add')
                               {
                                   console.log("File '" + vinyl.basename + "' is being copied.");
                               }
                           
                               this.push(vinyl);
                               cb();
                           }))
        .pipe(gulp.dest('wwwroot/content/external'));
});

gulp.task("compile-scss", function()
{
    return gulp.src('content/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('wwwroot/content'));
});

gulp.task("build", 
          ["copy-config",
           "copy-external-content",
           "copy-binaries"],
          function(cb)
{
    console.log("Gulp build has finished");
    
    cb();
});

gulp.task("build:aot", 
          ["build",
           "create-aot-app"],
          function(cb)
{
    console.log("Gulp build aot has finished");
    
    cb();
});