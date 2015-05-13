var pickFiles        = require('broccoli-static-compiler');
var concat           = require('broccoli-concat');
var es6              = require('broccoli-es6-module-transpiler');
var merge            = require('broccoli-merge-trees');
var PackageResolver  = require('es6-module-transpiler-package-resolver');
var AMDFormatter     = require('es6-module-transpiler-amd-formatter');
var fileCreator      = require('broccoli-file-creator');
var merge            = require('broccoli-merge-trees');
var replace          = require('broccoli-replace');
var HtmlbarsCompiler = require('ember-cli-htmlbars');

function amdES6Package(packages, EmberTemplateCompiler) {

  var templateTree = pickFiles('packages/ember-dialog/lib', {
    srcDir: '/templates/',
    files: ['**/*.hbs'],
    destDir: '/templates/'
  });

  templateTree = new HtmlbarsCompiler(templateTree, {
    isHTMLBars: true,
    // provide the templateCompiler that is paired with your Ember version 
    templateCompiler: EmberTemplateCompiler
  });

  templateTree = es6(templateTree, {
    formatter: new AMDFormatter(),
    resolvers: [PackageResolver],
    output: '/ember-dialog/lib/'
  });

  packages = merge([packages, templateTree], {overwrite: true});

  // globalBuild = concat(globalBuild, {
  //   inputFiles: ['**/*.js'],
  //   outputFile: '/ember-dialog.js',
  //   // header: '(function(){',
  //   // footer: '})();'
  // });

  var es6Build = es6(packages, {
    inputFiles: ['ember-dialog'],
    output: '/ember-dialog/',
    resolvers: [PackageResolver],
    formatter: new AMDFormatter(),
    basePath: '/ember-dialog/',
    sourceRoot: '/ember-dialog/'
  });

  var loaderJS = pickFiles('bower_components/loader.js', {
    srcDir: '/',
    files: ['loader.js'],
    destDir: '/'
  });

  var bootFile = fileCreator('/boot.js', 'require("ember-dialog/lib/main");');

  var amdBuild = merge([es6Build, loaderJS, bootFile]);

  amdBuild = concat(amdBuild, {
    inputFiles: ['loader.js', 'ember-dialog/**/*.js', 'boot.js'],
    outputFile: '/ember-dialog.js',
    header: '(function(){',
    footer: '})();'
  });

  amdBuild = merge([es6Build, amdBuild]);

  return replace(amdBuild, {
    files: ['ember-dialog.js'],
    patterns: [
      {
        match: /\/lib/g,
        replacement: ''
      },
      {
        match: /\/main/g,
        replacement: ''
      }
    ]
  });
}

module.exports = amdES6Package;
