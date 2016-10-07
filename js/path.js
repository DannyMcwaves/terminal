/*

  this is just a simple module that i am creating from the path module to just
  help me to be able to write and manipulate all my paths to files and directories
  very simply and easily. hope this thingy works very well.

  okay, so here is the blueprint for it.
  var path = require(path);

  module.exports = function(path_name) {
    return an oobject that has methods that can be able to be use to operate on
    file.
  }

*/

var path = require("path"),
    fs = require("fs"),
    process = require("process"),
    print = require("./print"),
    io = require("./io"),
    dir = require("./dir"),
    open = require("./open");

module.exports = function (path_name) {
  // if there is no filename, use the current working directory.
  // as the working file name.

    function Path(path_name) {
        "use strict";
        if (!path_name) {
            path_name = process.cwd();
        }

        this.pathname = path.resolve(path_name);
        this.Abs =  path.isAbsolute(this.pathname);
        this.basename = path.basename(this.pathname);
        this.mimetype = path.extname(this.pathname);
        this.directory = path.dirname(this.pathname);
        this.join = function (other) {
            return path.join(this.pathname, other);
        };
        this.exists = function () {
            return fs.existsSync(path_name);
        };
        this.isFile = function () {
            try {
                return fs.statSync(this.pathname).isFile();
            } catch (Error) {
                return "file does not exist";
            }
        };
        this.isDir = function () {
            try {
                return fs.statSync(this.pathname).isDirectory();
            } catch (Error) {
                return "directory does not exist";
            }
        };
        this.mkfile = function (name) {
            var newName;
            if (!name) {
                if (this.isDir() === true) {
                    newName = this.join('new.txt');
                } else {
                    newName = this.pathname;
                }
            } else {
                var dir = this.isDir() ? this.pathname : this.directory;
                newName = path.join(dir, name);
            }
            fs.open(newName, 'a', function (error, fd) {
                if (error) {
                    print("file already exists");
                } else {
                    print("file is successfully created");
                }
                fs.close(fd);
            });
            return new Path(newName);
        },
        this.rmfile = function (name) {
            var newName;
            if (!name) {
                if (this.isDir() === true) {
                    newName = this.join('new.txt');
                } else {
                    newName = this.pathname;
                }
            } else {
                var dir = this.isDir() ? this.pathname : this.directory;
                newName = path.join(dir, name);
            }
            fs.unlink(newName, function (error, done) {
                console.log(error ? "file was not removed" : "file successfully removed");
            });
        },
        this.mkdir = function (name) {
            var dir;
            if (this.isFile()) {
                dir = this.directory;
            } else {
                dir = this.pathname;
            }
            var newpath = path.join(dir, name);
            fs.mkdir(newpath, function (error) {
                if (error) {
                    print("folder already exists");
                } else {
                    print("folder successfully created");
                }
            });

            // this method returns a new path object that lets you manipulate this
            // new folder you have created. THANK YOU.
            return new Path(newpath);
        },
        this.rmdir = function (name) {
            var dir;
            if (this.isFile()) {
                dir = this.directory;
            } else {
                dir = this.pathname;
            }
            fs.rmdir(path.join(dir, name), function (error) {
                if (error) {
                    print(error);
                } else {
                    print("folder successfully deleted");
                }
            });
            return null;
        },
        this.load = function () {
            if (this.isDir() === true) {
                return dir(this.pathname);
            } else {
                return io(this.pathname);
            }
        },
        this.open = function () {
            if (this.exists() === true && this.isFile() === true) {
                return open(this.pathname)
            }
        }
    }

    return new Path(path_name);
};

// #created by danny mcwaves (c)2016
