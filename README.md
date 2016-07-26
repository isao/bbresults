BBresults
=========

Library to make [BBEdit](http://barebones.com/products/bbedit/) display a results browser, given some data for a file containing line and reason pointers.

Used by [BBJshint](https://github.com/isao/bbjshint/) and [BBJslint](https://github.com/isao/bbjslint/).

*Note* BBEdit v11.6 and later provide it's own `bbresults` command line tool.

Install
-------
`npm i --save bbresults`

Test
----
`npm test`

Acknowledgements
----------------
TooTallNate's [applescript module](https://github.com/TooTallNate/node-applescript/) taught me `osascript` accepts applescript text on stdin.

OS X notifications via Eloy Durán's [terminal-notifier](https://github.com/alloy/terminal-notifier/) and Evan Wallace's [node wrapper](https://npmjs.org/package/terminal-notifier/) for same.

Props to James Halliday for his minimal and fun [tape](https://github.com/substack/tape/).

License
-------
MIT
