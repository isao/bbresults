'use strict';
var spawn = require('child_process').spawn;

/**
 * @param integer|string Exit code number, or signal name if killed
 * @param string
 * @return Error
 */
function makeError(code, message) {
    var msg = 'Error ' + code;
    if (message) {
        msg += ': ' + message;
    }
    return new Error(msg);
}

/**
 * @param array|string Either an array of command line arguments, or a
 *    string to pass to osascript on stdiin
 * @param function callback(err, string)
 */
function main(input, callback) {
    var args = Array.isArray(input) ? input : [],
        proc = spawn('osascript', args),
        cb = callback || console.log,
        output = '',
        errors = '';

    if ('string' === typeof input) {
        proc.stdin.write(input);
        proc.stdin.end();
    }

    proc.on('error', cb);

    proc.stdout.on('data', function(data) {
        output += data;
    });

    proc.stderr.on('data', function(data) {
        errors += data;
    });

    proc.on('close', function procDone(code, signal) {
        if (signal) {
            cb(makeError(signal, 'script was killed'));

        } else if (code || errors) {
            cb(makeError(code, errors));

        } else {
            cb(null, output.replace(/\r/g, '\n'));
        }
    });
}

module.exports = main;

//main(['-e', 'tell application "BBEdit" to get the text of document 1 of window 1'])
//main('tell application "BBEdit" to get the text of document 1 of window 1');
