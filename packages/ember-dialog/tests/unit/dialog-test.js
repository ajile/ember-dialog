var manager = null;

module("EmberDialog.Dialog", {
    setup: function() {
        manager = EmberDialog.Manager.create();
    }
});

test("manager is a service", function() {
	// console.log(manager.get('container'));
	// debugger;
    equal(true, true);
});

test("manager hasn't modals yet", function() {
    equal(manager.get("dialogsList").length, 0);
});

test("manager creates alert window by single string-arg", function() {
    manager.alert('Hello!');
    expect(0);
});
