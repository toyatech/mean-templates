const gulp = require('gulp');
const tap = require('gulp-tap');
const fs = require('fs');
const _ = require('lodash');
const gutil = require('gulp-util');

function getTemplate(template, imports) {
  var t = String(fs.readFileSync(__dirname + '/templates/' + template + '.jst'));
  var i = require(__dirname + '/templates/' + imports + '.js');
  return _.template(t, { 'imports': i });
}

function generate_server_models() {
  var template = getTemplate('server/models/model', 'server/models/imports');
  return gulp.src(gutil.env.source)
    .pipe(tap(function(file) {
      console.log(template.source);
      console.log(template.imports);
      file.contents = template(JSON.parse(file.contents.toString()));
    }))
    .pipe(gulp.dest(gutil.env.destination));
}

gulp.task('generate_server_models', generate_server_models);

function generate() { }
generate.description = 'Generate MEAN module from JSON Schemas';
generate.flags = {
  '--source': 'Root directory to search for JSON Schemas.',
  '--destination': 'Directory to write MEAN module files.'
}
gulp.task('generate', [
  'generate_server_models'
], generate);

gulp.task('default',  [ 'generate' ] );
