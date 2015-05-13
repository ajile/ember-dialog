var run = Ember.run;
var Container = Ember.Container;
var Registry = Ember.Registry;
var Manager = Dialog.Manager;
var Presenter = Dialog.Presenter;
var registry, container;
var setupContainer = Dialog._setupContainer;
var EmberObject = Ember.Object;

module("integration/setup-container - Setting up a container", {
  setup: function() {
    if (Registry) {
      registry = new Registry();
      container = registry.container();
    } else {
      container = new Container();
      registry = container;
    }
    setupContainer(registry);
  },

  teardown: function() {
    run(container, container.destroy);
  }
});

test("The dialog manager should be registered into a container.", function() {
  ok(container.lookup('dialog:manager') instanceof Manager, "the dialog manager is instantiated");
});

test("If a dialog manager is instantiated, it should be made available to each controller.", function() {
  registry.register('controller:foo', EmberObject.extend({}));
  var fooController = container.lookup('controller:foo');
  ok(fooController.get('dialogManager') instanceof Manager, "the dialog manager was injected");
});

test("The dialog presenter should be registered into a container.", function() {
  ok(container.lookup('dialog:presenter') instanceof Presenter, "the dialog presenter is instantiated");
});
