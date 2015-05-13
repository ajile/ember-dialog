var run = Ember.run;
var Container = Ember.Container;
var Registry = Ember.Registry;
var setupContainer = Dialog._setupContainer;

var registry, container, manager;

module("integration/setup-manager - Setting up a manager", {
  setup: function() {
    if (Registry) {
      registry = new Registry();
      container = registry.container();
    } else {
      container = new Container();
      registry = container;
    }
    setupContainer(registry);
    manager = container.lookup('dialog:manager');
  },

  teardown: function() {
    run(container, container.destroy);
  }
});

test("The dialog manager shouldn't have any dialogs created yet.", function() {
  ok(Ember.isEmpty(manager.dialogsList), "the dialog manager doesn't have any dialogs created");
});

test("The dialog manager should have one dialog after creation.", function() {
  manager.alert("123");
  // ok(Ember.isEmpty(manager.dialogsList), "the dialog manager doesn't have any dialogs created");
});
