/*
 * slush-taylor1791
 * https://github.com/Taylor1791/slush-taylor1791
 *
 * Copyright (c) 2015, Taylor1791
 * Licensed under the MIT license.
 */

'use strict';

var
  path = require('path'),
  existsSync = require('fs').existsSync,

  gulp = require('gulp'),
  install = require('gulp-install'),
  shell = require('gulp-shell'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),

  parseIniSync = require('iniparser').parseSync,
  _ = require('underscore.string'),
  _extend = require('util')._extend,

  inquirer = require('inquirer');

function ssh2html( repoUrl ) {
  var match = repoUrl.match(/^git@(.+):(.+)\/(.+)\.git$/);

  return !match ?
    repoUrl : 'https://' + match[1] + '/' + match[2] + '/' + match[3];
}

function extend() {
  return Array.prototype.splice.call(arguments, 0).reduce( _extend, {} );
}

function parsePlatformDefaults() {
  var
    homeDir = process.platform === 'win32' ?
      process.env.USERPROFILE : (process.env.HOME || process.env.HOMEPATH),
    configFile = path.join(homeDir, '.gitconfig'),
    user = existsSync(configFile) ? parseIniSync(configFile).user : {},

    result = {
      year: new Date().getFullYear(),
      appName: path.basename(process.cwd()) || '',
      authorName: user.name || '',
      authorEmail: user.email || ''
    };

  return result;
}

function parseRepoDefaults() {
  var
    configFile = path.join(process.cwd(), '.git/config'),
    repo = existsSync( configFile ) ?
      (parseIniSync(configFile)['remote \"origin\"'] || {}).url : '',
    url = ssh2html(repo || ''),

    result = {
      repo: repo,
      url: url,
      homepage: url ? url + '#readme' : '',
      authorUserName: url ? url.match(/^https:\/\/(.+)\/(.+)\/(.+)$/)[2] : '',
      bugs: url ? url + '/issues' : ''
    };

  return result;
}

var defaults = extend(
  parsePlatformDefaults(),
  parseRepoDefaults()
);

gulp.task('default', ['install-deps'], function () {
    return gulp.src('')
        .pipe(shell(['./setup.sh']))
});

gulp.task('install-deps', ['setup-files'], function() {
    return gulp.src('package.json')
        .pipe(install());
});

gulp.task('setup-files', function (done) {
    var prompts = [{
        name: 'appName',
        message: 'What is the name of your project?',
        default: defaults.appName
    }, {
        name: 'appDescription',
        message: 'What is the description?'
    }, {
      name: 'appKeywords',
      message: 'What are your package keywords?'
    }];

    return inquirer.prompt(prompts, function (answers) {
        var data = extend(defaults, answers);
        data.appNameSlug = _.slugify(data.appName);
        data.appKeywords = JSON.stringify(
          data.appKeywords.replace(/,/g,' ').split(/\s+/g)
        );

        gulp.src(__dirname + '/templates/**')
            .pipe(template(data))
            .pipe(rename(function (file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .on('end', function () {
                done();
            });
    });
});
