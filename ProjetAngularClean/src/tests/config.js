// Karma configuration
// Generated on %DATE%

module.exports = function(config) {
  'use strict';
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../../node_modules/angular/angular.js',
      '../../node_modules/angular-mocks/angular-mocks.js' ,
      '../../js/angular-resource.js',
      '../../js/angular-route.js',
      './../app.js',
      './../tests/titlesController.js',
      './../controllers/titlesController.js',
      './../controllers/questionController.js',
      './../controllers/loginController.js',
      './../controllers/inscriptionController.js',
      './../controllers/scoreController.js',
      './../controllers/titlesEditController.js',
      './../controllers/questionsEditController.js',
      './../controllers/answersEditController.js',
      './../factory/QcmFactory.js',
      './../factory/QuesFactory.js',
      './../services/SharedData.js',
      './../route/Routing.js',
      './../tests/loginControllerSpec.js',
      './../tests/titlesEditControllerSpec.js',
      './../tests/questionsEditControllerSpec.js',
      './../tests/answersEditControllerSpec.js'

    ],


    // list of files to exclude
    exclude: [
    ],

    // web server port
    port: 8080,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
