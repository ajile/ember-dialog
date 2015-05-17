/* global startApp */

var run = Ember.run, manager, app;

module("manager", {
  setup: function() {
    app = startApp();
    manager = app.registry.lookup('dialog:manager');
    run(manager, manager.reset);
  },
  teardown: function() {
    run(app, app.destroy);
    run(manager, manager.destroy);
  }
});

test("The dialog manager should have one dialog after creation and zero after closing.", function() {
  expect(3);

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

  var doneOnClose = async(function() {
    ok(Ember.isEqual(manager.dialogsList.length, 0), "the dialog manager doesn't have any dialogs after closing");
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


test("The dialog manager should have 2 dialogs after creation 2 dialogs.", function() {

  run(function() {
    manager.alert("Some template goes here 1");
    manager.alert("Some template goes here 2");
    run.scheduleOnce('afterRender', this, function() {
      ok(Ember.isEqual(manager.dialogsList.length, 2), "the dialog manager have 2 dialogs opened");
    });
  });

});

test("Checking of the dialog window closing sequence", function() {
  ok(true, "the last one dialog window closes first");
  ok(true, "the first one dialog window closes last");
});

test("The dialog take options passed to a manager on creation.", function() {

  var title = "dialog-class-name-to-test",
      acceptClass = "test-accept-button-class";

  run(function() {
    manager.alert("Some template goes here", null, {title: title, acceptClass: acceptClass});
    run.scheduleOnce('afterRender', this, function() {
      var dialog = manager.getDialog(manager.get('active'));
      ok(dialog.get('title') === title, "the dialog has got a title");
      ok(dialog.get('acceptClass') === acceptClass, "the dialog has got a accept button сlass");
      dialog.close();
    });
  });

});
