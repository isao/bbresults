var test = require('tape'),
    bbrb = require('../');

test('items show line, reason, file', function(t) {
    t.plan(1);

	var data = [
	        {line: 99, reason: 'Twas brillig, and the slithy toves'}
	    ],
	    expected = '{{result_kind: "Error",result_file: "jabberwocky",result_line: 99,message: "Twas brillig, and the slithy toves"}}'
	    actual = bbrb.test.items(data, 'jabberwocky');

	t.equals(actual, expected);
});

test('multiple items show lines, reasons, files', function(t) {
    t.plan(1);

	var data = [
	        {line: 1, reason: 'Twas brillig, and the slithy toves'},
	        {line: 2, reason: 'Did gyre and gimble in the wabe:'}
	    ],
	    expected = '{{result_kind: "Error",result_file: "jabberwocky",result_line: 1,message: "Twas brillig, and the slithy toves"},{result_kind: "Error",result_file: "jabberwocky",result_line: 2,message: "Did gyre and gimble in the wabe:"}}'
	    actual = bbrb.test.items(data, 'jabberwocky');

	t.equals(actual, expected);
});

test('script string', function(t) {
	t.plan(1);
	
	var items = '{{result_kind: "Error",result_file: "jabberwocky",result_line: 1,message: "Twas brillig, and the slithy toves"},{result_kind: "Error",result_file: "jabberwocky",result_line: 2,message: "Did gyre and gimble in the wabe:"}}',
	    title = 'jabberwocky lines I can"t understand',
	    actual = bbrb.test.script(items, title),
	    expected = 'tell application "BBEdit"\nset errs to {{result_kind: "Error",result_file: "jabberwocky",result_line: 1,message: "Twas brillig, and the slithy toves"},{result_kind: "Error",result_file: "jabberwocky",result_line: 2,message: "Did gyre and gimble in the wabe:"}}\nmake new results browser with data errs with properties {name:"jabberwocky lines I can"t understand"}\nend tell';
	    
	t.equals(actual, expected);
});

test('func', function(t) {
    t.plan(1);

	var data = [{line: 99, reason: 'Twas brillig, and the slithy toves'}];

    bbrb.show(data, '/Users/isao/Repos/1st/bbresults/tests/unit.js', '??');
	t.true(1);
});