'use strict';

var osarun = require('./osascript'),
    notify = require('terminal-notifier');


function bbBrowserProps(results, file) {

    function check(result) {
        return result && result.reason && result.line
            || console.error('WARNING invalid data:', result);
    }

    /*  note: valid BBEdit results browser data properties are: result_kind,
        result_file, result_line, start_offset, end_offset, message  */
    function reformat(result) {
        var props = [
                'result_kind: "Error"',
                'result_file: "' + file + '"',
                'result_line: "' + result.line + '"',
                'message: "' + result.reason.replace(/"/g, '\\"') +'"'
            ];

        return '{' + props.join() + '}'; // bbedit's result browser data list
    }

    var bbresults = results.filter(check).map(reformat);
    return '{' + bbresults.join() + '}';
}

function bbBrowserScript(items, title) {
    return [
        'tell application "BBEdit"',
        '  set errs to ' + items,
        '  set props to {name:"' + title +'"}',
        '  make new results browser with data errs with properties props',
        'end tell'
    ].join('\n');
}

function main(results, file, title, cb) {
    var items = bbBrowserProps(results, file),
        script = bbBrowserScript(items, title);

    osarun(script, cb || function() {});
}

module.exports = {
    show: main,
    browse: main,
    notify: notify,
    osarun: osarun,
    test: {
        bbBrowserProps: bbBrowserProps,
        bbBrowserScript: bbBrowserScript
    }
};
