'use strict';

var osarun = require('./osascript'),
    notify = require('terminal-notifier');


function check(o) {
    return o && o.line || console.error('WARNING invalid data:', o);
}

function bbBrowserProps(results, file) {
    /*  note: valid BBEdit results browser data properties are: result_kind,
        result_file, result_line, start_offset, end_offset, message  */
    function reformat(result) {
        var props = [
                'result_kind:error_kind',
                'result_file:"' + file.replace(/"/g, '\\"') + '"',
                'result_line:"' + result.line + '"',
                'message:"' + result.reason.replace(/"/g, '\\"') +'"'
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
        script = bbBrowserScript(items, title || 'Results');

    osarun(script, cb || function(){});
}

module.exports = main;

// deprecated
module.exports.show = main;
module.exports.browse = main;
module.exports.notify = notify;
module.exports.osarun = osarun;

// for unit testing
module.exports.test = {
    bbBrowserProps: bbBrowserProps,
    bbBrowserScript: bbBrowserScript
};
