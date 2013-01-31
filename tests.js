#!/usr/bin/env node

var test = require('tape'),
    bbrb = require('./')
    pathname = __filename;

test('items show line, reason, file', function(t) {
    t.plan(1);

    var data = [
            {line: 99, reason: 'Twas brillig, and the slithy toves'}
        ],
        expected = '{{result_kind: "Error",result_file: "' + pathname + '",result_line: 99,message: "Twas brillig, and the slithy toves"}}',
        actual = bbrb.test.getItems(data, pathname);

    t.equals(actual, expected);
});

test('multiple items show lines, reasons, files', function(t) {
    t.plan(1);

    var data = [
            {line: 1, reason: 'Twas brillig, and the slithy toves'},
            {line: 2, reason: 'Did gyre and gimble in the wabe:'}
        ],
        expected = '{{result_kind: "Error",result_file: "' + pathname + '",result_line: 1,message: "Twas brillig, and the slithy toves"},{result_kind: "Error",result_file: "' + pathname + '",result_line: 2,message: "Did gyre and gimble in the wabe:"}}',
        actual = bbrb.test.getItems(data, pathname);

    t.equals(actual, expected);
});

test('script string', function(t) {
    t.plan(1);

    var items = '{{result_kind: "Error",result_file: "' + pathname + '",result_line: 1,message: "Twas brillig, and the slithy toves"},{result_kind: "Error",result_file: "' + pathname + '",result_line: 2,message: "Did gyre and gimble in the wabe:"}}',
        title = 'jabberwocky lines I can"t understand',
        actual = bbrb.test.getScript(items, title),
        expected = 'tell application "BBEdit"\n  set errs to {{result_kind: "Error",result_file: "' + pathname + '",result_line: 1,message: "Twas brillig, and the slithy toves"},{result_kind: "Error",result_file: "' + pathname + '",result_line: 2,message: "Did gyre and gimble in the wabe:"}}\n  make new results browser with data errs with properties {name:"jabberwocky lines I can"t understand"}\nend tell';

    t.equals(actual, expected);
});

test('func', function(t) {
    t.plan(1);

    var data = [{line: 99, reason: 'Twas brillig, and the slithy toves'}];

    bbrb.show(data, pathname, 'title');
    t.true(1);
});