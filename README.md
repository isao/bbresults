BBresults
=========

Library to make [BBEdit](http://barebones.com/products/bbedit/) display a custom results browser-- the same kind BBEdit uses for search results, or syntax check results.

See also: [BBjsHint](https://www.npmjs.org/package/bbjshint), [BBjsLint](https://www.npmjs.org/package/bbjslint), [BBjsBeautify](https://www.npmjs.org/package/bbjsbeautify).

Install
-------

`npm i --save bbresults`

Usage
-----

This:

    var bbresults = require('bbresults'),
        filepath = '/tmp/foobar.txt',
        filedata = [
            {line: 22, reason: 'bad "foo"'},
            {line: 33, reason: 'bad "bar"'},
            {line: 44, reason: 'not feelin that "baz" either, dog.'}
        ];

    bbresults(filedata, filepath);

Shows a result browser window like:

![screenshot](http://cl.ly/Vx3H/Image%202014-06-06%20at%2010.07.20%20PM.png)

Supply positive feedback with something like:

    bbresults.notify('Attaboy!');

...to show an OS X notification (using Evan Wallace's [node wrapper](https://npmjs.org/package/terminal-notifier/) under the hood) like:

![screenshot](http://cl.ly/VxuY/Image%202014-06-06%20at%209.51.28%20PM.png)


Test
----

`npm test`

Acknowledgements
----------------

OS X notifications via Eloy Durán's [terminal-notifier](https://github.com/alloy/terminal-notifier/) and Evan Wallace's [node wrapper](https://npmjs.org/package/terminal-notifier/) for same.

Props to James Halliday for his minimal and fun [tape](https://github.com/substack/tape/).

License
-------

MIT
