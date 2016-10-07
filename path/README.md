# paths

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

simple file and paths manipulations module based on the path module and the fs module.
for easy file and folder manipulation and creation.

- contains basically four paths.
- load -- loads and file or a dir based on the pathname and provides a set of methods for it.
- open -- based on the fs.open method. but have more expilicit commands like append, read , write
	createRedadStream, createWriteStream and others.
- io/load -- this includes the simple input/ output sync and asyn functions that come with the fs module.
- and the others are manipulative methods on the path and fs module for removing, creating, updating, renaming,
	the file system.
		# and it also brings with it a print method that looks like the python equivalent of console.log


# API

# var path = require('paths')
# path([pathname]) -- if ignored, the current dir name will be used.

* simple methods in this module.
'''
	pathname = path.pathname
	absolute = path.abs	
	mimetype = path.mimetype
	newpath = path.join(other)
	isFile
	isDir
	exists
	load
	open
'''

* io/load and open does pretty much the same things.


## License

[ISC](LICENSE)

[npm-image]: https://img.shields.io/npm/v/accepts.svg?style=flat
[npm-url]: https://npmjs.org/package/accepts
[node-version-image]: https://img.shields.io/node/v/accepts.svg?style=flat
[node-version-url]: http://nodejs.org/download/
[travis-image]: https://img.shields.io/travis/jshttp/accepts.svg?style=flat
[travis-url]: https://travis-ci.org/jshttp/accepts
[coveralls-image]: https://img.shields.io/coveralls/jshttp/accepts.svg?style=flat
[coveralls-url]: https://coveralls.io/r/jshttp/accepts
[downloads-image]: https://img.shields.io/npm/dm/accepts.svg?style=flat
[downloads-url]: https://npmjs.org/package/path 

