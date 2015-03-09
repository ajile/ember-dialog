eval("(function() {if (!QUnit.urlParams.nojshint) {\nmodule(\'JSHint - .\');\ntest(\'ember-dialog.js should pass jshint\', function() { \n  ok(true, \'ember-dialog.js should pass jshint.\'); \n});\n\n}})();//@ sourceURL=ember-dialog.jshint.js");

eval("(function() {if (!QUnit.urlParams.nojshint) {\nmodule(\'JSHint - ember-dialog\');\ntest(\'ember-dialog/component.js should pass jshint\', function() { \n  ok(true, \'ember-dialog/component.js should pass jshint.\'); \n});\n\n}})();//@ sourceURL=ember-dialog/component.jshint.js");

eval("(function() {if (!QUnit.urlParams.nojshint) {\nmodule(\'JSHint - ember-dialog\');\ntest(\'ember-dialog/manager.js should pass jshint\', function() { \n  ok(true, \'ember-dialog/manager.js should pass jshint.\'); \n});\n\n}})();//@ sourceURL=ember-dialog/manager.jshint.js");

eval("(function() {if (!QUnit.urlParams.nojshint) {\nmodule(\'JSHint - ember-dialog\');\ntest(\'ember-dialog/utils.js should pass jshint\', function() { \n  ok(true, \'ember-dialog/utils.js should pass jshint.\'); \n});\n\n}})();//@ sourceURL=ember-dialog/utils.jshint.js");

eval("(function() {var manager = null;\n\nmodule(\"EmberDialog.Dialog\", {\n    setup: function() {\n        manager = EmberDialog.Manager.create();\n    }\n});\n\ntest(\"manager is a service\", function() {\n	// console.log(manager.get(\'container\'));\n	// debugger;\n    equal(true, true);\n});\n\ntest(\"manager hasn\'t modals yet\", function() {\n    equal(manager.get(\"dialogsList\").length, 0);\n});\n\ntest(\"manager creates alert window by single string-arg\", function() {\n    manager.alert(\'Hello!\');\n    expect(0);\n});\n})();//@ sourceURL=unit/dialog-test.js");
