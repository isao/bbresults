#!/usr/bin/env node
'use strict';

var osarun = require('./osascript'),
    notify = require('terminal-notifier');


function getItems(results, file) {
    var out = [];
    results.filter(Boolean).forEach(function (result) {
        var item = [
                'result_kind: "Error"',
                'result_file: "' + file + '"',
                'result_line: "' + result.line + '"',
                'message: "' + result.reason.replace(/"/g, '\\"') +'"'
            ].join();
        out.push('{' + item + '}');
    });
    return '{' + out.join() + '}'
}

function getScript(items, title) {
    return [
        'tell application "BBEdit"',
        '  set errs to ' + items,
        '  set props to {name:"' + title +'"}',
        '  make new results browser with data errs with properties props',
        'end tell'
    ].join('\n');
}

function main(results, file, title, cb) {
    var items = getItems(results, file),
        script = getScript(items, title);

    osarun(script, cb || function() {});
}

module.exports = {
    show: main,
    browse: main,
    notify: notify,
    osarun: osarun,
    test: {
        getItems: getItems,
        getScript: getScript
    }
};
