const gulp = require('gulp'),
      through2 = require('through2'),
      ngAotCompliant = require('gulp-aot-compliant');

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
        .pipe(ngAotCompliant())
        .pipe(gulp.dest("app.aot"));
});