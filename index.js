#!/usr/bin/env node
/*jshint node:true */
'use strict';

var fs = require('fs'),
    notify = require('terminal-notifier'),
    spawn = require('child_process').spawn;


function getItems(results, file) {
    var out = [];
    results.forEach(function (result) {
        var item = [
                'result_kind: "Error"',
                'result_file: "' + file + '"',
                'result_line: ' + result.line,
                'message: "' + result.reason.replace(/"/g, '\\"') +'"'
            ].join();
        out.push('{' + item + '}');
    });
    return '{' + out.join() + '}';
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

function runScript(str, cb) {
    var osarun = spawn('osascript'),
        err = '';

    osarun.stdin.write(str)
    osarun.stdin.end();
    osarun.stderr.on('data', function(data) {
        err += data;
    });
    osarun.on('exit', function(code) {
        if (0 !== code) {
            console.error('*error code', code);
            console.error('*stderr', err);
        }
        cb(code);
    });
}

function show(results, file, title, cb) {
    var items = getItems(results, file),
        script = getScript(items, title);

    runScript(script, cb || function() {});
}

module.exports = {
    show: show,
    notify: notify,
    test: {getItems: getItems, getScript: getScript}
};
