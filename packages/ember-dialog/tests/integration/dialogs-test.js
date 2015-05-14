/* global startApp */

var run = Ember.run, manager, app;

module("integration/dialogs", {
  setup: function() {
    app = startApp();
    manager = app.registry.lookup('dialog:manager');
    console.log("AFTER CREATE:", manager.dialogsList.length);
    console.log("AFTER CREATE OBJ:", manager);
  },
  teardown: function() {
    // run(app, app.destroy);
    run(manager, manager.destroy);
    console.log("AFTER DESTR:", manager.dialogsList.length);
    console.log("AFTER DESTR OBJ:", manager);
  }
});


test("The dialog manager should have 2 dialog after creation and 0 after closing.", function() {
  console.log("================================================1", manager.dialogsList.length, manager.dialogsList);
  expect(3);

  var doneOnClose = async(function() {
    ok(Ember.isEqual(manager.dialogsList.length, 0), "the dialog manager doesn't have any dialogs after closing");
  });
  var doneOnCreate = async(function() {
    ok(Ember.isEqual(manager.dialogsList.length, 1), "the dialog manager have only 1 dialog created after creation");
  });
  var doneOnInsert = async(function(dialog) {
    var rootElementSelector = Ember.get(manager, 'rootElement'),
        rootElement = Ember.$(rootElementSelector),
        dialogElement = dialog.$(),
        isDialogInserted = dialogElement.closest(rootElement).size() > 0;
    ok(isDialogInserted, "the dialog has been inserted into the page");
  });

  run(function() {
    manager.alert("Some template goes here");
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      doneOnCreate();
      doneOnInsert(dialog);
      dialog.close().then(doneOnClose);
    });
  });

});

test("Theasd dialog manager should have 2 dialog after creation and 0 after closing.", function() {
  console.log("================================================2", manager.dialogsList.length, manager.dialogsList);
  expect(3);

  var doneOnClose = async(function() {
    ok(Ember.isEqual(manager.dialogsList.length, 0), "the dialog manager doesn't have any dialogs after closing");
  });
  var doneOnCreate = async(function() {
    ok(Ember.isEqual(manager.dialogsList.length, 1), "the dialog manager have only 1 dialog created after creation");
  });
  var doneOnInsert = async(function(dialog) {
    var rootElementSelector = Ember.get(manager, 'rootElement'),
        rootElement = Ember.$(rootElementSelector),
        dialogElement = dialog.$(),
        isDialogInserted = dialogElement.closest(rootElement).size() > 0;
    ok(isDialogInserted, "the dialog has been inserted into the page");
  });

  run(function() {
    manager.alert("Some template goes here");
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      doneOnCreate();
      doneOnInsert(dialog);
      dialog.close().then(doneOnClose);
    });
  });

});
