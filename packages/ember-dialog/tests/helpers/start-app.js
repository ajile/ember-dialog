/* jshint ignore:start */

var Application = Ember.Application;
var Router = Ember.Router;

var Resolver = require('ember/resolver');

function startApp(attrs) {
  var App;

  Ember.ENV.LOG_DIALOG = true;

  var attributes = Ember.merge({
    // useful Test defaults
    rootElement: '#ember-testing',
    LOG_ACTIVE_GENERATION:false,
    LOG_VIEW_LOOKUPS: false,
    LOG_DIALOG: true,
    modulePrefix: 'ember-dialog',
    Resolver: Resolver
  }, attrs); // but you can override;

  Router.reopen({
    location: 'none'
  });

  Ember.run(function(){
    App = Application.create(attributes);
    App.setupForTesting();
    App.injectTestHelpers();
  });

  App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

  return App;
}

/* jshint ignore:end */
