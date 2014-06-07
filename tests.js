var test = require('tape'),
    sut = require('./'),
    pathname = __filename;


test('functional test', function(t) {
    t.plan(1);

    var data = [{line: 9, reason: 'Twas brillig, and the slithy toves'}];

    sut.show(data, pathname, 'title');
    t.true(1);
});

test('items show line, reason, file', function(t) {
    t.plan(1);

    var data = [
            {line: 99, reason: 'Twas brillig, and the slithy toves'}
        ],
        expected = '{{result_kind:error_kind,result_file:"' + pathname + '",result_line:"99",message:"Twas brillig, and the slithy toves"}}',
        actual = sut.test.bbBrowserProps(data, pathname);

    t.equals(actual, expected);
});

test('multiple items show lines, reasons, files', function(t) {
    t.plan(1);

    var data = [
            {line: 1, reason: 'Twas brillig, and the slithy toves'},
            {line: 2, reason: 'Did gyre and gimble in the wabe:'}
        ],
        expected = '{{result_kind:error_kind,result_file:"' + pathname + '",result_line:"1",message:"Twas brillig, and the slithy toves"},{result_kind:error_kind,result_file:"' + pathname + '",result_line:"2",message:"Did gyre and gimble in the wabe:"}}',
        actual = sut.test.bbBrowserProps(data, pathname);

    t.equals(actual, expected);
});

test('empty data', function(t) {
    t.plan(1);

    var data = [],
        expected = '{}',
        actual = sut.test.bbBrowserProps(data, pathname);

    t.equals(actual, expected);
});

test('bad data - expect "WARNING invalid data..." on stderr next:', function(t) {
    t.plan(1);

    var data = [{}],
        expected = '{}',
        actual = sut.test.bbBrowserProps(data, pathname);

    t.equals(actual, expected);
});


test('script string', function(t) {
    t.plan(1);

    var items = '{{result_kind:error_kind,result_file:"' + pathname + '",result_line:1,message:"Twas brillig, and the slithy toves"},{result_kind:error_kind,result_file:"' + pathname + '",result_line:2,message:"Did gyre and gimble in the wabe:"}}',
        title = "jabberwocky lines I can't understand",
        actual = sut.test.bbBrowserScript(items, title),
        expected = 'tell application "BBEdit"\n  set errs to {{result_kind:error_kind,result_file:"' + pathname + '",result_line:1,message:"Twas brillig, and the slithy toves"},{result_kind:error_kind,result_file:"' + pathname + '",result_line:2,message:"Did gyre and gimble in the wabe:"}}\n  set props to {name:"jabberwocky lines I can\'t understand"}\n  make new results browser with data errs with properties props\nend tell';

    t.equals(actual, expected);
});
