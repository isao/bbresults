#!/usr/bin/env node
/*jshint node:true */
'use strict';

var fs = require('fs'),
    spawn = require('child_process').spawn,
    note = require('terminal-notifier');


function itemsToString(results, file) {
    var out = [];
    results.forEach(function (result) {
        var item = [
                '{result_kind: "Error"',
                'result_file: "' + file + '"',
                'result_line: ' + result.line,
                'message: "' + result.reason.replace(/"/g, '\\"') + '"}' //escape
            ].join();
        out.push(item);
    });
    return '{' + out.join() + '}';
}

function scriptToString(items, title) {
    var props = 'with properties {name:"' + title +'"}';
    return [
        'tell application "BBEdit"',
        'set errs to ' + items,
        'make new results browser with data errs ' + props,
        'end tell'
    ].join('\n');
}

function runscript(str) {
    var osarun = spawn('osascript', ['-ss']),
        err = '',
        out = '';

    osarun.stdin.write(str)
    osarun.stdin.end();
    osarun.stdout.on('data', function(data) {
        out += data;
    });
    osarun.stderr.on('data', function(data) {
        err += data;
    });
    osarun.on('exit', function(code) {
        if (0 !== code) {
        	console.error('error %d, %s', code, stderr);
        }
    });
}

function show(results, file, title) {
    var items = itemsToString(results, file),
        script = scriptToString(items, title);
    runscript(script);
}

module.exports = {
    show: show,
    test: {
        items: itemsToString,
        script: scriptToString
    }
};
